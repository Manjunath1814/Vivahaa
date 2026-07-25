/* ==========================================================
   VIVAHA LOGIN
   Part 2 - Firebase Authentication
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    signInWithGoogle,

    sendPhoneOTP,

    verifyPhoneOTP,

    checkUserExists,

    auth

} from "../firebase/auth.js";

import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

    showLoader,

    hideLoader,

    phoneInput,

    otpSection,

    otpInputs

} from "./login.js";

/* ==========================================================
   ELEMENTS
========================================================== */

const googleButton=document.getElementById("googleLogin");

const sendOtpButton=document.getElementById("sendOtp");

const verifyButton=document.getElementById("verifyOtp");

let confirmationResult=null;

/* ==========================================================
   GOOGLE LOGIN
========================================================== */

googleButton.addEventListener("click",async()=>{

    try{

        showLoader();

        const user=await signInWithGoogle();

        await redirectUser(user.uid);

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

    finally{

        hideLoader();

    }

});

/* ==========================================================
   SEND PHONE OTP
========================================================== */

sendOtpButton.addEventListener("click",async()=>{

    try{

        const phone="+91"+phoneInput.value.trim();

        showLoader();

        confirmationResult=await sendPhoneOTP(phone);

        otpSection.style.display="block";

        otpInputs[0].focus();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

    finally{

        hideLoader();

    }

});

/* ==========================================================
   VERIFY OTP
========================================================== */

verifyButton.addEventListener("click",async()=>{

    try{

        let otp="";

        otpInputs.forEach(input=>otp+=input.value);

        if(otp.length!==6){

            alert("Enter valid OTP");

            return;

        }

        showLoader();

        const user=await verifyPhoneOTP(

            confirmationResult,

            otp

        );

        await redirectUser(user.uid);

    }

    catch(error){

        console.error(error);

        alert("Invalid OTP");

    }

    finally{

        hideLoader();

    }

});

/* ==========================================================
   REDIRECT LOGIC
========================================================== */

async function redirectUser(uid){

    const exists=await checkUserExists(uid);

    if(exists){

        window.location.href="../dashboard/";

    }

    else{

        window.location.href="../profile/";

    }

}

/* ==========================================================
   SESSION CHECK
========================================================== */

onAuthStateChanged(auth,async(user)=>{

    if(!user){

        return;

    }

    await redirectUser(user.uid);

});

/* ==========================================================
   END
========================================================== */
