// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
const firebaseConfig = {
  apiKey: "AIzaSyAhjBF4Vs0on8oF-lfY8OOkYndjRPdsxdA",
  authDomain: "push-6b014.firebaseapp.com",
  projectId: "push-6b014",
  storageBucket: "push-6b014.firebasestorage.app",
  messagingSenderId: "683075307853",
  appId: "1:683075307853:web:fe59eba0b8bd5cdcd38f04",
  measurementId: "G-1XRKRTC8RH"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

/* ------------------------------------------------------------------
   BACKGROUND HANDLER (data-only messages)
   ------------------------------------------------------------------ */
messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Background payload:', payload);

  // Only handle data messages manually
  if (!payload.data) return;

  const title = payload.data.title || 'Notification';
  const options = {
    body: payload.data.body || '',
    icon: payload.data.icon || '/favicon.ico',
    image: payload.data.image || undefined,
    badge: payload.data.badge || undefined,
    vibrate: [200, 100, 200],
    data: { link: payload.data.link || '/' },
    tag: 'fcm-push-' + (payload.messageId || Date.now()),
    requireInteraction: false
  };

  self.registration.showNotification(title, options);
});

/* ------------------------------------------------------------------
   CLICK HANDLER (open the link)
   ------------------------------------------------------------------ */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.link || '/';
  event.waitUntil(clients.openWindow(url));
});
