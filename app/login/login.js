'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html'
  });
}])

.controller('Login', ['$http', 'config', 'Auth', '$cookies',function($http, config, Auth, $cookies) {

  const ctrl = this;

  console.log($cookies.getAll());
  $cookies.put('Super', 'Andrey');
  console.log($cookies.getAll());


  ctrl.login = function() {
    $http({
        method: 'POST',
        url: config.apiUrl+'login',
        data: {
          username: ctrl.username,
          password: ctrl.password
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        withCredentials: true
      }).then(function successCallback(response) {
          console.log(response);
          console.log($cookies.getAll());
          if (response.data == config.statusCodes.loginIsCorrect) {
            console.log('redirect to game screen');
            Auth.go('/game');
          }
        }, function errorCallback(response) {
          console.log(reponse);
        });
  }
}]);
