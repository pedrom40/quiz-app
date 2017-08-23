'use strict';

// init themes array
const themes = ['Colors', 'Animals', 'Shapes'];
let currentTheme = undefined;
const questions = [
  [
    {
      word:'Blue',
      wordOptions: ['Blue', 'Bloo', 'Blu', 'Bluo'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Blue Rectangle',
      hint: 'There\'s an "E" in the word'
    },
    {
      word:'Orange',
      wordOptions: ['Oranje', 'Orang', 'Orange', 'Orenge'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Orange Rectangle',
      hint: 'There\'s an "E" in the word'
    }
  ],
  [
    {
      word:'Dog',
      wordOptions: ['Dog', 'Dawg', 'Dug', 'Daag'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Dog Picture',
      hint: 'There\'s an "O" in the word'
    },
    {
      word:'Zebra',
      wordOptions: ['Zebrah', 'Zeebra', 'Zebru', 'Zebra'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Orange Rectangle',
      hint: 'There is only one "E"'
    }
  ],
  [
    {
      word:'Circle',
      wordOptions: ['Curcle', 'Circle', 'Sircle', 'Circel'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Circle Picture',
      hint: 'There\'s an "I" in the word'
    },
    {
      word:'Rectangle',
      wordOptions: ['Rectangle', 'Rectangl', 'Wrectangle', 'Rectangel'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Rectangle Rectangle',
      hint: 'There are two "E"\'s'
    }
  ],
];

// calls all other functions
function initApp () {
  loadThemes();
  onThemeSelect();
}

// loads available themes
function loadThemes () {

  // loop thru themes
  themes.map( (theme, currentIndex) => {
    createThemeOptions(theme, currentIndex);
  });

}

// hides starting view, shows question view
function openQuestionsView () {
  $('.starting-view').fadeOut('fast');
  $('.questions-view').fadeIn('fast');

  loadQuestions();
}

// load current set of questions
function loadQuestions () {

  // setup question HTML
  questions[currentTheme].map( (question, currentIndex) => {

    // setup step indicator
    setupStepIndicator(currentIndex);

    // setup main question text
    setupQuestionText();

    // setup images and answers
    setupAnswers(question);

  });

}

// setup step indicator
function setupStepIndicator (currentIndex) {
  $('.step-indicator').append(`
    <li>${currentIndex + 1}</li>
  `);
}

// setup question
function setupQuestionText () {
  $('.questions-view h3 span').text(themes[currentTheme].slice(0, -1));
}

// setup question answers
function setupAnswerRadioBtns (wordOptions) {
  let radioOptions = '';

  wordOptions.map( (option, currentIndex) => {
    radioOptions = radioOptions + `<div class="radio"><label><input type="radio" name="answer" id="${option}${currentIndex}" value="${option}"> ${option}</label></div>`;
  });

  return radioOptions;
}

// setup question aswer options
function setupAnswers (question) {
  $('.questions-block').append(`
    <form class="questions-form">

      <div class="question-group">
        <div class="answer-img">
          <img src="${question.imgSrc}" alt="${question.imgAlt}">
          <p>${question.hint}</p>
        </div>
        ${setupAnswerRadioBtns(question.wordOptions)}
        <div class="submit-btn">
          <input type="submit" value="Select" class="btn btn-primary">
        </div>
      </div>

    </form>
  `);
}

// adds themes to options of theme select menu
function createThemeOptions(theme, currentIndex){

  // populate theme select menu
  $('#selectTheme').append(`
    <option value="${currentIndex}">${theme}</option>
  `);

}

// listens for a theme to be selected
function onThemeSelect () {
  $('#selectTheme').on('change', event => {
    currentTheme = event.target.value;

    openQuestionsView();

  });
}

$(initApp)
