document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();
        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }
        console.log("SVG chargé et accessible.");

        const compteur = document.getElementById("compteur");
        const container = document.getElementById("questionnaire");

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

        let questions = [];
        let currentQuestionIndex = 0;

        function manipulerPoint(pointId, estActif) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = 0; // Toujours caché par défaut
                point.style.fill = "red";
                point.style.cursor = estActif ? "pointer" : "default";

                if (estActif) {
                    point.addEventListener("click", verifierReponse);
                } else {
                    point.removeEventListener("click", verifierReponse);
                }
            } else {
                console.error(`ID de point non trouvé dans le SVG : ${pointId}`);
            }
        }

        function cacherTousLesPoints() {
            pointsDePression.forEach((point) => {
                point.ids.forEach((id) => manipulerPoint(id, false));
            });

            // Retire les mauvaises réponses globales
            svgDoc.removeEventListener("click", detecterMauvaiseReponse);
        }

        function afficherQuestion(index) {
            cacherTousLesPoints();

            if (index >= questions.length) {
                container.innerHTML = "Quiz terminé ! Félicitations !";
                return;
            }

            const question = questions[index];
            compteur.textContent = `Question ${index + 1} sur ${questions.length}`;
            container.innerHTML = "";

            const questionDiv = document.createElement("div");
            questionDiv.textContent = question.texte;
            container.appendChild(questionDiv);

            const feedbackDiv = document.createElement("div");
            feedbackDiv.id = "feedback";
            container.appendChild(feedbackDiv);

            // Rendre les points interactifs
            question.ids.forEach((id) => manipulerPoint(id, true));

            // Ajoute un clic global pour détecter les mauvaises réponses
            svgDoc.addEventListener("click", detecterMauvaiseReponse);

            afficherBoutonReponse(question);
        }

        function afficherBoutonReponse(question) {
            const buttonReponse = document.createElement("button");
            buttonReponse.textContent = "Voir la réponse";
            buttonReponse.onclick = () => {
                question.ids.forEach((id) => manipulerPoint(id, true));
                donnerFeedback("Voici la réponse !", "#ff9800");
                setTimeout(avancerQuestion, 3000);
            };
            container.appendChild(buttonReponse);
        }

        function verifierReponse(event) {
            const clickedId = event.target.id;
            const question = questions[currentQuestionIndex];

            if (question.ids.includes(clickedId)) {
                donnerFeedback("Bonne réponse !", "#4caf50");
                setTimeout(avancerQuestion, 1500);
            } else {
                donnerFeedback("Mauvaise réponse !", "#ff4c4c");
            }
        }

        function detecterMauvaiseReponse(event) {
            const clickedId = event.target.id;
            const question = questions[currentQuestionIndex];

            if (!question.ids.includes(clickedId)) {
                donnerFeedback("Mauvaise réponse !", "#ff4c4c");
            }
        }

        function donnerFeedback(message, couleur) {
            const feedback = document.getElementById("feedback");
            if (feedback) {
                feedback.textContent = message;
                feedback.style.color = couleur;
            }
        }

        function avancerQuestion() {
            currentQuestionIndex++;
            afficherQuestion(currentQuestionIndex);
        }

        function genererQuestionsAleatoires(nombre) {
            const tempPoints = [...pointsDePression];
            questions = [];
            while (questions.length < nombre && tempPoints.length > 0) {
                const indexPoint = Math.floor(Math.random() * tempPoints.length);
                const point = tempPoints.splice(indexPoint, 1)[0];

                questions.push({
                    texte: `Cliquez sur le point ${point.nom}.`,
                    ids: point.ids,
                });
            }
        }

        genererQuestionsAleatoires(10);
        afficherQuestion(currentQuestionIndex);
    });
});
