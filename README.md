# Gemini CLI Project

A minimal Node.js CLI that sends prompts to Google's Gemini models.

## Prerequisites

- Node.js 18+
- A Gemini API key

## Setup

```bash
npm install
```

Set your API key:

```bash
export GEMINI_API_KEY="your_api_key_here"
```

## Usage

Run with npm:

```bash
npm start -- "Explain how a CLI works"
```

Run directly via the binary:

```bash
npx gemini-cli "Write a haiku about coding"
```

Optional flags:

- `-m, --model` (default: `gemini-2.5-flash`)
- `-t, --temperature` (default: `0.7`, range: `0` to `2`)

Example:

```bash
gemini-cli "Summarize this text" --model gemini-2.5-flash --temperature 0.2
```
