var fireballSize = 22;
var getFireballSpeed = function (left) {
  if (left = true) {
  	return 5;
  }

  return 2;
}; // Маша, как рефакторить эту часть? Можно ли написать left ? 5 : 2; ??

wizardSpeed = 3;
wizardWidth = 70;
getWizardHeight = function () {
  var wizardHeight = 1.337 * wizardWidth;
  return wizardHeight;
};

getWizardX = function (width) {
  return (width - wizardWidth) / 2;
};

getWizardY = function (height) {
  return height / 3;
};
