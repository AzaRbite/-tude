// Liste des points de pression et leurs IDs
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
    { nom: "Sciatique", ids: ["Sciatique", "Sciatique"] },
    { nom: "Derrière le lobe d'oreille", ids: ["LobeOreille", "LobeOreille2"] },
    { nom: "Entre pouce et l'index sur la main", ids: ["Main", "Main2"] }
];

// Fonction pour générer une question aléatoire
function genererQuestionAleatoire() {
    const typeQuestion = Math.floor(Math.random() * 3);
    const pointAleatoire = pointsDePression[Math.floor(Math.random() * pointsDePression.length)];
    
    switch(typeQuestion) {
        case 0: // Nommer le Point
            console.log(`Nommez le point ${pointAleatoire.nom}.`);
            // Logique pour cliquer sur le point dans le SVG
            break;
        case 1: // Identifier un Point
            console.log(`Identifiez ce point de pression.`);
            // Logique pour mettre en évidence le point dans le SVG et demander la saisie
            break;
        case 2: // Choix de Réponse
            console.log(`Quel est ce point ?`);
            // Logique pour mettre en évidence le point et proposer des choix
            break;
    }
}

// Appel de la fonction pour tester
genererQuestionAleatoire();
