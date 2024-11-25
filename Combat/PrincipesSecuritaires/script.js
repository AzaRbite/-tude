document.addEventListener("DOMContentLoaded", function () {
    const nommerButton = document.getElementById('nommerButton');
    const questionsButton = document.getElementById('questionsButton');
    const nommerSection = document.getElementById('nommerSection');
    const questionsSection = document.getElementById('questionsSection');
    const feedbackNommer = document.getElementById('feedback');
    const feedbackQuestions = document.getElementById('feedback-questions');
    const questionHeading = document.querySelector('#questionsSection h2');
    
    let currentQuestionIndex = 0;
    let nombreDErreurs = 0;
    let shuffledQuestions = []; // Tableau pour stocker les questions mélangées

    const correctAnswers = [
        "la position", 
        "la concentration", 
        "la distance sécuritaire", 
        "la vitesse de réaction", 
        "l'esquive", 
        "la riposte"
    ];

    const strippedAnswers = correctAnswers.map(answer => answer.replace(/^la\s|^le\s|^l'/, ''));
    strippedAnswers.push("esquive");

const questions = [
    // La position
    { text: "Placer les pieds à 45 degrés appartient à quelle catégorie ?", correct: "La position" },
    { text: "Placer la jambe forte vers l'arrière appartient à quelle catégorie ?", correct: "La position" },
    { text: "Ne présenter aucune attitude de défi appartient à quelle catégorie ?", correct: "La position" },
    { text: "Faire des gestes naturels appartient à quelle catégorie ?", correct: "La position" },
    { text: "Fléchir légèrement les genoux appartient à quelle catégorie ?", correct: "La position" },

    // La concentration
    { text: "Prendre l'état d'esprit approprié appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Connaître son niveau d'activation appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Surveiller l'environnement appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Identifier les dangers imminents appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Identifier les issues possibles appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Surveiller ses arrières appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Surveiller les mains du sujet appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Contrôler les complices éventuels appartient à quelle catégorie ?", correct: "La concentration" },
    { text: "Garder un œil sur votre partenaire appartient à quelle catégorie ?", correct: "La concentration" },

    // La distance sécuritaire
    { text: "Une distance qui permettra de réagir appartient à quelle catégorie ?", correct: "La distance sécuritaire" },
    { text: "La distance avant et arrière est à considérer ainsi que la distance latérale appartient à quelle catégorie ?", correct: "La distance sécuritaire" },

    // La vitesse de réaction
    { text: "Selon les éléments de zone de proximité appartient à quelle catégorie ?", correct: "La vitesse de réaction" },
    { text: "Selon les éléments de temps et distance appartient à quelle catégorie ?", correct: "La vitesse de réaction" },
    { text: "Selon les éléments de perception, analyse, choix et réponse appartient à quelle catégorie ?", correct: "La vitesse de réaction" },

    // L'esquive
    { text: "Déplacement en évaluant les menaces avant de riposter appartient à quelle catégorie ?", correct: "L'esquive" },

    // Riposte
    { text: "Doit être adaptée aux exigences de la situation appartient à quelle catégorie ?", correct: "La riposte" },
    { text: "Il faudra tenir compte de l'évaluation: les indices de menace, les signes précurseurs d'assaut, la capacité, l'intention et les gestes posés par la personne appartient à quelle catégorie ?", correct: "La riposte" },
    { text: "La riposte comprend l'exécution du plan préétabli (défensif et/ou offensif) appartient à quelle catégorie ?", correct: "La riposte" },
    { text: "La riposte comprend la compréhension et l'application des 3 mécanismes de contrôle physique appartient à quelle catégorie ?", correct: "La riposte" }
];

    function melangerQuestions(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function afficherQuestion(index) {
        console.log(`Afficher question index: ${index}`);
        if (index >= shuffledQuestions.length) {
            feedbackQuestions.textContent = `Quiz terminé ! Vous avez fait ${nombreDErreurs} erreurs sur ${shuffledQuestions.length}.`;
            questionHeading.textContent = "Questions";

            // Cache les choix de réponses et propose un bouton recommencer
            const questionContainer = document.querySelector('.questions-container');
            questionContainer.innerHTML = '';

            const recommencerButton = document.createElement('button');
            recommencerButton.textContent = "Recommencer";
            recommencerButton.className = "valider-button";
            recommencerButton.onclick = function () {
                initialiserQuiz();
            };

            questionContainer.appendChild(recommencerButton);
            return;
        }
        
        questionHeading.textContent = `Questions ${index + 1} sur ${shuffledQuestions.length}`;
        feedbackQuestions.textContent = '';

        const questionContainer = document.querySelector('.questions-container');
        questionContainer.innerHTML = '';

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        const p = document.createElement('p');
        p.textContent = shuffledQuestions[index].text;
        const choiceContainer = document.createElement('div');
        choiceContainer.className = 'choice-container';

        correctAnswers.forEach(optionText => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.value = optionText.toLowerCase();

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));

            const handleClick = () => {
                if (!label.classList.contains('handled')) {
                    label.classList.add('handled');
                    if (radio.value === shuffledQuestions[index].correct.toLowerCase()) {
                        label.classList.add('correct');
                        feedbackQuestions.textContent = "Bonne réponse !";
                        console.log("Bonne réponse.");
                        setTimeout(() => {
                            currentQuestionIndex++;
                            afficherQuestion(currentQuestionIndex);
                        }, 2000);
                    } else {
                        label.classList.add('wrong');
                        feedbackQuestions.textContent = "Mauvaise réponse.";
                        console.log("Mauvaise réponse.");
                        nombreDErreurs++;
                        // Mettre en évidence la bonne réponse
                        const correctOption = Array.from(choiceContainer.children).find(l => l.firstChild.value === shuffledQuestions[index].correct.toLowerCase());
                        if (correctOption) {
                            correctOption.classList.add('highlight');
                        }
                        setTimeout(() => {
                            currentQuestionIndex++;
                            afficherQuestion(currentQuestionIndex);
                        }, 3000); // Délai de 3 secondes
                    }
                }
            };

            label.addEventListener('click', handleClick);
            choiceContainer.appendChild(label);
        });

        questionDiv.appendChild(p);
        questionDiv.appendChild(choiceContainer);
        questionContainer.appendChild(questionDiv);
    }

    function initialiserQuiz() {
        shuffledQuestions = melangerQuestions([...questions]); // Mélange les questions
        currentQuestionIndex = 0;
        nombreDErreurs = 0;
        afficherQuestion(currentQuestionIndex);
    }

    function validerNommer() {
        console.log("Début de la validation des réponses");
        const textareas = nommerSection.querySelectorAll('textarea');
        const correctSet = new Set(strippedAnswers);
        let correctCount = 0;
        let errorsCount = 0;
        const missingAnswers = [...correctSet];
        
        textareas.forEach((textarea, index) => {
            const value = textarea.value.trim().toLowerCase().replace(/^la\s|^le\s|^l'/, '');
            console.log(`Valeur entrée pour ${index + 1}: "${value}"`);
            
            if (correctSet.has(value)) {
                textarea.style.borderColor = '#4caf50';
                correctSet.delete(value);
                correctCount++;
                console.log(`Correct: ${value}`);
            } else {
                textarea.style.borderColor = '#f44336';
                errorsCount++;
                console.log(`Incorrect: ${value}`);
            }
        });

        const incorrectAnswers = missingAnswers.filter(answer => correctSet.has(answer));
        if (errorsCount === 0) {
            feedbackNommer.textContent = "Félicitations ! Toutes les réponses sont correctes.";
            console.log("Toutes les réponses sont correctes.");
        } else {
            feedbackNommer.textContent = `Vous avez correctement identifié ${correctCount} sur ${correctAnswers.length}. Il y a ${errorsCount} erreurs. Voici les réponses manquantes : ${incorrectAnswers.join(", ")}.`;
            console.log(`Erreurs: ${errorsCount}, Réponses manquantes: ${incorrectAnswers.join(", ")}`);
        }
    }

    function recommencerNommer() {
        console.log("Réinitialisation des réponses");
        const textareas = nommerSection.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.value = '';
            textarea.style.borderColor = '#ff4c4c';
        });
        feedbackNommer.textContent = '';
    }

    const nommerContainer = document.querySelector('.nommer-container');
    const textareas = [];

    correctAnswers.forEach((_, index) => {
        const nommerItem = document.createElement('div');
        nommerItem.className = 'nommer-item';

        const span = document.createElement('span');
        span.textContent = `${index + 1}.`;

        const textarea = document.createElement('textarea');
        textarea.addEventListener('focus', function() {
            textarea.style.borderColor = '#ff9800';
        });
        textarea.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (index === 5) {
                    validerNommer();
                } else if (index + 1 < textareas.length) {
                    textareas[index + 1].focus();
                }
            }
        });

        textareas.push(textarea);

        nommerItem.appendChild(span);
        nommerItem.appendChild(textarea);
        nommerContainer.appendChild(nommerItem);
    });

    const validerButton = document.getElementById('validerButton');
    const recommencerButton = document.getElementById('recommencerButton');

    validerButton.onclick = validerNommer;
    recommencerButton.onclick = recommencerNommer;

    nommerButton.addEventListener('click', function () {
        console.log("Affichage de la section Nommer");
        nommerSection.style.display = 'block';
        questionsSection.style.display = 'none';
        recommencerNommer();
    });

    questionsButton.addEventListener('click', function () {
        console.log("Affichage de la section Questions");
        questionsSection.style.display = 'block';
        nommerSection.style.display = 'none';
        initialiserQuiz();
    });
});
