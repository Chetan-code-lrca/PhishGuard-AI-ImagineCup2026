// PhishGuard AI - Browser demo

// Render all result content as text nodes. Never interpolate user-controlled
// content into HTML, even though the current analysis rules return fixed labels.
function textElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function createMessage(text) {
    return textElement('p', text);
}

function createSignalBody(label, values, emptyText, warning, asList = false) {
    const fragment = document.createDocumentFragment();

    if (values.length) {
        const labelParagraph = document.createElement('p');
        const strong = textElement('strong', label);
        labelParagraph.appendChild(strong);
        fragment.appendChild(labelParagraph);

        if (asList) {
            const list = document.createElement('ul');
            values.forEach(value => list.appendChild(textElement('li', value)));
            fragment.appendChild(list);
        } else {
            const valueParagraph = textElement('p', values.join(', '));
            fragment.appendChild(valueParagraph);
        }
    } else {
        fragment.appendChild(createMessage(emptyText));
    }

    const warningParagraph = document.createElement('p');
    const emphasis = textElement('em', warning);
    warningParagraph.appendChild(emphasis);
    fragment.appendChild(warningParagraph);

    return fragment;
}

function setResult(type, heading, score, body) {
    const result = document.getElementById('result');
    result.className = 'result ' + type + ' show';

    const title = textElement('h3', heading);
    const scoreParagraph = document.createElement('p');
    const scoreLabel = textElement('strong', 'Risk score: ' + score + '%');
    scoreParagraph.appendChild(scoreLabel);

    result.replaceChildren(title, scoreParagraph, body);
}

function analyzeURL() {
    const input = document.getElementById('url-input');
    const url = input.value.trim();

    if (!url) {
        setResult('safe', 'Enter a URL', 0, createMessage('Please enter a URL to analyze.'));
        return;
    }

    const analysis = window.PhishGuardAnalysis.analyzeURL(url);
    if (!analysis.valid) {
        setResult(
            'phishing',
            'Invalid URL',
            0,
            createMessage('Please enter a complete HTTP or HTTPS URL to analyze.'),
        );
        return;
    }

    setResult('safe', 'Analyzing URL...', 0, createMessage('Please wait.'));
    setTimeout(() => {
        const signalBody = createSignalBody(
            'Signals detected:',
            analysis.reasons,
            'No configured suspicious signals were detected.',
            'This score is only a heuristic; it does not prove that a URL is safe.',
            true,
        );

        if (analysis.score > 50) {
            setResult(
                'phishing',
                'High-risk URL indicators',
                analysis.score,
                signalBody,
            );
        } else {
            setResult(
                'safe',
                'Lower-risk result',
                analysis.score,
                signalBody,
            );
        }
    }, 500);
}

function analyzeEmail() {
    const subject = document.getElementById('email-subject').value.trim();
    const sender = document.getElementById('email-sender').value.trim();
    const body = document.getElementById('email-body').value.trim();

    if (!(subject + sender + body).trim()) {
        setResult(
            'safe',
            'Enter email content',
            0,
            createMessage('Please enter email content to analyze.'),
        );
        return;
    }

    const analysis = window.PhishGuardAnalysis.analyzeEmail(subject, sender, body);
    setResult('safe', 'Analyzing email...', 0, createMessage('Please wait.'));
    setTimeout(() => {
        const signalBody = createSignalBody(
            'Matched terms:',
            analysis.detectedKeywords,
            'No configured phishing keywords were detected.',
            'This score is only a heuristic; it does not prove that an email is safe.',
        );

        if (analysis.score > 40) {
            setResult(
                'phishing',
                'Phishing indicators detected',
                analysis.score,
                signalBody,
            );
        } else {
            setResult(
                'safe',
                'Lower-risk result',
                analysis.score,
                signalBody,
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
