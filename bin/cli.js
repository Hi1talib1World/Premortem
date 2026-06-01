#!/usr/bin/env node

import { program } from 'commander';
import { runPremortem } from '../src/index.js';
import chalk from 'chalk';

program
  .name('premortem')
  .description('Run a prospective hindsight simulation on a plan to uncover deep critical blind spots before execution.')
  .argument('<plan...>', 'Detailed description of the plan, target audience, and success parameters')
  .action((planWords) => {
    const planDescription = planWords.join(' ');
    runPremortem(planDescription);
  });

program.parse(process.argv);