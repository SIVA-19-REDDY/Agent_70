import { AIProvider } from './AIProvider.js';
import { AGENT_70_SYSTEM_PROMPT } from './prompts/agent70Prompt.js';

export class GeminiProvider extends AIProvider {
  constructor() {
    super('Gemini');
  }

  get apiKey() {
    return process.env.GEMINI_API_KEY;
  }

  get defaultModel() {
    return process.env.GEMINI_MODEL || 'gemini-flash-latest';
  }

  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 5);
  }

  async generateDecisionSupport(prompt, context, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key is not configured');
    }

    const preferredModel = options.model || this.defaultModel;
    const modelCandidates = [preferredModel, 'gemini-flash-lite-latest', 'gemini-3.1-flash-lite'].filter(
      (m, idx, arr) => arr.indexOf(m) === idx
    );

    let lastError = null;
    for (const model of modelCandidates) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey.trim()}`;
        const systemInstruction = `${AGENT_70_SYSTEM_PROMPT}\n\nINSTITUTIONAL DATA CONTEXT:\n${JSON.stringify(context, null, 2)}`;

        const requestBody = {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: options.temperature !== undefined ? options.temperature : 0.2
          }
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Gemini API error (${response.status}) on ${model}: ${errText}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        const text = candidate?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error(`No content returned from Gemini API on ${model}`);
        }

        let jsonStr = text.trim();
        // Extract JSON from markdown fence if present
        const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
          jsonStr = codeBlockMatch[1].trim();
        } else {
          // Attempt to locate outermost { ... }
          const braceMatch = jsonStr.match(/\{[\s\S]*\}/);
          if (braceMatch) {
            jsonStr = braceMatch[0].trim();
          }
        }

        // Clean common LLM JSON syntax issues like trailing commas before } or ]
        const sanitized = jsonStr.replace(/,\s*([\}\]])/g, '$1');

        try {
          return JSON.parse(sanitized);
        } catch (parseErr) {
          // Try original if sanitization didn't work
          return JSON.parse(jsonStr);
        }
      } catch (err) {
        lastError = err;
        console.warn(`[GeminiProvider] Attempt with model ${model} failed: ${err.message}. Trying next candidate if available...`);
      }
    }

    throw lastError || new Error('All Gemini model candidates failed');
  }
}
