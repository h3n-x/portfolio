import { spawn } from 'node:child_process';

const CHROME_PATH = process.env.CHROME_PATH || '/home/h3n/Portfolio/portfolio/chrome-headless-shell/linux-153.0.8010.47/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE_URL = process.env.TEST_URL || 'http://localhost:4321';

async function run() {
  console.log('🚀 Starting Theme & Language Persistence E2E Test Suite...');

  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--no-sandbox',
    '--disable-gpu',
    'about:blank'
  ]);

  try {
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 100));
      try {
        const res = await fetch('http://127.0.0.1:9223/json/list');
        const list = await res.json();
        if (list.length > 0 && list[0].webSocketDebuggerUrl) {
          wsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }

    if (!wsUrl) throw new Error('Could not connect to chrome-headless-shell via CDP on port 9223');

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const handler = (evt) => {
          const res = JSON.parse(evt.data);
          if (res.id === msgId) {
            ws.removeEventListener('message', handler);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      return res.result.value;
    }

    await send('Page.enable');
    await send('Runtime.enable');

    // Collect console errors
    const consoleErrors = [];
    ws.addEventListener('message', (evt) => {
      const data = JSON.parse(evt.data);
      if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') {
        consoleErrors.push(data.params.args.map(a => a.value).join(' '));
      }
    });

    // Helper: get current state
    async function getState() {
      return await evaluate(`({
        isDark: document.documentElement.classList.contains('dark'),
        storedTheme: localStorage.getItem('theme'),
        url: location.pathname,
        metaThemeColor: document.querySelector('meta[name="theme-color"]')?.getAttribute('content')
      })`);
    }

    // Helper: click element by selector
    async function click(selector) {
      await evaluate(`document.querySelector('${selector}')?.click()`);
      await new Promise(r => setTimeout(r, 400));
    }

    // --- TEST CASE 1: Light -> Toggle Dark -> Navigate ES to EN -> Navigate EN to ES ---
    console.log('\n[Case 1] Light -> Toggle Dark -> Language Switch (ES -> EN -> ES)');
    await send('Page.navigate', { url: `${BASE_URL}/es/` });
    await new Promise(r => setTimeout(r, 800));
    await evaluate('localStorage.clear()');
    await send('Page.navigate', { url: `${BASE_URL}/es/` });
    await new Promise(r => setTimeout(r, 800));

    let s = await getState();
    console.log('  Initial /es/ state:', s);

    console.log('  -> Toggling to DARK...');
    await click('#theme-toggle');
    s = await getState();
    if (!s.isDark || s.storedTheme !== 'dark') {
      throw new Error(`Failed to toggle to dark mode. State: ${JSON.stringify(s)}`);
    }
    console.log('  -> State after toggle:', s);

    console.log('  -> Switching language to /en/ ...');
    await click('header a[href*="/en/"]');
    s = await getState();
    console.log('  -> State on /en/:', s);
    if (!s.isDark || s.storedTheme !== 'dark' || !s.url.includes('/en/')) {
      throw new Error(`FAIL: Dark theme lost on transition to /en/. State: ${JSON.stringify(s)}`);
    }
    console.log('  ✓ PASS: Dark theme persisted on /en/');

    console.log('  -> Switching language back to /es/ ...');
    await click('header a[href*="/es/"]');
    s = await getState();
    console.log('  -> State on /es/:', s);
    if (!s.isDark || s.storedTheme !== 'dark' || !s.url.includes('/es/')) {
      throw new Error(`FAIL: Dark theme lost on transition back to /es/. State: ${JSON.stringify(s)}`);
    }
    console.log('  ✓ PASS: Dark theme persisted back on /es/');

    // --- TEST CASE 2: Dark -> Toggle Light -> Navigate ES to EN -> Navigate EN to ES ---
    console.log('\n[Case 2] Dark -> Toggle Light -> Language Switch (ES -> EN -> ES)');
    console.log('  -> Toggling to LIGHT...');
    await click('#theme-toggle');
    s = await getState();
    console.log('  -> State after toggle:', s);
    if (s.isDark || s.storedTheme !== 'light') {
      throw new Error(`Failed to toggle to light mode. State: ${JSON.stringify(s)}`);
    }

    console.log('  -> Switching language to /en/ ...');
    await click('header a[href*="/en/"]');
    s = await getState();
    console.log('  -> State on /en/:', s);
    if (s.isDark || s.storedTheme !== 'light' || !s.url.includes('/en/')) {
      throw new Error(`FAIL: Light theme lost on transition to /en/. State: ${JSON.stringify(s)}`);
    }
    console.log('  ✓ PASS: Light theme persisted on /en/');

    console.log('  -> Switching language back to /es/ ...');
    await click('header a[href*="/es/"]');
    s = await getState();
    console.log('  -> State on /es/:', s);
    if (s.isDark || s.storedTheme !== 'light' || !s.url.includes('/es/')) {
      throw new Error(`FAIL: Light theme lost on transition back to /es/. State: ${JSON.stringify(s)}`);
    }
    console.log('  ✓ PASS: Light theme persisted back on /es/');

    if (consoleErrors.length > 0) {
      throw new Error(`Console errors detected during test: ${consoleErrors.join(', ')}`);
    }

    console.log('\n🎉 ALL THEME & LANGUAGE TRANSITION TESTS PASSED SUCCESSFULLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
