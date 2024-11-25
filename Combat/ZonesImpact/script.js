document.addEventListener("DOMContentLoaded", function () {
    const impactSection = document.getElementById('impactSection');
    const feedbackImpacts = document.getElementById('feedback-impacts');
    let currentImpactIndex = 0;
    let nombreDErreurs = 0;
    let shuffledImpacts = [];

    // Possibles choix de réponses
    const niveauTraumatismeOptions = ["Élevé", "Modéré", "Faible"];
    const degréForceOptions = ["Mortel", "Non mortel"];
    const couleurOptions = ["Rouge", "Jaune", "Vert"];

    const impacts = [
        // Niveau de traumatisme
        { text: "Quel niveau de traumatisme est associé à la zone rouge ?", correct: "Élevé", options: niveauTraumatismeOptions },
        { text: "Quel niveau de traumatisme est associé à la zone jaune ?", correct: "Modéré", options: niveauTraumatismeOptions },
        { text: "Quel niveau de traumatisme est associé à la zone verte ?", correct: "Faible", options: niveauTraumatismeOptions },

        // Degré de force
        { text: "Quel degré de force est associé à la zone rouge ?", correct: "Mortel", options: degréForceOptions },
        { text: "Quel degré de force est associé à la zone jaune ?", correct: "Non mortel", options: degréForceOptions },
        { text: "Quel degré de force est associé à la zone verte ?", correct: "Non mortel", options: degréForceOptions },

        // Conséquences
        { text: "Les traumatismes dans la zone rouge causent-ils des séquelles permanentes ?", correct: "Vrai", options: ["Vrai", "Faux"] },
        { text: "Les traumatismes dans la zone jaune causent-ils des séquelles permanentes ou temporaires ?", correct: "Permanentes", options: ["Permanentes", "Temporaires"] },
        { text: "Les traumatismes dans la zone verte causent-ils généralement des séquelles temporaires ?", correct: "Vrai", options: ["Vrai", "Faux"] },

        // Parties du corps
        { text: "À quelle zone d'impact appartient le cou ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient la clavicule ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le biceps ?", correct: "Vert", options: couleurOptions },
        // Ajoutez d'autres questions similaires si besoin
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

        shuffledImpacts[index].options.forEach(optionText => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `impact${index}`;
            radio.value = optionText;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));

            const handleClick = () => {
                if (!label.classList.contains('handled')) {
                    label.classList.add('handled');
                    if (optionText === shuffledImpacts[index].correct) {
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
                        const correctOption = Array.from(choiceContainer.children).find(l => l.firstChild.value === shuffledImpacts[index].correct);
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
