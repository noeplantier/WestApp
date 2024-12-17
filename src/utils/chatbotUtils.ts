const CHATBOT_RESPONSES = {
  default: "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ?",
  greetings: [
    "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    "Salut ! Je suis là pour répondre à vos questions sur RencontreActive."
  ],
  activities: "Vous pouvez trouver des activités en utilisant la barre de recherche ou en filtrant par catégorie. Nous avons des activités dans toute la France !",
  premium: "Notre abonnement Premium vous offre des fonctionnalités exclusives comme l'accès illimité aux chat rooms, un badge premium, et plus encore !",
  chat: "Vous pouvez discuter avec d'autres participants dans le chat room de chaque activité. C'est un excellent moyen de faire connaissance avant l'événement !",
  help: "Je peux vous aider avec : la recherche d'activités, les fonctionnalités Premium, l'utilisation du chat, et plus encore. Que souhaitez-vous savoir ?"
};

export async function getBotResponse(input: string): Promise<string> {
  const normalizedInput = input.toLowerCase();

  if (normalizedInput.includes('bonjour') || normalizedInput.includes('salut')) {
    return CHATBOT_RESPONSES.greetings[Math.floor(Math.random() * CHATBOT_RESPONSES.greetings.length)];
  }

  if (normalizedInput.includes('activité') || normalizedInput.includes('événement')) {
    return CHATBOT_RESPONSES.activities;
  }

  if (normalizedInput.includes('premium') || normalizedInput.includes('abonnement')) {
    return CHATBOT_RESPONSES.premium;
  }

  if (normalizedInput.includes('chat') || normalizedInput.includes('message')) {
    return CHATBOT_RESPONSES.chat;
  }

  if (normalizedInput.includes('aide') || normalizedInput.includes('help')) {
    return CHATBOT_RESPONSES.help;
  }

  return CHATBOT_RESPONSES.default;
}