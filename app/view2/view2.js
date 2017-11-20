'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html'
  });
}])

.controller('View2Ctrl', ['$http', '$websocket', 'Game', function($http, $websocket, Game) {
  const ctrl = this;

  var dataStream = $websocket('ws://192.168.1.18:9000/socket');


  dataStream.onMessage(function(message) {
    console.log(message.data);
  });

  dataStream.onOpen(function() {
    ctrl.showMessageInput = true;
    dataStream.send("User"+(Math.floor(Math.random() * 6) + 1));
  });

  ctrl.sendMessage = function() {
    dataStream.send(ctrl.message);
    ctrl.message = "";
  }

  // ctrl.addone = function() {
  //   $http({
  //     method: 'POST',
  //     url: 'http://192.168.1.18:7000/addone',
  //     data: {
  //       name: 'Andrey'
  //     }
  //   }).then(function successCallback(response) {
  //       console.log(response);
  //     }, function errorCallback(response) {
  //       console.log(reponse);
  //     });
  // }

}]);
