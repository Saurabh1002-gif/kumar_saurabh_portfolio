// Vercel serverless function: powers the "talk to my AI" chatbot.
// Needs ANTHROPIC_API_KEY in Vercel > Project Settings > Environment Variables.
import { buildSystemPrompt } from "../src/data/knowledge.js";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST." });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(503).json({ error: "The AI is not configured yet." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    let messages = Array.isArray(body.messages) ? body.messages : [];

    messages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));

    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return res.status(400).json({ error: "Send a question first." });
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 450,
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!r.ok) {
      return res.status(502).json({ error: "The AI could not answer right now." });
    }

    const data = await r.json();
    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return res.status(200).json({ reply: reply || "Sorry, I have no answer for that." });
  } catch (e) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}
