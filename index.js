#!/usr/bin/env node

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI(); // Assumes GEMINI_API_KEY environment variable is set

async function runPremortem() {
  const planDescription = process.argv.slice(2).join(' ');

  if (!planDescription) {
    console.error("Error: Please provide details about your plan.");
    console.log("Usage: npx premortem <your plan details here>");
    process.exit(1);
  }

  console.log("🚀 Initializing Premortem Analysis Engine...");
  console.log("🔮 Shifting timeline 6 months into the future...");
  console.log("💀 Status: Your plan has completely failed. Analyzing why...\n");

  const prompt = `
    You are an expert project risk analyst running a Gary Klein style Premortem.
    
    THE CONTEXT:
    ${planDescription}
    
    PREMORTEM FRAME: It is 6 months from now. This plan has completely failed. 
    
    TASK:
    1. Generate the Raw Premortem (comprehensive, specific failure reasons).
    2. Run parallel sub-analyses for the top failure modes (The Story, Underlying Assumption, Early Warning Signs).
    3. Synthesize the findings (Most Likely Failure, Most Dangerous Failure, The Hidden Assumption, The Revised Plan, Pre-Launch Checklist).
    4. Generate two outputs: A complete Markdown transcript and a beautifully styled, self-contained HTML report.

    Return ONLY a valid JSON object matching this structure:
    {
      "markdownTranscript": "...",
      "htmlReport": "..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text);
    const timestamp = Date.now();

    const reportPath = path.join(process.cwd(), `premortem-report-${timestamp}.html`);
    const transcriptPath = path.join(process.cwd(), `premortem-transcript-${timestamp}.md`);

    fs.writeFileSync(reportPath, data.htmlReport);
    fs.writeFileSync(transcriptPath, data.markdownTranscript);

    console.log("✅ Premortem analysis complete!");
    console.log(`📊 Visual Report generated: ${reportPath}`);
    console.log(`📝 Full Transcript saved: ${transcriptPath}`);

  } catch (error) {
    console.error("An error occurred during execution:", error.message);
  }
}

runPremortem();