document.addEventListener("DOMContentLoaded", function() {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();
        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }

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
            pointsDePression.forEach(point => {
                point.ids.forEach(id => manipulerPoint(id, false));
            });
        }

        cacherTousLesPoints();

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

            const questionCounter = document.createElement("div");
            questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
            container.appendChild(questionCounter);

            cacherTousLesPoints();

            if (question.type === "nommer") {
                console.log("Question de type 'nommer' affichée.");
                svgDoc.addEventListener("click", gererCliqueNommer);
            } else if (question.type === "identifier") {
                question.ids.forEach(id => manipulerPoint(id, true));
                afficherChampDeSaisie(question);
            } else if (question.type === "choix") {
                question.ids.forEach(id => manipulerPoint(id, true));
                afficherChoix(question);
            }
        }
        
        function gererCliqueNommer(e) {
            const question = questions[currentQuestionIndex];
            if (question.type === "nommer") {
                if (question.ids.includes(e.target.id)) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    question.ids.forEach(id => manipulerPoint(id, true));
                    avancerQuestion();
                } else {
                    donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
                }
            }
        }

        function afficherChampDeSaisie(question) {
            const feedbackDiv = document.getElementById("feedback");

            // Vérifier si le champ de saisie existe déjà pour ne pas le recréer
            let inputContainer = document.getElementById("input-container");
            if (!inputContainer) {
                inputContainer = document.createElement("div");
                inputContainer.id = "input-container"; // Ajouter un ID pour une identification facile
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Entrez votre réponse ici...";
                inputContainer.appendChild(input);

                const button = document.createElement("button");
                button.textContent = "Valider";
                button.onclick = () => {
                    const correctNoms = pointsDePression.find(p => question.ids.some(id => p.ids.includes(id))).nom.split(", ");
                    const entreeUtilisateur = input.value.trim().toLowerCase();
                    console.log("Validation de l'entrée: " + entreeUtilisateur);
                    if (correctNoms.some(nom => nom.trim().toLowerCase() === entreeUtilisateur)) {
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        avancerQuestion();
                    } else {
                        console.log("Entrée incorrecte donnée : " + input.value);
                        donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
                        input.value = ''; // Réinitialiser le champ de saisie, mais le laisser visible
                    }
                };
                inputContainer.appendChild(button);
                feedbackDiv.appendChild(inputContainer);
            }
            console.log("Question de type 'identifier' affichée avec champ de saisie.");
        }

        function donnerFeedback(message, couleur) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.textContent = message;
            feedbackDiv.style.color = couleur;
            console.log("Feedback: " + message);
        }

        function avancerQuestion() {
            svgDoc.removeEventListener("click", gererCliqueNommer);
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    afficherQuestion(currentQuestionIndex);
                }
            }, 3000);
        }

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = "";
            question.options.forEach(option => {
                const button = document.createElement("button");
                button.className = "reponse";
                button.textContent = option;
                button.onclick = () => {
                    if (option.toLowerCase() === pointsDePression.find(p => p.ids.includes(question.ids[0])).nom.toLowerCase()) {
                        donnerFeedback("Bonne réponse !", "#4caf50");
                        avancerQuestion();
                    } else {
                        donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
                    }
                };
                feedbackDiv.appendChild(button);
            });
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
