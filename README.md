[![CI](https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026/actions/workflows/ci-cd.yml)

# PhishGuard AI

**A browser-only phishing-indicator triage demo.** PhishGuard analyzes pasted URLs and email text using a small, explainable set of heuristic rules. It does not fetch submitted URLs, contact a reputation service, load a trained model, or send the analyzed text to a backend.

The working browser demo is intentionally narrower than the original Imagine Cup project concept. The Python, ML, NLP, API, and Azure configuration files in this repository are exploratory scaffolding; they are not a currently supported end-to-end service.

## What works today

| Capability | Current behavior |
| --- | --- |
| URL analysis | Parses HTTP/HTTPS URLs and scores configured hostname and URL signals |
| Email-text analysis | Checks the subject, sender text, and body for configured phishing-related keywords and urgency signals |
| Scoring | Produces a heuristic risk score, capped at 100, with matched indicators |
| Data processing | Runs locally in the browser; the demo does not submit input to a backend |
| External reputation | Not implemented |
| Machine-learning inference | Not implemented in the working browser demo |
| Mailbox, gateway, or SIEM integration | Not implemented |

The configured URL signals include non-HTTPS URLs, IP-address hosts, embedded credentials, unusually patterned hostnames, long URLs, and common URL shorteners. Email scoring uses a fixed keyword list and simple text heuristics.

## Important interpretation and limitations

- A **lower-risk result is not a safe verdict**. It only means that the configured rules did not find enough signals to cross the demo's threshold.
- A high score is an investigation lead, not proof of phishing.
- The demo does not resolve DNS, follow redirects, inspect TLS certificates, fetch page content, check domain age, or query threat-intelligence feeds.
- Email analysis does not connect to an inbox or verify sender authentication such as SPF, DKIM, or DMARC.
- The score is not a calibrated probability and has not been validated as a production detection model.
- Do not use this demo as the sole control for an organization's email security, web filtering, incident response, or access decisions.

## Run locally

Requirements: a modern browser and Python 3 (only to serve the static files).

```bash
git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
cd PhishGuard-AI-ImagineCup2026
python3 -m http.server 8000
```

On Windows PowerShell:

```powershell
py -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

No `npm install`, Python package installation, API key, or database is required for the browser demo.

## Run the automated tests

The URL and email analysis rules are shared with Node's built-in test runner.

```bash
node --check src/browser-analysis.js
node --check app.js
node --test tests-js/*.test.cjs
```

GitHub Actions runs the browser JavaScript checks and regression tests on pushes and pull requests. The repository's Python scaffolding is not part of the current browser-demo test path.

## Privacy and safe handling

The current browser demo processes the text in the page and does not make an application API request. Use a local copy for sensitive test material. A hosted static site still involves normal hosting and browser infrastructure; review those providers' policies before handling any confidential data.

Never paste passwords, authentication tokens, private customer messages, or other confidential information into an analysis page unless your organization's policy permits it. Do not open suspicious links to test them.

## Repository layout

```text
PhishGuard-AI-ImagineCup2026/
├── app.js                         # Browser UI and result rendering
├── index.html                     # Static application page
├── styles.css                     # Application styles
├── src/
│   └── browser-analysis.js        # Shared URL/email heuristic rules
├── tests-js/
│   └── browser-analysis.test.cjs  # Node.js regression tests
├── .github/workflows/ci-cd.yml    # Browser checks and tests
├── requirements.txt              # Exploratory Python dependency list
└── .env.example                   # Placeholder configuration; not used by demo
```

The current Python source tree does not yet provide a runnable backend or trained-model inference service. Do not configure the placeholder Azure values as though they enable a supported service.

## Team

- Chetan — backend / project lead
- Srikanth — ML and data processing
- Nandhitha — frontend and UI
- Sreelaxmi — Azure and DevOps

## License

MIT License. See [LICENSE](LICENSE) for the terms.
