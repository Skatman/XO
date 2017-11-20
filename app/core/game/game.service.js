'use strict';

angular.
  module('core.game').
  factory('Game', [function() {
      // return $resource('phones/:phoneId.json', {}, {
      //   query: {
      //     method: 'GET',
      //     params: {phoneId: 'phones'},
      //     isArray: true
      //   }
      // });

      let game = {
        board: [[ 0, 0, 0], [0, 0, 0], [0, 0, 0]]
      };

      return {
        getBoard: function() {
          return game.board;
        },
        makeStep: function(x, y, player) {
          game.board[x][y] = player;
        }
      };
    }
  ]);
