#!/usr/bin/env node

import { program } from 'commander';
import { runPremortem } from '../src/index.js';
import chalk from 'chalk';

program
  .name('premortem')
  .description('Run a prospective hindsight simulation on a plan to uncover deep critical blind spots before execution.')
  .argument('[plan...]', 'Optional plan description. If omitted, a default cleaned concept will be used so the command runs immediately.')
  .action(async (planWords) => {
    let planDescription = planWords && planWords.length ? planWords.join(' ') : '';

    if (!planDescription) {
      planDescription = 'A clean, generic concept ready for premortem review. Identify key failure paths, hidden assumptions, early warnings, and a resilience-oriented revision plan for an unspecified product or strategic initiative.';
      console.log(chalk.green('No plan argument provided. Running premortem on a default cleaned concept.'));
    }

    runPremortem(planDescription.trim());
  });

await program.parseAsync(process.argv);
