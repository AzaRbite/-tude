// Liste des points de pression et leurs IDs
const pointsDePression = [
    { nom: "Infra-orbital", ids: ["Infra-orbital"] },
    { nom: "Plexus brachial (origine)", ids: ["PlexusBrachialorigine", "PlexusBrachialorigine2"] },
    { nom: "Jugulaire", ids: ["Jugulaire"] },
    { nom: "Médian", ids: ["Median", "Median2"] },
    { nom: "Fémoral", ids: ["Femoral", "Femoral2"] },
    { nom: "Tibial", ids: ["Tibial", "Tibial2"] },
    { nom: "Angle mandibulaire", ids: ["AngleMandibulaire", "AngleMandibulaire2"] },
    { nom: "Hypoglosse", ids: ["Hypoglosse", "Hypoglosse2"] },
    { nom: "Plexus brachial (clavicule)", ids: ["Plexusbracialclavicule", "Plexusbracialclavicule2"] },
    { nom: "Plexus brachial (jonction)", ids: ["PlexusBrachialJonction", "PlexusBrachialJonction2"] },
    { nom: "Radial", ids: ["Radial", "Radial2"] },
    { nom: "Cubital", ids: ["Cubital", "Cubital2"] },
    { nom: "Sciatique", ids: ["Sciatique", "Sciatique"] },
    { nom: "Derrière le lobe d'oreille", ids: ["LobeOreille", "LobeOreille2"] },
    { nom: "Entre pouce et l'index sur la main", ids: ["Main", "Main2"] }
];

// Fonction pour générer des choix de réponse
function genererChoix(correct, nombreChoix = 3) {
    const choix = new Set();
    choix.add(correct);
    while (choix.size < nombreChoix) {
        const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)].nom;
        choix.add(pointAleatoire);
    }
    return Array.from(choix).sort();
}

// Fonction pour générer un questionnaire de 10 questions
function genererQuestionnaire() {
    let questions = [];
    for (let i = 0; i < 10; i++) {
        const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
        const typeQuestion = Math.floor(Math.random() * 3);
        let question = {};

        switch(typeQuestion) {
            case 0: // Nommer le Point
                question = {
                    texte: `Cliquez sur le point ${pointAleatoire.nom}.`,
                    type: "nommer",
                    ids: pointAleatoire.ids
                };
                break;
            case 1: // Identifier un Point
                question = {
                    texte: `Identifiez ce point de pression (nom : ${pointAleatoire.nom}).`,
                    type: "identifier",
                    ids: pointAleatoire.ids
                };
                break;
            case 2: // Choix de Réponse
                const choix = genererChoix(pointAleatoire.nom);
                question = {
                    texte: `Quel est ce point ?`,
                    type: "choix",
                    ids: pointAleatoire.ids,
                    options: choix
                };
                break;
        }

        questions.push(question);
    }
    return questions;
}

let currentQuestionIndex = 0;
const questionnaire = genererQuestionnaire();

// Fonction pour afficher la question actuelle
function afficherQuestion(index) {
    const container = document.getElementById("questionnaire");
    container.innerHTML = ""; // Efface les questions précédentes

    const question = questionnaire[index];
    const questionDiv = document.createElement("div");
    questionDiv.textContent = question.texte;
    container.appendChild(questionDiv);

    // Ajouter un endroit pour afficher le feedback
    const feedbackDiv = document.createElement("div");
    feedbackDiv.id = "feedback";
    container.appendChild(feedbackDiv);

    if (question.type === "choix") {
        const optionsDiv = document.createElement("div");
        question.options.forEach((option, i) => {
            const label = document.createElement("label");
            label.style.display = "block";
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "options";
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            optionsDiv.appendChild(label);
        });
        const submitButton = document.createElement("button");
        submitButton.textContent = "Valider";
        submitButton.onclick = () => verifierReponse(question);
        optionsDiv.appendChild(submitButton);
        container.appendChild(optionsDiv);
    }

    // Met à jour le compteur de questions
    const questionCounter = document.getElementById("question-counter");
    questionCounter.textContent = `Question ${index + 1}/${questionnaire.length}`;

    // Mettez à jour ou modifiez le SVG selon la question
    mettreAJourSVG(question.ids);

    // Afficher/masquer les boutons suivant/précédent
    document.getElementById("prev-btn").style.display = index > 0 ? "inline-block" : "none";
    document.getElementById("next-btn").style.display = index < questionnaire.length - 1 ? "inline-block" : "none";
}

// Fonction pour mettre à jour l'affichage du SVG selon l'ID des points ciblés
function mettreAJourSVG(ids) {
    const svg = document.querySelector('embed#svgImg');
    svg.onload = function() {
        const svgDocument = svg.getSVGDocument();
        // Masquer tous les points
        const allElements = svgDocument.querySelectorAll('*');
        allElements.forEach(el => el.style.opacity = '0.2');

        // Montrer les points pour la question actuelle
        ids.forEach(id => {
            const element = svgDocument.getElementById(id);
            if (element) {
                element.style.opacity = '1.0'; // Remettre la visibilité normale
                element.style.stroke = 'red'; // Mettre en surbrillance l'élément
                element.style.strokeWidth = '2px';
            }
        });
    };
}

// Fonction pour vérifier la réponse de l'utilisateur
function verifierReponse(question) {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    const feedbackDiv = document.getElementById("feedback");
    if (selectedOption) {
        if (selectedOption.value === question.ids[0]) {
            feedbackDiv.textContent = "Bonne réponse!";
            feedbackDiv.style.color = "green";
        } else {
            feedbackDiv.textContent = "Mauvaise réponse. La bonne réponse est " + question.ids[0];
            feedbackDiv.style.color = "red";
        }
    } else {
        feedbackDiv.textContent = "Veuillez sélectionner une option.";
        feedbackDiv.style.color = "orange";
    }
}

// Initialisation
afficherQuestion(currentQuestionIndex);

// Boutons pour naviguer entre les questions
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentQuestionIndex < questionnaire.length - 1) {
        currentQuestionIndex++;
        afficherQuestion(currentQuestionIndex);
    }
});

document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        afficherQuestion(currentQuestionIndex);
    }
});
