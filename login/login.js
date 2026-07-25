import { auth, db } from "../firebase/firebase-config.js";

import {
    signInWithGoogle
} from "../firebase/auth.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const googleBtn = document.getElementById("googleLoginBtn");
const loader = document.getElementById("loader");

let authChecked = false;

function showLoader() {
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    if (loader) loader.style.display = "none";
}

/* ----------------------------------
   Google Login
-----------------------------------*/

googleBtn.addEventListener("click", async () => {

    showLoader();

    try {

        await signInWithGoogle();

        // DO NOTHING HERE.
        // Wait for Firebase authentication.

    } catch (error) {

        hideLoader();

        if (
            error.code === "auth/popup-closed-by-user" ||
            error.code === "auth/cancelled-popup-request"
        ) {
            return;
        }

        console.error(error);
        alert(error.message);

    }

});


/* ----------------------------------
   Authentication Observer
-----------------------------------*/

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        hideLoader();
        authChecked = true;
        return;

    }

    if (authChecked === false) {

        authChecked = true;

    }

    try {

        const ref = doc(db, "users", user.uid);

        const snap = await getDoc(ref);

        if (snap.exists() && snap.data().profileCompleted === true) {

            window.location.replace("../dashboard/");

        } else {

            window.location.replace("../details/");

        }

    } catch (error) {

        hideLoader();
        console.error(error);
        alert(error.message);

    }

});
