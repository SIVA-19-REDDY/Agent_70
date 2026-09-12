/**
 * Base AI Provider Interface
 * All concrete providers (OpenAI, Gemini, Demo) must implement this contract.
 */
export class AIProvider {
  constructor(name) {
    this.name = name;
  }

  /**
   * Check if provider is configured and available
   * @returns {boolean}
   */
  isConfigured() {
    throw new Error('Method isConfigured() must be implemented');
  }

  /**
   * Generate an academic decision support analysis
   * @param {string} prompt - User query
   * @param {object} context - Academic institutional context (courses, metrics, filters, agent data)
   * @param {object} options - Generation parameters (model, temperature, etc.)
   * @returns {Promise<object>} Structured response object
   */
  async generateDecisionSupport(prompt, context, options = {}) {
    throw new Error('Method generateDecisionSupport() must be implemented');
  }
}
