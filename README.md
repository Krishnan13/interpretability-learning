# Interpretability Learning Dashboard

A browser-based tracker for the 48-week **Interpretability for AI Alignment** roadmap.

## What it does

- Shows the current phase and week.
- Separates understanding, practice/implementation and mastery-gate evidence.
- Summarises mastered learning and previews upcoming weeks.
- Stores notes and evidence for every week.
- Exports and imports progress as JSON.
- Saves progress locally in the browser; no account or backend is required.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Data and privacy

Progress is stored only in browser `localStorage` under the key
`interpretability-roadmap-state-v1`. Use **Export progress** periodically to
keep a backup or move progress to another device.

## Roadmap principle

A topic is not complete because it was watched or read. Completion means being
able to explain it, implement or investigate it at the required depth, and pass
the mastery gate.
