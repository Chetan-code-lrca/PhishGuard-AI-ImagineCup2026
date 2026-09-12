# PhishGuard AI — Imagine Cup 2026

AI-assisted phishing detection for suspicious URLs and email content.

PhishGuard AI is a cybersecurity project for Microsoft Imagine Cup 2026. The repository contains a working client-side web demo together with Python-based ML/NLP work and the supporting code for the broader project.

## Current demo

The root web application runs in the browser and provides:

- URL risk analysis using URL characteristics such as HTTPS usage, suspicious patterns, URL length, and common shorteners.
- Email analysis using phishing-related keywords and urgency indicators.

The current demo is heuristic. A `SAFE` result is not proof that a URL or email is safe.

The Python side contains ML/data-processing code, NLP dependencies, Azure-related components, API code, and project tooling at different stages of development.

## Tech stack

- HTML, CSS, JavaScript
- Python
- scikit-learn, pandas, NumPy
- Transformers, PyTorch, NLTK, spaCy
- Flask / FastAPI / Uvicorn
- Microsoft Azure SDKs
- SQLAlchemy
- pytest / pytest-cov

## Repository structure

```text
PhishGuard-AI-ImagineCup2026/
├── app.js
├── index.html
├── styles.css
├── requirements.txt
├── .env.example
├── src/
├── .github/
├── LICENSE
└── README.md
```

## Run the web demo

The web demo only needs Python 3 for a local HTTP server.

```bash
git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
cd PhishGuard-AI-ImagineCup2026
python3 -m http.server 8000
```

On Windows:

```powershell
py -m http.server 8000
```

Open `http://localhost:8000` in your browser.

Opening `index.html` through a local HTTP server avoids the browser restrictions that can affect local files.

## Python development

Create a virtual environment:

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

The Python dependencies cover the project's ML, NLP, Azure, API, database, and testing components.

## Environment variables

The repository includes `.env.example` for services that need external credentials.

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Use the variable names required by the component you are running. Never commit real credentials, API keys, passwords, or Azure secrets.

## Testing

Run the Python tests with:

```bash
python -m pytest
```

For coverage:

```bash
python -m pytest --cov
```

The root browser demo can be checked directly from the web interface.

## Security notes

PhishGuard AI is a development and demonstration project. Automated phishing detection should be treated as a signal, not a final verdict.

When working with real phishing material, avoid opening suspicious links in your normal browser and avoid sending confidential email content or credentials to external services.

## Project status

The browser demo is runnable now. The ML, Azure, backend, browser-extension, and related integrations are still being developed as separate parts of the project.

## Team

- Chetan — project lead / backend
- Srikanth — ML and data processing
- Nandhitha — frontend and UI
- Sreelaxmi — Azure and DevOps

## License

MIT License. See `LICENSE` for the full text.
