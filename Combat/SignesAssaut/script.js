const questions = [
    // Questions Vrai/Faux
    {
        type: 'true_false',
        question: "L'irritabilité est un indicateur cognitif de l'expression d'un acte violent.",
        answer: false
    },
    {
        type: 'true_false',
        question: "La possession d'armes réelles ou potentielles est un signe de violence imminente.",
        answer: true
    },
    {
        type: 'true_false',
        question: "La provocation verbale n'est pas toujours considérée comme un symptôme cognitif de violence.",
        answer: false
    },
    {
        type: 'true_false',
        question: "Les réactions explosives des sentiments sont des signes précurseurs sur le plan émotif.",
        answer: true
    },
    {
        type: 'true_false',
        question: "La posture rigide peut être un signe précurseur d'un acte violent.",
        answer: true
    },
    {
        type: 'true_false',
        question: "Une augmentation du niveau d'anxiété n'est jamais un indicateur émotionnel de violence.",
        answer: false
    },
    {
        type: 'true_false',
        question: "La fixation de l'arme du policier est un facteur social de violence.",
        answer: false
    },
    {
        type: 'true_false',
        question: "Les demandes répétées peuvent indiquer une incapacité à s'exprimer correctement.",
        answer: false
    },
    {
        type: 'true_false',
        question: "Des problèmes économiques sont rarement un indicateur social de violence.",
        answer: false
    },
    {
        type: 'true_false',
        question: "Une estime de soi fragile est un symptôme physique précurseur d'un acte violent.",
        answer: false
    },
    {
        type: 'true_false',
        question: "La méfiance peut être un indicateur émotif de potentiel de violence.",
        answer: true
    },
    {
        type: 'true_false',
        question: "Les hallucinations ne sont jamais un symptôme cognitif de violence.",
        answer: false
    },
    {
        type: 'true_false',
        question: "L’absence de clignement des yeux est un signe de stress ou de tension émotionnelle.",
        answer: true
    },
    {
        type: 'true_false',
        question: "Le changement du ton de la voix est uniquement un indicateur social de violence.",
        answer: false
    },
    {
        type: 'true_false',
        question: "La peur est souvent un indicateur émotionnel de violence imminente.",
        answer: true
    },
    // Questions à choix multiples
    {
        type: 'multiple_choice',
        question: "Quel comportement physique peut indiquer une violence imminente ?",
        choices: ['Hésitation dans les réponses', 'Poings serrés', 'Délire', 'Hésitation dans les réponses'],
        answer: 'Poings serrés'
    },
    {
        type: 'multiple_choice',
        question: "Quel signe pourrait être un indicateur social de violence ?",
        choices: ['Antécédent de violence physique', 'Hypersensibilité', 'Possession d\'arme', 'Chantage'],
        answer: 'Hypersensibilité'
    },
    {
        type: 'multiple_choice',
        question: "Parmi ces choix, lequel correspond à un symptôme cognitif de violence ?",
        choices: ['Posture rigide', 'Idées paranoïdes', 'Rage', 'Peur'],
        answer: 'Idées paranoïdes'
    },
    {
        type: 'multiple_choice',
        question: "Quel symptôme est souvent observé sur le plan émotionnel avant un acte violent ?",
        choices: ['Effort pour garder le contrôle', 'Fixation de l\'arme du policier', 'Rage', 'Verbalisation menaçante'],
        answer: 'Rage'
    },
    {
        type: 'multiple_choice',
        question: "Quelle caractéristique physique peut indiquer une violence imminente ?",
        choices: ['Posture rigide', 'Refuse de communiquer', 'Provocations', 'Méfiance'],
        answer: 'Posture rigide'
    },
    {
        type: 'multiple_choice',
        question: "Quel change de comportement est un signe précurseur physique ?",
        choices: ['Changement du ton de la voix', 'Peur', 'Problèmes familiaux', 'Délire'],
        answer: 'Changement du ton de la voix'
    },
    {
        type: 'multiple_choice',
        question: "Quel symptôme indique une préparation possible à un acte violent ?",
        choices: ['Clignement des yeux rapide', 'Augmentation du niveau de l\'anxiété', 'Hypersensibilité', 'Insatisfaction'],
        answer: 'Clignement des yeux rapide'
    },
    {
        type: 'multiple_choice',
        question: "Quel aspect social pourrait être lié à une expression violente ?",
        choices: ['Estime de soi fragile', 'Délire', 'Effort pour garder le contrôle', 'Incitation à l\'argumentation'],
        answer: 'Estime de soi fragile'
    },
    {
        type: 'multiple_choice',
        question: "Quel comportement cognitif peut augmenter la probabilité d'un acte violent ?",
        choices: ['Menace', 'Fixation de l\'arme du policier', 'Provocations', 'Usage d\'alcool'],
        answer: 'Menace'
    },
    {
        type: 'multiple_choice',
        question: "Quelle des options suivantes est un indicateur physique de violence ?",
        choices: ['Hypersensibilité', 'Usage d\'alcool et/ou de drogue', 'Verbalisation menaçante', 'Demande insistante'],
        answer: 'Usage d\'alcool et/ou de drogue'
    },
    // Ajoutez d'autres questions au besoin
];

// Variables pour suivre le questionnaire
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questionOrder = shuffleArray(questions).slice(0, 10);
let isWaiting = false;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function normalizeInput(input) {
    return input
        .toLowerCase()
        .replace(/[éèêë]/g, 'e')
        .replace(/[àâä]/g, 'a')
        .replace(/[îï]/g, 'i')
        .replace(/[ôö]/g, 'o')
        .replace(/[ûü]/g, 'u')
        .replace(/[^a-z0-9]/g, ''); // Supprime les caractères spéciaux
}

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz-container');
    quizDiv.innerHTML = '';

    const questionData = questionOrder[index];
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = `<p style="font-size: 1.5em;">${questionData.question}</p><div class="choice-container ${questionData.type === 'true_false' ? 'true-false' : ''}"></div>`;

    const choiceContainer = questionEl.querySelector('.choice-container');

    if (questionData.type === 'multiple_choice') {
        const shuffledChoices = shuffleArray([...questionData.choices]);
        shuffledChoices.forEach(choice => {
            const choiceLabel = document.createElement('label');
            choiceLabel.innerHTML = `<input type="radio" name="question" value="${choice}"> ${choice}`;
            choiceLabel.addEventListener('click', () => checkAnswer(index, choice));
            choiceContainer.appendChild(choiceLabel);
        });
    } else if (questionData.type === 'true_false') {
        ['Vrai', 'Faux'].forEach(option => {
            const choiceLabel = document.createElement('label');
            choiceLabel.innerHTML = `<input type="radio" name="question" value="${option}"> ${option}`;
            choiceLabel.addEventListener('click', () => checkAnswer(index, option === 'Vrai'));
            choiceContainer.appendChild(choiceLabel);
        });
    }

    const resultDiv = document.createElement('div');
    resultDiv.id = 'result-container';
    resultDiv.style.display = 'none';
    resultDiv.style.marginTop = '20px';
    choiceContainer.appendChild(resultDiv);

    quizDiv.appendChild(questionEl);

    const counterDiv = document.getElementById('question-counter');
    counterDiv.textContent = `Question ${index + 1}/${questionOrder.length}`;
}

function checkAnswer(index, selectedValue) {
    if (isWaiting) return;

    const questionData = questionOrder[index];
    const resultDiv = document.getElementById('result-container');
    const isCorrect = selectedValue === questionData.answer;

    if (isCorrect) {
        correctAnswers++;
        resultDiv.innerHTML = '<p style="color: green;">Bonne réponse !</p>';
    } else {
        incorrectAnswers++;
        resultDiv.innerHTML = `<p style="color: red;">Mauvaise réponse. La bonne réponse était : ${questionData.answer}</p>`;
    }

    resultDiv.style.display = 'block';
    isWaiting = true;
    setTimeout(() => nextQuestion(), isCorrect ? 2000 : 5000);
}

function nextQuestion() {
    const resultDiv = document.getElementById('result-container');
    resultDiv.style.display = 'none';
    isWaiting = false;

    if (currentQuestionIndex < questionOrder.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const quizDiv = document.getElementById('quiz-container');
    const totalQuestions = questionOrder.length;
    quizDiv.innerHTML = `
        <h2>Quiz Terminé</h2>
        <p>Vous avez fait ${incorrectAnswers} erreurs sur ${totalQuestions} questions.</p>
        <button onclick="restartQuiz()" class="validate-button">Recommencer</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    questionOrder = shuffleArray(questions).slice(0, 10);
    showQuestion(currentQuestionIndex);
}

window.onload = () => {
    const header = document.querySelector('header');
    const counterDiv = document.createElement('div');
    counterDiv.id = 'question-counter';
    counterDiv.style.color = '#ffffff';
    counterDiv.style.fontSize = '1.2em';
    counterDiv.style.fontWeight = 'bold';
    header.appendChild(counterDiv);

    showQuestion(currentQuestionIndex);
};
