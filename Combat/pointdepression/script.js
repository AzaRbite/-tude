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
                point.ids.forEach((id) => manipulerPoint(id, false));
            });
            svgDoc.addEventListener("click", detecterMauvaiseReponse);
        }

      function afficherQuestion(index) {
    cacherTousLesPoints();

    // Vérifie si toutes les questions ont été affichées
    if (index >= questions.length) {
        container.innerHTML = "Quiz terminé ! Félicitations !";
        return;
    }

    const question = questions[index];

    // Met à jour le compteur
    compteur.textContent = `Question ${index + 1} sur ${questions.length}`;

    // Réinitialise le contenu du conteneur pour éviter d'avoir des éléments persistants
    container.innerHTML = "";

    // Affiche le texte de la question
    const questionDiv = document.createElement("div");
    questionDiv.textContent = question.texte;
    container.appendChild(questionDiv);

    // Ajoute une zone pour afficher les feedbacks
    const feedbackDiv = document.createElement("div");
    feedbackDiv.id = "feedback";
    container.appendChild(feedbackDiv);

    // Configure les éléments spécifiques à chaque type de question
switch (question.type) {
    case "nommer":
        question.ids.forEach((id) => manipulerPoint(id, true, false));
        ajouterZoneDeSaisie(question);
        afficherBoutonReponse(question);
        break;

case "identifier":
    question.ids.forEach((id) => manipulerPoint(id, false, true));
    container.querySelectorAll("input, button").forEach((el) => el.remove()); // Supprime les zones de saisie et boutons inutiles
    afficherBoutonReponse(question);
    break;

    case "choix":
        question.ids.forEach((id) => manipulerPoint(id, false, true));
        afficherOptionsDeChoix(question);
        break;

    default:
        console.error("Type de question inconnu.");
}
}

        function ajouterZoneDeSaisie(question) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Entrez le nom du point...";

            const button = document.createElement("button");
            button.textContent = "Valider";
            button.onclick = () => {
                const pointCorrect = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                );

                const reponseCorrecte = pointCorrect.nom.toLowerCase();
                const reponseEntree = input.value.trim().toLowerCase();

                if (reponseEntree === reponseCorrecte) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    question.ids.forEach((id) => manipulerPoint(id, true, true));
                    setTimeout(avancerQuestion, 1500);
                } else {
                    donnerFeedback("Mauvaise réponse.", "#ff4c4c");
                }
            };

            container.appendChild(input);
            container.appendChild(button);
        }

        function afficherBoutonReponse(question) {
            const buttonReponse = document.createElement("button");
            buttonReponse.textContent = "Voir la réponse";
            buttonReponse.onclick = () => {
                question.ids.forEach((id) => manipulerPoint(id, true, true));
                const nomDuPoint = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                ).nom;
                donnerFeedback(`Voici la réponse : ${nomDuPoint}`, "#ff9800");
                setTimeout(avancerQuestion, 3000);
            };
            container.appendChild(buttonReponse);
        }

        function afficherOptionsDeChoix(question) {
            const ul = document.createElement("ul");

            question.options.forEach((option) => {
                const li = document.createElement("li");
                li.textContent = option;

                li.onclick = () => {
                    const pointCorrect = pointsDePression.find((p) =>
                        question.ids.some((id) => p.ids.includes(id))
                    ).nom;

                    if (option.toLowerCase() === pointCorrect.toLowerCase()) {
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        question.ids.forEach((id) => manipulerPoint(id, true, true));
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
                currentQuestion.ids.forEach((id) => manipulerPoint(id, true, true));
                setTimeout(avancerQuestion, 1500);
            } else {
                donnerFeedback("Mauvaise réponse.", "#ff4c4c");
            }
        }

        function detecterMauvaiseReponse(event) {
            const pointClique = event.target.id;
            if (!pointsDePression.some((point) => point.ids.includes(pointClique))) {
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
            questions = [];
            for (let i = 0; i < nombre; i++) {
                const indexPoint = Math.floor(Math.random() * pointsDePression.length);
                const point = pointsDePression[indexPoint];

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
            }
        }

        genererQuestionsAleatoires(10);
        afficherQuestion(currentQuestionIndex);
    });
});
