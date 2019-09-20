'use strict';
//var canvas = document.getElementById('canvas');

// var ctx = canvas.getContext('2d');
// var names = ['Вы', 'Кекс', 'Катя', 'Игорь'];
// var times = [2725, 4025, 1244, 1339];

// var renderStatistics = {
//   window: function (ctx, names, times) {
//     console.log () , names, times
//   }
// }

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 55;
//var FONT_GAP = 15;
var TEXT_WIDTH = 60;
var BAR_HEIGHT = 160;


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!\nСписок результатов:', 0, 20);
}

window.renderStatistics = function(ctx) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 250, 250, 1)');

  ctx.fillStyle = 'rgba(255, 250, 250, 1)';
  ctx.fillText('Вы', CLOUD_X + GAP, 300);
  ctx.fillRect(160, 175, 45, BAR_HEIGHT);

  ctx.fillStyle = 'hsl(240, ' + Math.random() + ', 100%)';
  ctx.fillText('Кекс', CLOUD_X + GAP, 300);
  ctx.fillRect(260, 175, 45, BAR_HEIGHT);

  ctx.fillStyle = 'hsl(240, ' + Math.random() + ', 100%)';
  ctx.fillText('Катя', CLOUD_X + GAP, 300);
  ctx.fillRect(360, 175, 45, BAR_HEIGHT);

  ctx.fillStyle = 'hsl(240, ' + Math.random() + ', 100%)';
  ctx.fillText('Игорь', CLOUD_X + GAP, 300);
  ctx.fillRect(460, 175, 45, BAR_HEIGHT);
}

// document.oneKeyPress = function(event) {
//   console.log(event);
//   if (event.shiftKey) {
//     console.log ('Нажата клавиша Shift')
//   }
// }
