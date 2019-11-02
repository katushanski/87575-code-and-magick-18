'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialogElement = document.querySelector('.setup');

// Открытие/закрытие окна настройки персонажа:
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialogElement.classList.remove('hidden');
};

var closePopup = function () {
  userDialogElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openDialogElement = document.querySelector('.setup-open');
openDialogElement.addEventListener('click', function () {
  openPopup();
  document.addEventListener('keydown', onPopupEscPress);
});

var openDialogIcon = openDialogElement.querySelector('.setup-open-icon');
openDialogIcon.addEventListener('focus', function () { // Маша, можно ли так записать? логика есть? я подсмотрела уже в демке, что можно проще, но поскольку изначально писала самостоятельно, чтобы разобраться, теперь интересно, можно ли так написать.
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });
});

var closeDialogElement = userDialogElement.querySelector('.setup-close');
closeDialogElement.addEventListener('click', function () {
  closePopup();
});

var setupForm = userDialogElement.querySelector('.setup-wizard-form');
var usernameInput = setupForm.querySelector('.setup-user-name');
usernameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

var formSubmitButton = setupForm.querySelector('.setup-submit');
formSubmitButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  setupForm.submit();
});

formSubmitButton.addEventListener('focus', function (evt) {
  evt.preventDefault();
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      setupForm.submit();
    }
  });
});

// Валидация ввода имени персонажа (взято из демки)
usernameInput.addEventListener('invalid', function (evt) {
  evt.preventDefault();
  if (usernameInput.validity.tooShort) {
    usernameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (usernameInput.validity.tooLong) {
    usernameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (usernameInput.validity.valueMissing) {
    usernameInput.setCustomValidity('Обязательное поле');
  } else {
    usernameInput.setCustomValidity('');
  }
});

// Кастомизация персонажа
var myWizardParams = {
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

// Изменение цвета мантии персонажа по нажатию
var setupPlayer = document.querySelector('.setup-player');
var setupMyWizard = setupPlayer.querySelector('.setup-wizard');
var coatColorMyWizard = setupMyWizard.querySelector('.wizard-coat');
var eyesColorMyWizard = setupMyWizard.querySelector('.wizard-eyes');
var fireballColorMyWizard = setupPlayer.querySelector('.setup-fireball-wrap');

var currentCoatIndex = 0;
var currentEyesIndex = 0;
var currentFireballIndex = 0;

var getWizardParam = function (colors, index) {
  index += 1;
  return colors[index];
};

coatColorMyWizard.addEventListener('click', function () {
  coatColorMyWizard.style.fill = getWizardParam(myWizardParams.COAT_COLORS, currentCoatIndex);
  setupPlayer.querySelector('input[name="coat-color"]').value = coatColorMyWizard.style.fill;
  if (currentCoatIndex <= myWizardParams.COAT_COLORS.length) {
    currentCoatIndex++;
  } else if (currentCoatIndex > myWizardParams.COAT_COLORS.length) {
    currentCoatIndex = 0;
  }
});

eyesColorMyWizard.addEventListener('click', function () {
  eyesColorMyWizard.style.fill = getWizardParam(myWizardParams.EYES_COLORS, currentEyesIndex);
  setupPlayer.querySelector('input[name="eyes-color"]').value = eyesColorMyWizard.style.fill;
  if (currentEyesIndex <= myWizardParams.EYES_COLORS.length) {
    currentEyesIndex++;
  } else if (currentEyesIndex > myWizardParams.EYES_COLORS.length) {
    currentEyesIndex = 0;
  }
});

fireballColorMyWizard.addEventListener('click', function () {
  fireballColorMyWizard.style.backgroundColor = getWizardParam(myWizardParams.FIREBALL_COLORS, currentFireballIndex);
  fireballColorMyWizard.querySelector('input[name="fireball-color"]').value = fireballColorMyWizard.style.backgroundColor;
  if (currentFireballIndex <= myWizardParams.FIREBALL_COLORS.length) {
    currentFireballIndex++;
  } else if (currentFireballIndex > myWizardParams.FIREBALL_COLORS.length) {
    currentFireballIndex = 0;
  }
});

// Создание армии магов

userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

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
