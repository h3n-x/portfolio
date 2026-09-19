import { spawn } from 'node:child_process';

const CHROME_PATH = process.env.CHROME_PATH || '/home/h3n/Portfolio/portfolio/chrome-headless-shell/linux-153.0.8010.47/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE_URL = process.env.TEST_URL || 'http://localhost:4321';

async function run() {
  console.log('🚀 Starting Language Scroll Restoration E2E Test Suite...');

  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--no-sandbox',
    '--disable-gpu',
    'about:blank'
  ]);

  try {
    let wsUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 100));
      try {
        const res = await fetch('http://127.0.0.1:9224/json/list');
        const list = await res.json();
        if (list.length > 0 && list[0].webSocketDebuggerUrl) {
          wsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch {}
    }

    if (!wsUrl) throw new Error('Could not connect to chrome-headless-shell via CDP on port 9224');

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

    console.log('\n[Case 1] Scroll to 800px on /es/ -> Switch to /en/ -> Verify scroll position');
    await send('Page.navigate', { url: `${BASE_URL}/es/` });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to 800px
    console.log('  -> Scrolling to 800px...');
    await evaluate('window.scrollTo(0, 800)');
    await new Promise(r => setTimeout(r, 200));
    let initialScrollY = await evaluate('window.scrollY');
    console.log(`  -> Initial scrollY: ${initialScrollY}`);
    if (initialScrollY < 750) {
      throw new Error(`Failed to scroll to target on /es/: scrollY = ${initialScrollY}`);
    }

    // Click language toggle
    console.log('  -> Clicking #lang-toggle to switch to /en/ ...');
    await evaluate('document.querySelector("#lang-toggle")?.click()');
    await new Promise(r => setTimeout(r, 1500));

    let enUrl = await evaluate('location.pathname');
    let enScrollY = await evaluate('window.scrollY');
    let enSaved = await evaluate('sessionStorage.getItem("preferred_scroll_y")');

    console.log(`  -> URL after toggle: ${enUrl}`);
    console.log(`  -> scrollY after toggle: ${enScrollY}`);
    console.log(`  -> sessionStorage preferred_scroll_y: ${enSaved}`);

    if (!enUrl.includes('/en/')) {
      throw new Error(`Did not navigate to /en/, current url: ${enUrl}`);
    }
    if (enScrollY < 700) {
      throw new Error(`FAIL: Scroll position reset to top on /en/! scrollY = ${enScrollY}`);
    }
    if (enSaved !== null) {
      throw new Error(`FAIL: sessionStorage preferred_scroll_y was not cleaned up: ${enSaved}`);
    }
    console.log('  ✓ PASS: Scroll position preserved on /en/ switch');

    // Case 2: Scroll to 1400px on /en/ -> Switch back to /es/ -> Verify scroll position
    console.log('\n[Case 2] Scroll to 1400px on /en/ -> Switch back to /es/ -> Verify scroll position');
    console.log('  -> Scrolling to 1400px...');
    await evaluate('window.scrollTo(0, 1400)');
    await new Promise(r => setTimeout(r, 200));
    let enScrollBefore = await evaluate('window.scrollY');
    console.log(`  -> scrollY before toggle: ${enScrollBefore}`);

    console.log('  -> Clicking #lang-toggle to switch back to /es/ ...');
    await evaluate('document.querySelector("#lang-toggle")?.click()');
    await new Promise(r => setTimeout(r, 1500));

    let esUrl = await evaluate('location.pathname');
    let esScrollY = await evaluate('window.scrollY');
    let esSaved = await evaluate('sessionStorage.getItem("preferred_scroll_y")');

    console.log(`  -> URL after toggle: ${esUrl}`);
    console.log(`  -> scrollY after toggle: ${esScrollY}`);
    console.log(`  -> sessionStorage preferred_scroll_y: ${esSaved}`);

    if (!esUrl.includes('/es/')) {
      throw new Error(`Did not navigate to /es/, current url: ${esUrl}`);
    }
    if (esScrollY < 1300) {
      throw new Error(`FAIL: Scroll position reset to top on /es/! scrollY = ${esScrollY}`);
    }
    if (esSaved !== null) {
      throw new Error(`FAIL: sessionStorage preferred_scroll_y was not cleaned up: ${esSaved}`);
    }
    console.log('  ✓ PASS: Scroll position preserved on /es/ switch');

    console.log('\n🎉 ALL SCROLL RESTORATION TESTS PASSED PERFECTLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('\n❌ SCROLL TEST FAILED:', err);
  process.exit(1);
});
