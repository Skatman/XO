'use strict';

angular.module('myApp.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html'
  });
}])

.controller('gameCtrl', [ '$http', 'config', 'Game', '$cookies',
  function($http, config, Game, $cookies) {

  const ctrl = this;
  ctrl.board = Game.getBoard();
  ctrl.xCount = 0;
  ctrl.yCount = 0;
  ctrl.username = '';

  console.log(ctrl.board);

  const winners = [
                   [ [0, 0], [0, 1], [0, 2] ],
                   [ [0, 0], [1, 0], [2, 0] ],
                   [ [1, 0], [1, 1], [1, 2] ],
                   [ [2, 0], [2, 1], [2, 2] ],
                   [ [0, 1], [1, 1], [2, 1] ],
                   [ [0, 2], [1, 2], [2, 2] ],
                   [ [0, 0], [1, 1], [2, 2] ],
                   [ [0, 2], [1, 1], [2, 0] ],
                 ];

  ctrl.cellClick = function($event, x, y) {
    if (ctrl.gameOver) {
      return;
    }

    if (ctrl.board[x][y] !== 0) {
      return;
    }

    if (ctrl.xCount <= ctrl.yCount) {
      Game.makeStep(x, y, 1);
      console.log(Game.getBoard());
      ctrl.xCount++;
      $event.target.classList.add('x');
    }
    else {
      Game.makeStep(x, y, -1);
      console.log(Game.getBoard());
      ctrl.yCount++;
      $event.target.classList.add('y');
    }

    ctrl.checkWinner();
  }

  ctrl.checkWinner = function() {
    let win = winners.some(function(winner) {
      let sum = winner.reduce(function(sum, cell) {
        return sum += ctrl.board[cell[0]][cell[1]];
      }, 0) ;
      return Math.abs(sum) === 3;
    })

    if (win) {
      let winner = 'X';
      if (ctrl.yCount == ctrl.xCount) {
        winner = 'O';
      }
      ctrl.message = `Game Over! The Winner Is ${winner}!`;
      ctrl.gameOver = true;
    } else {
        if (ctrl.xCount == 5) {
          ctrl.message = `Game Over! Draw!`;
          ctrl.gameOver = true;
        }
    }
  }

  ctrl.refresh = function() {

    ctrl.board = [[ 0, 0, 0], [0, 0, 0], [0, 0, 0]];
    ctrl.xCount = 0;
    ctrl.yCount = 0;
    ctrl.message = undefined;
    ctrl.gameOver = false;
    ctrl.username = '';

    document.querySelectorAll('.cell').forEach(function(element) {
      element.classList.remove("x");
      element.classList.remove("y");
    })

  }

  ctrl.deleteUser = function() {
    console.log('cookies', $cookies.getAll());
    $http({
        method: 'POST',
        url: config.apiUrl+'delete',
        data: {
          username: 'Andrey',
          password: '123'
        }
      }).then(function successCallback(response) {
          console.log(response);
          if (response.data == config.statusCodes.loginIsCorrect) {
            console.log('redirect to game screen');
            Auth.go('/game');
          }
        }, function errorCallback(response) {
          console.log(reponse);
        });
  }

}]);
