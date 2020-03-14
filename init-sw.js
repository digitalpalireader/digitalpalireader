import {Workbox} from '/digitalpalireader/content/js/external/workbox-v5.0.0/workbox-window.prod.mjs';

export function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/service_worker.js');
    wb.addEventListener('waiting', (event) => {
      wb.addEventListener('controlling', (event) => {
        window.location.reload();
      });
      wb.messageSW({type: 'SKIP_WAITING'});
    });

    wb.register();
  }

  let deferredPrompt;
  const addBtn = document.querySelector('#add-home');
  addBtn.style.display = 'none';

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addBtn.style.display = 'inline-block';

    addBtn.addEventListener('click', (e) => {
      addBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  });
}
