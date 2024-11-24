const questions = [
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
    { type: 'multiple_choice', question: 'Quel symptôme physique peut indiquer un risque de comportement violent ?', choices: ['Main détendue', 'Légère tension musculaire', 'Poings serrés mais relâchés après', 'Poings serrés sans relâchement'], answer: 'Poings serrés sans relâchement' },
    { type: 'multiple_choice', question: 'Quel type de réaction peut être considéré comme un symptôme cognitif de violence ?', choices: ['Réponses rapides et précises', 'Réponses hésitantes et incohérentes', 'Réponses lentes mais claires', 'Réponses silencieuses et retenues'], answer: 'Réponses hésitantes et incohérentes' },
    { type: 'multiple_choice', question: 'Quel symptôme émotionnel est un indicateur de comportement violent ?', choices: ['Joie exubérante', 'Tristesse douce', 'Colère instable', 'Frustration modérée'], answer: 'Colère instable' },
    { type: 'multiple_choice', question: 'Quel est un symptôme social de l\'expression d\'un acte violent ?', choices: ['Succès économique', 'Indifférence professionnelle', 'Problèmes économiques persistants', 'Attachement familial instable'], answer: 'Problèmes économiques persistants' },
    { type: 'multiple_choice', question: 'Quel facteur peut aggraver la situation et mener à un acte violent ?', choices: ['Calme apparent', 'Résolution pacifique', 'Augmentation soudaine de méfiance', 'Dispute argumentée'], answer: 'Augmentation soudaine de méfiance' },
    { type: 'multiple_choice', question: 'Quel symptôme physique pourrait signifier un comportement agressif ?', choices: ['Clignement lent occasionnel', 'Clignement rapide et répétitif', 'Clignement normal mais fréquent', 'Absence de clignement'], answer: 'Clignement rapide et répétitif' },
    { type: 'multiple_choice', question: 'Quel élément cognitif peut précéder un comportement violent ?', choices: ['Dialogue cohérent', 'Pensées délirantes', 'Idées rationnelles', 'Discours préparé'], answer: 'Pensées délirantes' },
    { type: 'multiple_choice', question: 'Quel comportement social peut être un indicateur de comportement violent ?', choices: ['Problèmes familiaux résolus', 'Isolation volontaire', 'Relations amicales tendues', 'Engagement communautaire faible'], answer: 'Isolation volontaire' },
    { type: 'multiple_choice', question: 'Quel symptôme peut être présent sur le plan émotif ?', choices: ['Sérénité constante', 'Anxiété croissante', 'Contrôle émotionnel', 'Peur latente'], answer: 'Anxiété croissante' },
    { type: 'multiple_choice', question: 'Quel comportement physique pourrait être un indicateur de violence imminente ?', choices: ['Relaxation musculaire', 'Rigidité corporelle accrue', 'Relaxation partielle', 'Légère tension sans intention'], answer: 'Rigidité corporelle accrue' },
    { type: 'multiple_choice', question: 'Quel symptôme cognitif pourrait être présent en cas de menace perçue ?', choices: ['Clarté cognitive', 'Idées paranoïdes persistantes', 'Pensées chaotiques mais pacifiques', 'Réflexion calme'], answer: 'Idées paranoïdes persistantes' },
    { type: 'multiple_choice', question: 'Quels signes émotionnels pourraient indiquer un risque accru de violence ?', choices: ['Sérénité sous stress', 'Rage incontrôlée', 'Tristesse expressive', 'Légère irritation'], answer: 'Rage incontrôlée' },
    { type: 'multiple_choice', question: 'Quels signes sociaux peuvent précéder un acte violent ?', choices: ['Problèmes financiers temporaires', 'Conflits familiaux récurrents', 'Solide réseau social', 'Amélioration économique'], answer: 'Conflits familiaux récurrents' },
    { type: 'multiple_choice', question: 'Quel changement vocal peut signaler un comportement violent ?', choices: ['Volume stable', 'Ton qui fluctue brusquement', 'Voix douce occasionnellement', 'Intonations calmes'], answer: 'Ton qui fluctue brusquement' },
    { type: 'multiple_choice', question: 'Quel symptôme est le plus susceptible de précéder une explosion physique ?', choices: ['Activité motrice réduite', 'Activité motrice intensifiée', 'Stabilité motrice', 'Légère agitation'], answer: 'Activité motrice intensifiée' },
    { type: 'multiple_choice', question: 'Quel symptôme indique une incapacité à s\'exprimer ?', choices: ['Clarté verbale', 'Confusion chronique', 'Fluidité intermittente', 'Discours préparé'], answer: 'Confusion chronique' },
    { type: 'multiple_choice', question: 'Quelles réactions explosives des sentiments sont souvent observées chez quelqu\'un qui pourrait agir violemment ?', choices: ['Joie inattendue', 'Colère explosive', 'Tristesse maîtrisée', 'Peur contenue'], answer: 'Colère explosive' },
    { type: 'multiple_choice', question: 'Quel type de langage est un symptôme cognitif de violence potentielle ?', choices: ['Compliments fréquents', 'Sarcasmes acerbes', 'Encouragements positifs', 'Blagues légères'], answer: 'Sarcasmes acerbes' },
    { type: 'multiple_choice', question: 'Quel symptôme cognitif peut indiquer un potentiel de violence lors d\'une interaction ?', choices: ['Dialogue amical', 'Provocations verbales constantes', 'Conflit résolu', 'Discussion rationnelle'], answer: 'Provocations verbales constantes' },
    { type: 'multiple_choice', question: 'Quel comportement social peut être un signe précurseur de l\'expression d\'un acte violent ?', choices: ['Satisfaction personnelle', 'Insatisfaction persistante', 'Équilibre émotionnel', 'Harmonie familiale'], answer: 'Insatisfaction persistante' }
    // Plus de questions de mise en situation à ajouter si nécessaire
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questionOrder = shuffleArray(questions).slice(0, 10);
let isWaiting = false;  // Variable pour contrôler l'attente entre les questions

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion(index) {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';

    const questionData = questionOrder[index];
    const questionEl = document.createElement('div');
    questionEl.className = 'question';
    questionEl.innerHTML = `<p style="font-size: 1.5em;">${questionData.question}</p><div class="choice-container"></div>`;

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
    if (isWaiting) return;  // Empêcher l'avance multiple

    const questionData = questionOrder[index];
    const resultDiv = document.getElementById('results');
    const isCorrect = selectedValue === questionData.correct;

    if (isCorrect) {
        correctAnswers++;
        resultDiv.innerHTML = '<p style="color: green;">Bonne réponse ! Passage à la question suivante...</p>';
        setTimeout(() => nextQuestion(), 2000); // 2 secondes pour une bonne réponse
    } else {
        incorrectAnswers++;
        resultDiv.innerHTML = `<p style="color: red;">Mauvaise réponse. La bonne réponse était : ${questionData.correct}</p>`;
        setTimeout(() => nextQuestion(), 5000); // 5 secondes pour une mauvaise réponse
    }

    isWaiting = true;  // Définir l'état d'attente
}

function nextQuestion() {
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';  // Effacer le message précédent
    isWaiting = false;  // Réinitialiser l'état d'attente

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
        <p>Vous avez fait ${incorrectAnswers} erreurs sur ${totalQuestions} questions.</p>
        <button onclick="restartQuiz()">Recommencer</button>
        <button onclick="window.location.href='/Etude/Combat';">Retour à Combats</button>
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

