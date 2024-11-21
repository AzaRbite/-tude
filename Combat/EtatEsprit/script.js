const questions = [
    {
        question: "Quelle couleur correspond à 'Inconscience du danger'?",
        choices: ["Blanc", "Jaune", "Rouge"],
        correct: "Blanc"
    },
    {
        question: "Quel état d'esprit est associé à la couleur 'Noir'?",
        choices: ["Panique", "Préparation au danger", "Détente"],
        correct: "Panique"
    },
    {
        question: "Quelle couleur est associée à 'Préparation au danger'?",
        choices: ["Orange", "Rouge", "Jaune"],
        correct: "Orange"
    },
    {
        question: "Quel état d'esprit est décrit par 'Détendu et vigilant'?",
        choices: ["Jaune", "Blanc", "Rouge"],
        correct: "Jaune"
    },
    {
        question: "Quel est l'état d'esprit pour 'Réaction en vue de maîtriser la menace'?",
        choices: ["Rouge", "Orange", "Noir"],
        correct: "Rouge"
    }
];

let currentQuestionIndex = 0;

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    const questionData = questions[index];
    
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = `<p>${questionData.question}</p>`;
    questionData.choices.forEach(choice => {
        const choiceLabel = document.createElement('label');
        choiceLabel.innerHTML = `<input type="checkbox" name="question" value="${choice}"> ${choice}<br>`;
        questionEl.appendChild(choiceLabel);
    });

    const checkButton = document.createElement('button');
    checkButton.textContent = 'Vérifier';
    checkButton.onclick = () => checkAnswer(index);
    questionEl.appendChild(checkButton);

    quizDiv.appendChild(questionEl);
}

function checkAnswer(index) {
    const selected = document.querySelector('input[name="question"]:checked');
    const resultDiv = document.getElementById('results');
    
    if (selected) {
        const isCorrect = selected.value === questions[index].correct;
        resultDiv.innerHTML = isCorrect ? '<p style="color: green;">Bonne réponse!</p>' : '<p style="color: red;">Mauvaise réponse, essayez encore.</p>';
    } else {
        resultDiv.innerHTML = '<p style="color: red;">Veuillez sélectionner une réponse.</p>';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        document.getElementById('results').innerHTML = ''; // Clear results
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
        document.getElementById('results').innerHTML = ''; // Clear results
    }
}

window.onload = () => {
    showQuestion(currentQuestionIndex);
};

