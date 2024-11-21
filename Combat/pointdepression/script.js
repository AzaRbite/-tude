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

        const templatesDeQuestions = [
            {
                texte: (point) => `Cliquez sur le point ${point.nom}.`,
                type: "nommer",
            },
            {
                texte: () => "Identifiez le point rouge visible.",
                type: "identifier",
            },
            {
                texte: () => "Quel est ce point ?",
                type: "choix",
            },
        ];

        let questions = [];
        let currentQuestionIndex = 0;

        function genererQuestionsAleatoires(nombre) {
            questions = [];
            for (let i = 0; i < nombre; i++) {
                const point = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
                const template = templatesDeQuestions[Math.floor(Math.random() * templatesDeQuestions.length)];

                const question = {
                    texte: typeof template.texte === "function" ? template.texte(point) : template.texte,
                    type: template.type,
                    ids: point.ids,
                };

                if (template.type === "choix") {
                    question.options = pointsDePression
                        .map((p) => p.nom)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3);
                    if (!question.options.includes(point.nom)) {
                        question.options.push(point.nom);
                    }
                    question.options.sort(() => Math.random() - 0.5);
                }

                questions.push(question);
            }
        }

        function manipulerPoint(pointId, estActif) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = estActif ? 1 : 0;
                point.style.fill = estActif ? 'red' : 'none';
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

            const compteur = document.getElementById("compteur");
            compteur.textContent = `Question ${index + 1} sur ${questions.length}`;

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
                avancerQuestion();
            } else {
                donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
            }
        }

        function afficherChampDeSaisie(question) {
            const feedbackDiv = document.getElementById("feedback");

            feedbackDiv.innerHTML = ""; // Reset feedback

            const inputContainer = document.createElement("div");
            inputContainer.id = "input-container";
            feedbackDiv.appendChild(inputContainer);

            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Entrez votre réponse ici...";
            inputContainer.appendChild(input);

            const button = document.createElement("button");
            button.textContent = "Valider";
            inputContainer.appendChild(button);

            button.onclick = () => {
                const pointCorrect = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                );

                const correctNoms = pointCorrect.nom.toLowerCase();
                const entreeUtilisateur = input.value.trim().toLowerCase();

                if (entreeUtilisateur === correctNoms) {
                    question.ids.forEach((id) => manipulerPoint(id, true));
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    avancerQuestion();
                } else {
                    donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
                }
            };
        }

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = "";

            question.options.forEach((option) => {
                const button = document.createElement("button");
                button.textContent = option;
                button.onclick = () => {
                    const reponseCorrecte = pointsDePression.find((p) =>
                        question.ids.some((id) => p.ids.includes(id))
                    ).nom;
                    if (option === reponseCorrecte) {
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

        genererQuestionsAleatoires(10); // Génère 10 questions aléatoires
        afficherQuestion(currentQuestionIndex);
    });
});
