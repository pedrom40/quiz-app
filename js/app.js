'use strict';

// init themes, questions and tries variables
const themes = ['Colors', 'Animals', 'Shapes'];
let currentTheme = undefined;
const questions = [
  [
    {
      word:'Blue',
      wordOptions: ['Blue', 'Bloo', 'Blu', 'Bluo'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Blue Rectangle',
      hint: 'There\'s an "E" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Orange',
      wordOptions: ['Oranje', 'Orang', 'Orange', 'Orenge'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Orange Rectangle',
      hint: 'There\'s an "E" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Brown',
      wordOptions: ['Browhn', 'Bown', 'Broun', 'Brown'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Brown Rectangle',
      hint: 'There are 5 letters in the word',
      answered:false,
      correct:false
    },
    {
      word:'Green',
      wordOptions: ['Grean', 'Green', 'Greun', 'Grenn'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Green Rectangle',
      hint: 'There\'s only one "N" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Yellow',
      wordOptions: ['Yellow', 'Yello', 'Yeloo', 'Yelow'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Yellow Rectangle',
      hint: 'There are 2 "L"\'s in the word',
      answered:false,
      correct:false
    }
  ],
  [
    {
      word:'Dog',
      wordOptions: ['Dog', 'Dawg', 'Dug', 'Daag'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Dog Picture',
      hint: 'There\'s an "O" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Zebra',
      wordOptions: ['Zebrah', 'Zeebra', 'Zebru', 'Zebra'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Zebra Picture',
      hint: 'There is only one "E" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Giraffe',
      wordOptions: ['Geraffe', 'Girafe', 'Giraffe', 'Jiraffe'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Giraffe Picture',
      hint: 'There are 2 "F"\'s in the word',
      answered:false,
      correct:false
    },
    {
      word:'Elephant',
      wordOptions: ['Elephant', 'Elefant', 'Elepant', 'Eliphant'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Elephant Picture',
      hint: 'There are no "F"\'s in the word',
      answered:false,
      correct:false
    },
    {
      word:'Horse',
      wordOptions: ['Horsee', 'Horce', 'Hourse', 'Horse'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Horse Picture',
      hint: 'There is only one "E"s in the word',
      answered:false,
      correct:false
    }
  ],
  [
    {
      word:'Circle',
      wordOptions: ['Curcle', 'Circle', 'Sircle', 'Circel'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Circle Picture',
      hint: 'There\'s an "I" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Rectangle',
      wordOptions: ['Rectangle', 'Rectangl', 'Wrectangle', 'Rectangel'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Rectangle Rectangle',
      hint: 'There are two "E"\'s',
      answered:false,
      correct:false
    },
    {
      word:'Square',
      wordOptions: ['Sqware', 'Square', 'Sqare', 'Squareh'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Square Rectangle',
      hint: 'There is a "U" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Diamond',
      wordOptions: ['Diamund', 'Diamand', 'Diemond', 'Diamond'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Diamond Rectangle',
      hint: 'There is an "A" and an "O" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Hexagon',
      wordOptions: ['Hexigon', 'Hexagan', 'Hexagon', 'Hexagone'],
      imgSrc: 'http://via.placeholder.com/250x200',
      imgAlt: 'Hexagon Rectangle',
      hint: 'There is not an "I" in the word',
      answered:false,
      correct:false
    }
  ]
];
let tries = 0;

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

  // activate theme select menu
  $('#selectTheme').attr('disabled', false);

  // listen for theme selection
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

  // wait for an answer
  listenForAnswer();

  // wait for continue click
  onContinueBtnClick();

  // listen for starting over click
  listenForStartOverClick();

}

// setup step indicator
function setupStepIndicator (currentIndex) {
  $('.step-indicator').append(`
    <li>${currentIndex + 1}</li>
  `);

  $('.step-indicator li:first-child').addClass('current');
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
    <form id="question${currentIndex}" class="questions-form${questionClass}">

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

    if (event.target.type === 'button') {

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

    }

  });

}

// when correct answer is selected
function answeredCorrectly (questionSet, selectedAnswer) {

  // open modal, set content to true for correct answer
  $('#answerModal').modal().show(function () {
    setModalContent(true, selectedAnswer);
  });

  // track answer
  trackAnswers(true, questionSet, selectedAnswer);

}

// when incorrect answer is selected
function answeredIncorrectly (questionSet, selectedAnswer) {

  // open modal, set content to true for correct answer
  $('#answerModal').modal().show(function () {
    setModalContent(false, selectedAnswer);
  });

  // disable incorrect answer
  $(`#${selectedAnswer}`).prop('disabled', true);

  // track answer
  trackAnswers(false, questionSet, selectedAnswer);

}

// set content for modal based on answer
function setModalContent (answer, selectedAnswer) {

  // correct answer options
  const correctAnswerTitles = ["You're Awesome!", "Nailed It!", "You're Too Good!", "Can't Fool You!"];

  // set incorrect answer options
  const incorrectAnswerTitles = ["So Close!", "Not Quite, Try Again", "I'll Pretend I Didn't See That...", "Really? Is That Your Answer?"];

  // if correct answer
  if (answer) {

    // setup correct content
    $('.modal-title').html(correctAnswerTitles[getRandomNumber(correctAnswerTitles.length)]);
    $('.modal-body').html(`<p><strong>"${selectedAnswer}" is correct!</strong> Move on to the next question and keep up the good work!</p>`);
    $('.js-continue-btn').attr('value', 'Next Question');

    // reset tries count
    tries = 0;

  }

  // if wrong answer
  else {

    // add a try
    tries += 1;

    // setup incorrect content
    $('.modal-title').html(incorrectAnswerTitles[getRandomNumber(incorrectAnswerTitles.length)]);
    $('.modal-body').html(`<p>Sorry, <strong>"${$('#'+selectedAnswer).val()}"</strong> is not correct. Shake it off and give it another shot!</p>`);

    // if they can try again
    if (tries <= 2) {
      $('.js-continue-btn').attr('value', 'Try Again');
    }

    // if they're out of tries
    else {

      // reset tries
      tries = 0;

      // setup next question
      $('.js-continue-btn').attr('value', 'Next Question');
    }

  }

}

// mark answered questions and if they were correct or wrong
function trackAnswers (answer, questionSet, selectedAnswer) {

  // mark question as answered
  questionSet.answered = true;

  if (answer){
    questionSet.correct = true;
  }
  else {
    questionSet.correct = false;
  }

  //console.log(questionSet);

}

// listen for click on modal btn
function onContinueBtnClick () {

  $('.js-continue-btn').click( event => {

    if (event.target.value === 'Next Question') {
      showNextQuestion();
    }

  });

}

// shows the next question
function showNextQuestion () {

  // hide all questions
  $('.questions-form').addClass('hide');

  // next question index
  let nextIndex = getNextQuestionIndex();

  // show it
  $(`#question${nextIndex}`).removeClass('hide');

}

// get the next question's index to show
function getNextQuestionIndex () {

  // loop thru questions block
  for (var i=0; i < questions[currentTheme].length; i++) {

    // if current question is unanswered
    if (!questions[currentTheme][i].answered) {

      // return the index
      return i;

    }

  }

  // all questions are answered
  quizComplete();

}

// when all quiz questions answered
function quizComplete () {

  console.log('all questions answered');

}

// when user wants to start over
function listenForStartOverClick () {

  $('.startOverBtn').click(function(){
    location.reload();
  });

}

// generate random number
function getRandomNumber (rangeNumber) {
  return Math.floor(Math.random() * rangeNumber);
}

$(initApp)
