# PhishGuard AI

A local, browser-based phishing-indicator demo for URLs and email text. The current runnable application is a static HTML/CSS/JavaScript interface. It uses transparent heuristic rules; it does not use a trained model, external threat-intelligence feed, or hosted backend.

> **Important:** A low risk score does not mean a URL or email is safe. Do not use this demo as the sole control for security decisions, incident response, or enterprise email filtering.

## What works today

- Parse and validate HTTP/HTTPS URL input.
- Flag configured indicators such as non-HTTPS URLs, IP-address hosts, embedded URL credentials, suspicious hostname patterns, long URLs, and common URL shorteners.
- Score email subject, sender, and body text against a small local keyword and urgency list.
- Display the signals that contributed to each heuristic score.
- Run the analysis locally in the browser; the current demo does not upload the entered URL or email text to a PhishGuard server.

The browser rules are intentionally small and inspectable. They do not perform domain reputation checks, URL detonation, attachment analysis, sender authentication checks (SPF/DKIM/DMARC), sandboxing, or model inference.

## Requirements

- Python 3 for the simple local static-file server.
- Node.js 18 or newer for the built-in JavaScript test runner.

No Python packages, Node packages, API keys, database, or cloud resources are required to run the browser demo.

## Run locally

```bash
git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
cd PhishGuard-AI-ImagineCup2026
python3 -m http.server 8000
```

On Windows PowerShell:

```powershell
py -m http.server 8000
```

Open http://localhost:8000.

## Run tests

The analysis module is shared between the browser and Node's built-in test runner, so no npm installation is needed:

```bash
node --check src/browser-analysis.js
node --check app.js
node --test tests-js/*.test.cjs
```

Python syntax can be checked with:

```bash
python -m compileall -q src
```

GitHub Actions runs these checks on pushes and pull requests.

## Repository map

```text
.
├── index.html
├── styles.css
├── app.js
├── src/
│   ├── browser-analysis.js
│   └── data_processing/
│       └── __init__.py
├── tests-js/
│   ├── browser-analysis.test.cjs
│   └── static-ui.test.cjs
├── requirements.txt
└── .env.example
```

## Python / Azure work status

The Python and Azure components described in the original project plan are not currently present as a runnable API, model-training pipeline, inference service, or deployment. The committed `src/data_processing/__init__.py` is only a package marker.

- `requirements.txt` is a legacy dependency inventory for earlier experiments. It is not needed by the browser demo and is not a tested, reproducible environment lockfile.
- `.env.example` contains placeholders for planned/legacy backend and Azure work. The current browser demo does not load or use these variables. Do not add real credentials to this repository.
- There is no current database, model artifact, Flask/FastAPI service, or Azure deployment included in the runnable browser application.

If those components are resumed, they should be added as a separate, independently tested service with its own minimal dependency set, API contracts, secrets handling, model provenance, and deployment documentation. Do not infer that the browser demo already provides those capabilities.

## Security and privacy

- Treat every suspicious URL as untrusted. Do not open it just to test the detector.
- Do not paste passwords, session tokens, private email, customer data, or confidential incident material into a demo unless you are authorized to process that information.
- The current static browser demo performs its checks locally and has no backend endpoint. If a backend is added later, document exactly what data leaves the browser, where it is stored, and how long it is retained.
- Heuristic matches can produce false positives and false negatives. Verify suspicious findings through trusted security tooling and independent channels.

## License

This repository includes the MIT License in `LICENSE`.
