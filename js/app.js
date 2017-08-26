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
}

// loads available themes
function loadThemes () {

  // loop thru themes
  themes.map( (theme, currentIndex) => {
    createThemeOptions(theme, currentIndex);
  });

  onThemeSelect();

}

// adds themes to options of theme select menu
function createThemeOptions (theme, currentIndex) {

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

// hides starting view, shows question view
function openQuestionsView () {
  $('.starting-view').fadeOut(function () {

    $('.questions-view').fadeIn(function () {
      loadQuestions();
    });

  });
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
    setupAnswers(question, currentIndex);

  });

  listenForAnswer();

  listenForStartOverClick();

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

// setup question aswer options
function setupAnswers (question, currentIndex) {

  // if first question, show
  let questionClass = '';
  if (currentIndex !== 0){
    questionClass = ' hide';
  }

  $('.questions-block').append(`
    <form class="questions-form${questionClass}">

      <div class="row question-group">
        <div class="col-lg-6 answer-img">
          <img src="${question.imgSrc}" alt="${question.imgAlt}">
          <p id="js-hint-${currentIndex}" class="hide"><strong>Hint:</strong> <em>${question.hint}</em></p>
        </div>
        <div class="col-lg-6">
          ${setupAnswerBtns(currentIndex, question.wordOptions)}
        </div>
      </div>
    </form>
  `);

  // start hint timer
  startHintTimer(currentIndex);

}

// start timer for hint
function startHintTimer (currentIndex) {
  // show hint after 15 seconds
  setTimeout(function () {
    $(`#js-hint-${currentIndex}`).removeClass('hide');
  }, 5000);
}

// setup question answers
function setupAnswerBtns (questionIndex, wordOptions) {
  let radioOptions = '';

  wordOptions.map( (option, currentIndex) => {
    radioOptions = radioOptions + `<input type="button" id="${questionIndex}-${currentIndex}" value="${option}" class="btn btn-primary btn-lg btn-block">`;
  });

  return radioOptions;
}

// listen for answers
function listenForAnswer () {

  // wait for btn clicks on form objects
  $('.questions-block').click( event => {

    // save id and value of selected radio button
    const questionOption = event.target.id.toString().split('-');
    const selectedAnswer = event.target.value.toString();

    // correct answer
    const correctAnswer = questions[currentTheme][questionOption[0]].word.toString();

    // check answer
    if (selectedAnswer === correctAnswer){
      answeredCorrectly(questions[currentTheme][questionOption[0]], correctAnswer);
    }
    else {
      answeredIncorrectly(questions[currentTheme][questionOption[0]], event.target.id);
    }

  });

}

// when correct answer is selected
function answeredCorrectly (questionSet, selectedAnswer) {
  console.log(`${selectedAnswer} is correct :)`);
}

// when incorrect answer is selected
function answeredIncorrectly (questionSet, selectedAnswer) {

  // hide incorrect answer
  $(`#${selectedAnswer}`).prop('disabled', true);

}

// when user wants to start over
function listenForStartOverClick () {

  $('.startOverBtn').click(function(){
    location.reload();
  });

}

$(initApp)
