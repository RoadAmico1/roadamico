'use strict';

angular.module('roadAmicoApp')
  .directive('iconpicker', function () {
    return {
      templateUrl: 'app/directives/iconpicker/iconpicker.html',
      restrict: 'EA',
      require: 'ngModel',
      scope: {
        active: '=ngModel'
      },
      link: function (scope, element, attrs, ctrl) {

        scope.show = function (icon) {
          return !scope.searchFilter || icon.toLowerCase().indexOf(scope.searchFilter.toLowerCase()) > -1;
        };

        scope.select = function (icon, event) {
          ctrl.$setViewValue(icon, event);
        };

        scope.icons = [
          'adjust',
          'ambulance',
          'anchor',
          'archive',
          'area-chart',
          'arrows',
          'arrows-h',
          'arrows-v',
          'asterisk',
          'at',
          'automobile',
          'ban',
          'bank',
          'bar-chart',
          'bar-chart-o',
          'barcode',
          'bars',
          'bed',
          'beer',
          'bell',
          'bell-o',
          'bell-slash',
          'bell-slash-o',
          'bicycle',
          'binoculars',
          'birthday-cake',
          'bolt',
          'bomb',
          'book',
          'bookmark',
          'bookmark-o',
          'briefcase',
          'bug',
          'building',
          'building-o',
          'bullhorn',
          'bullseye',
          'bus',
          'cab',
          'calculator',
          'calendar',
          'calendar-o',
          'camera',
          'camera-retro',
          'car',
          'caret-square-o-down',
          'caret-square-o-left',
          'caret-square-o-right',
          'caret-square-o-up',
          'cart-arrow-down',
          'cart-plus',
          'cc',
          'certificate',
          'check',
          'check-circle',
          'check-circle-o',
          'check-square',
          'check-square-o',
          'child',
          'circle',
          'circle-o',
          'circle-o-notch',
          'circle-thin',
          'clock-o',
          'close',
          'cloud',
          'cloud-download',
          'cloud-upload',
          'code',
          'code-fork',
          'coffee',
          'cog',
          'cogs',
          'comment',
          'comment-o',
          'comments',
          'comments-o',
          'compass',
          'copyright',
          'credit-card',
          'crop',
          'crosshairs',
          'cube',
          'cubes',
          'cutlery',
          'dashboard',
          'database',
          'desktop',
          'diamond',
          'dot-circle-o',
          'download',
          'edit',
          'ellipsis-h',
          'ellipsis-v',
          'envelope',
          'envelope-o',
          'envelope-square',
          'eraser',
          'exchange',
          'exclamation',
          'exclamation-circle',
          'exclamation-triangle',
          'external-link',
          'external-link-square',
          'eye',
          'eye-slash',
          'eyedropper',
          'fax',
          'female',
          'fighter-jet',
          'file-archive-o',
          'file-audio-o',
          'file-code-o',
          'file-excel-o',
          'file-image-o',
          'file-movie-o',
          'file-pdf-o',
          'file-photo-o',
          'file-picture-o',
          'file-powerpoint-o',
          'file-sound-o',
          'file-video-o',
          'file-word-o',
          'file-zip-o',
          'film',
          'filter',
          'fire',
          'fire-extinguisher',
          'flag',
          'flag-checkered',
          'flag-o',
          'flash',
          'flask',
          'folder',
          'folder-o',
          'folder-open',
          'folder-open-o',
          'frown-o',
          'futbol-o',
          'gamepad',
          'gavel',
          'gear',
          'gears',
          'genderless',
          'gift',
          'glass',
          'globe',
          'graduation-cap',
          'group',
          'hdd-o',
          'headphones',
          'heart',
          'heart-o',
          'heartbeat',
          'history',
          'home',
          'hotel',
          'image',
          'inbox',
          'info',
          'info-circle',
          'institution',
          'key',
          'keyboard-o',
          'language',
          'laptop',
          'leaf',
          'legal',
          'lemon-o',
          'level-down',
          'level-up',
          'life-bouy',
          'life-buoy',
          'life-ring',
          'life-saver',
          'lightbulb-o',
          'line-chart',
          'location-arrow',
          'lock',
          'magic',
          'magnet',
          'mail-forward',
          'mail-reply',
          'mail-reply-all',
          'male',
          'map-marker',
          'meh-o',
          'microphone',
          'microphone-slash',
          'minus',
          'minus-circle',
          'minus-square',
          'minus-square-o',
          'mobile',
          'mobile-phone',
          'money',
          'moon-o',
          'mortar-board',
          'motorcycle',
          'music',
          'navicon',
          'newspaper-o',
          'paint-brush',
          'paper-plane',
          'paper-plane-o',
          'paw',
          'pencil',
          'pencil-square',
          'pencil-square-o',
          'phone',
          'phone-square',
          'photo',
          'picture-o',
          'pie-chart',
          'plane',
          'plug',
          'plus',
          'plus-circle',
          'plus-square',
          'plus-square-o',
          'power-off',
          'print',
          'puzzle-piece',
          'qrcode',
          'question',
          'question-circle',
          'quote-left',
          'quote-right',
          'random',
          'recycle',
          'refresh',
          'remove',
          'reorder',
          'reply',
          'reply-all',
          'retweet',
          'road',
          'rocket',
          'rss',
          'rss-square',
          'search',
          'search-minus',
          'search-plus',
          'send',
          'send-o',
          'server',
          'share',
          'share-alt',
          'share-alt-square',
          'share-square',
          'share-square-o',
          'shield',
          'ship',
          'shopping-cart',
          'sign-in',
          'sign-out',
          'signal',
          'sitemap',
          'sliders',
          'smile-o',
          'soccer-ball-o',
          'sort',
          'sort-alpha-asc',
          'sort-alpha-desc',
          'sort-amount-asc',
          'sort-amount-desc',
          'sort-asc',
          'sort-desc',
          'sort-down',
          'sort-numeric-asc',
          'sort-numeric-desc',
          'sort-up',
          'space-shuttle',
          'spinner',
          'spoon',
          'square',
          'square-o',
          'star',
          'star-half',
          'star-half-empty',
          'star-half-full',
          'star-half-o',
          'star-o',
          'street-view',
          'subway',
          'suitcase',
          'sun-o',
          'support',
          'tablet',
          'tachometer',
          'tag',
          'tags',
          'tasks',
          'taxi',
          'terminal',
          'thumb-tack',
          'thumbs-down',
          'thumbs-o-down',
          'thumbs-o-up',
          'thumbs-up',
          'ticket',
          'times',
          'times-circle',
          'times-circle-o',
          'tint',
          'toggle-down',
          'toggle-left',
          'toggle-off',
          'toggle-on',
          'toggle-right',
          'toggle-up',
          'train',
          'trash',
          'trash-o',
          'tree',
          'trophy',
          'truck',
          'tty',
          'umbrella',
          'university',
          'unlock',
          'unlock-alt',
          'unsorted',
          'upload',
          'user',
          'user-plus',
          'user-secret',
          'user-times',
          'users',
          'video-camera',
          'volume-down',
          'volume-off',
          'volume-up',
          'warning',
          'wheelchair',
          'wifi',
          'wrench'
        ];

      }
    };
  });