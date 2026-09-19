import { spawn } from 'node:child_process';

const CHROME_PATH = process.env.CHROME_PATH || '/home/h3n/Portfolio/portfolio/chrome-headless-shell/linux-153.0.8010.47/chrome-headless-shell-linux64/chrome-headless-shell';
const BASE_URL = process.env.TEST_URL || 'http://localhost:4321';

async function run() {
  console.log('🚀 Starting Project Modals E2E Test Suite...');

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

    if (!wsUrl) throw new Error('Could not connect to chrome-headless-shell on port 9224');

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

    console.log('\n[1] Navigating to /es/ ...');
    await send('Page.navigate', { url: `${BASE_URL}/es/` });
    await new Promise(r => setTimeout(r, 1000));

    // Verify all 5 project cards and modals exist
    const projectSlugs = ['archforge', 'repo-secret-auditor', 'dockerward', 'chat-anonimo', 'secuscan-api'];
    
    for (const slug of projectSlugs) {
      const cardExists = await evaluate(`!!document.querySelector('#${slug}')`);
      const modalExists = await evaluate(`!!document.querySelector('#modal-${slug}')`);
      const isVisible = await evaluate(`window.getComputedStyle(document.querySelector('#modal-${slug}')).display !== 'none'`);
      if (isVisible) {
        throw new Error(`Modal for ${slug} is visible on page load! Computed display is not 'none'`);
      }
      if (!cardExists || !modalExists) {
        throw new Error(`Card or modal missing for ${slug}: card=${cardExists}, modal=${modalExists}`);
      }
      console.log(`  ✓ Found card & modal for ${slug} (correctly hidden initially)`);
    }

    // Test SecuScan API modal interactive open and close
    console.log('\n[2] Testing SecuScan API modal interaction...');
    await evaluate(`document.querySelector('#secuscan-api').click()`);
    await new Promise(r => setTimeout(r, 300));

    let isOpen = await evaluate(`document.querySelector('#modal-secuscan-api')?.open`);
    let overflow = await evaluate(`document.documentElement.style.overflow`);
    console.log(`  Modal open: ${isOpen}, body overflow: "${overflow}"`);
    if (!isOpen || overflow !== 'hidden') {
      throw new Error(`SecuScan modal failed to open cleanly. open=${isOpen}, overflow=${overflow}`);
    }

    // Test Escape key
    console.log('\n[2b] Testing Escape key closes modal...');
    await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }))`);
    await new Promise(r => setTimeout(r, 300));
    isOpen = await evaluate(`document.querySelector('#modal-secuscan-api')?.open`);
    overflow = await evaluate(`document.documentElement.style.overflow`);
    if (isOpen || overflow !== '') {
      throw new Error(`Modal failed to close on Escape key! open=${isOpen}, overflow=${overflow}`);
    }
    console.log('  ✓ Modal closed on Escape key successfully');

    // Reopen and test close button
    console.log('\n[2c] Testing Close Button (X and Close)...');
    await evaluate(`document.querySelector('#secuscan-api').click()`);
    await new Promise(r => setTimeout(r, 300));
    await evaluate(`document.querySelector('#modal-secuscan-api .modal-close-btn').click()`);
    await new Promise(r => setTimeout(r, 300));
    isOpen = await evaluate(`document.querySelector('#modal-secuscan-api')?.open`);
    overflow = await evaluate(`document.documentElement.style.overflow`);
    console.log(`  Modal closed via button: ${!isOpen}, body overflow restored: "${overflow}"`);
    if (isOpen || overflow !== '') {
      throw new Error(`SecuScan modal failed to close via button. open=${isOpen}, overflow=${overflow}`);
    }

    // Test Card CTA button opening SecuScan modal
    console.log('\n[3] Testing Card CTA action button...');
    await evaluate(`document.querySelector('#secuscan-api button[data-modal-target="modal-secuscan-api"]').click()`);
    await new Promise(r => setTimeout(r, 300));
    isOpen = await evaluate(`document.querySelector('#modal-secuscan-api')?.open`);
    if (!isOpen) throw new Error(`Card CTA button failed to open SecuScan modal`);
    console.log('  ✓ Card CTA button opened modal successfully');

    // Close with backdrop click
    await evaluate(`document.querySelector('#modal-secuscan-api').close()`);
    await new Promise(r => setTimeout(r, 200));

    // Verify footer has no copyright
    const footerHasCopyright = await evaluate(`document.querySelector('footer')?.innerText.includes('All rights reserved') || document.querySelector('footer')?.innerText.includes('©')`);
    if (footerHasCopyright) {
      throw new Error(`Footer still contains copyright text!`);
    }
    console.log('  ✓ Verified footer has no copyright or rights reserved text');

    console.log('\n[4] Navigating to /en/ and testing English modals...');
    await send('Page.navigate', { url: `${BASE_URL}/en/` });
    await new Promise(r => setTimeout(r, 1000));

    for (const slug of projectSlugs) {
      const cardExists = await evaluate(`!!document.querySelector('#${slug}')`);
      const modalExists = await evaluate(`!!document.querySelector('#modal-${slug}')`);
      if (!cardExists || !modalExists) {
        throw new Error(`English card or modal missing for ${slug}`);
      }
    }
    console.log('  ✓ All 5 English project cards and modals verified');

    // Test SecuScan API modal on /en/
    await evaluate(`document.querySelector('#secuscan-api').click()`);
    await new Promise(r => setTimeout(r, 300));
    isOpen = await evaluate(`document.querySelector('#modal-secuscan-api')?.open`);
    if (!isOpen) throw new Error(`English SecuScan modal failed to open`);
    console.log('  ✓ English SecuScan modal opened successfully');

    // Verify LinkedIn URLs
    const linkedinLinks = await evaluate(`Array.from(document.querySelectorAll('a[href*="linkedin"]')).map(a => a.href)`);
    console.log('\n[5] LinkedIn links found:', linkedinLinks);
    for (const href of linkedinLinks) {
      if (!href.includes('linkedin.com/in/h3n-x')) {
        throw new Error(`Found non-matching LinkedIn link: ${href}`);
      }
    }
    console.log('  ✓ All LinkedIn links correctly point to https://www.linkedin.com/in/h3n-x');

    // Verify Defense-in-depth banner subtitle
    const hasOldSubtitle = await evaluate(`document.body.innerHTML.includes('HENRY PACHECO (H3N)') || document.body.innerHTML.includes('H3N-X.NETLIFY.APP')`);
    if (hasOldSubtitle) {
      throw new Error(`Found old author or netlify URL in page content!`);
    }
    console.log('  ✓ Verified no old watermark/domain in page');

    console.log('\n🎉 ALL MODAL, LINKEDIN & SANITIZATION TESTS PASSED SUCCESSFULLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
