import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadPrompt(name) {
  return fs.readFileSync(path.join(__dirname, '../prompts', `${name}.md`), 'utf8');
}

export async function complete({ system, messages, model, maxTokens = 1024 }) {
  const provider = process.env.LLM_PROVIDER || 'anthropic';
  const apiKey = provider === 'openai' ? process.env.OPENAI_API_KEY : process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return null;
  }

  if (provider === 'openai') {
    return completeOpenAI({ system, messages, model: model || process.env.LLM_MODEL_SYNTH, maxTokens, apiKey });
  }
  return completeAnthropic({ system, messages, model: model || process.env.LLM_MODEL_SYNTH, maxTokens, apiKey });
}

async function completeAnthropic({ system, messages, model, maxTokens, apiKey }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic error: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text || '';
}

async function completeOpenAI({ system, messages, model, maxTokens, apiKey }) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'gpt-4o-mini',
      max_tokens: maxTokens,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function extractLearning(question, answer) {
  const system = loadPrompt('extract-learning');
  const text = await complete({
    system,
    model: process.env.LLM_MODEL_FAST,
    maxTokens: 512,
    messages: [{ role: 'user', content: `Question: ${question}\nAnswer: ${answer}` }],
  });

  if (text) {
    try {
      const json = text.match(/\{[\s\S]*\}/);
      if (json) return JSON.parse(json[0]);
    } catch {
      /* fallback below */
    }
  }

  return heuristicLearning(question, answer);
}

function heuristicLearning(question, answer) {
  const notes = [];
  const a = String(answer).trim();
  if (a.length > 10) notes.push({ category: 'pain', content: a.slice(0, 120) });
  if (/staffconnect|quickbooks|email|gmail|outlook/i.test(a)) {
    notes.push({ category: 'tool', content: a.slice(0, 100) });
  }
  return { notes };
}

export { loadPrompt };
