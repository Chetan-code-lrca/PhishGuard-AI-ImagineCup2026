[![CI](https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026/actions/workflows/ci-cd.yml)

# PhishGuard AI

PhishGuard AI is a small, static browser demonstration of URL and email phishing indicators. It runs its heuristic checks locally in the browser and does not send the entered URL or email text to an API.

> **Important:** This public repository currently contains the browser demo and its JavaScript analysis rules. It does not contain a working Python ML model, backend API, Azure deployment, threat-intelligence integration, or trained phishing classifier. The earlier Python/Azure experiments are not part of the current checked-in application.

## What the browser demo checks

**URL analysis**
- Requires a complete HTTP or HTTPS URL.
- Flags non-HTTPS URLs, IP-address hostnames, embedded URL credentials, unusual hostname patterns, long URLs, and common URL shorteners.
- Scores are capped at 100.

**Email-text analysis**
- Matches a small list of phishing-related and urgency terms.
- Includes a simple punctuation heuristic.
- Returns matched terms and a heuristic score.

The implementation is in src/browser-analysis.js. The UI is in index.html, styles.css, and app.js.

## Run locally

No Node.js package installation, API key, database, or Python environment is required. Python 3 is used only as a convenient static-file server.

~~~bash
git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
cd PhishGuard-AI-ImagineCup2026
python3 -m http.server 8000
~~~

On Windows PowerShell:

~~~powershell
py -m http.server 8000
~~~

Open http://localhost:8000 in your browser.

## Test the analysis rules

Install Node.js 22 or newer, then run:

~~~bash
node --check src/browser-analysis.js
node --check app.js
node --test tests-js/*.test.cjs
~~~

GitHub Actions runs these syntax checks and regression tests. It does not install the historical Python dependency list or claim to test a backend that is not present in this repository.

## Project structure

~~~text
.
├── index.html
├── styles.css
├── app.js
├── src/
│   ├── browser-analysis.js
│   └── data_processing/
│       └── __init__.py       # placeholder package only
├── tests-js/
│   ├── browser-analysis.test.cjs
│   └── static-ui.test.cjs
├── requirements-legacy.txt   # historical, unverified dependency list
└── .github/workflows/ci-cd.yml
~~~

requirements-legacy.txt is retained for historical context only. It is not used by the browser demo, has not been validated as a reproducible environment, and should not be installed as part of the current setup. .env.example is documentation-only; the current browser demo requires no secrets.

## Interpreting results safely

- A low score does **not** mean a URL or email is safe.
- A high score is an investigation signal, not proof of phishing.
- HTTPS only encrypts a connection; it does not establish that a site is trustworthy.
- The URL checks are simple hostname and string heuristics. They do not query domain reputation, DNS, certificate transparency, sandboxing, or threat-intelligence feeds.
- Email checks do not authenticate the sender, inspect headers, validate SPF/DKIM/DMARC, or scan attachments.
- Do not open suspicious links just to test the tool.
- Do not paste passwords, OTPs, access tokens, confidential emails, or other sensitive content into a demonstration tool.

For an operational phishing defense product, add independently validated models and threat-intelligence sources, safe URL detonation/sandboxing, email-header authentication checks, privacy controls, authentication, rate limits, audit logging, and a documented incident-response workflow. Those capabilities are not implemented here.

## Team

- Chetan — backend / project lead
- Srikanth — ML and data processing
- Nandhitha — frontend and UI
- Sreelaxmi — Azure and DevOps

SPSU | Microsoft Imagine Cup 2026

## License

MIT License. See LICENSE for the full terms.
