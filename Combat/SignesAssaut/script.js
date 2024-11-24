const questions = [
    // Questions Vrai/Faux
    {
        type: 'true_false',
        question: 'L\'irritabilité est un indicateur cognitif de l\'expression d\'un acte violent.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'La possession d\'armes réelles ou potentielles est un signe de violence imminente.',
        answer: true 
    },
    {
        type: 'true_false',
        question: 'La provocation verbale n\'est pas toujours considérée comme un symptôme cognitif de violence.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'Les réactions explosives des sentiments sont des signes précurseurs sur le plan émotif.',
        answer: true 
    },
    {
        type: 'true_false',
        question: 'La posture rigide peut être un signe précurseur d\'un acte violent.',
        answer: true 
    },
    {
        type: 'true_false',
        question: 'Une augmentation du niveau d\'anxiété n\'est jamais un indicateur émotionnel de violence.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'La fixation de l\'arme du policier est un facteur social de violence.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'Les demandes répétées peuvent indiquer une incapacité à s\'exprimer correctement.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'Des problèmes économiques sont rarement un indicateur social de violence.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'Une estime de soi fragile est un symptôme physique précurseur d\'un acte violent.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'La méfiance peut être un indicateur émotif de potentiel de violence.',
        answer: true 
    },
    {
        type: 'true_false',
        question: 'Les hallucinations ne sont jamais un symptôme cognitif de violence.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'L’absence de clignement des yeux est un signe de stress ou de tension émotionnelle.',
        answer: true 
    },
    {
        type: 'true_false',
        question: 'Le changement du ton de la voix est uniquement un indicateur social de violence.',
        answer: false 
    },
    {
        type: 'true_false',
        question: 'La peur est souvent un indicateur émotionnel de violence imminente.',
        answer: true 
    },

    // Questions à choix multiples
    {
        type: 'multiple_choice',
        question: 'Quel comportement physique peut indiquer une violence imminente ?',
        choices: [
            'Hésitation dans les réponses', 
            'Poings serrés', 
            'Délire', 
            'Hésitation dans les réponses'
        ],
        answer: 'Poings serrés'
    },
    {
        type: 'multiple_choice',
        question: 'Quel signe pourrait être un indicateur social de violence ?',
        choices: [
            'Antécédent de violence physique', 
            'Hypersensibilité', 
            'Possession d\'arme', 
            'Chantage'
        ],
        answer: 'Hypersensibilité'
    },
    {
        type: 'multiple_choice',
        question: 'Parmi ces choix, lequel correspond à un symptôme cognitif de violence ?',
        choices: [
            'Posture rigide', 
            'Idées paranoïdes', 
            'Rage', 
            'Peur'
        ],
        answer: 'Idées paranoïdes'
    },
    {
        type: 'multiple_choice',
        question: 'Quel symptôme est souvent observé sur le plan émotionnel avant un acte violent ?',
        choices: [
            'Effort pour garder le contrôle', 
            'Fixation de l\'arme du policier', 
            'Rage', 
            'Verbalisation menaçante'
        ],
        answer: 'Rage'
    },
    {
        type: 'multiple_choice',
        question: 'Quelle caractéristique physique peut indiquer une violence imminente ?',
        choices: [
            'Posture rigide', 
            'Refuse de communiquer', 
            'Provocations', 
            'Méfiance'
        ],
        answer: 'Posture rigide'
    },
    {
        type: 'multiple_choice',
        question: 'Quel change de comportement est un signe précurseur physique ?',
        choices: [
            'Changement du ton de la voix', 
            'Peur', 
            'Problèmes familiaux', 
            'Délire'
        ],
        answer: 'Changement du ton de la voix'
    },
    {
        type: 'multiple_choice',
        question: 'Quel symptôme indique une préparation possible à un acte violent ?',
        choices: [
            'Clignement des yeux rapide', 
            'Augmentation du niveau de l\'anxiété', 
            'Hypersensibilité', 
            'Insatisfaction'
        ],
        answer: 'Clignement des yeux rapide'
    },
    {
        type: 'multiple_choice',
        question: 'Quel aspect social pourrait être lié à une expression violente ?',
        choices: [
            'Estime de soi fragile', 
            'Délire', 
            'Effort pour garder le contrôle', 
            'Incitation à l\'argumentation'
        ],
        answer: 'Estime de soi fragile'
    },
    {
        type: 'multiple_choice',
        question: 'Quel comportement cognitif peut augmenter la probabilité d\'un acte violent ?',
        choices: [
            'Menace', 
            'Fixation de l\'arme du policier', 
            'Provocations', 
            'Usage d\'alcool'
        ],
        answer: 'Menace'
    },
    {
        type: 'multiple_choice',
        question: 'Quelle des options suivantes est un indicateur physique de violence ?',
        choices: [
            'Hypersensibilité', 
            'Usage d\'alcool et/ou de drogue', 
            'Verbalisation menaçante', 
            'Demande insistante'
        ],
        answer: 'Usage d\'alcool et/ou de drogue'
    },
    {
        type: 'multiple_choice',
        question: 'Quel comportement peut être un signe précurseur d\'un acte violent ?',
        choices: [
            'Méfiance', 
            'Problèmes professionnels', 
            'Destruction d\'objets', 
            'Augmentation de l\'activité motrice'
        ],
        answer: 'Destruction d\'objets'
    },
    {
        type: 'multiple_choice',
        question: 'Lequel des comportements suivants indique le plus une violence imminente ?',
        choices: [
            'Peur', 
            'Refuse de communiquer', 
            'Possession d\'arme', 
            'Hésitation dans les réponses'
        ],
        answer: 'Possession d\'arme'
    },
    {
        type: 'multiple_choice',
        question: 'Quelle observation pourrait indiquer un risque de violence ?',
        choices: [
            'Problèmes économiques', 
            'Changement de ton', 
            'Insatisfaction', 
            'Provocations'
        ],
        answer: 'Provocations'
    },
    {
        type: 'multiple_choice',
        question: 'Quel signe peut être un indicateur de violence sur le plan social ?',
        choices: [
            'Méfiance', 
            'Rage', 
            'Problèmes familiaux', 
            'Antécédent de violence'
        ],
        answer: 'Problèmes familiaux'
    },
    {
        type: 'multiple_choice',
        question: 'Quel comportement indique une détérioration de la communication ?',
        choices: [
            'Augmentation de l\'activité motrice', 
            'Insulte', 
            'Fixation de l\'arme', 
            'Incapacité de s\'exprimer'
        ],
        answer: 'Incapacité de s\'exprimer'
    },
    {
        type: 'multiple_choice',
        question: 'Quelle attitude psychologique pourrait précéder la violence ?',
        choices: [
            'Refuse de communiquer', 
            'Estime de soi fragile', 
            'Fixation de l\'arme du policier', 
            'Changement du ton de la voix'
        ],
        answer: 'Refuse de communiquer'
    },
    {
        type: 'multiple_choice',
        question: 'Quel comportement est un indicateur physique d\'une violence potentielle ?',
        choices: [
            'Méfiance', 
            'Antécédents de violence', 
            'Effort pour garder le contrôle', 
            'Verbalisation menaçante'
        ],
        answer: 'Effort pour garder le contrôle'
    },
    {
        type: 'multiple_choice',
        question: 'Lequel de ces symptômes est souvent observé avant un acte violent ?',
        choices: [
            'Délire', 
            'Clignement des yeux rapide', 
            'Problèmes professionnels', 
            'Usage de drogue'
        ],
        answer: 'Clignement des yeux rapide'
    },
    {
        type: 'multiple_choice',
        question: 'Quelle action indique un danger imminent de violence physique ?',
        choices: [
            'Refuse de communiquer', 
            'Position de combat', 
            'Augmentation du niveau d\'anxiété', 
            'Hésitation dans les réponses'
        ],
        answer: 'Position de combat'
    },

    // Scénarios
    {
        type: 'scenario',
        question: 'Lors d\'une enquête, vous rencontrez un individu qui cligne rapidement des yeux et refuse de communiquer. Quels signes de violence notez-vous ?',
        correctKeywords: ['Clignement des yeux rapide', 'refuse de communiquer']
    },
    {
        type: 'scenario',
        question: 'Vous observez une personne ayant une posture rigide et parlant inconsidérément bas. Quels indices de violence relevez-vous ?',
        correctKeywords: ['Posture rigide', 'changement du ton de la voix']
    },
    {
        type: 'scenario',
        question: 'Sur une scène de violence, un suspect fixe l\'arme du policier et semble extrêmement méfiant. Quels signes observez-vous ?',
        correctKeywords: ['Fixation de l\'arme du policier', 'méfiance']
    },
    {
        type: 'scenario',
        question: 'Un individu exprime des idées paranoïdes tout en ayant une estime de soi fragile. Quels symptômes de violence identifiez-vous ?',
        correctKeywords: ['Idées paranoïdes', 'estime de soi fragile']
    },
    {
        type: 'scenario',
        question: 'Marc, après avoir consommé de l\'alcool, commence à lancer des objets et à crier des menaces. Quels signes de violence observez-vous ?',
        correctKeywords: ['Usage d\'alcool', 'destruction d\'objets', 'menace']
    },
    {
        type: 'scenario',
        question: 'Sophie refuse de parler et montre des signes de peur et d\'anxiété. Quels indices de violence remarquez-vous ?',
        correctKeywords: ['Refuse de communiquer', 'peur', 'augmentation du niveau de l\'anxiété']
    },
    {
        type: 'scenario',
        question: 'En patrouille, vous rencontrez une personne très argumentative et sarcastique. Quels symptômes de violence voyez-vous ?',
        correctKeywords: ['Provocations', 'sarcasmes']
    },
    {
        type: 'scenario',
        question: 'Antoine semble irritable et a du mal à s\'exprimer correctement. Quels sont les signes précurseurs de violence ?',
        correctKeywords: ['Irritabilité', 'incapacité de s\'exprimer']
    },
    {
        type: 'scenario',
        question: 'Vous voyez quelqu\'un avec un faciès tendu et en position de combat. Quels signes de violence reconnaissez-vous ?',
        correctKeywords: ['Faciès tendu', 'position de combat']
    },
    {
        type: 'scenario',
        question: 'Une femme affiche une posture rigide tout en tenant un objet cassé et en murmurant des menaces. Que notez-vous ?',
        correctKeywords: ['Posture rigide', 'destruction d\'objets', 'menace']
    },
    {
        type: 'scenario',
        question: 'Un sujet sous l\'influence de stupéfiants provoque et insulte les passants. Quels signes de violence identifiez-vous ?',
        correctKeywords: ['Usage de drogue', 'provocations', 'insulte']
    },
    {
        type: 'scenario',
        question: 'Lors d\'une intervention, une personne affiche un comportement explosif et fait des gestes impulsifs. Que remarquez-vous ?',
        correctKeywords: ['Réactions explosives', 'gestes impulsifs']
    },
    {
        type: 'scenario',
        question: 'Sur le lieu d\'une dispute, un individu montre une méfiance extrême et refuse toute coopération. Quels signes observez-vous ?',
        correctKeywords: ['Méfiance', 'refuse de communiquer']
    },
    {
        type: 'scenario',
        question: 'Vous intervenez auprès d\'une personne qui montre des signes de rage et qui fait du chantage aux passants. Que détectez-vous ?',
        correctKeywords: ['Rage', 'chantage']
    },
    {
        type: 'scenario',
        question: 'Un homme ivre, avec des poings serrés, murmure des délires incohérents. Quels symptômes de violence notez-vous ?',
        correctKeywords: ['Usage d\'alcool', 'poings serrés', 'délire']
    }
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
    } else if (questionData.type === 'scenario') {
        const instructions = document.createElement('p');
        instructions.innerText = `Trouvez ${questionData.correctKeywords.length} signes perturbateurs :`;
        choiceContainer.appendChild(instructions);

        const inputBoxes = questionData.correctKeywords.map(() => {
            const textarea = document.createElement('textarea');
            textarea.className = 'question-box';
            choiceContainer.appendChild(textarea);
            return textarea;
        });

        const validateButton = document.createElement('button');
        validateButton.className = 'validate-button';
        validateButton.textContent = 'Valider';
        validateButton.onclick = () => validateScenario(inputBoxes, questionData.correctKeywords);
        choiceContainer.appendChild(validateButton);
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

function validateScenario(inputBoxes, correctKeywords) {
    const userInputs = inputBoxes.map(input => input.value.toLowerCase().trim());
    const keywordVariants = {
        'destruction d\'objets': ['objet cassé', 'brisé'],
        'fixation de l\'arme du policier': ['fixe arme', 'regarde arme'],
        'usage d\'alcool': ['sous influence alcool', 'ivresse'],
        'refuse de communiquer': ['ne parle pas', 'silence total'],
        'clignement des yeux rapide': ['cligne vite', 'pas de clignement'],
        // Ajoutez d'autres variantes si nécessaire
    };

    const matchedKeywords = userInputs.filter(input => {
        return correctKeywords.some(keyword => {
            if (input.includes(keyword)) return true;
            if (keywordVariants[keyword]) {
                return keywordVariants[keyword].some(variant => input.includes(variant));
            }
            return false;
        });
    });

    const resultDiv = document.getElementById('result-container');

    if (matchedKeywords.length === correctKeywords.length) {
        correctAnswers++;
        resultDiv.innerHTML = '<p style="color: green;">Bonne réponse ! Tous les signes perturbateurs ont été identifiés.</p>';
    } else {
        incorrectAnswers++;
        const missingKeywords = correctKeywords.filter(kw => !matchedKeywords.includes(kw.toLowerCase()));
        resultDiv.innerHTML = `<p style="color: red;">Mauvaise réponse. Signes manquants : ${missingKeywords.join(', ')}</p>`;
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

