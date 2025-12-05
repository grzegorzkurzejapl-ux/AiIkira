const chat = document.getElementById("chat");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const teachForm = document.getElementById("teach-form");
const promptInput = document.getElementById("prompt-input");
const responseInput = document.getElementById("response-input");
const template = document.getElementById("message-template");

const STORAGE_KEY = "ikira_memories";

function loadMemories() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Impossible de charger les souvenirs", error);
    return [];
  }
}

let memories = loadMemories();

function persistMemories() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

function formatTime(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function addMessage({ sender, text, tone }) {
  const node = template.content.cloneNode(true);
  const article = node.querySelector("article");
  const senderEl = node.querySelector(".sender");
  const timeEl = node.querySelector(".time");
  const bubble = node.querySelector(".bubble");

  article.classList.add(tone === "ikira" ? "ikira" : "user");
  senderEl.textContent = sender;
  timeEl.textContent = formatTime(new Date());
  bubble.textContent = text;

  chat.appendChild(node);
  chat.scrollTop = chat.scrollHeight;
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findBestMemory(message) {
  const normalizedMessage = normalize(message);
  let best = { score: 0, memory: null };

  for (const memory of memories) {
    const normalizedPrompt = normalize(memory.prompt);
    const words = new Set(normalizedPrompt.split(" "));

    let score = 0;
    for (const word of normalizedMessage.split(" ")) {
      if (words.has(word)) {
        score += 1;
      }
    }

    if (score > best.score) {
      best = { score, memory };
    }
  }

  return best.memory;
}

function craftIkiraResponse(message) {
  const memory = findBestMemory(message);
  if (memory) {
    return memory.response;
  }

  return "Je t'écoute attentivement. Si tu veux, apprends-moi comment répondre à ce message en remplissant le formulaire à droite.";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  addMessage({ sender: "Vous", text, tone: "user" });
  messageInput.value = "";

  const reply = craftIkiraResponse(text);
  setTimeout(() => {
    addMessage({ sender: "Ikira", text: reply, tone: "ikira" });
  }, 150);
}

function handleTeachSubmit(event) {
  event.preventDefault();
  const prompt = promptInput.value.trim();
  const response = responseInput.value.trim();
  if (!prompt || !response) return;

  memories.unshift({ prompt, response });
  persistMemories();

  addMessage({
    sender: "Ikira",
    text: "Merci ! J'ai ajouté cette réponse à mes souvenirs.",
    tone: "ikira",
  });

  promptInput.value = "";
  responseInput.value = "";
  promptInput.focus();
}

function bootstrap() {
  addMessage({
    sender: "Ikira",
    text: "Salut ! Je suis prête à discuter. Tu peux aussi m'apprendre de nouvelles réponses à droite.",
    tone: "ikira",
  });
}

messageForm.addEventListener("submit", handleMessageSubmit);
teachForm.addEventListener("submit", handleTeachSubmit);
bootstrap();
