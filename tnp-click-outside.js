(function() {
  'use strict';

  if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
    module.exports = 'tenphi.clickOutside';
  }

  angular.module('tenphi.clickOutside', [])
    .factory('clickOutsideService', ['$window', function($window) {
      var objs = {};
      var index = 0;

      $window.addEventListener('click', function(event) {
        if (!event.outsideClickListeners) {
          event.outsideClickListeners = [];
        }
        Object.keys(objs).forEach(function(index) {
          index = parseInt(index);
          if (!~event.outsideClickListeners.indexOf(index)) {
            objs[index].callback();
          }
        });
      });

      return {
        registerElement: function($el, callback) {
          objs[index] = {
            element: $el,
            callback: callback
          };
          return index++;
        },
        removeElement: function(index) {
          delete objs[index];
        }
      }
    }])
    .directive('tnpClickOutside', ['clickOutsideService', function(clickOutsideService) {
      return {
        restrict: 'A',
        link: function($scope, $el, attrs) {
          var index = clickOutsideService.registerElement($el, function() {
            $scope.$evalAsync(attrs.tnpClickOutside);
          });

          $scope.$on('$destroy', function() {
            clickOutsideService.removeElement(index);
          });

          $el.on('click', function(event) {
            if (!event.outsideClickListeners) {
              event.outsideClickListeners = [];
            }
            event.outsideClickListeners.push(index);
          });
        }
      }
    }]);

})();
