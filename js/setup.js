'use strict';

var setup = document.querySelector('.setup');
var setupOpenControl = document.querySelector('.setup-open');
var setupCloseControl = document.querySelector('.setup-close');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');


setupOpenControl.addEventListener('click', openSetup);
setupCloseControl.addEventListener('click', closeSetup);
wizardCoat.addEventListener('click', function() {
  this.style.fill = wizardData.coatColor[randomNum(wizardData.coatColor)];
});

wizardEyes.addEventListener('click', function() {
  this.style.fill = wizardData.eyeColor[randomNum(wizardData.eyeColor)];
});

fireball.addEventListener('click', function() {
  this.style.background = wizardData.fireballColor[randomNum(wizardData.fireballColor)];
});

function openSetup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closeSetup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var onPopupEscPress = function(evt) {
  if (evt.keyCode === 27) {
    closeSetup();
  }
}

var onEnterPressOpenPopup = function(evt) {
  if (evt.keyCode === 13) {
    openSetup();
  }
}



setupOpenControl.addEventListener('keydown', onEnterPressOpenPopup);


var wizardData = {
  firstNames: ['Иван', 
               'Хуан Себастьян', 
               'Мария', 
               'Кристоф', 
               'Виктор', 
               'Юлия', 
               'Люпита', 
               'Вашингтон'],
  lastNames: ['да Марья', 
              'Верон', 
              'Мирабелла', 
              'Вальц', 
              'Онопко', 
              'Топольницкая', 
              'Нионго', 
              'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 
              'rgb(241, 43, 107)', 
              'rgb(146, 100, 161)', 
              'rgb(56, 159, 117)', 
              'rgb(215, 210, 55)', 
              'rgb(0, 0, 0)'],
  eyeColor: ['black', 
             'red', 
             'blue', 
             'yellow', 
             'green'],
  fireballColor: ['#ee4830',
                  '#30a8ee',
                  '#5ce6c0',
                  '#e848d5',
                  '#e6e848']
}

var wizardCount = 4;
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardElement = document.querySelector('.setup-similar-list');
var wizards = generateWizards(wizardData);
wizardElement.appendChild(renderWizards(wizards));

function randomNum(arr) {
  return Math.floor(Math.random() * arr.length);
}

function generateWizards(wizardData) {
  var i;
  var firstNames = wizardData.firstNames.slice();
  var lastNames = wizardData.lastNames.slice();
  var coatColor = wizardData.coatColor.slice();
  var eyeColor = wizardData.eyeColor.slice();
  var wizards = [];
  var wizard;

  for (i = 0; i < wizardCount; i ++) {
    wizard = {};
    wizard.name = generateWizardName();
    wizard.coatColor = genElement(coatColor, randomNum(coatColor));
    wizard.eyeColor = genElement(eyeColor, randomNum(eyeColor));
    wizards.push(wizard);
  }

  function generateWizardName() {
    var firstName = genElement(firstNames, randomNum(firstNames));
    var lastName = genElement(lastNames, randomNum(lastNames));
    return firstName + ' ' + lastName;
  }

  function genElement(arr, index) {
    var name = arr[index];
    arr.splice(index, 1);
    return name;
  }
  return wizards;
}

function renderWizard (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
}

function renderWizards(wizards) {
  var fragment = document.createDocumentFragment();
  var i = 0;
  for (; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
}





