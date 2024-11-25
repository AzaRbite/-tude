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
        "La position", 
        "La concentration", 
        "La distance sécuritaire", 
        "La vitesse de réaction", 
        "L'esquive", 
        "La riposte"
    ];

    const questions = [
        { text: "Placer les pieds à 45 degrés appartient à quelle catégorie ?", correct: "La position" },
        { text: "Prendre l'état d'esprit approprié appartient à quelle catégorie ?", correct: "La concentration" },
        { text: "Une distance qui permettra de réagir appartient à quelle catégorie ?", correct: "La distance sécuritaire" },
        { text: "Selon les éléments de zone de proximité appartient à quelle catégorie ?", correct: "La vitesse de réaction" },
        { text: "Déplacement en évaluant les menaces appartient à quelle catégorie ?", correct: "L'esquive" },
        { text: "Doit être adaptée aux exigences de la situation appartient à quelle catégorie ?", correct: "La riposte" },
        // Ajoutez suffisamment de questions pour atteindre 10 questions
    ];

    function afficherQuestion(index) {
        if (index >= questions.length) {
            feedback.textContent = `Quiz terminé ! Nombre d'erreurs : ${nombreDErreurs} sur 10`;
            return;
        }

        feedback.textContent = '';
        compteur.textContent = `Question ${index + 1} sur 10`;

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
            radio.name = `question${index}`; // Assurez-vous que chaque question a un ensemble unique de boutons radio
            radio.value = optionText;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));

            label.addEventListener('click', () => {
                if (!label.classList.contains('handled')) { // Vérifie si déjà cliqué
                    if (radio.value === questions[index].correct) {
                        label.classList.add('correct');
                        feedback.textContent = "Bonne réponse !";
                    } else {
                        label.classList.add('wrong');
                        feedback.textContent = "Mauvaise réponse.";
                        nombreDErreurs++;
                    }

                    setTimeout(() => {
                        label.classList.add('handled'); // Marque comme déjà cliqué
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
        let correctCount = 0;

        textareas.forEach((textarea, index) => {
            const value = textarea.value.trim();
            if (value.toLowerCase() === correctAnswers[index].toLowerCase()) {
                textarea.style.borderColor = '#4caf50'; // Vert pour correct
                correctCount++;
            } else {
                textarea.style.borderColor = '#f44336'; // Rouge pour incorrect
            }
        });

        feedback.textContent = `Vous avez correctement identifié ${correctCount} sur 6`;
    }

    // Création des éléments dans la section nommer
    const nommerContainer = document.querySelector('.nommer-container');
    correctAnswers.forEach((_, index) => {
        const nommerItem = document.createElement('div');
        nommerItem.className = 'nommer-item';

        const span = document.createElement('span');
        span.textContent = `${index + 1}.`;

        const textarea = document.createElement('textarea');

        nommerItem.appendChild(span);
        nommerItem.appendChild(textarea);
        nommerContainer.appendChild(nommerItem);
    });

    const validerButton = document.createElement('button');
    validerButton.textContent = "Valider";
    validerButton.className = "valider-button";
    validerButton.onclick = validerNommer;
    nommerSection.appendChild(validerButton);

    nommerButton.addEventListener('click', function () {
        nommerSection.style.display = 'block';
        questionsSection.style.display = 'none';
    });

    questionsButton.addEventListener('click', function () {
        questionsSection.style.display = 'block';
        nommerSection.style.display = 'none';
        afficherQuestion(currentQuestionIndex);
    });
});
