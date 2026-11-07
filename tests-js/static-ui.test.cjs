const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('browser page loads the shared analysis rules before the UI script', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const analysisScript = html.indexOf('src/browser-analysis.js');
    const appScript = html.indexOf('app.js');

    assert.ok(analysisScript >= 0);
    assert.ok(appScript > analysisScript);
});

test('analysis result rendering does not use HTML string injection sinks', () => {
    const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

    assert.doesNotMatch(app, /\.innerHTML\s*=/);
    assert.doesNotMatch(app, /insertAdjacentHTML\s*\(/);
    assert.match(app, /textContent\s*=/);
    assert.match(app, /replaceChildren\s*\(/);
});
