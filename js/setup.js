// Код должен быть разделен на отдельные функции. Стоит отдельно объявить функцию генерации случайных данных, функцию создания DOM-элемента на основе JS-объекта,
// функцию заполнения блока DOM-элементами на основе массива JS-объектов. Пункты задания примерно соответствуют функциям, которые вы должны создать.

// На основе данных, созданных в предыдущем пункте и шаблона #similar-wizard-template создайте DOM-элементы, соответствующие случайно сгенерированным волшебникам и заполните их данными из массива:
// имя персонажа name запишите как текст в блок .setup-similar-label;
// цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat;
// цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes.
// Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list. Для вставки элементов используйте DocumentFragment.
// Покажите блок .setup-similar, удалив у него CSS-класс hidden.
'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var WIZARDS_AMOUNT = 4;

var wizardParams = {
  NAMES: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomElement = function (elements) {
  var number = [Math.floor(Math.random() * elements.length)];

  return number;
};

var generateWizards = function (amount) {
  var wizards = [];
  for (var i = 0; i < amount; i++) {
    var wizard = {
      name: getRandomElement(wizardParams.NAMES) + ' ' + getRandomElement(wizardParams.SURNAMES),
      coatColor: getRandomElement(wizardParams.COAT_COLORS),
      eyesColor: getRandomElement(wizardParams.EYES_COLORS)
    };
    wizards.push(wizard);
  }
  return wizards;
};

generateWizards(WIZARDS_AMOUNT);

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // клонирую тейплейт
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // нахожу нужные элементы (querySelector плюс классы из задания) и задаю параметры волшебника
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = document.createDocumentFragment();
for (var i = 0; i < generateWizards().length; i++) {
  renderWizards.appendChild(createWizard(generateWizards()[i]));
}

similarListElement.appendChild(renderWizards);

