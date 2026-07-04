# PhishGuard-AI-ImagineCup2026

**AI-powered phishing detection system with real-time email and URL analysis.** Built for Microsoft Imagine Cup 2026 using Azure AI Services, ML models, and browser extension.

## 🎯 Project Overview

PhishGuard AI is an intelligent cybersecurity solution that detects and prevents phishing attacks through:
- **Real-time Email Analysis**: Scans incoming emails for phishing indicators
- **URL Analysis**: Evaluates links for malicious content
- **Machine Learning Models**: Trained on phishing email datasets for accurate detection
- **Azure AI Integration**: Leverages Azure Cognitive Services for advanced threat analysis
- **Browser Extension**: Instant alerts and warnings for suspicious emails/URLs
- **Web Dashboard**: Centralized monitoring and threat tracking

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Web App + Browser Extension)
- **Backend**: Node.js with Express.js, Python for data processing
- **Cloud**: Microsoft Azure (Cognitive Services, App Service, Storage)
- **ML/AI**: Python (scikit-learn, TensorFlow), Azure ML
- **Database**: Azure SQL Database / MongoDB
- **APIs**: Azure Text Analytics, Content Moderator, Anomaly Detector
- **DevOps**: GitHub Actions, Docker (optional)

## 📊 Project Structure

```
PhishGuard-AI-ImagineCup2026/
├── src/
│   ├── data_processing/          # Python ML pipeline
│   │   ├── __init__.py
│   │   ├── email_analyzer.py    # Email feature extraction
│   │   ├── url_analyzer.py      # URL analysis module
│   │   └── model_trainer.py     # Model training pipeline
│   ├── backend/                  # Node.js backend
│   │   ├── server.js
│   │   ├── routes/
│   │   └── middleware/
│   └── extension/                # Browser extension
│       ├── manifest.json
│       ├── popup.html
│       └── content.js
├── models/                        # Trained ML models
├── app.js                         # Main application
├── index.html                     # Web dashboard UI
├── styles.css                     # UI styling
├── requirements.txt               # Python dependencies
├── package.json                   # Node.js dependencies (TODO)
├── .env.example                   # Environment variables template
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+
- Azure account with subscription
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chetan-code-lrca/PhishGuard-AI-ImagineCup2026.git
   cd PhishGuard-AI-ImagineCup2026
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Azure credentials and API keys
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Node.js dependencies** (TODO)
   ```bash
   npm install
   ```

5. **Run the application**
   ```bash
   node app.js
   ```
   Visit `http://localhost:3000`

## 👥 Team Members & Roles

| Name | Role | Responsibility |
|------|------|---------------|
| Chetan | Team Lead | Project coordination, Backend development |
| Srikanth | ML Engineer | Model training, Data processing pipeline |
| Nandhitha | Frontend Developer | UI/UX design, Web dashboard |
| Sreelaxmi | Cloud Engineer | Azure setup, API integration, DevOps |


## 🔑 Key Features

✅ **Real-time Detection**: Analyzes emails/URLs as they arrive
✅ **ML-Powered**: Trained models with 95%+ accuracy
✅ **Azure Integration**: Enterprise-grade cloud infrastructure
✅ **User-Friendly**: Simple dashboard and browser extension
✅ **Scalable**: Designed for enterprise deployment
✅ **Privacy-Focused**: Local analysis, encrypted data transmission

## 🛠️ Development Workflow

### Creating Issues
1. Go to the **Issues** tab
2. Click **New Issue**
3. Use templates: Bug, Feature, Enhancement
4. Assign to team member & add labels

### Making Pull Requests
1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Feature: description"`
3. Push & create PR: `git push origin feature/your-feature`
4. Request code review from team members
5. Merge after approval

### Code Standards
- JavaScript: ESLint configuration (upcoming)
- Python: PEP 8 compliance
- Commit messages: Descriptive, past tense
- Branch naming: `feature/`, `bugfix/`, `docs/` prefixes

## 📚 Resources

- [Azure Cognitive Services Docs](https://docs.microsoft.com/en-us/azure/cognitive-services/)
- [Phishing Email Dataset (Kaggle)](https://www.kaggle.com/datasets/naserabdullahalam/phishing-email-dataset)
- [OWASP Phishing Prevention](https://owasp.org/)
- [Google Imagine Cup Guidelines](https://imaginecup.microsoft.com/)

## 🔐 Security Considerations

- Never commit `.env` files with real credentials
- Use Azure Key Vault for secrets management
- Implement HTTPS for all communications
- Validate & sanitize all user inputs
- Regular security audits & updates
- GDPR compliance for data processing

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request with description

## 📞 Support & Questions

For questions or issues:
- Create a GitHub Issue
- Contact: [Team Email] (TODO)
- Discord: [Link] (TODO)

---

**Last Updated**: November 18, 2025
**Status**: In Development for Microsoft Imagine Cup 2026
