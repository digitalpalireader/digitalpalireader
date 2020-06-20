import { Workbox, messageSW } from 'https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-window.prod.mjs';

import '/_dprhtml/js/chrome.A2858213981B7D0B87D1BEA6B6AEFE62.js'

// NOTE: Reference code: https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
async function configureNewVersionCheck() {
  const wb = new Workbox('/_dprhtml/sw.js');

  let registration;

  const showSkipWaitingPrompt = _ =>
    DPR_Chrome.showSingletonInformationToast(
      'New version is available',
      'dpr-update-available-toast',
      150,
      async () => {
        wb.addEventListener('controlling', (_) => {
          window.location.reload();
        });

        if (registration && registration.waiting) {
          messageSW(registration.waiting, { type: 'SKIP_WAITING' });
        }
      });

  wb.addEventListener('waiting', showSkipWaitingPrompt);
  wb.addEventListener('externalwaiting', showSkipWaitingPrompt);

  registration = await wb.register();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/_dprhtml/sw.js'));
  configureNewVersionCheck();
}
