document.addEventListener("DOMContentLoaded", function () {
    const nommerButton = document.getElementById('nommerButton');
    const questionsButton = document.getElementById('questionsButton');
    const nommerSection = document.getElementById('nommerSection');
    const questionsSection = document.getElementById('questionsSection');
    const feedback = document.getElementById('feedback');
    const compteur = document.createElement('div');
    compteur.id = 'compteur';
    document.body.appendChild(compteur);

    let currentQuestionIndex = 0;
    let nombreDErreurs = 0;

    const correctAnswers = [
        "la position", 
        "la concentration", 
        "la distance sécuritaire", 
        "la vitesse de réaction", 
        "l'esquive", 
        "la riposte"
    ];

    const strippedAnswers = correctAnswers.map(answer => answer.replace(/^la\s|^le\s|^l'/, ''));
    // Permet aussi l'acceptation de la réponse sans déterminant
    strippedAnswers.push("esquive");

    const questions = [
        { text: "Placer les pieds à 45 degrés appartient à quelle catégorie ?", correct: "La position" },
        { text: "Prendre l'état d'esprit approprié appartient à quelle catégorie ?", correct: "La concentration" },
        { text: "Une distance qui permettra de réagir appartient à quelle catégorie ?", correct: "La distance sécuritaire" },
        { text: "Selon les éléments de zone de proximité appartient à quelle catégorie ?", correct: "La vitesse de réaction" },
        { text: "Déplacement en évaluant les menaces appartient à quelle catégorie ?", correct: "L'esquive" },
        { text: "Doit être adaptée aux exigences de la situation appartient à quelle catégorie ?", correct: "La riposte" },
    ];

    function afficherQuestion(index) {
        if (index >= questions.length) {
            feedback.textContent = `Quiz terminé ! Nombre d'erreurs : ${nombreDErreurs} sur ${questions.length}`;
            compteur.textContent = '';
            return;
        }

        feedback.textContent = '';
        compteur.textContent = `Question ${index + 1} sur ${questions.length}`;

        const questionContainer = document.querySelector('.questions-container');
        questionContainer.innerHTML = '';

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        const p = document.createElement('p');
        p.textContent = questions[index].text;
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

            label.addEventListener('click', () => {
                if (!label.classList.contains('handled')) {
                    if (radio.value === questions[index].correct.toLowerCase()) {
                        label.classList.add('correct');
                        feedback.textContent = "Bonne réponse !";
                    } else {
                        label.classList.add('wrong');
                        feedback.textContent = "Mauvaise réponse.";
                        nombreDErreurs++;
                    }

                    setTimeout(() => {
                        label.classList.add('handled');
                        currentQuestionIndex++;
                        afficherQuestion(currentQuestionIndex);
                    }, 2000);
                }
            });

            choiceContainer.appendChild(label);
        });

        questionDiv.appendChild(p);
        questionDiv.appendChild(choiceContainer);
        questionContainer.appendChild(questionDiv);
    }

    function validerNommer() {
        const textareas = nommerSection.querySelectorAll('textarea');
        const correctSet = new Set(strippedAnswers);
        let correctCount = 0;
        let errorsCount = 0;
        const missingAnswers = [...correctSet]; // Copie des réponses correctes attendues

        textareas.forEach((textarea, index) => {
            const value = textarea.value.trim().toLowerCase().replace(/^la\s|^le\s|^l'/, '');
            if (correctSet.has(value)) {
                textarea.style.borderColor = '#4caf50'; // Vert pour les bonnes réponses
                correctSet.delete(value);
                correctCount++;
            } else {
                textarea.style.borderColor = '#f44336'; // Rouge pour les mauvaises réponses
                errorsCount++;
            }
        });

        if (errorsCount === 0) {
            feedback.textContent = "Félicitations ! Toutes les réponses sont correctes.";
        } else {
            const incorrectAnswers = missingAnswers.filter(answer => correctSet.has(answer));
            feedback.textContent = `Vous avez correctement identifié ${correctCount} sur ${correctAnswers.length}. Il y a ${errorsCount} erreurs. Voici les réponses manquantes : ${incorrectAnswers.join(", ")}.`;
        }
    }

    function recommencerNommer() {
        const textareas = nommerSection.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.value = '';
            textarea.style.borderColor = '#ff4c4c';
        });
        feedback.textContent = '';
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
            textarea.style.borderColor = '#ff9800'; // Orange lors de la saisie
        });
        textarea.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (index === 5) {  // Si c'est la dernière zone de texte, appuyez sur "Valider"
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

    const validerButton = document.createElement('button');
    validerButton.textContent = "Valider";
    validerButton.className = "valider-button";
    validerButton.onclick = validerNommer;
    nommerSection.appendChild(validerButton);

    const recommencerButton = document.createElement('button');
    recommencerButton.textContent = "Recommencer";
    recommencerButton.className = "recommencer-button";
    recommencerButton.onclick = recommencerNommer;
    nommerSection.appendChild(recommencerButton);

    nommerButton.addEventListener('click', function () {
        nommerSection.style.display = 'block';
        questionsSection.style.display = 'none';
        recommencerNommer(); // Réinitialisez lors de l'entrée dans la section
    });

    questionsButton.addEventListener('click', function () {
        questionsSection.style.display = 'block';
        nommerSection.style.display = 'none';
        afficherQuestion(currentQuestionIndex);
    });
});
