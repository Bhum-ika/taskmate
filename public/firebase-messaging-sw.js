importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  // use the same config here
   apiKey: "AIzaSyD_VcFjp0oSwKarBl_eED9MWpIsxEVCy1M",
  authDomain: "task-manager-a9204.firebaseapp.com",
  projectId: "task-manager-a9204",
  storageBucket: "task-manager-a9204.firebasestorage.app",
  messagingSenderId: "864208127615",
  appId: "1:864208127615:web:a1c1179370ed18e99d614a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
