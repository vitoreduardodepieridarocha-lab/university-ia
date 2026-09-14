function openWorld() {
  document.getElementById("world").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeWorld() {
  document.getElementById("world").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openChat() {
  document.getElementById("chat").classList.remove("hidden");
}

function closeChat() {
  document.getElementById("chat").classList.add("hidden");
}

async function sendMessage(e) {
  e.preventDefault();

  const input = document.getElementById("input");
  const box = document.getElementById("messages");
  const text = input.value.trim();

  if (!text) return;

  box.innerHTML += `
    <div class="msg user">${escapeHtml(text)}</div>
  `;

  input.value = "";

  const loading = document.createElement("div");
  loading.className = "msg ai";
  loading.textContent = "🤖 Pensando...";
  box.appendChild(loading);

  box.scrollTop = box.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    loading.remove();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao conversar com a IA");
    }

    box.innerHTML += `
      <div class="msg ai">${escapeHtml(data.reply)}</div>
    `;

  } catch (error) {
    loading.textContent = "❌ Não consegui falar com a IA. Vamos verificar a configuração.";
  }

  box.scrollTop = box.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char];
  });
}
