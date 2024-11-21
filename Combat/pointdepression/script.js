document.addEventListener("DOMContentLoaded", function() {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        const svgDoc = svgObject.getSVGDocument();
        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }

        // Fonction pour manipuler l'activation des points
        function manipulerPoint(pointId, estActif) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = estActif ? 1 : 0; // Affiche ou cache le point
                point.style.fill = estActif ? 'red' : ''; // Change la couleur si actif
                point.style.cursor = estActif ? 'pointer' : ''; // Change le curseur si actif
            } else {
                console.error(`ID de point non trouvé: ${pointId}`);
            }
        }

        // Fonction pour activer les points pour la question actuelle
        function activerPoints(ids) {
            ids.forEach(id => manipulerPoint(id, true));
        }

        // Désactiver tous les points au début
        pointsDePression.forEach(point => {
            point.ids.forEach(id => manipulerPoint(id, false));
        });

        // Afficher la première question
        afficherQuestion(currentQuestionIndex);

        // Fonction pour vérifier la réponse de l'utilisateur par clic
        svgDoc.addEventListener("click", function(e) {
            const question = questionnaire[currentQuestionIndex];
            if (question.ids.includes(e.target.id)) {
                document.getElementById("feedback").textContent = "Bonne réponse !";
                document.getElementById("feedback").style.color = "#4caf50";

                setTimeout(() => {
                    if (currentQuestionIndex < questionnaire.length - 1) {
                        currentQuestionIndex++;
                        afficherQuestion(currentQuestionIndex);
                    }
                }, 2000);
            } else {
                document.getElementById("feedback").textContent = "Mauvaise réponse, réessayez !";
                document.getElementById("feedback").style.color = "#ff4c4c";
            }
        });

    });

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
        { nom: "Sciatique", ids: ["Sciatique", "Sciatique2"] },
        { nom: "Derrière le lobe d'oreille", ids: ["LobeOreille", "LobeOreille2"] },
        { nom: "Entre pouce et l'index sur la main", ids: ["Main", "Main2"] }
    ];

    // Fonction pour générer un questionnaire de 10 questions
    function genererQuestionnaire() {
        let questions = [];
        for (let i = 0; i < 10; i++) {
            const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
            const question = {
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

        // Activer les points pour la question actuelle
        activerPoints(question.ids);
    }
});
