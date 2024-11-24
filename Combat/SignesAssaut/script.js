const questions = [
    // Questions Vrai/Faux
    { type: 'true_false', question: 'Un faciès tendu est un symptôme précurseur de l\'expression d\'un acte violent.', answer: true },
    { type: 'true_false', question: 'La possession d\'armes n\'est pas considérée comme un symptôme physique précurseur de violence.', answer: false },
    { type: 'true_false', question: 'Les hallucinations peuvent être un symptôme cognitif de l\'expression d\'un acte violent.', answer: true },
    { type: 'true_false', question: 'La destruction d\'objets indique nécessairement un comportement violent.', answer: false },
    { type: 'true_false', question: 'L\'usage d\'alcool et/ou de drogues peut être un facteur contribuant à l\'expression d\'un acte violent.', answer: true },
    { type: 'true_false', question: 'Une posture rigide est un indicateur de potentiel agir violemment.', answer: true },
    { type: 'true_false', question: 'Une voix changée pour parler fort est un signe de potentiel de violence.', answer: true },
    { type: 'true_false', question: 'La méfiance n\'est pas un signe émotionnel d\'un comportement violent.', answer: false },
    { type: 'true_false', question: 'Un antécédent de violence physique est nécessaire pour prédire un futur comportement violent.', answer: false },
    { type: 'true_false', question: 'L\'irritabilité n\'est pas liée à des comportements violents.', answer: false },
    { type: 'true_false', question: 'Les réactions explosives des sentiments peuvent précéder un acte violent.', answer: true },
    { type: 'true_false', question: 'Une augmentation de l\'anxiété ne joue aucun rôle dans l\'éventualité d\'un comportement violent.', answer: false },
    { type: 'true_false', question: 'Les idées paranoïdes sont un indice possible de violence future.', answer: true },
    { type: 'true_false', question: 'La possession d\'armes est un symptôme social de la violence.', answer: false },
    { type: 'true_false', question: 'Le sarcasme verbal peut être un précurseur au comportement violent.', answer: true },
    { type: 'true_false', question: 'Refuser de communiquer ne pose aucun risque d\'escalade violente.', answer: false },
    { type: 'true_false', question: 'L\'hypersensibilité est un signe social d\'un potentiel de violence.', answer: true },
    { type: 'true_false', question: 'La dégradé d\'une estime de soi n\'affecte pas l\'expression de comportements violents.', answer: false },
    { type: 'true_false', question: 'Une augmentation ou diminution de l\'activité motrice peut signaler un risque de violence.', answer: true },
    { type: 'true_false', question: 'Des délires ne sont pas liés à un comportement violent.', answer: false },

    // Questions à Choix Multiples
    { type: 'multiple_choice', question: 'Quel symptôme physique peut indiquer un risque de comportement violent ?', choices: ['Tension musculaire', 'Poings serrés', 'Relaxation totale', 'Sourire constant'], answer: 'Poings serrés' },
    { type: 'multiple_choice', question: 'Quel type de changement vocal est un symptôme précurseur de comportement violent ?', choices: ['Parle avec calme', 'Ton constant', 'Changement du ton de la voix (parle fort ou inconsidérément bas)', 'Murmure occasionnel'], answer: 'Changement du ton de la voix (parle fort ou inconsidérément bas)' },
    { type: 'multiple_choice', question: 'Quel comportement cognitif peut être un indicateur de violence potentielle ?', choices: ['Discussion raisonnée', 'Provocations, argumentations, sarcasmes', 'Dialogue ouvert', 'Compliments fréquents'], answer: 'Provocations, argumentations, sarcasmes' },
    { type: 'multiple_choice', question: 'Qu\'est-ce qui, sur le plan social, peut être un signe précurseur de violence ?', choices: ['Prospérité économique', 'Problèmes familiaux, professionnels, économique, etc.', 'Réseautage actif', 'Bonnes relations professionnelles'], answer: 'Problèmes familiaux, professionnels, économique, etc.' },
    { type: 'multiple_choice', question: 'Quel symptôme émotionnel pourrait indiquer un comportement violent ?', choices: ['Sérénité', 'Irritabilité (seuil de tolérance bas)', 'Joie constante', 'Paix intérieure'], answer: 'Irritabilité (seuil de tolérance bas)' },
    { type: 'multiple_choice', question: 'Quel comportement physique est un signe précurseur de violence ?', choices: ['Posture détendue', 'Posture rigide', 'Mouvement fluide', 'Détente musculaire'], answer: 'Posture rigide' },
    { type: 'multiple_choice', question: 'Quel symptôme cognitif est indicatif de violence imminente ?', choices: ['Réponses claires', 'Verbalisation menaçante', 'Communication ouverte', 'Discussion amicale'], answer: 'Verbalisation menaçante' },
    { type: 'multiple_choice', question: 'Quel facteur social peut précéder un acte violent ?', choices: ['Satisfaction personnelle', 'Insatisfaction', 'Bonheur familial', 'Progrès professionnel'], answer: 'Insatisfaction' },
    { type: 'multiple_choice', question: 'Quel symptôme émotif pourrait être présent avant un acte violent ?', choices: ['Méfiance', 'Confiance élevée', 'Assurance', 'Tranquillité'], answer: 'Méfiance' },
    { type: 'multiple_choice', question: 'Quel symptôme physique est un indicateur de comportement violent ?', choices: ['Détente corporelle', 'Clignement des yeux rapide ou ne pas cligner des yeux', 'Expression faciale amicale', 'Respiration régulière'], answer: 'Clignement des yeux rapide ou ne pas cligner des yeux' },
    { type: 'multiple_choice', question: 'Quel comportement cognitif peut être un avertissement de violence ?', choices: ['Hésitation dans les réponses', 'Réponses rapides', 'Élocution claire', 'Réponses précises'], answer: 'Hésitation dans les réponses' },
    { type: 'multiple_choice', question: 'Quel symptôme émotif peut indiquer un risque accru de violence ?', choices: ['Joie', 'Rage', 'Tristesse', 'Calme'], answer: 'Rage' },
    { type: 'multiple_choice', question: 'Quel symptôme social peut précéder un comportement violent ?', choices: ['Estime de soi élevée', 'Estime de soi fragile', 'Confiance inébranlable', 'Image de soi positive'], answer: 'Estime de soi fragile' },
    { type: 'multiple_choice', question: 'Quel symptôme physique est un signe de possible violence ?', choices: ['Visage détendu', 'Faciès tendu ou rigide (lèvres et mâchoires serrées)', 'Sourire amical', 'Expression neutre'], answer: 'Faciès tendu ou rigide (lèvres et mâchoires serrées)' },
    { type: 'multiple_choice', question: 'Quel comportement cognitif peut être un signe précurseur de violence ?', choices: ['Capacité à s\'exprimer', 'Incapacité de s\'exprimer', 'Clarté verbale', 'Élocution fluide'], answer: 'Incapacité de s\'exprimer' },
    { type: 'multiple_choice', question: 'Quel symptôme émotionnel est indicatif de comportement violent ?', choices: ['Paix intérieure', 'Augmentation du niveau de l\'anxiété', 'Stabilité émotionnelle', 'Confiance calme'], answer: 'Augmentation du niveau de l\'anxiété' },
    { type: 'multiple_choice', question: 'Quel facteur social indique un risque de comportement violent ?', choices: ['Hypersensibilité', 'Résilience émotionnelle', 'Indifférence', 'Détachement émotionnel'], answer: 'Hypersensibilité' },
    { type: 'multiple_choice', question: 'Quel symptôme physique peut accompagner un comportement violent ?', choices: ['Relâchement corporel', 'Augmentation ou diminution de l\'activité motrice', 'Mouvement constant', 'Pas de changement d\'activité'], answer: 'Augmentation ou diminution de l\'activité motrice' },
    { type: 'multiple_choice', question: 'Quel comportement cognitif peut indiquer une violence potentielle ?', choices: ['Dialogue amical', 'Refuse de communiquer', 'Discussion ouverte', 'Communication fluide'], answer: 'Refuse de communiquer' },
    { type: 'multiple_choice', question: 'Quel symptôme émotif pourrait être un précurseur de comportement violent ?', choices: ['Confiance apaisante', 'Peur', 'Assurance calme', 'Joie contenue'], answer: 'Peur' },

    // Scénarios
    { type: 'scenario', question: 'Vous êtes policier et vous recevez un appel pour un individu perturbateur...', correctKeywords: ['Faciès tendu', 'verbalisation menaçante', 'incapacité de s\'exprimer'] },
    { type: 'scenario', question: 'Lors d\'une intervention après des plaintes de voisinage, vous découvrez...', correctKeywords: ['Posture rigide', 'destruction d\'objets', 'parle fort'] },
    { type: 'scenario', question: 'Vous intervenez dans une dispute familiale où vous trouvez...', correctKeywords: ['Destruction d\'objets', 'réactions explosives', 'demandes insistantes'] },
    { type: 'scenario', question: 'Vous êtes appelé à une scène où Pierre Lefèvre est impliqué...', correctKeywords: ['Position de combat', 'méfiance', 'poings serrés'] },
    { type: 'scenario', question: 'En arrivant sur les lieux d\'une altercation, vous trouvez Sophie Girard...', correctKeywords: ['Idées paranoïdes', 'refuse de communiquer'] },
    { type: 'scenario', question: 'En réaction à une plainte sur un comportement agressif, vous trouvez...', correctKeywords: ['Usage d\'alcool', 'insulte', 'clignement des yeux rapide'] },
    { type: 'scenario', question: 'Au cours d\'une manifestation, Claire Renaud est identifiée comme particulièrement provocatrice...', correctKeywords: ['Provocations', 'sarcasmes', 'gestes impulsifs'] },
    { type: 'scenario', question: 'Vous conduisez une enquête dans un bureau où vous trouvez...', correctKeywords: ['Posture rigide', 'fixation', 'méfiance'] },
    { type: 'scenario', question: 'En analysant une scène de crime domestique, vous rencontrez Lucas Caron...', correctKeywords: ['Faciès tendu', 'destruction d\'objets', 'réactions explosives'] },
    { type: 'scenario', question: 'Vous répondez à un appel concernant un client mécontent, Mathieu Pelletier...', correctKeywords: ['Position de combat', 'refuse de communiquer', 'insatisfaction'] }
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
        instructions.innerText = `Trouver ${questionData.correctKeywords.length} signes perturbateurs :`;
        choiceContainer.appendChild(instructions);

        const inputBoxes = questionData.correctKeywords.map(() => {
            const textarea = document.createElement('textarea');
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
