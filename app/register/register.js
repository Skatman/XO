'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html'
  });
}])

.controller('Register', ['$http', 'config', 'Auth', function($http, config, Auth) {

  const ctrl = this;

  console.log(Auth);

  ctrl.register = function() {
    $http({
        method: 'POST',
        url: config.apiUrl+'register',
        data: {
          username: ctrl.username,
          password: ctrl.password
        }
      }).then(function successCallback(response) {
          Auth.go('/game');
        }, function errorCallback(response) {
          console.log(reponse);
        });
  }
}]);
