document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();
        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }

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
            { nom: "Entre pouce et l'index sur la main", ids: ["Main", "Main2"] },
        ];

        let currentQuestionIndex = 0;
        const maxQuestions = 10;

        function cacherTousLesPoints() {
            pointsDePression.forEach(point => {
                point.ids.forEach(id => {
                    const element = svgDoc.getElementById(id);
                    if (element) {
                        element.style.fillOpacity = 0;
                        element.style.cursor = "default";
                    }
                });
            });
        }

        function manipulerPoint(pointId, estActif) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = estActif ? 1 : 0;
                point.style.fill = "red";
                point.style.cursor = estActif ? "pointer" : "default";
            }
        }

        function afficherQuestion(index) {
            const container = document.getElementById("questionnaire");
            container.innerHTML = ""; // Réinitialiser le conteneur

            const feedbackDiv = document.createElement("div");
            feedbackDiv.id = "feedback";
            container.appendChild(feedbackDiv);

            const questionCounter = document.getElementById("question-counter");
            questionCounter.textContent = `Question ${index + 1}/${maxQuestions}`;

            const question = genererQuestionAleatoire();
            const questionDiv = document.createElement("div");
            questionDiv.textContent = question.texte;
            container.appendChild(questionDiv);

            cacherTousLesPoints();

            if (question.type === "nommer") {
                svgDoc.addEventListener("click", gererCliqueNommer);
            } else if (question.type === "identifier") {
                question.ids.forEach(id => manipulerPoint(id, true));
                svgDoc.addEventListener("click", gererCliqueIdentifier);
            } else if (question.type === "choix") {
                question.ids.forEach(id => manipulerPoint(id, true));
                afficherChoix(question);
            }

            // Sauvegarder la question active
            container.dataset.question = JSON.stringify(question);
        }

        function gererCliqueNommer(e) {
            const question = JSON.parse(document.getElementById("questionnaire").dataset.question);
            if (question.ids.includes(e.target.id)) {
                donnerFeedback("Bonne réponse !", "#4caf50");
                avancerQuestion();
            } else {
                donnerFeedback("Mauvaise réponse, essayez encore !", "#ff4c4c");
            }
        }

        function gererCliqueIdentifier(e) {
            const question = JSON.parse(document.getElementById("questionnaire").dataset.question);
            if (question.ids.includes(e.target.id)) {
                donnerFeedback("Bonne réponse !", "#4caf50");
                question.ids.forEach(id => manipulerPoint(id, true)); // Afficher le point correctement
                avancerQuestion();
            } else {
                donnerFeedback("Mauvaise réponse, essayez encore !", "#ff4c4c");
            }
        }

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = "";

            const ul = document.createElement("ul");
            ul.className = "choix-liste";

            question.options.forEach(option => {
                const li = document.createElement("li");
                li.textContent = option;

                li.onclick = () => {
                    if (option.toLowerCase() === pointsDePression.find(p => p.ids.includes(question.ids[0])).nom.toLowerCase()) {
                        li.classList.add("correct");
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        setTimeout(() => avancerQuestion(), 1500);
                    } else {
                        li.classList.add("wrong");
                        donnerFeedback("Mauvaise réponse. Essayez encore !", "#ff4c4c");
                    }
                };

                ul.appendChild(li);
            });

            feedbackDiv.appendChild(ul);
        }

        function donnerFeedback(message, couleur) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.textContent = message;
            feedbackDiv.style.color = couleur;
        }

        function avancerQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < maxQuestions) {
                afficherQuestion(currentQuestionIndex);
            } else {
                alert("Test terminé ! Bravo pour votre participation.");
            }
        }

        function genererQuestionAleatoire() {
            const types = ["nommer", "identifier", "choix"];
            const type = types[Math.floor(Math.random() * types.length)];

            const point = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
            const options = pointsDePression.map(p => p.nom);

            if (type === "nommer") {
                return {
                    texte: `Cliquez sur le point ${point.nom}.`,
                    type: "nommer",
                    ids: point.ids,
                };
            } else if (type === "identifier") {
                return {
                    texte: `Identifiez le point de pression rouge visible.`,
                    type: "identifier",
                    ids: point.ids,
                };
            } else if (type === "choix") {
                return {
                    texte: `Quel est ce point ?`,
                    type: "choix",
                    ids: point.ids,
                    options: melangerArray([point.nom, ...options.filter(o => o !== point.nom).slice(0, 3)]),
                };
            }
        }

        function melangerArray(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        afficherQuestion(currentQuestionIndex);
    });
});
