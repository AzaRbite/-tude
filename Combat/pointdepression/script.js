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
            { nom: "Infra-orbital", ids: ["Infra-orbital"], synonymes: ["infraorbital"] },
            { nom: "Plexus brachial (origine)", ids: ["PlexusBrachialorigine", "PlexusBrachialorigine2"], synonymes: ["plexus brachial origine"] },
            { nom: "Jugulaire", ids: ["Jugulaire"], synonymes: ["jugulaire"] },
            { nom: "Médian", ids: ["Median", "Median2"], synonymes: ["median"] },
            { nom: "Fémoral", ids: ["Femoral", "Femoral2"], synonymes: ["femoral"] },
            { nom: "Tibial", ids: ["Tibial", "Tibial2"], synonymes: ["tibial"] },
            { nom: "Angle mandibulaire", ids: ["AngleMandibulaire", "AngleMandibulaire2"], synonymes: ["angle mandibulaire"] },
            { nom: "Hypoglosse", ids: ["Hypoglosse", "Hypoglosse2"], synonymes: ["hypoglosse"] },
            { nom: "Plexus brachial (clavicule)", ids: ["Plexusbracialclavicule", "Plexusbracialclavicule2"], synonymes: ["plexus brachial clavicule"] },
            { nom: "Plexus brachial (jonction)", ids: ["PlexusBrachialJonction", "PlexusBrachialJonction2"], synonymes: ["plexus brachial jonction"] },
            { nom: "Radial", ids: ["Radial", "Radial2"], synonymes: ["radial"] },
            { nom: "Cubital", ids: ["Cubital", "Cubital2"], synonymes: ["cubital"] },
            { nom: "Sciatique", ids: ["Sciatique", "Sciatique2"], synonymes: ["sciatique"] },
            { nom: "Derrière le lobe d'oreille", ids: ["LobeOreille", "LobeOreille2"], synonymes: ["lobe", "oreille", "lobe oreille"] },
            { nom: "Entre pouce et l'index sur la main", ids: ["Main", "Main2"], synonymes: ["main", "mains"] },
        ];

        const templatesDeQuestions = [
            { texte: (point) => `Cliquez sur le point ${point.nom}.`, type: "nommer" },
            { texte: () => "Identifiez le point rouge visible.", type: "identifier" },
            { texte: () => "Quel est ce point ?", type: "choix" },
        ];

        let questions = [];
        let currentQuestionIndex = 0;

        function manipulerPoint(pointId, estActif, visible = false) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = visible ? 1 : 0; // Affiche ou cache le point
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

            svgDoc.addEventListener("click", detecterMauvaiseReponse);
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

            switch (question.type) {
                case "nommer":
                    question.ids.forEach((id) => manipulerPoint(id, true, false));
                    afficherBoutonReponse(question);
                    break;

                case "identifier":
                    question.ids.forEach((id) => manipulerPoint(id, false, true));
                    ajouterZoneDeSaisie(question);
                    afficherBoutonReponse(question); // Ajout du bouton "Voir la réponse"
                    break;

                case "choix":
                    question.ids.forEach((id) => manipulerPoint(id, false, true));
                    afficherOptionsDeChoix(question);
                    break;

                default:
                    console.error("Type de question inconnu.");
            }
        }

        function afficherBoutonReponse(question) {
            const buttonReponse = document.createElement("button");
            buttonReponse.textContent = "Voir la réponse";
            buttonReponse.onclick = () => {
                question.ids.forEach((id) => manipulerPoint(id, true, true));
                donnerFeedback("Voici la réponse !", "#ff9800");
                setTimeout(avancerQuestion, 3000);
            };
            container.appendChild(buttonReponse);
        }

        function ajouterZoneDeSaisie(question) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Entrez le nom du point...";

            const button = document.createElement("button");
            button.textContent = "Valider";
            button.onclick = () => {
                const reponseCorrecte = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                );

                if (
                    reponseCorrecte &&
                    reponseCorrecte.synonymes.some(
                        (syn) => input.value.trim().toLowerCase() === syn.toLowerCase()
                    )
                ) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    setTimeout(avancerQuestion, 1500);
                } else {
                    donnerFeedback("Mauvaise réponse.", "#ff4c4c");
                }
            };

            container.appendChild(input);
            container.appendChild(button);
        }

        function afficherOptionsDeChoix(question) {
            const ul = document.createElement("ul");

            question.options.forEach((option) => {
                const li = document.createElement("li");
                li.textContent = option;
                li.onclick = () => {
                    if (option.toLowerCase() === pointsDePression.find((p) =>
                        question.ids.some((id) => p.ids.includes(id))
                    ).nom.toLowerCase()) {
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        setTimeout(avancerQuestion, 1500);
                    } else {
                        donnerFeedback("Mauvaise réponse.", "#ff4c4c");
                    }
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
                setTimeout(avancerQuestion, 1500);
            } else {
                donnerFeedback("Mauvaise réponse.", "#ff4c4c");
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

        genererQuestionsAleatoires(10);
        afficherQuestion(currentQuestionIndex);
    });
});
