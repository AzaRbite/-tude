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

// Fonction pour générer un questionnaire de 10 questions
function genererQuestionnaire() {
    let questions = [];
    for (let i = 0; i < 10; i++) {
        const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
        const typeQuestion = Math.floor(Math.random() * 2); // on se limite à des questions cliquables
        let question = {};

        question = {
            texte: `Cliquez sur le point ${pointAleatoire.nom}.`,
            type: "nommer",
            ids: pointAleatoire.ids
        };

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

    // Met à jour le compteur de questions
    const questionCounter = document.getElementById("question-counter");
    questionCounter.textContent = `Question ${index + 1}/${questionnaire.length}`;

    // Mettez à jour ou modifiez le SVG selon la question
    mettreAJourSVG(question.ids);
}

// Fonction pour mettre à jour l'affichage du SVG selon l'ID des points ciblés
function mettreAJourSVG(ids) {
    const svg = document.querySelector('embed#svgImg');
    svg.onload = function() {
        const svgDocument = svg.getSVGDocument();
        // Réinitialiser tous les styles
        svgDocument.querySelectorAll('*').forEach(el => {
            el.style.opacity = '1.0';
            el.style.fill = '';
            el.style.stroke = '';
        });

        // Mettre en surbrillance les points pour la question actuelle
        ids.forEach(id => {
            const element = svgDocument.getElementById(id);
            if (element) {
                element.style.stroke = 'red';
                element.style.strokeWidth = '2px';
                // Ajouter un écouteur d'événement de clic
                element.style.cursor = 'pointer';
                element.addEventListener('click', () => verifierClic(id));
            }
        });
    };
}

// Fonction pour vérifier la réponse de l'utilisateur par clic
function verifierClic(clickedId) {
    const question = questionnaire[currentQuestionIndex];
    const feedbackDiv = document.getElementById("feedback");
    if (question.ids.includes(clickedId)) {
        feedbackDiv.textContent = "Bonne réponse!";
        feedbackDiv.style.color = "green";

        // Passer automatiquement à la question suivante après un délai
        setTimeout(() => {
            if (currentQuestionIndex < questionnaire.length - 1) {
                currentQuestionIndex++;
                afficherQuestion(currentQuestionIndex);
            }
        }, 2000);
    } else {
        feedbackDiv.textContent = "Mauvaise réponse. Réessayez.";
        feedbackDiv.style.color = "red";
    }
}

// Initialisation
afficherQuestion(currentQuestionIndex);
