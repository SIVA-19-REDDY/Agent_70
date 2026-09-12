import { AIProvider } from './AIProvider.js';
import { AGENT_70_SYSTEM_PROMPT } from './prompts/agent70Prompt.js';

export class OpenAIProvider extends AIProvider {
  constructor() {
    super('OpenAI');
  }

  get apiKey() {
    return process.env.OPENAI_API_KEY;
  }

  get defaultModel() {
    return process.env.OPENAI_MODEL || 'gpt-4o';
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  async generateDecisionSupport(prompt, context, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key is not configured');
    }

    const model = options.model || this.defaultModel;
    const systemMessage = `${AGENT_70_SYSTEM_PROMPT}\n\nINSTITUTIONAL DATA CONTEXT:\n${JSON.stringify(context, null, 2)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey.trim()}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: options.temperature !== undefined ? options.temperature : 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    return JSON.parse(content);
  }
}
