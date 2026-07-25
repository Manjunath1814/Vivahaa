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

        await signInWithGoogle();

        window.location.href = "../dashboard/";

    }

    catch (error) {

        hideLoader();

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

    if (user) {

        window.location.href = "../dashboard/";

    }

});

/* ==========================================================
   INITIALIZE
========================================================== */

hideLoader();

/* ==========================================================
   END OF FILE
========================================================== */
