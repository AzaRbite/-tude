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
    ];

    function afficherQuestion(index) {
        if (index >= questions.length) {
            feedback.textContent = `Quiz terminé ! Nombre d'erreurs : ${nombreDErreurs} sur ${questions.length}`;
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
            radio.value = optionText;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));

            label.addEventListener('click', () => {
                if (!label.classList.contains('handled')) {
                    if (radio.value === questions[index].correct) {
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
        const correctSet = new Set(correctAnswers.map(answer => answer.toLowerCase()));
        let correctCount = 0;

        textareas.forEach(textarea => {
            const value = textarea.value.trim().toLowerCase();
            if (correctSet.has(value)) {
                textarea.style.borderColor = '#4caf50';
                correctSet.delete(value); // Assurez-vous qu'une réponse correcte n'est comptée qu'une seule fois
                correctCount++;
            } else {
                textarea.style.borderColor = '#f44336';
            }
        });

        feedback.textContent = `Vous avez correctement identifié ${correctCount} sur ${correctAnswers.length}`;
    }

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
