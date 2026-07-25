/* ==========================================================
   VIVAHAA
   Firebase Authentication
   Version : 1.0.0
   Google Sign-In Only
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import { auth } from "./firebase-config.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

/* ==========================================================
   GOOGLE AUTH PROVIDER
========================================================== */

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

/* ==========================================================
   SIGN IN WITH GOOGLE
========================================================== */

export async function signInWithGoogle() {

    try {

        const result = await signInWithPopup(
            auth,
            googleProvider
        );

        return result.user;

    } catch (error) {

        console.error("Google Sign-In Error:", error);

        throw error;

    }

}

/* ==========================================================
   SIGN OUT
========================================================== */

export async function logout() {

    try {

        await signOut(auth);

    } catch (error) {

        console.error("Logout Error:", error);

        throw error;

    }

}

/* ==========================================================
   AUTH STATE OBSERVER
========================================================== */

export function observeAuthState(callback) {

    return onAuthStateChanged(
        auth,
        callback
    );

}

/* ==========================================================
   GET CURRENT USER
========================================================== */

export function getCurrentUser() {

    return auth.currentUser;

}

/* ==========================================================
   USER HELPERS
========================================================== */

export function isLoggedIn() {

    return auth.currentUser !== null;

}

export function getUID() {

    return auth.currentUser
        ? auth.currentUser.uid
        : null;

}

export function getEmail() {

    return auth.currentUser
        ? auth.currentUser.email
        : null;

}

export function getDisplayName() {

    return auth.currentUser
        ? auth.currentUser.displayName
        : null;

}

export function getPhotoURL() {

    return auth.currentUser
        ? auth.currentUser.photoURL
        : null;

}

/* ==========================================================
   END OF FILE
========================================================== */
