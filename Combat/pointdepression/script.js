document.addEventListener("DOMContentLoaded", function () {
    const svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function () {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();

        if (!svgDoc) {
            console.error("Impossible de charger le document SVG.");
            return;
        }

        // Attacher un écouteur d'événement à chaque élément de l'arbre SVG
        function attacherEcouteursAchaqueElement() {
            const elements = svgDoc.querySelectorAll('*');
            elements.forEach((element) => {
                const elementId = element.getAttribute('id');
                if (elementId) {
                    element.addEventListener("click", gererCliqueNommer);
                    console.log(`Écouteur attaché à l'élément avec ID : ${elementId}`);
                }
            });
        }

        const compteur = document.getElementById("compteur");
        if (!compteur) {
            console.error("Élément 'compteur' introuvable dans le DOM.");
            return;
        }

        const container = document.getElementById("questionnaire");
        if (!container) {
            console.error("Élément 'questionnaire' introuvable dans le DOM.");
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
            { texte: (point) => `Cliquez sur le point ${point.nom}.`, type: "nommer" },
            { texte: () => "Identifiez le point rouge visible.", type: "identifier" },
            { texte: () => "Quel est ce point ?", type: "choix" },
        ];

        let questions = [];
        let currentQuestionIndex = 0;
        let dernierPoint = null;

        function genererQuestionsAleatoires(nombre) {
            const tempPoints = [...pointsDePression];
            questions = [];
            while (questions.length < nombre && tempPoints.length > 0) {
                const indexPoint = Math.floor(Math.random() * tempPoints.length);
                const point = tempPoints[indexPoint];

                if (point === dernierPoint) continue;

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
                dernierPoint = point;

                tempPoints.splice(indexPoint, 1);

                if (tempPoints.length === 0 && questions.length < nombre) {
                    tempPoints.push(...pointsDePression);
                }
            }
        }

        function manipulerPoint(pointId, estActif) {
            const point = svgDoc.getElementById(pointId);
            if (point) {
                point.style.fillOpacity = estActif ? 1 : 0;
                point.style.fill = estActif ? "red" : "none";
                point.style.cursor = estActif ? "pointer" : "default";
            } else {
                console.error(`ID de point non trouvé dans le SVG : ${pointId}`);
            }
        }

        function cacherTousLesPoints() {
            pointsDePression.forEach((point) => {
                point.ids.forEach((id) => manipulerPoint(id, false));
            });
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

            if (question.type === "nommer") {
                // Caché par défaut, il s'affichera après un clic correct
            } else if (question.type === "identifier") {
                question.ids.forEach((id) => manipulerPoint(id, true));
                afficherChampDeSaisie(question);
            } else if (question.type === "choix") {
                question.ids.forEach((id) => manipulerPoint(id, true));
                afficherChoix(question);
            }
        }

function gererCliqueNommer(e) {
    let cible = e.target;
    let cibleId = cible.getAttribute('id');

    // Vérifier si l'événement est capturé au niveau de l'élément correct
    while (!cibleId && cible.parentElement) {
        cible = cible.parentElement;
        cibleId = cible.getAttribute('id');
    }

    console.log("Élément cliqué avec ID:", cibleId); // Debug

    if (cibleId && questions[currentQuestionIndex].ids.includes(cibleId)) {
        questions[currentQuestionIndex].ids.forEach(id => manipulerPoint(id, true)); // Affiche le point rouge
        donnerFeedback("Bonne réponse !", "#4caf50");
        setTimeout(avancerQuestion, 1500);
    } else {
        donnerFeedback("Mauvaise réponse, réessayez !", "#ff4c4c");
    }
}

        function afficherChampDeSaisie(question) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Entrez votre réponse...";

            const button = document.createElement("button");
            button.textContent = "Valider";
            button.onclick = () => {
                const reponseCorrecte = pointsDePression.find((p) =>
                    question.ids.some((id) => p.ids.includes(id))
                ).nom;
                if (input.value.trim().toLowerCase() === reponseCorrecte.toLowerCase()) {
                    donnerFeedback("Bonne réponse !", "#4caf50");
                    avancerQuestion();
                } else {
                    donnerFeedback("Mauvaise réponse. Réessayez.", "#ff4c4c");
                }
            };

            container.appendChild(input);
            container.appendChild(button);
        }

        function afficherChoix(question) {
            const feedbackDiv = document.getElementById("feedback");
            feedbackDiv.innerHTML = ""; // Réinitialiser le feedback

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

        // Attacher les écouteurs à chaque élément dès le début
        attacherEcouteursAchaqueElement();
        genererQuestionsAleatoires(10);
        afficherQuestion(currentQuestionIndex);
    });
});
