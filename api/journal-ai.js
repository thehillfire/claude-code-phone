import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.json({
      response: "Every entry you write here is an act of self-care. Keep showing up — your consistency is building something real. ☕",
    });
  }

  const { journalEntry, currentTier, level, streak, mood } = req.body;

  if (!journalEntry?.trim()) {
    return res.status(400).json({ error: 'No journal entry provided' });
  }

  try {
    const client = new Anthropic({ apiKey });

    const systemPrompt = `You are a warm, perceptive AI companion inside Elevated Espresso — a habit elevation app. Your role is to read what the user shares in their daily journal and respond with genuine encouragement, insight, or a gentle challenge. Be brief (2–3 sentences max), personal, and real — not generic. Reference their streak or tier only if it feels natural. Never be preachy.`;

    const userContent = [
      mood ? `Mood today: ${mood}` : '',
      `Tier: ${currentTier || 'First Light'} | Level: ${level ?? 0} | Streak: ${streak ?? 0} days`,
      `Journal entry: "${journalEntry}"`,
    ].filter(Boolean).join('\n');

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: 'user', content: userContent }],
    });

    return res.json({ response: message.content[0].text });
  } catch (err) {
    console.error('AI error:', err);
    return res.json({
      response: "Something felt right about sitting down and writing today. That's already a win. Keep going. 🌱",
    });
  }
}
