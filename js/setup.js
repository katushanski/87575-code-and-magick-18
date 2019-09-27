// Код должен быть разделен на отдельные функции. Стоит отдельно объявить функцию генерации случайных данных, функцию создания DOM-элемента на основе JS-объекта,
// функцию заполнения блока DOM-элементами на основе массива JS-объектов. Пункты задания примерно соответствуют функциям, которые вы должны создать.
'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var nameArray = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnameArray = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorArray = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColorArray = ['black', 'red', 'blue', 'yellow', 'green'];

var randomElement = function (randomizedArray) {
  var number = [Math.floor(Math.random() * randomizedArray.length)];

  return number;
};

var wizard = function () {
  var wizardArmy = [];
  for (var i = 0; i <= 3; i++) {
    var currentWizard = {
      name: nameArray[randomElement(nameArray)] + ' ' + surnameArray[randomElement(surnameArray)],
      coatColor: coatColorArray[randomElement(coatColorArray)],
      eyesColor: eyesColorArray[randomElement(eyesColorArray)]
    };
    wizardArmy += currentWizard;
  }
  return wizardArmy;
};

wizard();

