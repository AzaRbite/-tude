const questions = [
    {
        question: "Quelle couleur correspond à 'Inconscience du danger'?",
        choices: ["Blanc", "Jaune", "Rouge", "Orange", "Noir"],
        correct: "Blanc"
    },
    {
        question: "Quel est l'état d'esprit correspondant à la description : 'Détendu et vigilant'?",
        choices: ["Jaune", "Blanc", "Rouge", "Orange", "Noir"],
        correct: "Jaune"
    },
    {
        question: "Quel état d'esprit est associé à la couleur 'Rouge'?",
        choices: ["Lutte", "Inconscience du danger", "Panique", "Détendu", "Préparation au danger"],
        correct: "Lutte"
    },
    {
        question: "Quelle couleur est associée à 'Préparation au danger'?",
        choices: ["Orange", "Rouge", "Jaune", "Blanc", "Noir"],
        correct: "Orange"
    },
    {
        question: "Que signifie l'état d'esprit 'Noir'?",
        choices: ["Panique", "Préparation au danger", "Détendu", "Lutte", "Inconscience du danger"],
        correct: "Panique"
    },
    {
        question: "Quel est l'état d'esprit pour 'Réaction en vue de maîtriser la menace'?",
        choices: ["Rouge", "Orange", "Noir", "Jaune", "Blanc"],
        correct: "Rouge"
    },
    {
        question: "Quelle couleur symbolise la 'Lutte'?",
        choices: ["Rouge", "Jaune", "Blanc", "Noir", "Orange"],
        correct: "Rouge"
    },
    {
        question: "Quel est le nom associé à la couleur 'Blanc'?",
        choices: ["Inconscience du danger", "Détendu", "Préparation au danger", "Lutte", "Panique"],
        correct: "Inconscience du danger"
    },
    {
        question: "Quelle est la description pour 'Orange'?",
        choices: ["Préparation au danger", "Panique", "Inconscience du danger", "Lutte", "Détendu"],
        correct: "Préparation au danger"
    },
    {
        question: "Quel est l'état d'esprit pour 'Panique'?",
        choices: ["Noir", "Rouge", "Orange", "Jaune", "Blanc"],
        correct: "Noir"
    }
];

let currentQuestionIndex = 0;
let questionOrder = generateRandomOrder(questions.length);

function generateRandomOrder(length) {
    let order = Array.from(Array(length).keys());
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    const questionData = questions[questionOrder[index]];
    
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = `<p>${questionData.question}</p>`;
    questionEl.innerHTML += `<div class="choice-container"></div>`;
    const choiceContainer = questionEl.querySelector('.choice-container');

    questionData.choices.forEach(choice => {
        const choiceLabel = document.createElement('label');
        choiceLabel.innerHTML = `<input type="radio" name="question" value="${choice}"> ${choice}`;
        choiceLabel.onclick = () => checkAnswer(questionOrder[index], choice);
        choiceContainer.appendChild(choiceLabel);
    });

    quizDiv.appendChild(questionEl);
}

function checkAnswer(index, selectedValue) {
    const resultDiv = document.getElementById('results');
    const isCorrect = selectedValue === questions[index].correct;
    resultDiv.innerHTML = isCorrect ? '<p style="color: green;">Bonne réponse!</p>' : '<p style="color: red;">Mauvaise réponse, essayez encore.</p>';
    
    if (isCorrect) {
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            } else {
                endQuiz();
            }
        }, 2000);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        document.getElementById('results').innerHTML = ''; // Efface le résultat
    }
}

function endQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <p>Toutes les questions ont été posées!</p>
        <button onclick="restartQuiz()">Recommencer</button>
        <button onclick="window.location.href='../index.html'">Retour à Combats</button>
    `;
    document.querySelector('.navigation').style.display = 'none';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    questionOrder = generateRandomOrder(questions.length);
    showQuestion(currentQuestionIndex);
    document.querySelector('.navigation').style.display = 'flex';
    document.getElementById('results').innerHTML = '';
}

window.onload = () => {
    showQuestion(currentQuestionIndex);
};
