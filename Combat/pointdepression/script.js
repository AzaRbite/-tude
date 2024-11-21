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
                point.style.fill = estActif ? 'red' : ''; // Change la couleur si actif
                point.style.cursor = estActif ? 'pointer' : ''; // Change le curseur si actif
            } else {
                console.error(`ID de point non trouvé: ${pointId}`);
            }
        }

        function activerPoints(ids) {
            ids.forEach(id => manipulerPoint(id, true));
        }

        pointsDePression.forEach(point => {
            point.ids.forEach(id => manipulerPoint(id, false));
        });

        afficherQuestion(currentQuestionIndex);

        svgDoc.addEventListener("click", function(e) {
            const question = questionnaire[currentQuestionIndex];
            if (question.ids.includes(e.target.id)) {
                switch(question.type) {
                    case "nommer":
                        document.getElementById("feedback").textContent = "Bonne réponse !";
                        document.getElementById("feedback").style.color = "#4caf50";
                        break;
                    case "choix":
                        // Afficher les choix dans le feedback
                        afficherChoix(question);
                        break;
                    case "identifier":
                        demanderNom(question);
                        break;
                }

                setTimeout(() => {
                    if (currentQuestionIndex < questionnaire.length - 1) {
                        currentQuestionIndex++;
                        afficherQuestion(currentQuestionIndex);
                    }
                }, 2000);
            } else {
                document.getElementById("feedback").textContent = "Mauvaise réponse, réessayez !";
                document.getElementById("feedback").style.color = "#ff4c4c";
            }
        });

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

    function genererQuestionnaire() {
        let questions = [];
        for (let i = 0; i < 10; i++) {
            const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
            const typeQuestion = Math.floor(Math.random() * 3); // Choisir au hasard le type de question

            let question;
            switch(typeQuestion) {
                case 0: // Nommer le Point
                    question = {
                        texte: `Cliquez sur le point ${pointAleatoire.nom}.`,
                        type: "nommer",
                        ids: pointAleatoire.ids
                    };
                    break;
                case 1: // Choix de Réponse
                    const choix = genererChoix(pointAleatoire.nom);
                    question = {
                        texte: "Quel est ce point ?",
                        type: "choix",
                        ids: pointAleatoire.ids,
                        options: choix
                    };
                    break;
                case 2: // Identifier le Point
                    question = {
                        texte: "Identifiez ce point et donnez son nom.",
                        type: "identifier",
                        ids: pointAleatoire.ids
                    };
                    break;
            }
            questions.push(question);
        }
        return questions;
    }

    function genererChoix(correct, nombreChoix = 3) {
        const choix = new Set();
        choix.add(correct);
        while (choix.size < nombreChoix) {
            const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)].nom;
            choix.add(pointAleatoire);
        }
        return Array.from(choix).sort();
    }

    let currentQuestionIndex = 0;
    const questionnaire = genererQuestionnaire();

    function afficherQuestion(index) {
        const container = document.getElementById("questionnaire");
        container.innerHTML = ""; 

        const question = questionnaire[index];
        const questionDiv = document.createElement("div");
        questionDiv.textContent = question.texte;
        container.appendChild(questionDiv);

        const feedbackDiv = document.createElement("div");
        feedbackDiv.id = "feedback";
        container.appendChild(feedbackDiv);

        const questionCounter = document.getElementById("question-counter");
        questionCounter.textContent = `Question ${index + 1}/${questionnaire.length}`;

        activerPoints(question.ids);
    }

    function afficherChoix(question) {
        const feedbackDiv = document.getElementById("feedback");
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.onclick = () => {
                if (option === pointsDePression.find(p => p.ids.includes(question.ids[0])).nom) {
                    feedbackDiv.textContent = "Bonne réponse !";
                    feedbackDiv.style.color = "#4caf50";
                } else {
                    feedbackDiv.textContent = "Mauvaise réponse, réessayez !";
                    feedbackDiv.style.color = "#ff4c4c";
                }
            };
            feedbackDiv.appendChild(button);
        });
    }

    function demanderNom(question) {
        const feedbackDiv = document.getElementById("feedback");
        const input = document.createElement("input");
        input.type = "text";
        const button = document.createElement("button");
        button.textContent = "Valider";
        button.onclick = () => {
            if (input.value.trim().toLowerCase() === pointsDePression.find(p => p.ids.includes(question.ids[0])).nom.toLowerCase()) {
                feedbackDiv.textContent = "Bonne réponse !";
                feedbackDiv.style.color = "#4caf50";
            } else {
                feedbackDiv.textContent = "Mauvaise réponse, réessayez !";
                feedbackDiv.style.color = "#ff4c4c";
            }
        };
        feedbackDiv.appendChild(input);
        feedbackDiv.appendChild(button);
    }
});
