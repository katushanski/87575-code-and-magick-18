'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template') // нахожу шаблон, который буду копировать
    .content
    .querySelector('.setup-similar-item'); // нахожу элемент, в который буду вставлять похожих магов

var WIZARDS_AMOUNT = 4;

var wizardParams = {
  NAMES: ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
}; // функция-генератор случайных чисел

var generateWizards = function (amount) {
  var wizards = []; // создаю пустой массив, в который будут добавляться с помощью функции новые объекты-волшебники
  for (var i = 0; i < amount; i++) { // генерю amount объектов
    var wizard = {
      name: getRandomElement(wizardParams.NAMES) + ' ' + getRandomElement(wizardParams.SURNAMES),
      coatColor: getRandomElement(wizardParams.COAT_COLORS),
      eyesColor: getRandomElement(wizardParams.EYES_COLORS)
    };
    wizards.push(wizard); // .push добавляет объект в массив
  }
  return wizards; // результат функции - массив wizards, который содержит amount объектов-волшебников
};

var wizards = generateWizards(WIZARDS_AMOUNT); // сообщаю, что в массив мне нужно добавить объекты из generateWizards

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // клонирую шаблон

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // нахожу нужные элементы (querySelector плюс классы из задания) и задаю параметры волшебника
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizardsFragment) { // в качетве параметра волшебники, которых снегенировала
  var fragment = document.createDocumentFragment(); // создала фрагмент

  wizardsFragment.forEach(function (wizard) {
    fragment.appendChild(createWizard(wizard)); // добавила во фрагмент элемент волшбеника
  });

  // или аналогично с for
  // for (var i = 0; i < wizards.length; i++) {
  //     fragment.appendChild(createWizard(wizards[i]));
  // }

  similarListElement.appendChild(fragment); // добавила фрагмент в разметку
};

renderWizards(wizards);
