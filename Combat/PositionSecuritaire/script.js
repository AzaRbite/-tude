const questions = [
    // Banque de questions
    { question: "Quelle est la position correcte des pieds dans la position parlementaire ?", choices: ["Les pieds collés", "Les pieds aux largeurs des épaules à 45 degrés", "Les pieds serrés ensemble", "Un pied devant l'autre"], correct: "Les pieds aux largeurs des épaules à 45 degrés" },
    { question: "Où doivent se situer les mains dans la position défensive ?", choices: ["À la hauteur des genoux", "À la hauteur du torse ou plus haut", "À la hauteur des hanches", "Devant le visage"], correct: "À la hauteur du torse ou plus haut" },
    { question: "La hanche se retrouve à quel angle dans la position parlementaire ?", choices: ["90 degrés", "180 degrés", "45 degrés", "60 degrés"], correct: "45 degrés" },
    { question: "Dans quelle position le poids du corps est principalement réparti sur la plante des pieds ?", choices: ["Position parlementaire", "Position défensive", "Position neutre", "Position allongée"], correct: "Position défensive" },
    { question: "Quelle est la tenue correcte des pieds pour bien répartir le poids du corps ?", choices: ["Les pieds joints", "Les pieds aux largeurs des épaules", "Un pied derrière l'autre", "Les pieds écartés largement"], correct: "Les pieds aux largeurs des épaules" },
    { question: "À quelle hauteur doivent se trouver les mains dans la position parlementaire ?", choices: ["À hauteur de la ceinture", "Au-dessus de la tête", "Devant le visage", "À hauteur des épaules"], correct: "À hauteur de la ceinture" },
    { question: "Quel élément n'est pas important dans la position défensive ?", choices: ["Répartir le poids sur les talons", "Hanches à 45 degrés", "Mains à la hauteur du torse", "Poids sur la plante des pieds"], correct: "Répartir le poids sur les talons" },
    { question: "Quelle est la position des paumes dans la position défensive ?", choices: ["Vers l'intérieur", "Vers le sujet", "Vers le bas", "Vers le haut"], correct: "Vers le sujet" },
    { question: "Qu'est-ce qui est incorrect dans la position parlementaire ?", choices: ["Les pieds à 45 degrés", "Les mains à hauteur de ceinture", "Le talon dépasse la pointe du pied avant", "Poids bien réparti"], correct: "Le talon dépasse la pointe du pied avant" },
    { question: "Quelle est la différence principale entre les positions parlementaire et défensive concernant le poids ?", choices: ["Le poids repose sur les talons", "Le poids est réparti uniformément", "Le poids repose sur la plante des pieds", "Le poids repose sur un pied"], correct: "Le poids repose sur la plante des pieds" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questionOrder = shuffleArray(questions).slice(0, 5);

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';

    const questionData = questionOrder[index];
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = `<p>${questionData.question}</p><div class="choice-container"></div>`;

    const choiceContainer = questionEl.querySelector('.choice-container');
    const shuffledChoices = shuffleArray([...questionData.choices]);
    shuffledChoices.forEach(choice => {
        const choiceLabel = document.createElement('label');
        choiceLabel.innerHTML = `<input type="radio" name="question" value="${choice}"> ${choice}`;
        choiceLabel.addEventListener('click', () => checkAnswer(index, choice));
        choiceContainer.appendChild(choiceLabel);
    });

    quizDiv.appendChild(questionEl);

    const counterDiv = document.getElementById('question-counter');
    counterDiv.textContent = `Question ${index + 1}/${questionOrder.length}`;
}

function checkAnswer(index, selectedValue) {
    const questionData = questionOrder[index];
    const resultDiv = document.getElementById('results');
    const isCorrect = selectedValue === questionData.correct;

    if (isCorrect) {
        correctAnswers++;
        resultDiv.innerHTML = '<p style="color: green;">Bonne réponse! Passage à la question suivante...</p>';
    } else {
        incorrectAnswers++;
        resultDiv.innerHTML = '<p style="color: red;">Mauvaise réponse. Passage à la question suivante...</p>';
    }
    
    setTimeout(() => {
        resultDiv.innerHTML = '';
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    if (currentQuestionIndex < questionOrder.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const quizDiv = document.getElementById('quiz');
    const totalQuestions = questionOrder.length;
    quizDiv.innerHTML = `
        <h2>Quiz Terminé</h2>
        <p>Vous avez ${incorrectAnswers} erreurs sur ${totalQuestions} questions.</p>
        <button onclick="restartQuiz()">Recommencer</button>
        <button onclick="window.location.href='/Etude/Combat';">Retour à Combats</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    questionOrder = shuffleArray(questions).slice(0, 5);
    showQuestion(currentQuestionIndex);
}

window.onload = () => {
    const header = document.querySelector('header');
    const counterDiv = document.createElement('div');
    counterDiv.id = 'question-counter';
    counterDiv.style.position = 'absolute';
    counterDiv.style.top = '70%';
    counterDiv.style.transform = 'translateY(-50%)';
    counterDiv.style.right = '20px';
    counterDiv.style.color = '#ffffff';
    counterDiv.style.fontSize = '1.2em';
    counterDiv.style.fontWeight = 'bold';
    header.appendChild(counterDiv);

    showQuestion(currentQuestionIndex);
};
