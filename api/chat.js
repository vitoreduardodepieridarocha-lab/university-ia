export default async function handler(req, res) {
if (req.method !== "POST") {
return res.status(405).json({
error: "Método não permitido"
});
}

try {
const { message } = req.body || {};

if (!message) {
  return res.status(400).json({
    error: "Mensagem não enviada"
  });
}

if (!process.env.OPENAI_API_KEY) {
  return res.status(500).json({
    error: "OPENAI_API_KEY não configurada na Vercel"
  });
}

const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + process.env.OPENAI_API_KEY
  },
  body: JSON.stringify({
    model: "gpt-5-mini",
    input: message
  })
});

const data = await response.json();

if (!response.ok) {
  return res.status(response.status).json({
    error: data.error?.message || "Erro na API da OpenAI"
  });
}

return res.status(200).json({
  reply: data.output_text || "Não consegui gerar uma resposta."
});

} catch (error) {
return res.status(500).json({
error: error.message || "Erro interno do servidor"
});
}
}
