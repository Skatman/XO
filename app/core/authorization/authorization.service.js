'use strict';

angular.
  module('core.auth').
  factory('Auth', ['$location', function($location) {
    const ctrl = this;
    ctrl.authorized = false,
    ctrl.memorizedState = null;

    var
    clear = function() {
      ctrl.authorized = false;
      ctrl.memorizedState = null;
    },

    go = function(fallback) {
      ctrl.authorized = true;
      var targetState = ctrl.memorizedState ? ctrl.memorizedState : fallback;
      $location.path(targetState);
    };

    return {
      authorized: ctrl.authorized,
      memorizedState: ctrl.memorizedState,
      clear: clear,
      go: go
    };
  }
  ]);
