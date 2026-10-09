// PhishGuard AI - Browser demo

// Analysis rules are shared with the Node regression tests.

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

    const analysis = window.PhishGuardAnalysis.analyzeURL(url);
    if (!analysis.valid) {
        setResult('phishing', 'Invalid URL', 0, '<p>Please enter a complete HTTP or HTTPS URL to analyze.</p>');
        return;
    }

    setResult('safe', 'Analyzing URL...', 0, '<p>Please wait.</p>');
    setTimeout(() => {
        const signalList = analysis.reasons.length
            ? '<p><strong>Signals detected:</strong></p><ul>' +
              analysis.reasons.map(reason => '<li>' + reason + '</li>').join('') +
              '</ul>'
            : '<p>No configured suspicious signals were detected.</p>';

        if (analysis.score > 50) {
            setResult(
                'phishing',
                '🚨 High-risk URL indicators',
                analysis.score,
                signalList +
                '<p><em>Do not enter credentials or sensitive information on a suspicious site.</em></p>'
            );
        } else {
            setResult(
                'safe',
                '✅ Lower-risk result',
                analysis.score,
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

    if (!(subject + sender + body).trim()) {
        setResult('safe', 'Enter email content', 0, '<p>Please enter email content to analyze.</p>');
        return;
    }

    const analysis = window.PhishGuardAnalysis.analyzeEmail(subject, sender, body);
    setResult('safe', 'Analyzing email...', 0, '<p>Please wait.</p>');
    setTimeout(() => {
        const keywordText = analysis.detectedKeywords.length
            ? '<p><strong>Matched terms:</strong> ' + analysis.detectedKeywords.join(', ') + '</p>'
            : '<p>No configured phishing keywords were detected.</p>';

        if (analysis.score > 40) {
            setResult(
                'phishing',
                '🚨 Phishing indicators detected',
                analysis.score,
                keywordText +
                '<p><em>Verify the sender through a trusted channel before taking action.</em></p>'
            );
        } else {
            setResult(
                'safe',
                '✅ Lower-risk result',
                analysis.score,
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