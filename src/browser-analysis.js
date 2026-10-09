/* Shared browser analysis rules, also importable by Node's built-in test runner. */
(function (root, factory) {
    const api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }
    if (root) {
        root.PhishGuardAnalysis = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    const phishingKeywords = [
        'verify', 'urgent', 'suspended', 'confirm', 'update',
        'click here', 'limited time', 'act now', 'prize',
        'congratulations', 'winner', 'claim', 'password',
        'social security', 'account', 'billing'
    ];

    const suspiciousURLPatterns = [
        { pattern: /@/, reason: 'Contains an @ symbol' },
        { pattern: /(?:-.*){3,}/, reason: 'Contains an unusual concentration of hyphens' },
        { pattern: /\d{4,}/, reason: 'Contains a long numeric sequence' }
    ];

    const shorteners = ['bit.ly', 'tinyurl.com', 't.co'];

    function isIPv4Address(hostname) {
        const parts = hostname.split('.');
        return parts.length === 4 &&
            parts.every(part => /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
    }

    function analyzeURL(input) {
        const value = String(input ?? '').trim();
        if (!value) {
            return { valid: false, error: 'empty', score: 0, reasons: [] };
        }

        let parsed;
        try {
            parsed = new URL(value);
        } catch {
            return { valid: false, error: 'invalid-url', score: 0, reasons: [] };
        }

        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return { valid: false, error: 'unsupported-protocol', score: 0, reasons: [] };
        }

        let score = 0;
        const reasons = [];
        const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
        const normalizedHostname = hostname.endsWith('.') ? hostname.slice(0, -1) : hostname;

        if (parsed.protocol !== 'https:') {
            score += 30;
            reasons.push('Not using HTTPS');
        }

        // Inspect the parsed hostname, not arbitrary URL path/query text.
        if (isIPv4Address(normalizedHostname) || normalizedHostname.includes(':')) {
            score += 25;
            reasons.push('Uses an IP address as the hostname');
        }

        for (const signal of suspiciousURLPatterns) {
            if (signal.pattern.test(value)) {
                score += 25;
                reasons.push(signal.reason);
            }
        }

        if (value.length > 75) {
            score += 20;
            reasons.push('Unusually long URL');
        }

        if (shorteners.some(domain => normalizedHostname === domain || normalizedHostname.endsWith('.' + domain))) {
            score += 15;
            reasons.push('Uses a common URL shortener');
        }

        return { valid: true, score: Math.min(score, 100), reasons, hostname: parsed.hostname };
    }

    function analyzeEmail(subject, sender, body) {
        const emailText = [subject, sender, body]
            .map(part => String(part ?? '').trim())
            .join(' ')
            .trim()
            .toLowerCase();

        if (!emailText) {
            return { valid: false, score: 0, detectedKeywords: [] };
        }

        let score = 0;
        const detectedKeywords = [];
        for (const keyword of phishingKeywords) {
            if (emailText.includes(keyword)) {
                score += 10;
                detectedKeywords.push(keyword);
            }
        }

        const urgencyWords = ['immediately', 'urgent', 'expires', 'deadline'];
        score += urgencyWords.filter(word => emailText.includes(word)).length * 15;

        const grammarIssues = (emailText.match(/[.!?]\s*[a-z]/g) || []).length;
        if (grammarIssues > 2) {
            score += 15;
        }

        return {
            valid: true,
            score: Math.min(score, 100),
            detectedKeywords,
            grammarIssues
        };
    }

    return Object.freeze({ analyzeURL, analyzeEmail });
});
