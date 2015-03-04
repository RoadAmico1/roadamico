'use strict';

var _ = require('lodash');
var moment = require('moment');
var Availability = require('./availability.model');
var Service = require('../service/service.model');
var translate = require('../../components/translate');

// Get list of availabilities
//exports.index = function(req, res) {
//  Availability.find(function (err, availabilities) {
//    if(err) { return handleError(res, err); }
//    return res.json(200, availabilities);
//  });
//};

exports.getAll = function (req, res) {
  Availability.find({
    service: req.params.id
  }).exec(function (err, availabilities) {
    if(err) { return handleError(res, err); }
    return res.json(availabilities);
  });
};

exports.getUpcoming = function (req, res) {
  Availability.find({
    service: req.params.id,
    timestamp: { $gte: moment().valueOf() }
  }).exec(function (err, availabilities) {
    if(err) { return handleError(res, err); }
    return res.json(availabilities);
  });
};

// Get a single availability
exports.show = function(req, res) {
  Availability.findById(req.params.id, function (err, availability) {
    if(err) { return handleError(res, err); }
    if(!availability) { return res.send(404); }
    return res.json(availability);
  });
};

// Creates a new availability in the DB.
exports.create = function(req, res) {

  delete req.body.booking;
  req.body.timestamp = moment(req.body.datetime).valueOf();
  if (typeof req.body.service === 'object') {
    req.body.service = req.body.service._id;
  }

  Service.findById(req.body.service).exec(function (err, service) {
    if (err) { return handleError(res, err); }

    // Check the service
    if (service.provider.equals(req.user._id)) {
      Availability.create(req.body, function(err, availability) {
        if(err) { return handleError(res, err); }
        return res.json(201, availability);
      });
    } else {
      return res.json(403, { message: translate(req, 'service-unauthorized') });
    }
  });
};

// Updates an existing availability in the DB.
exports.update = function(req, res) {

  delete req.body._id;
  delete req.body.booking;
  if (req.body.datetime) {
    req.body.timestamp = moment(req.body.datetime).valueOf();
  }
  if (typeof req.body.service === 'object') {
    req.body.service = req.body.service._id;
  }

  Service.findById(req.body.service).exec(function (err, service) {
    if (err) { return handleError(res, err); }

    // Check the service
    if (service.provider.equals(req.user._id)) {
      Availability.findById(req.params.id, function (err, availability) {
        if (err) { return handleError(res, err); }
        if(!availability) { return res.send(404); }

        var updated = _.merge(availability, req.body);
        updated.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, availability);
        });
      });

    } else {
      return res.json(403, { message: translate(req, 'service-unauthorized') });
    }
  });
};

// Deletes a availability from the DB.
exports.destroy = function(req, res) {

  // TODO: Do something if its already booked

  Availability.findById(req.params.id, function (err, availability) {
    if(err) { return handleError(res, err); }
    if(!availability) { return res.send(404); }
    availability.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.book = function (req, res, next) {
  Availability.findById(req.body._id, function (err, availability) {
    if(err) return next(err);
    if(!availability) return res.send(404);
    if(availability.booking.booker) return res.json(403, {message: translate(req, 'already-booked')});

    availability.booking = {
      booker: req.user._id,
      updates: [{
        time: moment().toISOString(),
        status: 'booked'
      }]
    };
    availability.save(function(err, a2) {
      if(err) return next(err);

      // TODO: Process payment
      a2.booking.updates.push({
        time: moment().toISOString(),
        status: 'paid'
      });
      a2.save(function (err, a3) {
        if(err) return next(err);

        // TODO: Send notifications

        return res.json(200, a3);
      });

    });
  });
};

exports.mine = function (req, res, next) {
  Availability.find({
    'booking.booker': req.user._id
  }).populate('service', 'name').exec(function (err, availabilities) {
    if (err) return next(err);
    return res.json(availabilities);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
