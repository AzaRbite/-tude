document.addEventListener("DOMContentLoaded", function() {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        const svgDoc = svgObject.getSVGDocument();
        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }

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

        function activerPointSeul(id) {
            pointsDePression.forEach(point => {
                point.ids.forEach(pointId => manipulerPoint(pointId, false));
            });
            manipulerPoint(id, true);
        }

        let currentQuestionIndex = 0;

        const questions = [
            { 
                texte: "Cliquez sur le point Infra-orbital.",
                type: "nommer",
                id: "Infra-orbital"
            },
            { 
                texte: "Identifiez ce point et donnez son nom.",
                type: "identifier",
                id: "Tibial"
            },
            { 
                texte: "Quel est ce point ?",
                type: "choix",
                id: "Jugulaire",
                options: ["Infra-orbital", "Jugulaire", "Femoral", "Cubital"]
            }
        ];

        function afficherQuestion(index) {
            const container = document.getElementById("questionnaire");
            container.innerHTML = ""; 

            const question = questions[index];
            const questionDiv = document.createElement("div");
            questionDiv.textContent = question.texte;
            container.appendChild(questionDiv);

            const feedbackDiv = document.createElement("div");
            feedbackDiv.id = "feedback";
            container.appendChild(feedbackDiv);

            const questionCounter = document.getElementById("question-counter");
            questionCounter.textContent = `Question ${index + 1}/${questions.length}`;

            if (question.type === "nommer" || question.type === "identifier") {
                activerPointSeul(question.id);
            } else if (question.type === "choix") {
                activerPointSeul(question.id);
                afficherChoix(question);
            }
        }

        svgDoc.addEventListener("click", function(e) {
            const question = questions[currentQuestionIndex];
            if (question.type === "nommer" && e.target.id === question.id) {
                document.getElementById("feedback").textContent = "Bonne réponse !";
                document.getElementById("feedback").style.color = "#4caf50";
            } else if (question.type === "identifier" && e.target.id === question.id) {
                demanderNom(question);
            } else {
                document.getElementById("feedback").textContent = "Mauvaise réponse, réessayez !";
                document.getElementById("feedback").style.color = "#ff4c4c";
            }
        });

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = ""; // Efface les choix précédents
            question.options.forEach(option => {
                const button = document.createElement("button");
                button.textContent = option;
                button.onclick = () => {
                    if (option === pointsDePression.find(p => p.ids.includes(question.id)).nom) {
                        feedbackDiv.textContent = "Bonne réponse !";
                        feedbackDiv.style.color = "#4caf50";
                    } else {
                        feedbackDiv.textContent = "Mauvaise réponse, réessayez !";
                        feedbackDiv.style.color = "#ff4c4c";
                    }
                };
                feedbackDiv.appendChild(button);
            });
        }

        function demanderNom(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = ""; 

            const input = document.createElement("input");
            input.type = "text";
            feedbackDiv.appendChild(input);

            const button = document.createElement("button");
            button.textContent = "Valider";
            button.onclick = () => {
                const correctNom = pointsDePression.find(p => p.ids.includes(question.id)).nom;
                if (input.value.trim().toLowerCase() === correctNom.toLowerCase()) {
                    feedbackDiv.textContent = "Bonne réponse !";
                    feedbackDiv.style.color = "#4caf50";
                } else {
                    feedbackDiv.textContent = "Mauvaise réponse, réessayez !";
                    feedbackDiv.style.color = "#ff4c4c";
                }
            };
            feedbackDiv.appendChild(button);
        }

        afficherQuestion(currentQuestionIndex);

    });

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
});
