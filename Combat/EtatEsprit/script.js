const questions = [
    // Blanc
    { question: "Quel est le nom associé à la couleur 'Blanc' ?", choices: ["Inconscience du danger", "Détendu et vigilant", "Préparation au danger", "Lutte", "Panique"], correct: "Inconscience du danger" },
    { question: "Quelle est la description pour la couleur 'Blanc' ?", choices: ["Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "C'est cette attitude que l'agent doit adopter au travail.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Désordre, désorganisation, perte de moyens.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "Aucunement préoccupé de ce qui se passe dans le milieu environnant." },
    { question: "Quelle couleur est associée à cette description : 'Aucunement préoccupé de ce qui se passe dans le milieu environnant.' ?", choices: ["Blanc", "Jaune", "Orange", "Rouge", "Noir"], correct: "Blanc" },
    { question: "Quel est le nom pour la description 'Aucunement préoccupé de ce qui se passe dans le milieu environnant.' ?", choices: ["Inconscience du danger", "Détendu et vigilant", "Préparation au danger", "Lutte", "Panique"], correct: "Inconscience du danger" },
    { question: "Quelle couleur correspond à 'Inconscience du danger' ?", choices: ["Blanc", "Jaune", "Orange", "Rouge", "Noir"], correct: "Blanc" },
    { question: "Quelle est la description pour 'Inconscience du danger' ?", choices: ["Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "C'est cette attitude que l'agent doit adopter au travail.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Désordre, désorganisation, perte de moyens.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "Aucunement préoccupé de ce qui se passe dans le milieu environnant." },

    // Jaune
    { question: "Quel est le nom associé à la couleur 'Jaune' ?", choices: ["Détendu et vigilant", "Inconscience du danger", "Préparation au danger", "Lutte", "Panique"], correct: "Détendu et vigilant" },
    { question: "Quelle est la description pour la couleur 'Jaune' ?", choices: ["C'est cette attitude que l'agent doit adopter au travail. Pas de méfiance maladive, simplement une prise de conscience de l'environnement et un esprit éveillé, capable de détecter les premiers signes de danger.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Désordre, désorganisation, perte de moyens.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "C'est cette attitude que l'agent doit adopter au travail. Pas de méfiance maladive, simplement une prise de conscience de l'environnement et un esprit éveillé, capable de détecter les premiers signes de danger." },
    { question: "Quelle couleur est associée à cette description : 'C'est cette attitude que l'agent doit adopter au travail. Pas de méfiance maladive, simplement une prise de conscience de l'environnement et un esprit éveillé, capable de détecter les premiers signes de danger.' ?", choices: ["Jaune", "Blanc", "Orange", "Rouge", "Noir"], correct: "Jaune" },
    { question: "Quel est le nom pour la description 'C'est cette attitude que l'agent doit adopter au travail. Pas de méfiance maladive, simplement une prise de conscience de l'environnement et un esprit éveillé, capable de détecter les premiers signes de danger.' ?", choices: ["Détendu et vigilant", "Inconscience du danger", "Préparation au danger", "Lutte", "Panique"], correct: "Détendu et vigilant" },
    { question: "Quelle couleur correspond à 'Détendu et vigilant' ?", choices: ["Jaune", "Blanc", "Orange", "Rouge", "Noir"], correct: "Jaune" },
    { question: "Quelle est la description pour 'Détendu et vigilant' ?", choices: ["C'est cette attitude que l'agent doit adopter au travail. Pas de méfiance maladive, simplement une prise de conscience de l'environnement et un esprit éveillé, capable de détecter les premiers signes de danger.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Désordre, désorganisation, perte de moyens.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "C'est cette attitude que l'agent doit adopter au travail. Pas de méfiance maladive, simplement une prise de conscience de l'environnement et un esprit éveillé, capable de détecter les premiers signes de danger." },

    // Orange
    { question: "Quel est le nom associé à la couleur 'Orange' ?", choices: ["Préparation au danger", "Inconscience du danger", "Détendu et vigilant", "Lutte", "Panique"], correct: "Préparation au danger" },
    { question: "Quelle est la description pour la couleur 'Orange' ?", choices: ["C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions nécessaires pour faire face au danger éventuel dont il a perçu les signes", "C'est cette attitude que l'agent doit adopter au travail.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Désordre, désorganisation, perte de moyens.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant."], correct: "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions nécessaires pour faire face au danger éventuel dont il a perçu les signes" },
    { question: "Quelle couleur est associée à cette description : 'C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions nécessaires pour faire face au danger éventuel dont il a perçu les signes' ?", choices: ["Orange", "Jaune", "Blanc", "Rouge", "Noir"], correct: "Orange" },
    { question: "Quel est le nom pour la description 'C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions nécessaires pour faire face au danger éventuel dont il a perçu les signes' ?", choices: ["Préparation au danger", "Inconscience du danger", "Détendu et vigilant", "Lutte", "Panique"], correct: "Préparation au danger" },
    { question: "Quelle couleur correspond à 'Préparation au danger' ?", choices: ["Orange", "Jaune", "Blanc", "Rouge", "Noir"], correct: "Orange" },
    { question: "Quelle est la description pour 'Préparation au danger' ?", choices: ["C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions nécessaires pour faire face au danger éventuel dont il a perçu les signes", "C'est cette attitude que l'agent doit adopter au travail.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Désordre, désorganisation, perte de moyens.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant."], correct: "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions nécessaires pour faire face au danger éventuel dont il a perçu les signes" },

    // Rouge
    { question: "Quel est le nom associé à la couleur 'Rouge' ?", choices: ["Lutte", "Inconscience du danger", "Détendu et vigilant", "Préparation au danger", "Panique"], correct: "Lutte" },
    { question: "Quelle est la description pour la couleur 'Rouge' ?", choices: ["Réaction en vue de maîtriser la menace de danger immédiat et vigilance pour prévenir d'autres dangers possibles.", "C'est cette attitude que l'agent doit adopter au travail.", "Désordre, désorganisation, perte de moyens.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "Réaction en vue de maîtriser la menace de danger immédiat et vigilance pour prévenir d'autres dangers possibles." },
    { question: "Quelle couleur est associée à cette description : 'Réaction en vue de maîtriser la menace de danger immédiat et vigilance pour prévenir d'autres dangers possibles.' ?", choices: ["Rouge", "Jaune", "Orange", "Blanc", "Noir"], correct: "Rouge" },
    { question: "Quel est le nom pour la description 'Réaction en vue de maîtriser la menace de danger immédiat et vigilance pour prévenir d'autres dangers possibles.' ?", choices: ["Lutte", "Inconscience du danger", "Détendu et vigilant", "Préparation au danger", "Panique"], correct: "Lutte" },
    { question: "Quelle couleur correspond à 'Lutte' ?", choices: ["Rouge", "Jaune", "Orange", "Blanc", "Noir"], correct: "Rouge" },
    { question: "Quelle est la description pour 'Lutte' ?", choices: ["Réaction en vue de maîtriser la menace de danger immédiat et vigilance pour prévenir d'autres dangers possibles.", "C'est cette attitude que l'agent doit adopter au travail.", "Désordre, désorganisation, perte de moyens.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "Réaction en vue de maîtriser la menace de danger immédiat et vigilance pour prévenir d'autres dangers possibles." },

    // Noir
    { question: "Quel est le nom associé à la couleur 'Noir' ?", choices: ["Panique", "Inconscience du danger", "Détendu et vigilant", "Préparation au danger", "Lutte"], correct: "Panique" },
    { question: "Quelle est la description pour la couleur 'Noir' ?", choices: ["Désordre, désorganisation, perte de moyens.", "C'est cette attitude que l'agent doit adopter au travail.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "Désordre, désorganisation, perte de moyens." },
    { question: "Quelle couleur est associée à cette description : 'Désordre, désorganisation, perte de moyens.' ?", choices: ["Noir", "Jaune", "Orange", "Rouge", "Blanc"], correct: "Noir" },
    { question: "Quel est le nom pour la description 'Désordre, désorganisation, perte de moyens.' ?", choices: ["Panique", "Inconscience du danger", "Détendu et vigilant", "Préparation au danger", "Lutte"], correct: "Panique" },
    { question: "Quelle couleur correspond à 'Panique' ?", choices: ["Noir", "Jaune", "Orange", "Rouge", "Blanc"], correct: "Noir" },
    { question: "Quelle est la description pour 'Panique' ?", choices: ["Désordre, désorganisation, perte de moyens.", "C'est cette attitude que l'agent doit adopter au travail.", "Réaction en vue de maîtriser la menace de danger immédiat.", "Aucunement préoccupé de ce qui se passe dans le milieu environnant.", "C'est à cette étape que l'agent doit mettre en pratique les mesures de précautions."], correct: "Désordre, désorganisation, perte de moyens." }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let questionOrder = generateNonRepeatingOrder(questions, 10);

function generateNonRepeatingOrder(questions, length) {
    const order = [];
    const usedColors = new Set();
    while (order.length < length) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        const color = question.question.match(/Blanc|Jaune|Orange|Rouge|Noir/)[0]; // Trouver la couleur mentionnée dans la question

        if (!usedColors.has(color)) {
            order.push(randomIndex);
            usedColors.add(color);
        }

        if (usedColors.size >= 5) { // Limite pour éviter des boucles infinies si toutes les couleurs ont été utilisées
            usedColors.clear();
        }
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

    // Afficher le compteur de question
    const counterDiv = document.getElementById('question-counter');
    counterDiv.textContent = `Question ${index + 1}/${questionOrder.length}`;
}

function checkAnswer(index, selectedValue) {
    const resultDiv = document.getElementById('results');
    const isCorrect = selectedValue === questions[index].correct;
    
    if (isCorrect) {
        correctAnswers++;
    }

    resultDiv.innerHTML = isCorrect ? '<p style="color: green;">Bonne réponse!</p>' : '<p style="color: red;">Mauvaise réponse.</p>';
    
    setTimeout(() => {
        if (currentQuestionIndex < questionOrder.length - 1) {
            nextQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
}

function nextQuestion() {
    if (currentQuestionIndex < questionOrder.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        document.getElementById('results').innerHTML = ''; // Efface le résultat
    }
}

function endQuiz() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
        <h2>Quiz Terminé</h2>
        <p>Vous avez répondu correctement à ${correctAnswers} questions sur ${questionOrder.length}.</p>
        <button onclick="restartQuiz()">Recommencer</button>
        <button onclick="window.location.href='../index.html'">Retour à Combats</button>
    `;
    document.querySelector('.navigation').style.display = 'none';
    document.getElementById('results').innerHTML = ''; 
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionOrder = generateNonRepeatingOrder(questions, 10);
    showQuestion(currentQuestionIndex);
    document.querySelector('.navigation').style.display = 'flex';
    document.getElementById('results').innerHTML = '';
}

window.onload = () => {
    const header = document.querySelector('header');
    const counterDiv = document.createElement('div');
    counterDiv.id = 'question-counter';
    counterDiv.style.position = 'absolute';
    counterDiv.style.top = '50%';
    counterDiv.style.transform = 'translateY(-50%)'; // Aligner avec le header
    counterDiv.style.right = '20px';
    counterDiv.style.color = '#ffffff';
    counterDiv.style.fontSize = '1.2em';  // Taille de la police
    counterDiv.style.fontWeight = 'bold'; // Mettre en gras
    header.appendChild(counterDiv);
    
    showQuestion(currentQuestionIndex);
};
