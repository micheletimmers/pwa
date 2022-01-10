importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyDGlesNckUR_ME2jd0EKSP3BieJVxpRldw",
    authDomain: "pwa-simac.firebaseapp.com",
    projectId: "pwa-simac",
    storageBucket: "pwa-simac.appspot.com",
    messagingSenderId: "1032055915418",
    appId: "1:1032055915418:web:b551853ddee057f6a3b023",
    measurementId: "G-V30NRLBKSB"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});