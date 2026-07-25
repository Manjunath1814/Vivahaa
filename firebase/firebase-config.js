/* ==========================================================
   VIVAHA
   Firebase Configuration
   Production Ready
========================================================== */

/* ==========================================================
   VIVAHA
   Firebase Configuration
========================================================== */

"use strict";

/* ==========================================================
   FIREBASE IMPORTS
========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

/* ==========================================================
   FIREBASE CONFIG
========================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyBY8910KYqA-Fqc650-O_muQZ8BE-FuWI0",

    authDomain: "my-partner-a2c99.firebaseapp.com",

    projectId: "my-partner-a2c99",

    storageBucket: "my-partner-a2c99.firebasestorage.app",

    messagingSenderId: "1083074265867",

    appId: "1:1083074265867:web:ce970034f78b490ac3180e",

    measurementId: "G-MLKY5H9T0V"

};

/* ==========================================================
   INITIALIZE FIREBASE
========================================================== */

const app = initializeApp(firebaseConfig);

/* ==========================================================
   SERVICES
========================================================== */

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

/* ==========================================================
   EXPORTS
========================================================== */

export {

    app,

    auth,

    db,

    storage

};
