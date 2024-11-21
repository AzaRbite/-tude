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
                point.style.fill = 'red'; // Assurez-vous que la couleur est toujours rouge quand actif
                point.style.cursor = estActif ? 'pointer' : ''; // Change le curseur si actif
            } else {
                console.error(`ID de point non trouvé: ${pointId}`);
            }
        }

        function cacherTousLesPoints() {
            pointsDePression.forEach(point => {
                point.ids.forEach(id => manipulerPoint(id, false));
            });
        }

        cacherTousLesPoints(); // Assurez-vous que tous les points sont cachés au début

        let currentQuestionIndex = 0;

        const questions = [
            { 
                texte: "Cliquez sur le point Fémoral.",
                type: "nommer",
                ids: ["Femoral", "Femoral2"]
            },
            { 
                texte: "Identifiez le point rouge visible.",
                type: "identifier",
                ids: ["Tibial", "Tibial2"]
            },
            { 
                texte: "Quel est ce point ?",
                type: "choix",
                ids: ["Jugulaire"],
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

            cacherTousLesPoints(); // Cache tous les points avant d'afficher la question

            if (question.type === "nommer") {
                // Ne rien afficher au départ pour la question "nommer"
            } else if (question.type === "identifier" || question.type === "choix") {
                question.ids.forEach(id => manipulerPoint(id, true)); // Affiche les points pour la question actuelle
                if (question.type === "choix") {
                    afficherChoix(question);
                } else if (question.type === "identifier") {
                    demanderNom(question);
                }
            }
        }

        svgDoc.addEventListener("click", function(e) {
            const question = questions[currentQuestionIndex];
            if (question.ids.includes(e.target.id)) {
                donnerFeedback("Bonne réponse !", "#4caf50");
                if (question.type === "nommer") {
                    question.ids.forEach(id => manipulerPoint(id, true)); // Affiche le point seulement après le bon clic
                }
                avancerQuestion();
            } else {
                donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
            }
        });

        function donnerFeedback(message, couleur) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.textContent = message;
            feedbackDiv.style.color = couleur;
        }

        function avancerQuestion() {
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    afficherQuestion(currentQuestionIndex);
                }
            }, 3000);
        }

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = ""; // Efface les choix précédents
            question.options.forEach(option => {
                const button = document.createElement("button");
                button.textContent = option;
                button.onclick = () => {
                    if (option === pointsDePression.find(p => p.ids.includes(question.ids[0])).nom) {
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        avancerQuestion();
                    } else {
                        donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
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
                const correctNom = pointsDePression.find(p => question.ids.includes(p.ids[0])).nom;
                if (input.value.trim().toLowerCase() === correctNom.toLowerCase()) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    avancerQuestion();
                } else {
                    donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
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
