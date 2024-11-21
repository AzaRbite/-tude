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
            { nom: "Jugulaire", ids: ["Jugulaire"] },
            { nom: "Fémoral", ids: ["Femoral", "Femoral2"] },
            { nom: "Tibial", ids: ["Tibial", "Tibial2"] },
            { nom: "Cubital", ids: ["Cubital", "Cubital2"] },
        ];

        const questions = [
            {
                texte: "Cliquez sur le point Fémoral.",
                type: "nommer",
                ids: ["Femoral", "Femoral2"],
            },
            {
                texte: "Identifiez le point rouge visible.",
                type: "identifier",
                ids: ["Tibial", "Tibial2"],
            },
            {
                texte: "Quel est ce point ?",
                type: "choix",
                ids: ["Jugulaire"],
                options: ["Infra-orbital", "Jugulaire", "Fémoral", "Cubital"],
            },
        ];

        let currentQuestionIndex = 0;

        function manipulerPoint(pointId, estActif) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = estActif ? 1 : 0;
                point.style.fill = 'red';
                point.style.cursor = estActif ? 'pointer' : '';
            } else {
                console.error(`ID de point non trouvé: ${pointId}`);
            }
        }

        function cacherTousLesPoints() {
            pointsDePression.forEach((point) => {
                point.ids.forEach((id) => manipulerPoint(id, false));
            });
        }

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

            cacherTousLesPoints();

            if (question.type === "nommer") {
                svgDoc.addEventListener("click", gererCliqueNommer);
            } else if (question.type === "identifier") {
                question.ids.forEach((id) => manipulerPoint(id, true));
                afficherChampDeSaisie(question);
            } else if (question.type === "choix") {
                question.ids.forEach((id) => manipulerPoint(id, true));
                afficherChoix(question);
            }
        }

        function gererCliqueNommer(e) {
            const question = questions[currentQuestionIndex];
            if (question.type === "nommer" && question.ids.includes(e.target.id)) {
                donnerFeedback("Bonne réponse !", "#4caf50");
                question.ids.forEach((id) => manipulerPoint(id, true));
                avancerQuestion();
            } else {
                donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
            }
        }

        function afficherChampDeSaisie(question) {
            const feedbackDiv = document.getElementById("feedback");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Entrez votre réponse ici...";
            feedbackDiv.appendChild(input);

            const button = document.createElement("button");
            button.textContent = "Valider";
            button.onclick = () => {
                const reponse = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                ).nom;
                if (input.value.trim().toLowerCase() === reponse.toLowerCase()) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    avancerQuestion();
                } else {
                    donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
                }
            };
            feedbackDiv.appendChild(button);
        }

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            question.options.forEach((option) => {
                const button = document.createElement("button");
                button.textContent = option;
                button.onclick = () => {
                    const reponse = pointsDePression.find((p) =>
                        question.ids.some((id) => p.ids.includes(id))
                    ).nom;
                    if (option === reponse) {
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        avancerQuestion();
                    } else {
                        donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
                    }
                };
                feedbackDiv.appendChild(button);
            });
        }

        function donnerFeedback(message, couleur) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.textContent = message;
            feedbackDiv.style.color = couleur;
        }

        function avancerQuestion() {
            svgDoc.removeEventListener("click", gererCliqueNommer);
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    afficherQuestion(currentQuestionIndex);
                } else {
                    donnerFeedback("Quiz terminé !", "#4caf50");
                }
            }, 2000);
        }

        cacherTousLesPoints();
        afficherQuestion(currentQuestionIndex);
    });
});
