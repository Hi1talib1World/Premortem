# Premortem Skill

Run a premortem on any plan, launch, product, hire, strategy, or decision. Assumes it already failed 6 months from now and works backward to find every reason why. Produces a revised plan with blind spots exposed.

## Getting Started

1. Install dependencies:

```powershell
npm install
```

2. Set your Gemini API key:

```powershell
$env:GEMINI_API_KEY="your_key"
```

3. Run the CLI:

- With a plan:

```powershell
premortem "Describe the project, goal, audience, risks, and timeline."
```

- Without a plan:

```powershell
premortem
```

When no plan text is supplied, the tool uses a default cleaned concept and runs automatically.

This produces:

- `premortem-report-[timestamp].html`
- `premortem-transcript-[timestamp].md`
- `premortem-report-[timestamp].txt`

## What is a Premortem?

A premortem is the opposite of a postmortem. Instead of figuring out what went wrong after something fails, you imagine it already failed and figure out why *before* you start.

The method comes from psychologist Gary Klein, published in *Harvard Business Review*. Daniel Kahneman called it his single most valuable decision-making technique. Google, Goldman Sachs, and Procter & Gamble all use it before major decisions.

The core insight: when you ask people "what could go wrong?" they give cautious, hedged answers. When you say "this already failed, tell me why," their brains switch into narrative mode and generate far more specific, creative, honest reasons.

## When to Run a Premortem

### Good Targets

- A product or feature you're about to build
- A launch plan with money or reputation on the line
- A pricing change or business model shift
- A hire you're about to make
- A strategy or positioning pivot
- A partnership or deal you're evaluating
- Any commitment where the cost of being wrong is high

### Bad Targets

- Vague ideas with no concrete plan yet
- Questions with one right answer
- Requests for creative feedback on a draft
- Decisions already made and irreversible

## How a Premortem Session Works

### Step 1: Set the Frame

After gathering context, set the premortem frame explicitly:

> "OK, I have enough context. Let's run the premortem. Here's the premise: it's 6 months from now. [The plan/launch/decision] has failed. It's done. We're looking back and trying to understand what went wrong."

### Step 2: Generate Failure Reasons (Raw Premortem)

Generate every genuine reason the plan could have died. Be comprehensive, specific, and grounded in actual plan details.

Each failure reason should be:

- Specific to this plan
- Grounded in actual details
- A genuine threat (not a minor inconvenience)

### Step 3: Deep-Dive Agents

Spawn one sub-agent per failure reason, all in parallel. Each agent produces:

1. **The Failure Story** – A 2-3 paragraph narrative of how it played out
2. **The Underlying Assumption** – What the user took for granted
3. **Early Warning Signs** – Observable signals to watch for

### Step 4: Synthesis

Produce the **Premortem Report** containing:

1. **The Most Likely Failure** – Most probable scenario
2. **The Most Dangerous Failure** – Highest damage scenario
3. **The Hidden Assumption** – The single biggest unquestioned assumption
4. **The Revised Plan** – Concrete, specific changes for resilience
5. **The Pre-Launch Checklist** – 3-5 verifiable actions

### Step 5: Generate Report

Create a visual HTML report (`premortem-report-[timestamp].html`) with:

- Dark background, clean typography
- Prominent synthesis section
- One card per failure reason with deep-dive analysis
- Visual indicators of severity/likelihood
- Footer with timestamp

### Step 6: Save Transcript

Save full transcript as `premortem-transcript-[timestamp].md` for reference.

## Output Format

Every premortem session produces three files:

- `premortem-report-[timestamp].html`
- `premortem-transcript-[timestamp].md`
- `premortem-report-[timestamp].txt`

Plus a concise chat summary: most likely failure, hidden assumption, and single most important revision (3 sentences max).

## Example: Premorteming a Product Launch

**User:** "Premortem this: I'm about to launch a $297 live workshop on how to use Claude Cowork for marketing teams. 50 seats. Targeting marketing managers at companies with 10-50 employees."

**Raw premortem identifies 6 failure reasons:**

1. Marketing managers at this company size need approval to spend $297, adding unaccounted friction
2. "Claude Cowork for marketing" is tool-specific in a market still figuring out AI relevance
3. Actual buyers might be solopreneurs, not team managers
4. Marketing workshop requires 5 weeks of prep for realistic demo environments, not the 2 budgeted
5. If 60% of attendees are solopreneurs, case studies won't resonate with target audience
6. Max revenue $14,850 may not justify prep time against other opportunities

**Synthesis:** Most likely failure is audience mismatch. Hidden assumption: assuming "marketing managers at 10-50 person companies" is reachable. Revised plan: run a $47 pilot session for 20 people first to identify actual buyers.

## Important Notes

- **Spawn all failure agents in parallel** – avoids sequential bias
- **Always set the premortem frame explicitly** – "this has already failed" is the psychological mechanism that makes it work
- **Be comprehensive but not padded** – find every genuine failure reason, whether 3 or 7
- **The synthesis is the product** – make it specific and actionable
- **Don't sugarcoat** – tell the user things they don't want to hear before reality does
- **Revised plan must be concrete** – something the user can do this week
- **Respect minimum context threshold** – ask questions rather than produce a bad premortem
- **This is not the LLM Council** – different psychological mechanism (future failure vs. current perspectives)
