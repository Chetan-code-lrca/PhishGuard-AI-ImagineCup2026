// PhishGuard AI - Browser demo

const phishingKeywords = [
    'verify', 'urgent', 'suspended', 'confirm', 'update',
    'click here', 'limited time', 'act now', 'prize',
    'congratulations', 'winner', 'claim', 'password',
    'social security', 'account', 'billing'
];

const suspiciousURLPatterns = [
    /\d{1,3}(?:\.\d{1,3}){3}/,
    /@/,
    /(?:-.*){3,}/,
    /\d{4,}/
];

function setResult(type, heading, score, body) {
    const result = document.getElementById('result');
    result.className = 'result ' + type + ' show';
    result.innerHTML =
        '<h3>' + heading + '</h3>' +
        '<p><strong>Risk score: ' + score + '%</strong></p>' +
        body;
}

function analyzeURL() {
    const input = document.getElementById('url-input');
    const url = input.value.trim();

    if (!url) {
        setResult('safe', 'Enter a URL', 0, '<p>Please enter a URL to analyze.</p>');
        return;
    }

    setResult('safe', 'Analyzing URL...', 0, '<p>Please wait.</p>');

    setTimeout(() => {
        let score = 0;
        const reasons = [];
        const normalized = url.toLowerCase();

        if (!normalized.startsWith('https://')) {
            score += 30;
            reasons.push('Not using HTTPS');
        }

        suspiciousURLPatterns.forEach(pattern => {
            if (pattern.test(url)) {
                score += 25;
                reasons.push('Contains a suspicious URL pattern');
            }
        });

        if (url.length > 75) {
            score += 20;
            reasons.push('Unusually long URL');
        }

        const shorteners = ['bit.ly', 'tinyurl.com', 't.co'];
        if (shorteners.some(domain => normalized.includes(domain))) {
            score += 15;
            reasons.push('Uses a common URL shortener');
        }

        score = Math.min(score, 100);

        const signalList = reasons.length
            ? '<p><strong>Signals detected:</strong></p><ul>' +
              reasons.map(reason => '<li>' + reason + '</li>').join('') +
              '</ul>'
            : '<p>No configured suspicious signals were detected.</p>';

        if (score > 50) {
            setResult(
                'phishing',
                '🚨 High-risk URL indicators',
                score,
                signalList +
                '<p><em>Do not enter credentials or sensitive information on a suspicious site.</em></p>'
            );
        } else {
            setResult(
                'safe',
                '✅ Lower-risk result',
                score,
                signalList +
                '<p><em>This score is only a heuristic; it does not prove that a URL is safe.</em></p>'
            );
        }
    }, 500);
}

function analyzeEmail() {
    const subject = document.getElementById('email-subject').value.trim();
    const sender = document.getElementById('email-sender').value.trim();
    const body = document.getElementById('email-body').value.trim();
    const emailText = (subject + ' ' + sender + ' ' + body).toLowerCase();

    if (!emailText.trim()) {
        setResult('safe', 'Enter email content', 0, '<p>Please enter email content to analyze.</p>');
        return;
    }

    setResult('safe', 'Analyzing email...', 0, '<p>Please wait.</p>');

    setTimeout(() => {
        let score = 0;
        const detectedKeywords = [];

        phishingKeywords.forEach(keyword => {
            if (emailText.includes(keyword)) {
                score += 10;
                detectedKeywords.push(keyword);
            }
        });

        const urgencyWords = ['immediately', 'urgent', 'expires', 'deadline'];
        score += urgencyWords.filter(word => emailText.includes(word)).length * 15;

        const grammarIssues = (emailText.match(/[.!?]\s*[a-z]/g) || []).length;
        if (grammarIssues > 2) {
            score += 15;
        }

        score = Math.min(score, 100);

        const keywordText = detectedKeywords.length
            ? '<p><strong>Matched terms:</strong> ' + detectedKeywords.join(', ') + '</p>'
            : '<p>No configured phishing keywords were detected.</p>';

        if (score > 40) {
            setResult(
                'phishing',
                '🚨 Phishing indicators detected',
                score,
                keywordText +
                '<p><em>Verify the sender through a trusted channel before taking action.</em></p>'
            );
        } else {
            setResult(
                'safe',
                '✅ Lower-risk result',
                score,
                keywordText +
                '<p><em>This score is only a heuristic; it does not prove that an email is safe.</em></p>'
            );
        }
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab + '-tab').classList.add('active');
        });
    });

    document.getElementById('url-analyze-btn').addEventListener('click', analyzeURL);
    document.getElementById('email-analyze-btn').addEventListener('click', analyzeEmail);

    document.getElementById('url-input').addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            analyzeURL();
        }
    });

    document.getElementById('email-body').addEventListener('keydown', event => {
        if (event.key === 'Enter' && event.ctrlKey) {
            analyzeEmail();
        }
    });
});