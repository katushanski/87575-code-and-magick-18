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
  WIDTH: 40,
  HEIGHT: 150,
  X: 40,
  Y: 80
};

var SHADOW_SHIFT = 10;
var GAP = 55;

var TOP_INDENT = 40; // Расстояние от верха канваса до заголовка к графику.
var BOTTOM_INDENT = 260; // Расстояние от низа до подписи.
var FONT_GAP = 16; // Отступ, который зависит от размера шрифта.
var BAR_INDENT = barParams.WIDTH + GAP; // Расстояние, которое занимает столбец вместе с отступом после него.

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudParams.WIDTH, cloudParams.HEIGHT);
};

var getMaxElement = function getMaxOfArray(times) {
  return Math.max.apply(null, times);
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
    var barHeightCurrent = barParams.HEIGHT * times[i] / maxTime; // расчёт высоты колонок в зависимости от времени
    var coordX = barParams.X + ((i + 1) * BAR_INDENT); // координата по оси x, одна и та же для имен, текста и колонок
    var barCoordY = cloudParams.HEIGHT + cloudParams.Y - barHeightCurrent - TOP_INDENT; // координата колонки по оси Y, нужна для отрисовки колонки и чтобы относительно нее найти координату Y для текста результата

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(times[i]), coordX, barCoordY - FONT_GAP, cloudParams.HEIGHT + cloudParams.Y - barHeightCurrent);

    ctx.fillText(names[i], coordX, BOTTOM_INDENT);
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + (Math.random() * 100) + '%' + ', 50%)';
    ctx.fillRect(coordX, barCoordY, barParams.WIDTH, barHeightCurrent);
  }
};
