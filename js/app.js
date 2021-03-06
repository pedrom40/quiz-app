'use strict';

// init themes, questions and tries variables
const themes = ['Colors', 'Animals', 'Shapes'];
let currentTheme = undefined;
const questions = [
  [
    {
      word:'Blue',
      wordOptions: ['Blue', 'Bloo', 'Blu', 'Bluo'],
      imgSrc: './img/color-blue.gif',
      imgAlt: 'Blue Rectangle',
      hint: 'There\'s an "E" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Orange',
      wordOptions: ['Oranje', 'Orang', 'Orange', 'Orenge'],
      imgSrc: './img/color-orange.gif',
      imgAlt: 'Orange Rectangle',
      hint: 'There\'s an "E" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Brown',
      wordOptions: ['Browhn', 'Bown', 'Broun', 'Brown'],
      imgSrc: './img/color-brown.gif',
      imgAlt: 'Brown Rectangle',
      hint: 'There are 5 letters in the word',
      answered:false,
      correct:false
    },
    {
      word:'Green',
      wordOptions: ['Grean', 'Green', 'Greun', 'Grenn'],
      imgSrc: './img/color-green.gif',
      imgAlt: 'Green Rectangle',
      hint: 'There\'s only one "N" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Yellow',
      wordOptions: ['Yellow', 'Yello', 'Yeloo', 'Yelow'],
      imgSrc: './img/color-yellow.gif',
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
      imgSrc: './img/animal-dog.jpg',
      imgAlt: 'Dog Picture',
      hint: 'There\'s an "O" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Zebra',
      wordOptions: ['Zebrah', 'Zeebra', 'Zebru', 'Zebra'],
      imgSrc: './img/animal-zebra.jpg',
      imgAlt: 'Zebra Picture',
      hint: 'There is only one "E" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Giraffe',
      wordOptions: ['Geraffe', 'Girafe', 'Giraffe', 'Jiraffe'],
      imgSrc: './img/animal-giraffe.jpg',
      imgAlt: 'Giraffe Picture',
      hint: 'There are 2 "F"\'s in the word',
      answered:false,
      correct:false
    },
    {
      word:'Elephant',
      wordOptions: ['Elephant', 'Elefant', 'Elepant', 'Eliphant'],
      imgSrc: './img/animal-elephant.jpg',
      imgAlt: 'Elephant Picture',
      hint: 'There are no "F"\'s in the word',
      answered:false,
      correct:false
    },
    {
      word:'Horse',
      wordOptions: ['Horsee', 'Horce', 'Hourse', 'Horse'],
      imgSrc: './img/animal-horse.jpg',
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
      imgSrc: './img/shape-circle.gif',
      imgAlt: 'Circle Picture',
      hint: 'There\'s an "I" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Rectangle',
      wordOptions: ['Rectangle', 'Rectangl', 'Wrectangle', 'Rectangel'],
      imgSrc: './img/shape-rectangle.gif',
      imgAlt: 'Rectangle Rectangle',
      hint: 'There are two "E"\'s',
      answered:false,
      correct:false
    },
    {
      word:'Square',
      wordOptions: ['Sqware', 'Square', 'Sqare', 'Squareh'],
      imgSrc: './img/shape-square.gif',
      imgAlt: 'Square Rectangle',
      hint: 'There is a "U" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Diamond',
      wordOptions: ['Diamund', 'Diamand', 'Diemond', 'Diamond'],
      imgSrc: './img/shape-diamond.gif',
      imgAlt: 'Diamond Rectangle',
      hint: 'There is an "A" and an "O" in the word',
      answered:false,
      correct:false
    },
    {
      word:'Hexagon',
      wordOptions: ['Hexigon', 'Hexagan', 'Hexagon', 'Hexagone'],
      imgSrc: './img/shape-hexagon.gif',
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

    initQuestionsView();
    openQuestionsView();

  });
}

// resets HTML in questions view to start fresh
function initQuestionsView () {

  $('.questions-view').html(`
    <ul class="step-indicator"></ul>

    <h3>Choose the correct spelling of this <span></span>:</h3>

    <section class="questions-block">

    </section>

    <div class="quick-links">
      <a href="#" class="startOverBtn">Start Over</a>
    </div>
  `);

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
  else if (currentIndex === 0){
    startHintTimer(currentIndex);
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

}

// start timer for hint
function startHintTimer (currentIndex) {

  // show hint after 15 seconds
  setTimeout(function () {
    $(`#js-hint-${currentIndex}`).removeClass('hide');
  }, 10000);

}

// setup question answers
function setupAnswerBtns (questionIndex, wordOptions) {
  let radioOptions = '';

  // shuffle answers
  shuffleWordOptions(wordOptions);

  // loop through each asnwer
  wordOptions.map( (option, currentIndex) => {
    radioOptions = radioOptions + `<input type="button" id="${questionIndex}-${currentIndex}" value="${option}" class="btn btn-primary btn-lg btn-block">`;
  });

  return radioOptions;
}

// shuffle word options array
function shuffleWordOptions(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
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

  // track answer
  trackAnswers(true, questionSet, selectedAnswer);

  // open modal, set content to true for correct answer
  $('#answerModal').modal().show(function () {
    setModalContent(true, selectedAnswer);
  });

}

// when incorrect answer is selected
function answeredIncorrectly (questionSet, selectedAnswer) {

  // track answer
  trackAnswers(false, questionSet, selectedAnswer);

  // open modal, set content to true for correct answer
  $('#answerModal').modal().show(function () {
    setModalContent(false, selectedAnswer);
  });

  // disable incorrect answer
  $(`#${selectedAnswer}`).prop('disabled', true);
  $(`#${selectedAnswer}`).addClass('btn-danger');

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

    // see if this is the last question
    if (lastQuestion()) {
      $('.js-continue-btn').attr('value', 'See Results');
    }
    else {
      $('.js-continue-btn').attr('value', 'Next Question');
    }

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

      // see if this is the last question
      if (lastQuestion()) {
        $('.js-continue-btn').attr('value', 'See Results');
      }
      else {
        $('.js-continue-btn').attr('value', 'Next Question');
      }

    }

  }

}

// check if we're on the last question
function lastQuestion () {
  return questions[currentTheme][questions[currentTheme].length - 1].answered;
}

// mark answered questions and if they were correct or wrong
function trackAnswers (correctAnswer, questionSet, selectedAnswer) {

  // mark question as answered
  questionSet.answered = true;

  if (correctAnswer){
    questionSet.correct = true;
  }
  else {
    questionSet.correct = false;
  }

}

// listen for click on modal btn
function onContinueBtnClick () {

  $('.js-continue-btn').click( event => {

    if (event.target.value === 'Next Question' || event.target.value === 'See Results') {
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

  // remove current class from all li's
  resetStepIndicator();

  // loop thru questions block
  for (var i=0; i < questions[currentTheme].length; i++) {

    // if current question is unanswered
    if (!questions[currentTheme][i].answered) {

      // add current class to this question
      setCurrentStepIndicator(i);

      // return the index
      return i;

    }
    else {

      // if correct answer
      if (questions[currentTheme][i].correct) {

        // add correct class to this question
        setCorrectStepIndicator(i);

      }
      else {

        // add correct class to this question
        setIncorrectStepIndicator(i);

      }

    }

  }

  // all questions are answered
  quizComplete();

}

// removes 'current' class from all li's
function resetStepIndicator () {
  $('.step-indicator li').removeClass('current');
}

// sets current class to li
function setCurrentStepIndicator (indexToSet) {

  $(`.step-indicator li:nth-child(${indexToSet+1})`).addClass('current');

  // reset class
  startHintTimer(indexToSet);

}

// sets correct class to li
function setCorrectStepIndicator (indexToSet) {
  $(`.step-indicator li:nth-child(${indexToSet+1})`).addClass('correct');
}

// set incorrect class to li
function setIncorrectStepIndicator (indexToSet) {
  $(`.step-indicator li:nth-child(${indexToSet+1})`).addClass('incorrect');
}

// when all quiz questions answered
function quizComplete () {

  // calculate total points
  let finalResults = getQuizResults(currentTheme);

  // if passed
  if (finalResults[3]) {
    setPassedResultContent(finalResults);
  }
  else {
    setFailedResultContent(finalResults);
  }

  // add btns for other quizzes
  createStartNextQuizBtns();

  // show feedback view
  $('.questions-view').fadeOut(function(){
    $('.feedback-view').fadeIn();
  });

}

// set passed msg
function setPassedResultContent (finalResults) {
  $('.js-results').html(`
    <h3>YOU PASSED!</h3>
    <p>
      You got ${finalResults[1]} out of the ${finalResults[0]} answers right!
      You're great at spelling ${themes[currentTheme]} correctly. Keep up the good work with our next quiz.
      Choose another theme below to see if you can pass them all.
    </p>
  `);
}

// set failed msg
function setFailedResultContent (finalResults) {
  $('.js-results').html(`
    <h3>BETTER LUCK NEXT TIME!</h3>
    <p>
      You got ${finalResults[1]} out of the ${finalResults[0]} answers correct. That was a good effort,
      slow down and try the quiz again, or choose a different quiz and come back to it later.
      Don't give up! You'll get better at ${themes[currentTheme]} with more practice.
    </p>
  `);
}

// create quiz start btns at end of current quiz
function createStartNextQuizBtns () {

  // start fresh
  $('.js-other-quiz-links').html('');

  themes.map( (theme, index) => {

    let quizAttempted = hasQuizBeenAttempted(index);
    let quizResults = getQuizResults(index);
    let quizPassed = quizResults[3];

    // add checkmark to btn
    if (quizAttempted && quizPassed) {
      $('.js-other-quiz-links').append(`
        <a href="#" id="quiz${index}" class="btn btn-success js-start-quiz-btn">${theme} Quiz <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></a>
      `);
    }

    // add X to btn
    else if (quizAttempted && !quizPassed) {
      $('.js-other-quiz-links').append(`
        <a href="#" id="quiz${index}" class="btn btn-danger js-start-quiz-btn">${theme} Quiz <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
      `);
    }

    // no indicator icons
    else {
      $('.js-other-quiz-links').append(`
        <a href="#" id="quiz${index}" class="btn btn-default js-start-quiz-btn">Start ${theme} Quiz</a>
      `);
    }

  });

  listenForStartNewQuiz();

}

// see if quiz has been attempted
function hasQuizBeenAttempted (quizIndex) {

  // initially set response to false
  let quizAttempted = false;

  // loop thru quiz checking answered property
  questions[quizIndex].map( question => {

    // for correct answers, add 1
    if (question.answered) {
      quizAttempted = true;
    }

  });

  return quizAttempted;

}

// get total of questions answered correctly in points
function getQuizResults (quizIndex) {

  // result vars
  let totalQuestions = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let finalResult = false;

  // check each question
  questions[quizIndex].map( question => {

    // step total questions
    totalQuestions += 1;

    // for correct answers, add 1
    if (question.correct) {
      correctAnswers +=1;
    }

    // for incorrect answers, add 1
    else {
      incorrectAnswers +=1;
    }

  });

  // calculate final results
  let pointsPerQuestion = 100 / totalQuestions;
  let earnedPoints = correctAnswers * pointsPerQuestion;
  let finalGrade = (earnedPoints / 100) * 100;

  if (finalGrade >= 70) {
    finalResult = true;
  }

  return [totalQuestions, correctAnswers, incorrectAnswers, finalResult];

}

// listen for start new quiz request
function listenForStartNewQuiz () {

  $('.js-start-quiz-btn').click(function(){

    // update current theme index
    currentTheme = Number(event.target.id.toString().replace('quiz', ''));

    // reset step indicator
    $('.step-indicator').html('');

    // show feedback view
    $('.feedback-view').fadeOut(function(){
      $('.questions-view').fadeIn();
    });

    resetQuiz(currentTheme);
    initQuestionsView();
    openQuestionsView();
  });

}

// reset quiz properties
function resetQuiz (quizIndex) {

  // loop thru each question
  questions[quizIndex].map( question => {

    // reset answered and correct values
    question.answered = false;
    question.correct = false;

  });

  console.log(questions[quizIndex]);

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
