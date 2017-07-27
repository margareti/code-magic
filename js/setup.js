'use strict';

var setupOpenControl = document.querySelector('.setup-open');
setupOpenControl.addEventListener('click', openSetup);

var setupCloseControl = document.querySelector('.setup-close');
setupCloseControl.addEventListener('click', closeSetup);

function openSetup() {
  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');
}

function closeSetup() {
  var setup = document.querySelector('.setup');
  setup.classList.add('hidden');
}

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
             'green']
}

var wizardCount = 4;
var wizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizardElement = document.querySelector('.setup-similar-list');
var wizards = generateWizards(wizardData);
wizardElement.appendChild(renderWizards(wizards));

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

  function randomNum(arr) {
    return Math.floor(Math.random() * arr.length);
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


var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');



