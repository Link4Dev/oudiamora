// Oudiamora Chatbot - FAQ Data
const chatbotFAQ = {
  "Qu'est-ce que Oudiamora ?": "Oudiamora est une initiative dédiée à l'accompagnement des Organisations de la Société Civile (OSC). Notre objectif est de faciliter l'appropriation des technologies numériques pour maximiser l'impact de vos projets communautaires.",
  
  "Quel est l'objectif principal ?": "Notre objectif est de permettre le passage d'une simple alphabétisation numérique vers une réelle maîtrise de l'intelligence artificielle (AI Fluency) pour le plaidoyer et la gestion de projets communautaires.",
  
  "Comment devenir membre ?": "Pour devenir membre d'Oudiamora, consultez la page 'Devenir membre' dans la section OSC Pilotes. Vous y trouverez toutes les informations nécessaires pour rejoindre notre initiative.",
  
  "Quels sont les avantages d'être membre ?": "En tant que membre, vous accédez à nos ressources exclusives, participez à nos formations sur l'IA et l'Open Data, et bénéficiez d'un accompagnement personnalisé.",
  
  "Quelles ressources sont disponibles ?": "Nous proposons : ressources Open Data, IA Génératives, et cas d'usage concrets. Visitez la section 'Ressources' pour explorer toutes nos offres.",
  
  "Qu'est-ce que l'Open Data ?": "L'Open Data est l'ouverture des données publiques et privées pour faciliter leur réutilisation. Ces données librement accessibles permettent aux OSC de mieux comprendre leurs contextes locaux.",
  
  "Qu'est-ce que l'IA Générative ?": "Les IA Génératives sont des technologies d'intelligence artificielle capables de générer du contenu nouveau : textes, images, code, etc. Elles offrent de nombreuses opportunités pour les OSC.",
  
  "Qu'est-ce que l'AI Fluency ?": "L'AI Fluency est la maîtrise réelle de l'intelligence artificielle pour le plaidoyer et la gestion de projets communautaires.",
  
  "Y a-t-il des événements prévus ?": "Oui ! Consultez notre page 'Sur notre agenda' pour connaître les événements à venir : formations, ateliers, webinaires, et conférences.",
  
  "Comment contacter Oudiamora ?": "Vous pouvez nous contacter via la page 'Contact'. Nous serons ravis de répondre à vos questions et de vous accompagner dans votre transformation numérique.",
  
  "Où puis-je trouver les définitions des concepts clés ?": "Consultez la page 'Les Concepts Clés (Lexique)' pour une définition complète des termes importants liés à l'IA et l'Open Data.",
  
  "Comment puis-je me tenir au courant des actualités ?": "Suivez notre section 'Actualités / Blog' pour les dernières nouvelles, articles, et annonces concernant Oudiamora."
};

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeChatbot();
});

function initializeChatbot() {
  // Create chatbot container
  const chatbotHTML = `
    <div id="chatbot-widget" class="chatbot-widget">
      <div class="chatbot-header">
        <span class="chatbot-title">Assistant Oudiamora</span>
        <button class="chatbot-close" onclick="toggleChatbot()">×</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="chatbot-input-area">
        <input 
          type="text" 
          id="chatbot-input" 
          class="chatbot-input" 
          placeholder="Posez votre question..." 
          onkeypress="handleChatInput(event)"
        />
        <button class="chatbot-send" onclick="sendChatMessage()">Envoyer</button>
      </div>
    </div>
    <button id="chatbot-button" class="chatbot-button" onclick="toggleChatbot()" title="Ouvrir le chat">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  `;
  
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  
  // Add initial greeting
  setTimeout(() => {
    addChatMessage("Bonjour! 👋 Je suis l'assistant Oudiamora. Comment puis-je vous aider aujourd'hui?", "bot");
  }, 500);
}

function toggleChatbot() {
  const widget = document.getElementById('chatbot-widget');
  const button = document.getElementById('chatbot-button');
  
  if (widget.classList.contains('open')) {
    widget.classList.remove('open');
    button.classList.remove('hidden');
  } else {
    widget.classList.add('open');
    button.classList.add('hidden');
    document.getElementById('chatbot-input').focus();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();
  
  if (message === '') return;
  
  addChatMessage(message, "user");
  input.value = '';
  
  // Find best matching response
  setTimeout(() => {
    const response = findBestResponse(message);
    addChatMessage(response, "bot");
  }, 500);
}

function handleChatInput(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function addChatMessage(text, sender) {
  const messagesDiv = document.getElementById('chatbot-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `chatbot-message chatbot-${sender}`;
  messageElement.innerHTML = `<div class="chatbot-text">${escapeHtml(text)}</div>`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function findBestResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Direct keyword matching
  for (const [question, answer] of Object.entries(chatbotFAQ)) {
    if (lowerMessage.includes(question.toLowerCase().substring(0, 10))) {
      return answer;
    }
  }
  
  // Fuzzy matching - check for key words
  const words = lowerMessage.split(' ');
  let bestMatch = null;
  let maxMatches = 0;
  
  for (const [question, answer] of Object.entries(chatbotFAQ)) {
    const questionWords = question.toLowerCase().split(' ');
    let matches = 0;
    
    for (const word of words) {
      if (word.length > 2) {
        for (const qWord of questionWords) {
          if (qWord.includes(word) || word.includes(qWord)) {
            matches++;
          }
        }
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = answer;
    }
  }
  
  if (bestMatch) {
    return bestMatch;
  }
  
  return "Je n'ai pas trouvé la réponse à votre question. 🤔 Veuillez consulter notre page <strong><a href='/oudiamora/contact/'>Contact</a></strong> pour nous joindre directement, ou explorez notre <strong><a href='/oudiamora/'>documentation</a></strong> pour plus d'informations.";
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
