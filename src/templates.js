/**
 * Generates a self-contained, responsive HTML Premortem report.
 * @param {string} planDescription - The original input plan description.
 * @param {Object} reportData - Synthesized structural findings.
 * @returns {string} Fully compiled HTML string.
 */
export function generateHtmlTemplate(planDescription, reportData) {
  const timestamp = new Date().toLocaleString();
  
  // Safeguard parsing or map direct defaults if fields are empty
  const synth = reportData.synthesis || {};
  const failures = reportData.failures || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premortem Risk Dashboard</title>
  <style>
    :root {
      --bg-main: #0a0e17;
      --bg-card: #121826;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-red: #ef4444;
      --accent-orange: #f97316;
      --accent-blue: #3b82f6;
      --accent-purple: #a855f7;
      --accent-green: #10b981;
      --border: #1f293d;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      padding: 2rem 1rem;
    }
    .container { max-width: 1100px; margin: 0 auto; }
    header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 2rem;
      margin-bottom: 2rem;
    }
    h1 { font-size: 2.5rem; color: var(--text-main); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem; }
    h1 span { color: var(--accent-red); }
    .meta { color: var(--text-muted); font-size: 0.9rem; }
    .plan-context {
      background: #111622;
      border-left: 4px solid var(--accent-blue);
      padding: 1rem;
      margin: 1.5rem 0;
      border-radius: 0 8px 8px 0;
    }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
    .card { background-color: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; transition: transform 0.2s; }
    .card:hover { transform: translateY(-2px); border-color: #2e3c56; }
    .card-title { font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .card.likely { border-top: 4px solid var(--accent-red); }
    .card.dangerous { border-top: 4px solid var(--accent-orange); }
    .card.assumption { border-top: 4px solid var(--accent-purple); }
    .failure-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
    @media(min-width: 768px) { .failure-grid { grid-template-columns: repeat(2, 1fr); } }
    .failure-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; }
    .badge { display: inline-block; padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: bold; border-radius: 9999px; margin-bottom: 1rem; text-transform: uppercase; }
    .badge.red { background: rgba(239, 68, 68, 0.15); color: var(--accent-red); }
    .badge.purple { background: rgba(166, 85, 247, 0.15); color: var(--accent-purple); }
    .checklist-section { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; margin-bottom: 2.5rem; }
    .checklist-item { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 1rem; }
    .checklist-item input { margin-top: 0.35rem; accent-color: var(--accent-green); }
    footer { text-align: center; color: var(--text-muted); font-size: 0.85rem; border-top: 1px solid var(--border); padding-top: 2rem; margin-top: 4rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1><span>💀</span> Premortem Risk Simulation Report</h1>
      <div class="meta">Timeline Frame: +6 Months Prospective Hindsight | Generated: ${timestamp}</div>
      <div class="plan-context">
        <strong>Target Strategy Context:</strong><br>
        <span style="color: var(--text-main); font-style: italic;">"${planDescription}"</span>
      </div>
    </header>

    <main>
      <h2 style="margin-bottom: 1rem; font-size: 1.75rem;">📋 Strategic Synthesis Matrix</h2>
      <div class="grid">
        <div class="card likely">
          <div class="card-title" style="color: var(--accent-red)">⚡ Most Likely Failure Path</div>
          <p>${synth.mostLikelyFailure || reportData.mostLikelyFailure || 'Parsing complete scenario analysis from engine records...'}</p>
        </div>
        <div class="card dangerous">
          <div class="card-title" style="color: var(--accent-orange)">💥 Most Dangerous Path</div>
          <p>${synth.mostDangerousFailure || reportData.mostDangerousFailure || 'Parsing localized operational impacts...'}</p>
        </div>
        <div class="card assumption">
          <div class="card-title" style="color: var(--accent-purple)">🔍 The Fatal Blindspot</div>
          <p>${synth.hiddenAssumption || reportData.hiddenAssumption || 'Uncovering structural implicit dependencies...'}</p>
        </div>
      </div>

      <h2 style="margin-bottom: 1rem; font-size: 1.75rem;">🛠️ Actionable Blueprint Revision</h2>
      <div class="card" style="border-left: 4px solid var(--accent-green); margin-bottom: 2.5rem;">
        <p style="font-size: 1.1rem; color: #e5e7eb;">${synth.revisedPlan || reportData.revisedPlan || 'Developing structural mitigations...'}</p>
      </div>

      <h2 style="margin-bottom: 1rem; font-size: 1.75rem;">🎯 Pre-Launch Verification Checklist</h2>
      <div class="checklist-section">
        ${(synth.checklist || reportData.checklist || ['Verify critical audience engagement signals', 'Stress test cost models under variable scaling conditions', 'Validate delivery timeline assumptions against active buffer assets']).map(item => `
          <div class="checklist-item">
            <input type="checkbox">
            <div>${item}</div>
          </div>
        `).join('')}
      </div>
    </main>

    <footer>
      Premortem CLI Engine Engine Core (Open-Source Beta Layout) • Engineered by Hicham Outaleb
    </footer>
  </div>
</body>
</html>`;
}