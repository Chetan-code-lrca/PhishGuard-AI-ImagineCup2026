ccccc// PhishGuard AI - JavaScript Functionality

// Phishing indicators for demo
const phishingKeywords = [
    'verify', 'urgent', 'suspended', 'confirm', 'update',
    'click here', 'limited time', 'act now', 'prize',
    'congratulations', 'winner', 'claim', 'password',
    'social security', 'account', 'billing'
];

const suspiciousURLPatterns = [
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
    /@.*@/, // Multiple @ symbols
    /\-.*\-.*\-/, // Multiple hyphens
    /[0-9]{4,}/, // Long number sequences
];

// URL Analysis Function
function analyzeURL() {
    const urlInput = document.getElementById('urlInput');
    const urlResult = document.getElementById('urlResult');
    const url = urlInput.value.trim();

    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Simulate API call with loading
    urlResult.innerHTML = '<p>Analyzing URL...</p>';
    urlResult.className = 'result show';

    setTimeout(() => {
        let score = 0;
        let reasons = [];

        // Check for HTTPS
        if (!url.startsWith('https://')) {
            score += 30;
            reasons.push('❌ Not using secure HTTPS protocol');
        }

        // Check for suspicious patterns
        suspiciousURLPatterns.forEach(pattern => {
            if (pattern.test(url)) {
                score += 25;
                reasons.push('⚠️ Contains suspicious URL pattern');
            }
        });

        // Check domain length
        if (url.length > 75) {
            score += 20;
            reasons.push('⚠️ Unusually long URL');
        }

        // Check for URL shorteners (demo)
        const shorteners = ['bit.ly', 'tinyurl', 't.co'];
        if (shorteners.some(s => url.includes(s))) {
            score += 15;
            reasons.push('⚠️ Uses URL shortener');
        }

        // Display result
        if (score > 50) {
            urlResult.className = 'result phishing show';
            urlResult.innerHTML = `
                <h3>🚨 PHISHING DETECTED</h3>
                <p><strong>Risk Score: ${score}%</strong></p>
                <p><strong>Reasons:</strong></p>
                <ul>${reasons.map(r => `<li>${r}</li>`).join('')}</ul>
                <p><em>⚠️ Do not visit this URL or enter any personal information.</em></p>
            `;
        } else {
            urlResult.className = 'result safe show';
            urlResult.innerHTML = `
                <h3>✅ SAFE</h3>
                <p><strong>Risk Score: ${score}%</strong></p>
                <p>This URL appears to be legitimate.</p>
                ${reasons.length > 0 ? `<p><strong>Minor concerns:</strong></p><ul>${reasons.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
                <p><em>Always verify the sender before clicking links.</em></p>
            `;
        }
    }, 1500);
}

// Email Analysis Function
function analyzeEmail() {
    const emailInput = document.getElementById('emailInput');
    const emailResult = document.getElementById('emailResult');
    const emailText = emailInput.value.trim().toLowerCase();

    if (!emailText) {
        alert('Please enter email content');
        return;
    }

    // Simulate API call with loading
    emailResult.innerHTML = '<p>Analyzing email content...</p>';
    emailResult.className = 'result show';

    setTimeout(() => {
        let score = 0;
        let detectedKeywords = [];

        // Check for phishing keywords
        phishingKeywords.forEach(keyword => {
            if (emailText.includes(keyword.toLowerCase())) {
                score += 10;
                detectedKeywords.push(keyword);
            }
        });

        // Check for urgency indicators
        const urgencyWords = ['immediately', 'urgent', 'expires', 'deadline'];
        const urgencyCount = urgencyWords.filter(word => emailText.includes(word)).length;
        if (urgencyCount > 0) {
            score += urgencyCount * 15;
        }

        // Check for poor grammar (simplified demo)
        const grammarIssues = (emailText.match(/[.!?]\s*[a-z]/g) || []).length;
        if (grammarIssues > 2) {
            score += 15;
        }

        // Display result
        if (score > 40) {
            emailResult.className = 'result phishing show';
            emailResult.innerHTML = `
                <h3>🚨 PHISHING EMAIL DETECTED</h3>
                <p><strong>Risk Score: ${Math.min(score, 95)}%</strong></p>
                <p><strong>Detected suspicious keywords:</strong> ${detectedKeywords.join(', ')}</p>
                <p><em>⚠️ This email shows signs of phishing. Do not click any links or provide personal information.</em></p>
                <p><strong>Recommendation:</strong> Delete this email immediately and report it as spam.</p>
            `;
        } else {
            emailResult.className = 'result safe show';
            emailResult.innerHTML = `
                <h3>✅ SAFE</h3>
                <p><strong>Risk Score: ${score}%</strong></p>
                <p>This email appears to be legitimate.</p>
                ${detectedKeywords.length > 0 ? `<p><strong>Minor concerns:</strong> Contains words like "${detectedKeywords.join('", "')}"</p>` : ''}
                <p><em>Always verify sender identity and be cautious with sensitive information.</em></p>
            `;
        }
    }, 1500);
}

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const emailInput = document.getElementById('emailInput');

    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                analyzeURL();
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                analyzeEmail();
            }
        });
    }
});

// Statistics Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + (element.dataset.suffix || '');
        }
    }, 16);
}

// Initialize stats animation on page load
window.addEventListener('load', function() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target || 0);
        if (target > 0) {
            animateCounter(stat, target);
        }
    });
});
