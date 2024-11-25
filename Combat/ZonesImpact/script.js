document.addEventListener("DOMContentLoaded", function () {
    const impactSection = document.getElementById('impactSection');
    const feedbackImpacts = document.getElementById('feedback-impacts');
    let currentImpactIndex = 0;
    let nombreDErreurs = 0;
    let shuffledImpacts = [];

    const impactOptions = [
        "Rouge",
        "Jaune",
        "Vert"
    ];

    const impacts = [
        // Questions basées sur les niveaux de traumatisme
        { text: "Quel niveau de traumatisme est associé à la zone rouge ?", correct: "Rouge" },
        { text: "Quel niveau de traumatisme est associé à la zone jaune ?", correct: "Jaune" },
        { text: "Quel niveau de traumatisme est associé à la zone verte ?", correct: "Vert" },
        
        // Questions basées sur les degrés de force
        { text: "Quel degré de force est associé à la zone rouge ?", correct: "Rouge" },
        { text: "Quel degré de force est associé à la zone jaune ?", correct: "Jaune" },
        { text: "Quel degré de force est associé à la zone verte ?", correct: "Vert" },

        // Questions basées sur les conséquences
        { text: "Quelle conséquence est associée à la zone rouge ?", correct: "Rouge" },
        { text: "Quelle conséquence est associée à la zone jaune ?", correct: "Jaune" },
        { text: "Quelle conséquence est associée à la zone verte ?", correct: "Vert" },

        // Questions basées sur les parties du corps
        { text: "Le cou appartient à quelle zone d'impact ?", correct: "Rouge" },
        { text: "La clavicule appartient à quelle zone d'impact ?", correct: "Jaune" },
        { text: "Le biceps appartient à quelle zone d'impact ?", correct: "Vert" }
    ];

    function melangerImpacts(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function afficherImpact(index) {
        if (index >= 10) { // Limite à 10 questions
            feedbackImpacts.textContent = `Quiz terminé ! Vous avez fait ${nombreDErreurs} erreurs sur 10 questions.`;
            
            const impactContainer = document.querySelector('.impact-container');
            impactContainer.innerHTML = '';

            const recommencerButton = document.createElement('button');
            recommencerButton.textContent = "Recommencer";
            recommencerButton.className = "valider-button";
            recommencerButton.onclick = function () {
                initialiserQuiz();
            };

            impactContainer.appendChild(recommencerButton);
            return;
        }

        const questionHeading = document.createElement('h3');
        questionHeading.textContent = `Question ${index + 1} sur 10`;

        feedbackImpacts.textContent = '';

        const impactContainer = document.querySelector('.impact-container');
        impactContainer.innerHTML = '';
        impactContainer.appendChild(questionHeading);

        const impactDiv = document.createElement('div');
        impactDiv.className = 'question';
        const p = document.createElement('p');
        p.textContent = shuffledImpacts[index].text;
        const choiceContainer = document.createElement('div');
        choiceContainer.className = 'choice-container';

        impactOptions.forEach(optionText => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `impact${index}`;
            radio.value = optionText.toLowerCase();

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));

            const handleClick = () => {
                if (!label.classList.contains('handled')) {
                    label.classList.add('handled');
                    if (optionText.toLowerCase() === shuffledImpacts[index].correct.toLowerCase()) {
                        label.classList.add('correct');
                        feedbackImpacts.textContent = "Bonne réponse !";
                        setTimeout(() => {
                            currentImpactIndex++;
                            afficherImpact(currentImpactIndex);
                        }, 2000);
                    } else {
                        label.classList.add('wrong');
                        feedbackImpacts.textContent = "Mauvaise réponse.";
                        nombreDErreurs++;
                        const correctOption = Array.from(choiceContainer.children).find(l => l.firstChild.value === shuffledImpacts[index].correct.toLowerCase());
                        if (correctOption) {
                            correctOption.classList.add('highlight');
                        }
                        setTimeout(() => {
                            currentImpactIndex++;
                            afficherImpact(currentImpactIndex);
                        }, 3000); // Délai de 3 secondes
                    }
                }
            };

            label.addEventListener('click', handleClick);
            choiceContainer.appendChild(label);
        });

        impactDiv.appendChild(p);
        impactDiv.appendChild(choiceContainer);
        impactContainer.appendChild(impactDiv);
    }

    function initialiserQuiz() {
        shuffledImpacts = melangerImpacts([...impacts]).slice(0, 10); // Mélange et limite à 10 questions
        currentImpactIndex = 0;
        nombreDErreurs = 0;
        afficherImpact(currentImpactIndex);
    }

    initialiserQuiz(); // Démarre le quiz dès le chargement
});
