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
            { texte: () => "Quel est le nom du point visible ?", type: "nommer" },
            { texte: (point) => `Identifiez le point rouge: ${point.nom}.`, type: "identifier" },
            { texte: () => "Quel est ce point ?", type: "choix" },
        ];

        let questions = [];
        let currentQuestionIndex = 0;

        function nettoyerZoneDeSaisie() {
            const elementsASupprimer = container.querySelectorAll("input, button, .reveal-button, ul.choice-container");
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
                container.innerHTML = "Quiz terminé ! Félicitations !";
                console.log("Quiz terminé.");
                return;
            }

            const question = questions[index];
            console.log(`Affichage de la question ${index + 1}: ${question.texte}`);

            compteur.textContent = `Question ${index + 1} sur ${questions.length}`;
            container.innerHTML = "";

            const questionDiv = document.createElement("div");
            questionDiv.textContent = typeof question.texte === "function" ? question.texte(pointsDePression[index]) : question.texte;
            container.appendChild(questionDiv);

            const feedbackDiv = document.createElement("div");
            feedbackDiv.id = "feedback";
            container.appendChild(feedbackDiv);

            switch (question.type) {
                case "nommer":
                    question.ids.forEach((id) => manipulerPoint(id, true, true));
                    ajouterZoneDeSaisieEtButton();
                    ajouterBoutonReponse(question);
                    break;

                case "identifier":
                    question.ids.forEach((id) => manipulerPoint(id, true, false));
                    ajouterBoutonReponse(question);
                    break;

                case "choix":
                    question.ids.forEach((id) => manipulerPoint(id, false, true));
                    afficherOptionsDeChoix(question);
                    break;

                default:
                    console.error("Type de question inconnu.");
            }
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

                ul.appendChild(li);
            });

            container.appendChild(ul);

            ajusterLargeurDesChoix();
        }

        function ajusterLargeurDesChoix() {
            const labels = container.querySelectorAll(".choice-container label");
            let maxWidth = 0;

            labels.forEach(label => {
                const labelWidth = label.scrollWidth;
                if (labelWidth > maxWidth) {
                    maxWidth = labelWidth;
                }
            });

            labels.forEach(label => {
                label.style.minWidth = `${maxWidth}px`;
            });

            console.log(`Largeur maximale ajustée : ${maxWidth}px`);
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

            console.log(`${questions.length} questions générées :`, questions);
        }

        genererQuestionsAleatoires(10);
        afficherQuestion(currentQuestionIndex);
    });
});
