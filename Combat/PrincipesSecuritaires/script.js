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
    strippedAnswers.push("esquive");

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
            feedback.textContent = "Félicitations ! Toutes les réponses sont correctes.";
            console.log("Toutes les réponses sont correctes.");
        } else {
            feedback.textContent = `Vous avez correctement identifié ${correctCount} sur ${correctAnswers.length}. Il y a ${errorsCount} erreurs. Voici les réponses manquantes : ${incorrectAnswers.join(", ")}.`;
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
        console.log("Affichage de la section Nommer");
        nommerSection.style.display = 'block';
        questionsSection.style.display = 'none';
        recommencerNommer();
    });

    questionsButton.addEventListener('click', function () {
        console.log("Affichage de la section Questions");
        questionsSection.style.display = 'block';
        nommerSection.style.display = 'none';
        afficherQuestion(currentQuestionIndex);
    });
});
