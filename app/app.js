'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'angular-websocket',
  'core',
  'myApp.home',
  'myApp.login',
  'myApp.register',
  'myApp.game',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});

  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;

  console.log('with credentials: ', $httpProvider.defaults.withCredentials);

}]).
constant('config', {
    apiUrl: 'http://69ea709d.ngrok.io/',
    statusCodes: {
      'loginIsCorrect': 10,
      'loginIsIncorrect': 20,
      'usernameExists': 30,
      'userAdded': 40,
      'userDeleted': 50,
      'noUser': 60
    }
});
