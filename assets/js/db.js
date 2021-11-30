

import *  as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGlesNckUR_ME2jd0EKSP3BieJVxpRldw",
  authDomain: "pwa-simac.firebaseapp.com",
  projectId: "pwa-simac"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };