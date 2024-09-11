const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');

const questions = [
    {
        question: "1. Beginners should focus on the bare basics instead of learning advanced strats early on.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "2. Everyone should learn tab crafting.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "3. RSG sessions are a good way of improving one's skill.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "4. English is a sufficient search craft language.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "5. You should warm up before each session.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "6. Most players don't utilize gold picks enough.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "7. Elo is an accurate way of determining a player's skill.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "8. Everyone should use boat eye.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "9. Calculators should have never been allowed.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "10. Pause Buffering should have never been prohibited.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "11. Forfeiting ranked matches is always a bad play.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "12. You should get backup gold blocks in RSG.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "13. Runners should keep an iron sword for blaze fights.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    },
    {
        question: "14. Everyone should use double grab.",
        answers: ["Agree", "Neutral", "Disagree", "Skip Statement"]
    }    
];

let currentQuestion = 0;
let userAnswers = [];

startButton.addEventListener('click', startQuiz);

function startQuiz() {
    userAnswers = []; // Reset user answers
    currentQuestion = 0; // Reset current question
    startScreen.style.display = 'none';
    questionScreen.style.display = 'block';
    showQuestion();
}
function showQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        const totalQuestions = questions.length;
        questionText.textContent = `${currentQuestion + 1}/${totalQuestions} ${question.question.split('. ')[1]}`;
        
        answerButtons.innerHTML = '';
        
        // Add the "Back" button
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.classList.add('back-button');
        backButton.addEventListener('click', goBack);
        answerButtons.appendChild(backButton);
        
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            if (answer === "Skip Statement") {
                button.classList.add('skip-button');
            }
            // Highlight the previously selected answer
            if (userAnswers[currentQuestion] === answer) {
                button.classList.add('selected');
            }
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtons.appendChild(button);
        });
    } else {
        showResults();
    }
}
function goBack() {
    if (currentQuestion === 0) {
        // If on the first question, go back to the main page
        questionScreen.style.display = 'none';
        startScreen.style.display = 'block';
    } else {
        // Go back to the previous question
        currentQuestion--;
        showQuestion();
    }
}
function selectAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    currentQuestion++; // Increment currentQuestion
    showQuestion(); // Show the next question
}
function showResults() {
    questionScreen.innerHTML = '';

    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results-container';

    const header = document.createElement('h2');
    header.textContent = "Review Your Answers";
    header.className = 'results-header';
    resultsContainer.appendChild(header);

    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';

    questions.forEach((question, index) => {
        const answerCard = document.createElement('div');
        answerCard.className = 'answer-card';

        const questionNumber = document.createElement('span');
        questionNumber.className = 'question-number';
        questionNumber.textContent = `Q${index + 1}`;

        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.textContent = question.question.split('. ')[1];

        const answerContent = document.createElement('div');
        answerContent.className = 'answer-content';

        const answerSymbol = document.createElement('span');
        answerSymbol.className = 'answer-symbol';
        
        switch (userAnswers[index]) {
            case "Agree":
                answerSymbol.textContent = "✅";
                answerSymbol.classList.add('agree');
                break;
            case "Neutral":
                answerSymbol.textContent = "➖";
                answerSymbol.classList.add('neutral');
                break;
            case "Disagree":
                answerSymbol.textContent = "❌";
                answerSymbol.classList.add('disagree');
                break;
            default:
                answerSymbol.textContent = "❓";
                answerSymbol.classList.add('skipped');
        }

        const importantCheckbox = document.createElement('input');
        importantCheckbox.type = 'checkbox';
        importantCheckbox.id = `important-${index}`;
        importantCheckbox.className = 'important-checkbox';

        const importantLabel = document.createElement('label');
        importantLabel.htmlFor = `important-${index}`;
        importantLabel.textContent = 'Mark as important';
        importantLabel.className = 'important-label';

        answerCard.appendChild(questionNumber);
        answerCard.appendChild(questionText);
        answerContent.appendChild(answerSymbol);
        answerContent.appendChild(importantCheckbox);
        answerContent.appendChild(importantLabel);
        answerCard.appendChild(answerContent);

        answersContainer.appendChild(answerCard);
    });

    resultsContainer.appendChild(answersContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Statements';
    backButton.className = 'back-button';
    backButton.addEventListener('click', () => {
        currentQuestion = questions.length - 1; // Set to the index of the last question
        questionScreen.innerHTML = ''; // Clear the results screen
        showQuestion(); // Show the last question
    });

    const chooseRunnersButton = document.createElement('button');
    chooseRunnersButton.textContent = 'Choose Runners';
    chooseRunnersButton.className = 'choose-runners-button';
    chooseRunnersButton.addEventListener('click', showRunnerSelection);

    buttonContainer.appendChild(backButton);
    buttonContainer.appendChild(chooseRunnersButton);

    resultsContainer.appendChild(buttonContainer);

    questionScreen.appendChild(resultsContainer);
}

function showRunnerSelection() {
    // Hide the question screen
    questionScreen.style.display = 'none';

    // Create and show the runner selection screen
    const runnerSelectionScreen = document.createElement('div');
    runnerSelectionScreen.id = 'runner-selection-screen';
    document.body.appendChild(runnerSelectionScreen);

    const title = document.createElement('h2');
    title.textContent = 'Choose Runners to Compare';
    runnerSelectionScreen.appendChild(title);

    // Add checkboxes for each runner (replace with actual runner names)
    const runners = ['Runner1', 'Runner2', 'Runner3', 'Runner4'];
    runners.forEach(runner => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = runner;
        checkbox.name = 'runner';
        checkbox.value = runner;

        const label = document.createElement('label');
        label.htmlFor = runner;
        label.textContent = runner;

        runnerSelectionScreen.appendChild(checkbox);
        runnerSelectionScreen.appendChild(label);
        runnerSelectionScreen.appendChild(document.createElement('br'));
    });

    // Add a button to select all runners
    const selectAllButton = document.createElement('button');
    selectAllButton.textContent = 'Select All Runners';
    selectAllButton.addEventListener('click', () => {
        runners.forEach(runner => {
            const checkbox = document.getElementById(runner);
            if (checkbox) {
                checkbox.checked = true; // Check the checkbox
            }
        });
    });
    runnerSelectionScreen.appendChild(selectAllButton);

    // Add a button to compare results
    const compareButton = document.createElement('button');
    compareButton.textContent = 'Compare Results';
    compareButton.addEventListener('click', () => {
        const selectedRunners = Array.from(document.querySelectorAll('input[name="runner"]:checked')).map(el => el.value);
        compareResults(selectedRunners);
    });
    runnerSelectionScreen.appendChild(compareButton);

    // Add a button to go back to the Review Your Answers page
    const backToReviewButton = document.createElement('button');
    backToReviewButton.textContent = 'Back to Review Your Answers';
    backToReviewButton.addEventListener('click', () => {
        // Clear the runner selection screen
        runnerSelectionScreen.innerHTML = ''; // Clear the current content
        showResults(); // Show the results screen
    });
    runnerSelectionScreen.appendChild(backToReviewButton);
}

function compareResults(selectedRunners) {
    // Implement the comparison logic here
    console.log('Comparing results with:', selectedRunners);
    // You would typically calculate the similarity between the user's answers and the selected runners' answers here
}