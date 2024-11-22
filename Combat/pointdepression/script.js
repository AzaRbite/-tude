document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();
        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }

        const compteur = document.getElementById("compteur");
        const container = document.getElementById("questionnaire");
        const pointsDePression = [
            { nom: "Infra-orbital", ids: ["Infra-orbital"], reponses: ["infra-orbital", "infra"] },
            { nom: "Plexus brachial (origine)", ids: ["PlexusBrachialorigine", "PlexusBrachialorigine2"], reponses: ["plexus brachial origine", "plexus brachial", "brachial origine"] },
            { nom: "Jugulaire", ids: ["Jugulaire"], reponses: ["jugulaire"] },
            { nom: "Médian", ids: ["Median", "Median2"], reponses: ["médian", "median"] },
            { nom: "Fémoral", ids: ["Femoral", "Femoral2"], reponses: ["fémoral", "femoral", "femur"] },
            { nom: "Tibial", ids: ["Tibial", "Tibial2"], reponses: ["tibial"] },
            { nom: "Angle mandibulaire", ids: ["AngleMandibulaire", "AngleMandibulaire2"], reponses: ["angle mandibulaire", "mandibulaire"] },
            { nom: "Hypoglosse", ids: ["Hypoglosse", "Hypoglosse2"], reponses: ["hypoglosse"] },
            { nom: "Plexus brachial (clavicule)", ids: ["Plexusbracialclavicule", "Plexusbracialclavicule2"], reponses: ["plexus brachial clavicule", "plexus brachial", "brachial clavicule"] },
            { nom: "Plexus brachial (jonction)", ids: ["PlexusBrachialJonction", "PlexusBrachialJonction2"], reponses: ["plexus brachial jonction", "plexus brachial", "brachial jonction"] },
            { nom: "Radial", ids: ["Radial", "Radial2"], reponses: ["radial"] },
            { nom: "Cubital", ids: ["Cubital", "Cubital2"], reponses: ["cubital"] },
            { nom: "Sciatique", ids: ["Sciatique", "Sciatique2"], reponses: ["sciatique"] },
            { nom: "Derrière le lobe d'oreille", ids: ["LobeOreille", "LobeOreille2"], reponses: ["lobe oreille", "oreille", "lobe"] },
            { nom: "Entre pouce et l'index sur la main", ids: ["Main", "Main2"], reponses: ["main", "mains", "pouce", "index"] },
        ];

        const templatesDeQuestions = [
            { texte: () => "Quel est le nom du point visible ?", type: "nommer" },
            { texte: (point) => `Identifiez le point rouge: ${point.nom}.`, type: "identifier" },
            { texte: () => "Quel est ce point ?", type: "choix" },
        ];

        let questions = [];
        let currentQuestionIndex = 0;
        let pointsUtilisesRecents = [];
        let nombreDErreurs = 0;

        function nettoyerZoneDeSaisie() {
            const elementsASupprimer = container.querySelectorAll("input, button, .reveal-button");
            elementsASupprimer.forEach((el) => el.remove());
            console.log("Zone de saisie nettoyée.");
        }

        function manipulerPoint(pointId, estActif, visible = false) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = visible ? 1 : 0;
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
                point.ids.forEach((id) => manipulerPoint(id, false, false));
            });
            console.log("Tous les points sont cachés.");
        }

        function afficherQuestion(index) {
            nettoyerZoneDeSaisie();
            cacherTousLesPoints();
            if (index >= questions.length) {
                terminerQuiz();
                return;
            }

            const question = questions[index];
            console.log(`Affichage de la question ${index + 1}: ${question.texte}`);
            compteur.textContent = `Question ${index + 1} sur ${questions.length}`;
            container.innerHTML = ""; // Nettoyage du conteneur

            const questionDiv = document.createElement("div");
            questionDiv.textContent = typeof question.texte === "function" ? question.texte(pointsDePression[index]) : question.texte;
            container.appendChild(questionDiv);

            const feedbackDiv = document.createElement("div");
            feedbackDiv.id = "feedback";
            container.appendChild(feedbackDiv);

            if (question.type === "identifier") {
                svgDoc.addEventListener("click", detecterMauvaiseReponse);
            }

            switch (question.type) {
                case "nommer":
                    console.log("Type de question: nommer");
                    question.ids.forEach((id) => manipulerPoint(id, true, true));
                    ajouterZoneDeSaisieEtButton();
                    break;
                case "identifier":
                    console.log("Type de question: identifier");
                    question.ids.forEach((id) => manipulerPoint(id, true, false));
                    ajouterBoutonReponse(question);
                    break;
                case "choix":
                    console.log("Type de question: choix");
                    question.ids.forEach((id) => manipulerPoint(id, false, true));
                    afficherOptionsDeChoix(question);
                    break;
                default:
                    console.error("Type de question inconnu.");
            }
        }

        function ajouterZoneDeSaisieEtButton() {
            console.log("Ajout de la zone de saisie pour le type nommer.");
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Entrez le nom du point...";
            const button = document.createElement("button");
            button.textContent = "Valider";
            button.onclick = () => {
                const currentQuestion = questions[currentQuestionIndex];
                const pointData = pointsDePression.find((p) =>
                    currentQuestion.ids.some((id) => p.ids.includes(id))
                );
                if (pointData.reponses.some(r => r.toLowerCase() === input.value.trim().toLowerCase())) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    currentQuestion.ids.forEach((id) => manipulerPoint(id, true, true));
                    setTimeout(avancerQuestion, 1500);
                } else {
                    donnerFeedback("Mauvaise réponse.", "#ff4c4c");
                    nombreDErreurs++;
                }
            };

            container.appendChild(input);
            container.appendChild(button);
        }

        function ajouterBoutonReponse(question) {
            const buttonReponse = document.createElement("button");
            buttonReponse.textContent = "Voir la réponse";
            buttonReponse.classList.add("reveal-button");
            buttonReponse.onclick = () => {
                const reponseCorrecte = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                ).nom;

                if (question.type === "identifier") {
                    question.ids.forEach((id) => manipulerPoint(id, true, true));
                    svgDoc.removeEventListener("click", detecterMauvaiseReponse);
                } else if (question.type === "nommer") {
                    const input = container.querySelector("input");
                    if (input) {
                        input.value = reponseCorrecte;
                    }
                }

                setTimeout(avancerQuestion, 2000);
            };

            container.appendChild(buttonReponse);
        }

        function afficherOptionsDeChoix(question) {
            const ul = document.createElement("ul");
            ul.classList.add("choice-container");
            question.options.forEach((option) => {
                const li = document.createElement("li");
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "choix";
                radio.value = option;
                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                li.appendChild(label);
                label.onclick = () => {
                    if (!label.classList.contains("handled")) { // Vérifie si déjà cliqué
                        const pointCorrect = pointsDePression.find((p) =>
                            question.ids.some((id) => p.ids.includes(id))
                        ).nom;
                        if (option.toLowerCase() === pointCorrect.toLowerCase()) {
                            label.classList.add("correct");
                            donnerFeedback("Bonne réponse !", "#4caf50");
                            question.ids.forEach((id) => manipulerPoint(id, true, true));
                            setTimeout(avancerQuestion, 1500);
                        } else {
                            label.classList.add("wrong");
                            donnerFeedback("Mauvaise réponse.", "#ff4c4c");
                            nombreDErreurs++;
                        }
                    }
                    label.classList.add("handled"); // Marque comme déjà cliqué
                };
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }

        function verifierReponse(event) {
            const targetId = event.target.id;
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion.ids.includes(targetId)) {
                donnerFeedback("Bonne réponse !", "#4caf50");
                currentQuestion.ids.forEach((id) => manipulerPoint(id, true, true));
                setTimeout(avancerQuestion, 1500);
            } else {
                donnerFeedback("Mauvaise réponse.", "#ff4c4c");
                nombreDErreurs++;
            }
        }

        function detecterMauvaiseReponse(event) {
            const target = event.target;
            const currentQuestion = questions[currentQuestionIndex];
            if (!currentQuestion.ids.includes(target.id) && target.closest('svg')) {
                donnerFeedback("Mauvaise réponse !", "#ff4c4c");
                nombreDErreurs++;
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

        function terminerQuiz() {
            container.innerHTML = `Quiz terminé ! Félicitations ! Nombre d'erreurs : ${nombreDErreurs}`;
            compteur.textContent = ``; // Effacez le compteur
            svgObject.style.display = "none"; // Cachez le SVG

            const restartButton = document.createElement("button");
            restartButton.textContent = "Recommencer";
            restartButton.onclick = () => {
                svgObject.style.display = "block"; // Remet le SVG
                currentQuestionIndex = 0;
                nombreDErreurs = 0;
                genererQuestionsAleatoires(10);
                afficherQuestion(currentQuestionIndex);
            };

            container.appendChild(restartButton);
        }

        function genererQuestionsAleatoires(nombre) {
            questions = [];
            pointsUtilisesRecents = [];

            for (let i = 0; i < nombre; i++) {
                let indexPoint;
                let point;
                let attempts = 0;
                do {
                    indexPoint = Math.floor(Math.random() * pointsDePression.length);
                    point = pointsDePression[indexPoint];
                    attempts++;
                } while (pointsUtilisesRecents.includes(point.nom) && attempts < 100);

                const templateIndex = Math.floor(Math.random() * templatesDeQuestions.length);
                const template = templatesDeQuestions[templateIndex];
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
                pointsUtilisesRecents.push(point.nom);

                if (pointsUtilisesRecents.length > 5) {
                    pointsUtilisesRecents.shift();
                }
            }

            console.log(`${questions.length} questions générées :`, questions);
        }

        genererQuestionsAleatoires(10);
        afficherQuestion(currentQuestionIndex);
    });
});
