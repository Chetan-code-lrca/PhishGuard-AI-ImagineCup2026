const test = require('node:test');
const assert = require('node:assert/strict');
const { analyzeURL, analyzeEmail } = require('../src/browser-analysis.js');

test('rejects empty, malformed, and non-HTTP(S) URL inputs', () => {
    assert.equal(analyzeURL('').error, 'empty');
    assert.equal(analyzeURL('not a complete URL').valid, false);
    assert.equal(analyzeURL('javascript:alert(1)').error, 'unsupported-protocol');
});

test('does not penalize HTTPS URLs without configured signals', () => {
    const result = analyzeURL('https://example.com/login');
    assert.equal(result.valid, true);
    assert.equal(result.score, 0);
    assert.deepEqual(result.reasons, []);
});

test('flags non-HTTPS URLs', () => {
    const result = analyzeURL('http://example.com/login');
    assert.equal(result.score, 30);
    assert.ok(result.reasons.includes('Not using HTTPS'));
});

test('detects IP address hostnames, but not IP-like text in paths', () => {
    const host = analyzeURL('https://192.168.1.10/login');
    assert.equal(host.score, 25);
    assert.ok(host.reasons.includes('Uses an IP address as the hostname'));

    const path = analyzeURL('https://example.com/192.168.1.10/login');
    assert.equal(path.score, 0);
    assert.ok(!path.reasons.includes('Uses an IP address as the hostname'));
});

test('matches URL shorteners by hostname boundaries', () => {
    const shortener = analyzeURL('https://bit.ly/abc123');
    assert.equal(shortener.score, 15);
    assert.ok(shortener.reasons.includes('Uses a common URL shortener'));

    const rootDot = analyzeURL('https://bit.ly./abc123');
    assert.equal(rootDot.score, 15);
    assert.ok(rootDot.reasons.includes('Uses a common URL shortener'));

    const deceptive = analyzeURL('https://bit.ly.attacker.example/login');
    assert.equal(deceptive.score, 0);
    assert.ok(!deceptive.reasons.includes('Uses a common URL shortener'));
});

test('ignores @ symbols, hyphens, and long numbers in ordinary paths', () => {
    const result = analyzeURL('https://example.com/a-b-c-d/1234567890/@support');
    assert.equal(result.score, 0);
    assert.deepEqual(result.reasons, []);
});

test('detects suspicious hostname patterns', () => {
    const result = analyzeURL('https://1234567890.bad-a-b-c.example/login');
    assert.equal(result.score, 50);
    assert.ok(result.reasons.some(reason => reason.includes('numeric sequence')));
    assert.ok(result.reasons.some(reason => reason.includes('concentration of hyphens')));
});

test('detects embedded URL credentials', () => {
    const result = analyzeURL('https://trusted.example@attacker.example/login');
    assert.equal(result.score, 25);
    assert.ok(result.reasons.includes('Contains embedded credentials in the URL'));
    assert.equal(result.hostname, 'attacker.example');
});

test('caps URL risk scores at 100', () => {
    const result = analyzeURL('http://1234567890.bad-a-b-c.example/a-very-long-path-that-pushes-this-url-over-seventy-five-characters');
    assert.equal(result.score, 100);
});

test('email analysis is case-insensitive and returns matched keywords', () => {
    const result = analyzeEmail('URGENT: Verify your account', 'security@example.com', 'Click here to claim your prize immediately.');
    assert.equal(result.valid, true);
    assert.ok(result.score > 40);
    assert.ok(result.detectedKeywords.includes('verify'));
    assert.ok(result.detectedKeywords.includes('account'));
    assert.ok(result.detectedKeywords.includes('click here'));
});

test('email analysis handles empty content and caps risk scores', () => {
    assert.equal(analyzeEmail('', '', '').valid, false);
    const result = analyzeEmail('urgent suspended verify confirm update', '', 'winner prize password account billing claim now. Act now immediately expires deadline.');
    assert.equal(result.score, 100);
});
