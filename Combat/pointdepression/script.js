// Message de confirmation pour vérifier l'application du script
console.log("Le script JavaScript est bien chargé et s'exécute.");

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

// Affichage du questionnaire dans la page
const divQuestionnaire = document.getElementById("questionnaire");
const questionnaire = genererQuestionnaire();

questionnaire.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.textContent = `Question ${index + 1}: ${question.texte}`;
    divQuestionnaire.appendChild(questionDiv);

    if (question.type === "choix") {
        const optionsDiv = document.createElement("div");
        optionsDiv.textContent = `Options: ${question.options.join(", ")}`;
        divQuestionnaire.appendChild(optionsDiv);
    }

    divQuestionnaire.appendChild(document.createElement("br"));
});
