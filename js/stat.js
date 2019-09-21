'use strict';

// var renderStatistics = {
//   window: function (ctx, names, times) {
//     console.log () , names, times
//   }
// }

var cloudParams = {
  WIDTH: 420,
  HEIGHT: 270,
  GAP: 55,
  X: 100,
  Y: 10
};

var barParams = {// могу ли я дублировать название ключей (типа width, height) как в объекте выше?
  WIDTH: 45,
  HEIGHT: 160,
  X: 40,
  Y: 80
};

var SHADOW_SHIFT = 10;
var GAP = 55;

var TOP_INDENT = 40; // Расстояние от верха канваса до заголовка к графику.
var BOTTOM_INDENT = 260; // Расстояние от низа до подписи.
var FONT_GAP = 16; // Отступ, который зависит от размера шрифта.
var BAR_INDENT = barParams.WIDTH + GAP; // Расстояние, которое занимает столбец вместе с отступом после него.
var barHeight = 150; // Высота колонок

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudParams.X + SHADOW_SHIFT, cloudParams.Y + SHADOW_SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudParams.X, cloudParams.Y, 'rgba(255, 250, 250, 1)');

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', cloudParams.X + barParams.X, TOP_INDENT);
  ctx.fillText('Список результатов:', cloudParams.X + barParams.X, TOP_INDENT + FONT_GAP);

  var maxTime = getMaxElement(times);

  // names.forEach(function (name, i) {
  // name - элемент массива names; i - индекс этого элемента; times[i] - элемент массива times соответствующий name
  // }

  for (var i = 0; i < names.length; i++) {
    var barHeightCurrent = barHeight * times[i] / maxTime; // расчёт высоты колонок в зависимости от времени

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(times[i]), barParams.X + cloudParams.X + (i * BAR_INDENT), GAP, cloudParams.HEIGHT + cloudParams.Y - barHeightCurrent);

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() + ', 100%)';
    ctx.fillText(names[i], barParams.X + ((i + 1) * BAR_INDENT), BOTTOM_INDENT);
    ctx.fillRect(barParams.X + ((i + 1) * BAR_INDENT), cloudParams.HEIGHT + cloudParams.Y - barHeightCurrent - TOP_INDENT, barParams.WIDTH, barHeightCurrent);
  }
};
