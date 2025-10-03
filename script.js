// Quiz State
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let isReviewMode = false;

// DOM Elements
const questionNumberEl = document.getElementById('question-number');
const questionTitleEl = document.getElementById('question-title');
const answerOptionsEl = document.getElementById('answer-options');
const quizContentEl = document.getElementById('quiz-content');

const reviewNavEl = document.getElementById('review-nav');
const prevQuestionBtn = document.getElementById('prev-question-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');

const reviewQuizBtn = document.getElementById('review-quiz-btn');


const resultScreenEl = document.getElementById('result-screen');
const scoreNumberEl = document.getElementById('score-number');
const percentageEl = document.getElementById('percentage');
const restartButton = document.querySelector('.restart-button');

const modalOverlayEl = document.getElementById('modal-overlay');
const modalTitleEl = document.getElementById('modal-title');
const modalTextEl = document.getElementById('modal-text');
const continueButton = document.querySelector('.continue-button');
const clappingSoundEl = document.getElementById('clapping-sound');

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    restartButton.addEventListener('click', restartQuiz);
    continueButton.addEventListener('click', handleContinue);
    reviewQuizBtn.addEventListener('click', startReviewMode);
    prevQuestionBtn.addEventListener('click', () => navigateReview(-1));
    nextQuestionBtn.addEventListener('click', () => navigateReview(1));

    loadQuestion();
});

// Load current question
function loadQuestion(reviewing = false) {
    const question = quizQuestions[currentQuestion];
    
    // Update question content
    questionNumberEl.textContent = `Question ${currentQuestion + 1}`;
    questionTitleEl.textContent = question.question;
    
    // Clear and populate answer options
    answerOptionsEl.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = option;

        if (reviewing) {
            button.disabled = true;
            const userAnswer = userAnswers[currentQuestion];
            const correctAnswer = question.correctAnswer;

            if (option === correctAnswer) {
                button.classList.add('correct');
            } else if (option === userAnswer) {
                button.classList.add('incorrect');
            }
        } else {
            button.addEventListener('click', () => handleAnswerClick(option));
        }

        answerOptionsEl.appendChild(button);
    });

    reviewNavEl.style.display = reviewing ? 'flex' : 'none';
}

// Handle answer selection
function handleAnswerClick(selectedAnswer) {
    userAnswers[currentQuestion] = selectedAnswer;
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score++;
    }
    
    showModal(isCorrect);
}

// Show feedback modal
function showModal(correct) {
    modalTitleEl.textContent = correct ? "Correct!" : "Not quite";
    modalTextEl.textContent = correct 
        ? "Great job! You got it right." 
        : "That's not the right answer. Try the next one.";
    
    modalOverlayEl.style.display = 'flex';
}

// Handle continue button
function handleContinue() {
    // Hide modal
    modalOverlayEl.style.display = 'none';
    
    // Move to next question or show results
    if (currentQuestion < quizQuestions.length - 1 && !isReviewMode) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults(true);
    }
}

// Show results screen
function showResults(playAnimations = false) {
    // Hide quiz content
    quizContentEl.style.display = 'none';
    
    // Show result screen
    resultScreenEl.style.display = 'flex';
    
    // Update score
    const percentage = Math.round((score / quizQuestions.length) * 100);
    scoreNumberEl.textContent = `${score} / ${quizQuestions.length}`;
    percentageEl.textContent = `${percentage}%`;

    if (playAnimations) {
        // Trigger confetti animation
        triggerConfetti();

        // Play clapping sound
        if (clappingSoundEl) {
            clappingSoundEl.currentTime = 0;
            clappingSoundEl.play();
        }
    }
}

// Restart quiz
function restartQuiz() {
    // Reset state
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    // Hide result screen
    resultScreenEl.style.display = 'none';
    
    // Show quiz content
    quizContentEl.style.display = 'flex';
    
    // Load first question
    loadQuestion();
}

// Start review mode
function startReviewMode() {
    isReviewMode = true;
    currentQuestion = 0;

    resultScreenEl.style.display = 'none';
    quizContentEl.style.display = 'flex';

    loadQuestion(true);
    updateReviewNav();
}

// Navigate through questions in review mode
function navigateReview(direction) {
    // If on the last question and clicking "Next", go to results
    if (currentQuestion === quizQuestions.length - 1 && direction === 1) {
        isReviewMode = false; // Exit review mode
        showResults(false);
        return;
    }

    currentQuestion += direction;
    loadQuestion(true);
    updateReviewNav();
}

// Update review navigation buttons (enable/disable)
function updateReviewNav() {
    prevQuestionBtn.disabled = currentQuestion === 0;
    // The "Next" button is always enabled in review mode.
    // It will either go to the next question or back to the results.
    nextQuestionBtn.disabled = false;
    // Ensure the button text is always "Next" during review.
    nextQuestionBtn.textContent = "Next";
}

// Confetti animation logic
function triggerConfetti() {
    const count = 200,
      defaults = {
        origin: { y: 0.7 },
      };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
}