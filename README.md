# PhishGuard AI

PhishGuard AI is a phishing-detection project built around URL and email analysis. It was developed for Microsoft Imagine Cup 2026 and includes a browser demo, Python ML/NLP work, and backend/Azure experiments.

## What is in the repository

There are two main parts to the project.

### Browser demo

The root of the repository contains a plain HTML/CSS/JavaScript interface for trying the phishing checks.

The intended checks include:

- URL structure and HTTPS usage
- suspicious URL patterns
- long URLs and common URL shorteners
- phishing-related words in email text
- urgency indicators in email content

The scoring in the browser demo is heuristic. It does not query a trained model or a threat-intelligence service.

The current root demo is still being wired together: the HTML input/button IDs and the JavaScript handlers are not fully aligned yet. The demo files are kept in the repository, but the browser interface needs that small integration fix before the checks can be used end-to-end.

### Python project

The Python side contains the project's machine-learning, NLP, API, Azure, database, and testing work. The dependency file includes:

- NumPy, pandas, scikit-learn
- PyTorch and Transformers
- NLTK and spaCy
- Flask and FastAPI
- Azure ML and Azure AI SDKs
- SQLAlchemy
- pytest and coverage tools

These components are at different stages of development; they are not all part of one currently deployed application.

## Repository layout

```text
PhishGuard-AI-ImagineCup2026/
├── app.js
├── index.html
├── styles.css
├── requirements.txt
├── .env.example
├── src/
│   ├── models/
│   ├── api/
│   ├── services/
│   └── ...
├── .github/
├── LICENSE
└── README.md
```

The exact contents under `src/` are split across the ML, API, and service work from the project.

## Run the browser files locally

Because the root interface is a static site, no Node.js setup is required just to serve it.

```bash
git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
cd PhishGuard-AI-ImagineCup2026
python3 -m http.server 8000
```

Windows PowerShell:

```powershell
py -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Set up the Python environment

Use a virtual environment for the Python work:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Windows PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

The current `requirements.txt` is shared across the ML, NLP, API, Azure, database, and testing code. fileciteturn808file0

## Environment variables

The repository provides `.env.example` for components that need external services.

Copy it to a local `.env` file:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Keep real API keys, passwords, and cloud credentials out of Git. Only the example variable names belong in the repository.

## Testing

Python tests can be run with:

```bash
python -m pytest
```

For coverage:

```bash
python -m pytest --cov
```

The static browser files can be served with the commands above and checked in a browser.

## How the current browser scoring works

The JavaScript demo assigns a risk score from a small set of URL and email signals.

For URLs it checks things such as:

- missing HTTPS
- IP-address URLs
- repeated `@` or hyphen patterns
- long numeric sequences
- unusually long URLs
- common URL shorteners

For email text it checks phishing-related keywords, urgency words, and a simple punctuation/grammar heuristic. fileciteturn810file0

A low score should not be treated as proof that a message or URL is safe.

## Security

This project is intended for development and demonstration. Do not paste passwords, authentication tokens, private email, or other confidential information into a phishing-analysis tool unless the data is safe to share with the service being used.

Treat suspicious links as untrusted. Do not open them simply to test the detector.

## Current status

The repository is a working project in progress rather than a single finished production system. The browser demo contains the current heuristic scoring logic, while the Python/Azure/ML parts contain the broader detection work and experiments.

## Team

- Chetan — backend / project lead
- Srikanth — ML and data processing
- Nandhitha — frontend and UI
- Sreelaxmi — Azure and DevOps

## License

MIT License. See `LICENSE` for the full terms.
