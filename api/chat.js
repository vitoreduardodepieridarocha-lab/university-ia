export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: "Responda apenas: conexão funcionando!"
      })
    });

    const data = await response.json();

    return res.status(200).json({
      resposta: data.output_text || JSON.stringify(data)
    });

  } catch (error) {
    return res.status(500).json({
      erro: error.message
    });
  }
}
