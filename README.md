# PhishGuard AI — Imagine Cup 2026

**AI-assisted phishing detection for suspicious URLs and email content.**

PhishGuard AI is a cybersecurity project developed for **Microsoft Imagine Cup 2026**. The repository combines a browser/web demonstration, Python-based ML/data-processing components, and planned cloud/AI integrations.

> **Current repository status:** In development. The checked-in web experience currently contains a client-side demonstration of URL and email risk analysis. The Azure, backend, browser-extension, and ML components described in the project concept should be treated as development work unless their implementation is present in the current checkout.

## Features

The project is intended to provide:

- URL phishing-risk analysis
- Email-content phishing analysis
- Machine-learning-based classification
- Azure AI integration
- Browser-extension warnings
- A monitoring/dashboard experience

The current root web demo performs heuristic analysis in JavaScript: it checks URL characteristics such as HTTPS usage, suspicious patterns, URL length, and common shorteners, and checks email text for phishing-related keywords and urgency indicators.

## Tech Stack

| Area | Technology |
|---|---|
| Web demo | HTML, CSS, JavaScript |
| ML / data processing | Python, scikit-learn, pandas, NumPy |
| NLP | Transformers, PyTorch, NLTK, spaCy |
| Cloud / AI | Microsoft Azure SDKs |
| APIs | Flask / FastAPI / Uvicorn dependencies are included for development |
| Testing | pytest, pytest-cov |
| Database | SQLAlchemy |

The Python dependency set is defined in `requirements.txt`.

## Repository Structure

```text
PhishGuard-AI-ImagineCup2026/
├── .env.example          # Environment-variable template
├── app.js                # Current client-side phishing-analysis demo
├── index.html             # Web interface
├── styles.css             # Web styling
├── requirements.txt       # Python dependencies
├── src/                   # Python/backend/extension source
├── .github/               # GitHub configuration/workflows
├── LICENSE
└── README.md
```

Always check the actual repository contents before following documentation for components that are still being developed.

---

## Quick Start — Web Demo

If you only want to run the current web demonstration, you do not need Azure or Node.js. You only need a static HTTP server; Python's built-in server is one option.

### 1. Clone

```bash
git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
cd PhishGuard-AI-ImagineCup2026
```

### 2. Start a local web server

A local HTTP server is recommended instead of opening `index.html` directly.

If Python 3 is installed:

```bash
python3 -m http.server 8000
```

Windows:

```powershell
py -m http.server 8000
```

Open:

```text
http://localhost:8000
```

### 3. Try the demo

The current JavaScript demo provides two inputs:

- **URL analysis** — evaluates simple suspicious URL characteristics.
- **Email analysis** — checks the supplied text for phishing-related keywords and urgency indicators.

These are **heuristic demonstration checks**, not a production-grade phishing verdict. A URL being labelled `SAFE` by this demo does not establish that it is safe.

---

## Python / ML Development Setup

The repository also contains Python dependencies for the project's ML, NLP, Azure, API, and data-processing work.

### Prerequisites

Recommended:

- Git
- Python 3.10–3.12
- `pip`
- `venv`

Because the dependency file contains older version ranges for several packages, using a dedicated virtual environment is strongly recommended.

### 1. Create a virtual environment

Linux / macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

The current `requirements.txt` includes scikit-learn, PyTorch, Transformers, NLTK, spaCy, Azure SDK packages, Flask, FastAPI, URL-analysis libraries, SQLAlchemy, pytest, and development tools.

### 3. Environment variables

If you are working on components that require external services, create a local `.env` file from the template:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then fill in the required values for the component you are using.

**Never commit real API keys, passwords, Azure credentials, or other secrets.**

---

## Node.js Note

The older README referred to `package.json` and `npm install`, but there is currently **no root `package.json` in the repository**. Therefore, `npm install` is not required for the current root web demo.

If a future commit adds a Node.js application, its README instructions should be updated together with that application.

---

## Machine Learning Workflow

The Python side of the project is intended to support:

1. Data loading and preprocessing
2. Feature extraction
3. Model training
4. Model evaluation
5. URL/email classification
6. Integration with the application layer

The repository contains Python tooling for ML/NLP work. Before running a particular training or inference script, inspect that script for its expected input files, model paths, and environment variables.

Do not assume that the presence of a dependency in `requirements.txt` means the corresponding service is already wired into the current web demo.

---

## Testing

Python tests use pytest. If the relevant test files are present in your checkout, run:

```bash
python -m pytest
```

For coverage:

```bash
python -m pytest --cov
```

If you are only testing the current static web demo, use the browser directly and verify URL/email analysis behaviour from the interface.

---

## Security Notes

Phishing detection is a security-sensitive task. This repository contains a **development/demo system**, not a guarantee that a URL or email is malicious or legitimate.

When experimenting with real phishing samples:

- Do not open suspicious URLs in your normal browser.
- Do not submit confidential email contents or credentials to third-party services.
- Keep API keys and Azure credentials out of Git.
- Use isolated environments for malware/phishing research.
- Treat automated classifications as signals that require verification.

---

## Team

| Name | Role | Responsibility |
|---|---|---|
| Chetan | Team Lead | Project coordination, backend development |
| Srikanth | ML Engineer | Model training, data processing |
| Nandhitha | Frontend Developer | UI/UX and dashboard |
| Sreelaxmi | Cloud Engineer | Azure integration and DevOps |

---

## Contributing

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make and test your changes.
4. Commit them:

```bash
git add .
git commit -m "Describe your change"
```

5. Push the branch:

```bash
git push origin feature/your-feature
```

6. Open a pull request.

---

## License

This project is licensed under the **MIT License**. See `LICENSE` for details.

## Project Status

PhishGuard AI is under active development for Imagine Cup 2026. The repository contains both implemented demonstration code and components that are still evolving. Documentation intentionally distinguishes between what can be run from the current checkout and the broader planned architecture.
