import { GoogleGenAI } from '@google/genai';
import { generateHtmlTemplate } from './templates.js';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function runPremortem(planDescription) {
  if (!process.env.GEMINI_API_KEY) {
    console.error(chalk.red('\n✖ Error: GEMINI_API_KEY environment variable is not defined.'));
    console.log(chalk.yellow('Please set it using: ') + chalk.cyan('$env:GEMINI_API_KEY="your_key"\n'));
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  console.log(chalk.bold.cyan('\n🧠 Premortem Framework Initialization'));
  
  const spinner = ora({
    text: 'Projecting operational timeline 6 months into the future...',
    color: 'magenta'
  }).start();

  // Short delay to establish the prospective context frame UI cleanly
  await new Promise(resolve => setTimeout(resolve, 1200));
  spinner.text = 'Premortem Frame Locked: The plan has completely failed. Isolating systemic vectors...';

  const prompt = `
    You are an elite project risk strategist running a formal Gary Klein style Premortem evaluation.
    
    TARGET OPERATIONAL PLAN DESCRIPTION:
    ${planDescription}
    
    PREMORTEM LOGICAL CONSTRAINT: It is exactly 6 months from today. This plan has completely and utterly failed. 
    
    CRITICAL DELIVERABLES TASKING:
    1. RAW PREMORTEM ANALYSIS: Identify concrete, deeply contextual real-world breakdown factors specific to the user variables.
    2. DEEP-DIVE PARALLEL EVALUATIONS: Write an impactful, non-sugarcoated failure narrative history for top failure pathways. Extract the hidden underlying structural assumption and explicitly state highly detectable, data-driven "Early Warning Signs".
    3. STRATEGIC SYNTHESIS REPORTING: Map out "Most Likely Failure", "Most Dangerous Failure", "The Primary Blindspot Assumption", a resilient actionable "Revised Blueprint", and a highly pragmatic Pre-Launch Checklist.
    4. SYSTEM OBJECT WRITING: Output a clean technical Markdown document and a visually beautiful, modern dark-themed self-contained HTML/CSS presentation dashboard sheet.

    Return exclusively a standardized JSON structure:
    {
      "markdownTranscript": "Technical markdown content string here...",
      "htmlReport": "Complete <!DOCTYPE html> string with embedded styles here..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            markdownTranscript: { type: "STRING" },
            htmlReport: { type: "STRING" }
          },
          required: ["markdownTranscript", "htmlReport"]
        }
      }
    });

    spinner.text = 'Parsing structural telemetry payload...';

    let cleanText = response.text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText.substring(7, cleanText.length - 3).trim();
    } else if (cleanText.startsWith("```")) {
      cleanText = cleanText.substring(3, cleanText.length - 3).trim();
    }

    const data = JSON.parse(cleanText);
    const timestamp = Date.now();

    const reportFilename = `premortem-report-${timestamp}.html`;
    const transcriptFilename = `premortem-transcript-${timestamp}.md`;
    
    const reportPath = path.join(process.cwd(), reportFilename);
    const transcriptPath = path.join(process.cwd(), transcriptFilename);

    fs.writeFileSync(reportPath, data.htmlReport);
    fs.writeFileSync(transcriptPath, data.markdownTranscript);

    spinner.succeed(chalk.bold.green('Prospective Hindsight Matrix Compiled Successfully!'));
    
    console.log('\n' + chalk.bgGreen.black.bold(' OUTPUT GENERATED '));
    console.log(`${chalk.blue('📊 Interactive Risk Dashboard:')} ${chalk.underline(reportPath)}`);
    console.log(`${chalk.magenta('📝 Full Strategic Transcript:')}  ${chalk.underline(transcriptPath)}\n`);

  } catch (error) {
    spinner.fail(chalk.bold.red('Execution Vector Interrupted.'));
    console.error(chalk.red(`\nDetails: ${error.message}\n`));
  }
}