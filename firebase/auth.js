/* ==========================================================
   VIVAHA
   FIREBASE AUTH
   Part 1
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    auth,
    db

} from "./firebase-config.js";

import {

    GoogleAuthProvider,

    signInWithPopup,

    RecaptchaVerifier,

    signInWithPhoneNumber

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ==========================================================
   GOOGLE PROVIDER
========================================================== */

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({

    prompt: "select_account"

});

/* ==========================================================
   RECAPTCHA
========================================================== */

let recaptchaVerifier = null;

/* ==========================================================
   INITIALIZE RECAPTCHA
========================================================== */

export function initializeRecaptcha() {

    if (recaptchaVerifier) {

        return recaptchaVerifier;

    }

    recaptchaVerifier = new RecaptchaVerifier(

        auth,

        "recaptcha-container",

        {

            size: "invisible",

            callback: () => {

                console.log("reCAPTCHA verified.");

            }

        }

    );

    return recaptchaVerifier;

}

/* ==========================================================
   GOOGLE LOGIN
========================================================== */

export async function signInWithGoogle() {

    try {

        const result = await signInWithPopup(

            auth,

            googleProvider

        );

        return result.user;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   SEND PHONE OTP
========================================================== */

export async function sendPhoneOTP(phoneNumber) {

    try {

        const verifier = initializeRecaptcha();

        const confirmationResult =

            await signInWithPhoneNumber(

                auth,

                phoneNumber,

                verifier

            );

        return confirmationResult;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}
/* ==========================================================
   VIVAHA
   FIREBASE AUTH
   Part 2
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    auth,
    db

} from "./firebase-config.js";

import {

    signOut,
    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

    doc,
    getDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================================
   VERIFY PHONE OTP
========================================================== */

export async function verifyPhoneOTP(

    confirmationResult,
    otp

){

    try{

        const result=await confirmationResult.confirm(otp);

        return result.user;

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   CHECK USER EXISTS
========================================================== */

export async function checkUserExists(uid){

    try{

        const documentReference=doc(

            db,

            "users",

            uid

        );

        const snapshot=await getDoc(documentReference);

        return snapshot.exists();

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   GET CURRENT USER
========================================================== */

export function getCurrentUser(){

    return auth.currentUser;

}

/* ==========================================================
   LOGOUT
========================================================== */

export async function logout(){

    try{

        await signOut(auth);

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   AUTH STATE LISTENER
========================================================== */

export function observeAuthState(callback){

    return onAuthStateChanged(

        auth,

        callback

    );

}

/* ==========================================================
   IS USER LOGGED IN
========================================================== */

export function isLoggedIn(){

    return auth.currentUser!==null;

}

/* ==========================================================
   GET USER UID
========================================================== */

export function getUID(){

    if(auth.currentUser){

        return auth.currentUser.uid;

    }

    return null;

}

/* ==========================================================
   GET USER PHONE
========================================================== */

export function getPhoneNumber(){

    if(auth.currentUser){

        return auth.currentUser.phoneNumber;

    }

    return null;

}

/* ==========================================================
   GET USER EMAIL
========================================================== */

export function getEmail(){

    if(auth.currentUser){

        return auth.currentUser.email;

    }

    return null;

}

/* ==========================================================
   GET DISPLAY NAME
========================================================== */

export function getDisplayName(){

    if(auth.currentUser){

        return auth.currentUser.displayName;

    }

    return null;

}

/* ==========================================================
   END OF AUTH MODULE
========================================================== */
