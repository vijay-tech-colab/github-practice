#!/usr/bin/env node

import { GoogleGenAI } from '@google/genai';
import { Command } from 'commander';

const DEFAULT_MODEL = 'gemini-2.5-flash';

export const buildPrompt = (input) => input.join(' ').trim();

export async function runCli(argv = process.argv) {
  const program = new Command();

  program
    .name('gemini-cli')
    .description('Generate text responses from Google Gemini')
    .argument('<prompt...>', 'Prompt to send to Gemini')
    .option('-m, --model <model>', 'Gemini model name', DEFAULT_MODEL)
    .option('-t, --temperature <value>', 'Sampling temperature (0 to 2)', '0.7')
    .action(async (promptParts, options) => {
      const prompt = buildPrompt(promptParts);
      if (!prompt) {
        console.error('Prompt cannot be empty.');
        process.exitCode = 1;
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error('Missing GEMINI_API_KEY. Export your API key and try again.');
        process.exitCode = 1;
        return;
      }

      const temperature = Number.parseFloat(options.temperature);
      if (Number.isNaN(temperature) || temperature < 0 || temperature > 2) {
        console.error('Temperature must be a number between 0 and 2.');
        process.exitCode = 1;
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      try {
        const result = await ai.models.generateContent({
          model: options.model,
          contents: prompt,
          config: {
            temperature,
          },
        });

        console.log(result.text ?? 'No response text returned by Gemini.');
      } catch (error) {
        console.error(`Gemini request failed: ${error.message}`);
        process.exitCode = 1;
      }
    });

  await program.parseAsync(argv);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  runCli();
}
