const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/NoePlantier/WestApp/facebook/blenderbot-400M-distill';
const API_KEY = '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'; 


interface WestAppResponse {
  response: string;
  suggestions?: string[];
}

const westAppResponses: Record<string, WestAppResponse> = {
  // Questions sur le concept
  'comment': {
    response: "WestApp est un réseau social unique qui favorise les rencontres dans la vie réelle ! Contrairement aux apps classiques, nous organisons des événements et activités pour que vous puissiez rencontrer naturellement des personnes qui partagent vos centres d'intérêt.",
    suggestions: ["Quels événements ?", "Comment participer ?", "C'est gratuit ?"]
  },
  'événement': {
    response: "Nous organisons régulièrement des événements variés : soirées jeux de société, randonnées, ateliers cuisine, séances de sport en groupe, afterworks... Consultez l'onglet 'Événements' pour voir ce qui est prévu près de chez vous !",
    suggestions: ["Comment s'inscrire ?", "Prix des événements", "Créer un événement"]
  },
  
  // Questions pratiques
  'inscription': {
    response: "Pour rejoindre WestApp, c'est simple : téléchargez l'app, créez votre profil en indiquant vos centres d'intérêt, et commencez à parcourir les événements près de chez vous. La vérification d'identité est requise pour garantir la sécurité de notre communauté.",
    suggestions: ["Vérification d'identité", "Centres d'intérêt", "Trouver des événements"]
  },
  'prix': {
    response: "L'inscription sur WestApp est gratuite ! Certains événements sont gratuits, d'autres peuvent être payants selon l'activité (entrée en boîte, resto, etc.). Les prix sont toujours clairement indiqués sur chaque événement.",
    suggestions: ["Voir les événements gratuits", "Comment payer ?", "Organiser un événement"]
  },
  
  // Sécurité et confiance
  'sécurité': {
    response: "Votre sécurité est notre priorité ! Tous les profils sont vérifiés, les événements sont modérés, et nous avons un système de notation après chaque rencontre. Notre équipe de modération est disponible 24/7.",
    suggestions: ["Signaler un problème", "Vérification d'identité", "Règles de conduite"]
  },
  'vérification': {
    response: "La vérification d'identité se fait en quelques minutes : prenez une photo de votre pièce d'identité et un selfie. Notre système vérifie automatiquement la correspondance. C'est rapide et 100% sécurisé !",
    suggestions: ["Politique de confidentialité", "Délai de vérification", "Support"]
  },
  
  // Organisation d'événements
  'organiser': {
    response: "Vous pouvez créer votre propre événement ! Cliquez sur '+' dans l'onglet Événements, décrivez votre activité, choisissez date et lieu, et définissez le nombre de participants. Notre équipe validera rapidement votre proposition.",
    suggestions: ["Types d'événements possibles", "Règles d'organisation", "Exemples d'événements"]
  },
  
  // Support et aide
  'problème': {
    response: "Je suis désolé que vous rencontriez un problème. Notre support est disponible 24/7 à support@westapp.com ou via le bouton 'Signaler' sur l'événement/profil concerné. Nous interviendrons rapidement !",
    suggestions: ["Contacter le support", "Règles de la communauté", "FAQ"]
  }
};

export async function getBotResponse(input: string): Promise<string> {
  try {
    // Vérifier d'abord les réponses spécifiques à WestApp
    const response = processWestAppResponse(input);
    if (response) return response;

    // Si aucune réponse spécifique, utiliser l'API HuggingFace
    const aiResponse = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        inputs: input,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          top_p: 0.9,
        }
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('Failed to get response from AI');
    }

    const data = await aiResponse.json();
    return processAIResponse(data[0].generated_text);
  } catch (error) {
    console.error('Error getting bot response:', error);
    return "Désolé, je rencontre des difficultés techniques. N'hésitez pas à contacter notre support à support@westapp.com";
  }
}

function processWestAppResponse(input: string): string | null {
  const normalizedInput = input.toLowerCase();
  
  for (const [keyword, responseObj] of Object.entries(westAppResponses)) {
    if (normalizedInput.includes(keyword)) {
      const suggestions = responseObj.suggestions 
        ? `\n\nVous pourriez aussi être intéressé par : ${responseObj.suggestions.join(", ")}`
        : '';
      return responseObj.response + suggestions;
    }
  }
  
  return null;
}

function processAIResponse(response: string): string {
  // Nettoyer et formater la réponse de l'IA
  let cleanedResponse = response
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .trim();
    
  // Ajouter un message d'encouragement à participer
  if (cleanedResponse.length > 0) {
    cleanedResponse += "\n\nN'hésitez pas à parcourir nos événements pour faire de belles rencontres ! 😊";
  }
  
  return cleanedResponse;
}