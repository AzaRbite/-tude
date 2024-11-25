document.addEventListener("DOMContentLoaded", function () {
    const impactSection = document.getElementById('impactSection');
    const feedbackImpacts = document.getElementById('feedback-impacts');
    let currentImpactIndex = 0;
    let nombreDErreurs = 0;
    let shuffledImpacts = [];

    const couleurOptions = ["Rouge", "Jaune", "Vert"];

    const impacts = [
        // Niveau de traumatisme
        { text: "Quel niveau de traumatisme est associé à la zone rouge ?", correct: "Élevé", options: ["Élevé", "Modéré", "Faible"] },
        { text: "Quel niveau de traumatisme est associé à la zone jaune ?", correct: "Modéré", options: ["Élevé", "Modéré", "Faible"] },
        { text: "Quel niveau de traumatisme est associé à la zone verte ?", correct: "Faible", options: ["Élevé", "Modéré", "Faible"] },

        // Degré de force
        { text: "Quel degré de force est associé à la zone rouge ?", correct: "Mortel", options: ["Mortel", "Non mortel"] },
        { text: "Quel degré de force est associé à la zone jaune ?", correct: "Non mortel", options: ["Mortel", "Non mortel"] },
        { text: "Quel degré de force est associé à la zone verte ?", correct: "Non mortel", options: ["Mortel", "Non mortel"] },

        // Conséquences
        { text: "Les traumatismes dans la zone rouge causent-ils des séquelles permanentes ?", correct: "Vrai", options: ["Vrai", "Faux"] },
        { text: "Les traumatismes dans la zone jaune causent-ils des séquelles permanentes ou temporaires ?", correct: "Permanentes", options: ["Permanentes", "Temporaires"] },
        { text: "Les traumatismes dans la zone verte causent-ils généralement des séquelles temporaires ?", correct: "Vrai", options: ["Vrai", "Faux"] },

        // Parties du corps - Rouge
        { text: "À quelle zone d'impact appartient le cou ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le thorax ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient la colonne vertébrale ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les parties génitales ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les oreilles ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les tempes ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les yeux ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient l'os nasal ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le maxillaire inférieur ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient la trachée ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le plexus solaire ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient la cage thoracique ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le creux derrière l'oreille ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les vertèbres cervicales ?", correct: "Rouge", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les côtes ?", correct: "Rouge", options: couleurOptions },

        // Parties du corps - Jaune
        { text: "À quelle zone d'impact appartient la clavicule ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient l'épaule ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le coude ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient l'articulation du poignet ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le revers de la main ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les genoux ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient la zone entre le nombril et les côtes ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les omoplates ?", correct: "Jaune", options: couleurOptions },
        { text: "À quelle zone d'impact appartient l'intérieur du poignet ?", correct: "Jaune", options: couleurOptions },

        // Parties du corps - Vert
        { text: "À quelle zone d'impact appartient l'avant-bras ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le biceps ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le triceps ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les cuisses ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le tibia ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le bas du ventre sous la ligne du nombril ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le dessus des pieds ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartient le dos de la main ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les fesses ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les mollets ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les tendons d'Achille ?", correct: "Vert", options: couleurOptions },
        { text: "À quelle zone d'impact appartiennent les hanches ?", correct: "Vert", options: couleurOptions }
    ];

    function melangerImpacts(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function afficherImpact(index) {
        if (index >= shuffledImpacts.length) {  // Affiche toutes les questions disponibles
            feedbackImpacts.textContent = `Quiz terminé ! Vous avez fait ${nombreDErreurs} erreurs sur ${shuffledImpacts.length} questions.`;
            
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
        questionHeading.textContent = `Question ${index + 1} sur ${shuffledImpacts.length}`;

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
        shuffledImpacts = melangerImpacts([...impacts]).slice(0, 10);  // Mélange et limite à 10 questions uniques
        currentImpactIndex = 0;
        nombreDErreurs = 0;
        afficherImpact(currentImpactIndex);
    }

    initialiserQuiz(); // Démarre le quiz dès le chargement
});
