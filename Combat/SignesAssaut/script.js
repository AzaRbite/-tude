const questions = [
    // Questions Vrai/Faux
    { 
        type: 'true_false', 
        question: 'Un faciès tendu ou rigide (lèvres et mâchoires serrées) est un symptôme physique précurseur d\'un acte violent.', 
        answer: true 
    },
    { 
        type: 'true_false', 
        question: 'Les hallucinations sont un symptôme cognitif précurseur de l\'expression d\'un acte violent.', 
        answer: true 
    },
    { 
        type: 'true_false', 
        question: 'Un antécédent de violence physique est toujours nécessaire pour prédire un futur comportement violent.', 
        answer: false 
    },
    { 
        type: 'true_false', 
        question: 'La méfiance est un indicateur émotionnel de potentiel de violence.', 
        answer: true 
    },

    // Questions à choix multiples
    { 
        type: 'multiple_choice', 
        question: 'Quel symptôme physique est un indicateur de violence imminente ?', 
        choices: [
            'Poings serrés', 
            'Problèmes familiaux', 
            'Insatisfaction', 
            'Rage'
        ], 
        answer: 'Poings serrés' 
    },
    { 
        type: 'multiple_choice', 
        question: 'Quel symptôme cognitif peut indiquer une violence potentielle ?', 
        choices: [
            'Idées paranoïdes', 
            'Augmentation du niveau de l\'anxiété', 
            'Estime de soi fragile', 
            'Méfiance'
        ], 
        answer: 'Idées paranoïdes' 
    },
    { 
        type: 'multiple_choice', 
        question: 'Lequel des symptômes suivants est un indicateur social de violence ?', 
        choices: [
            'Fixation de l\'arme d\'un policier', 
            'Problèmes familiaux, professionnels, économiques, etc.', 
            'Faciès tendu ou rigide (lèvres et mâchoires serrées)', 
            'Changement du ton de la voix'
        ], 
        answer: 'Problèmes familiaux, professionnels, économiques, etc.' 
    },
    { 
        type: 'multiple_choice', 
        question: 'Quel comportement physique est un signe de violence potentielle ?', 
        choices: [
            'Fixation de l\'arme du policier', 
            'Clarté dans les réponses', 
            'Estime de soi fragile', 
            'Insatisfaction'
        ], 
        answer: 'Fixation de l\'arme du policier' 
    },
    { 
        type: 'multiple_choice', 
        question: 'Parmi ces options, laquelle est un indicateur émotionnel de violence ?', 
        choices: [
            'Peur', 
            'Provocations', 
            'Clignement des yeux rapide ou absence de clignement', 
            'Usage d\'alcool et/ou de drogue'
        ], 
        answer: 'Peur' 
    },

    // Scénarios
    { 
        type: 'scenario', 
        question: 'Lors d\'une intervention, vous trouvez Julien Moreau avec une posture rigide, tenant un objet cassé. Il parle fort à un voisin imaginaire. Quels signes de violence notez-vous ?', 
        correctKeywords: ['Posture rigide', 'destruction d\'objets', 'parle fort'] 
    },
    { 
        type: 'scenario', 
        question: 'Sophie Girard exprime des idées paranoïdes en refusant de communiquer. Que notez-vous comme signes de violence potentielle ?', 
        correctKeywords: ['Idées paranoïdes', 'refuse de communiquer'] 
    },
    { 
        type: 'scenario', 
        question: 'Marc Dubois, sous l\'influence de l\'alcool, insulte les clients d\'un bar. Il cligne rapidement des yeux ou ne cligne pas du tout. Quels symptômes de violence remarquez-vous ?', 
        correctKeywords: ['Usage d\'alcool', 'insulte', 'clignement des yeux rapide'] 
    },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questionOrder = shuffleArray(questions).slice(0, 10);
let isWaiting = false;

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz-container');
    quizDiv.innerHTML = '';

    const questionData = questionOrder[index];
    const questionEl = document.createElement('div');
    questionEl.className = 'question';

    questionEl.innerHTML = `<p style="font-size: 1.5em;">${questionData.question}</p><div class="choice-container"></div>`;

    const choiceContainer = questionEl.querySelector('.choice-container');

    if (questionData.type === 'multiple_choice') {
        questionData.choices.forEach(choice => {
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
    } else if (questionData.type === 'scenario') {
        const instructions = document.createElement('p');
        instructions.innerText = `Trouvez ${questionData.correctKeywords.length} signes perturbateurs :`;
        choiceContainer.appendChild(instructions);

        const inputBoxes = questionData.correctKeywords.map(() => {
            const textarea = document.createElement('textarea');
            textarea.className = 'question-box'; // Ajoutez la classe pour le style CSS
            choiceContainer.appendChild(textarea);
            return textarea;
        });

        const validateButton = document.createElement('button');
        validateButton.textContent = 'Valider';
        validateButton.style.display = 'inline-block';
        validateButton.onclick = () => validateScenario(inputBoxes, questionData.correctKeywords);
        choiceContainer.appendChild(validateButton);
    }

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

function validateScenario(inputBoxes, correctKeywords) {
    const userInputs = inputBoxes.map(input => input.value.toLowerCase().trim());
    const matchedKeywords = userInputs.filter(input => correctKeywords.map(kw => kw.toLowerCase()).includes(input));

    const resultDiv = document.getElementById('result-container');
    if (matchedKeywords.length === correctKeywords.length) {
        correctAnswers++;
        resultDiv.innerHTML = '<p style="color: green;">Bonne réponse ! Tous les signes perturbateurs ont été identifiés.</p>';
    } else {
        incorrectAnswers++;
        resultDiv.innerHTML = `<p style="color: red;">Mauvaise réponse. Signes manquants : ${correctKeywords.filter(kw => !matchedKeywords.includes(kw.toLowerCase())).join(', ')}</p>`;
    }

    resultDiv.style.display = 'block';

    isWaiting = true;
    setTimeout(() => nextQuestion(), 5000);
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
        <button onclick="restartQuiz()">Recommencer</button>
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

