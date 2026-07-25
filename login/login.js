/* ==========================================================
   VIVAHAA
   Login Page
   Google Authentication
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    signInWithGoogle,
    observeAuthState

} from "../firebase/auth.js";

/* ==========================================================
   ELEMENTS
========================================================== */

const googleButton = document.getElementById("googleLogin");

const loader = document.getElementById("loader");

/* ==========================================================
   LOADER
========================================================== */

function showLoader() {

    loader.classList.remove("hidden");

}

function hideLoader() {

    loader.classList.add("hidden");

}

/* ==========================================================
   GOOGLE LOGIN
========================================================== */

async function loginWithGoogle() {

    try {

        showLoader();

        const user = await signInWithGoogle();

        if (user) {

            window.location.href = "../dashboard/";

        } else {

            hideLoader();

        }

    }

    catch (error) {

        hideLoader();

        // User closed the popup or cancelled login
        if (
            error.code === "auth/popup-closed-by-user" ||
            error.code === "auth/cancelled-popup-request"
        ) {
            return;
        }

        console.error(error);

        alert(error.message);

    }

}

/* ==========================================================
   BUTTON EVENT
========================================================== */

googleButton.addEventListener(

    "click",

    loginWithGoogle

);

/* ==========================================================
   AUTH STATE
========================================================== */
observeAuthState((user) => {

    hideLoader();

    if (!user) return;

    window.location.href = "../dashboard/";

});

/* ==========================================================
   INITIALIZE
========================================================== */

hideLoader();

/* ==========================================================
   END OF FILE
========================================================== */
