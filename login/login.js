/* ==========================================================
   VIVAHA LOGIN
   Part 1 - UI Logic
========================================================== */

"use strict";

/* ==========================================================
   ELEMENTS
========================================================== */

const phoneForm = document.getElementById("phoneForm");

const phoneInput = document.getElementById("phone");

const sendOtpButton = document.getElementById("sendOtp");

const otpSection = document.getElementById("otpSection");

const verifyButton = document.getElementById("verifyOtp");

const resendButton = document.getElementById("resendOtp");

const loader = document.getElementById("loader");

const otpInputs = document.querySelectorAll(".otp-boxes input");

/* ==========================================================
   LOADER
========================================================== */

function showLoader(){

    loader.style.display="flex";

}

function hideLoader(){

    loader.style.display="none";

}

/* ==========================================================
   PHONE VALIDATION
========================================================== */

function validatePhone(phone){

    return /^[6-9]\d{9}$/.test(phone);

}

/* ==========================================================
   SEND OTP CLICK
========================================================== */

phoneForm.addEventListener("submit",(event)=>{

    event.preventDefault();

    const phone=phoneInput.value.trim();

    if(!validatePhone(phone)){

        alert("Please enter a valid mobile number.");

        phoneInput.focus();

        return;

    }

    showLoader();

    setTimeout(()=>{

        hideLoader();

        otpSection.style.display="block";

        otpInputs[0].focus();

    },600);

});

/* ==========================================================
   OTP AUTO NEXT
========================================================== */

otpInputs.forEach((input,index)=>{

    input.addEventListener("input",(event)=>{

        event.target.value=event.target.value.replace(/\D/g,"");

        if(event.target.value.length===1){

            if(index<otpInputs.length-1){

                otpInputs[index+1].focus();

            }

        }

    });

});

/* ==========================================================
   BACKSPACE SUPPORT
========================================================== */

otpInputs.forEach((input,index)=>{

    input.addEventListener("keydown",(event)=>{

        if(event.key==="Backspace"){

            if(input.value===""){

                if(index>0){

                    otpInputs[index-1].focus();

                }

            }

        }

    });

});

/* ==========================================================
   PASTE OTP
========================================================== */

otpInputs[0].addEventListener("paste",(event)=>{

    event.preventDefault();

    const otp=(event.clipboardData||window.clipboardData)

    .getData("text")

    .replace(/\D/g,"")

    .substring(0,6);

    otp.split("").forEach((digit,index)=>{

        if(otpInputs[index]){

            otpInputs[index].value=digit;

        }

    });

});

/* ==========================================================
   GET OTP
========================================================== */

function getOTP(){

    let otp="";

    otpInputs.forEach((input)=>{

        otp+=input.value;

    });

    return otp;

}

/* ==========================================================
   VERIFY BUTTON
========================================================== */

verifyButton.addEventListener("click",()=>{

    const otp=getOTP();

    if(otp.length!==6){

        alert("Please enter the complete OTP.");

        return;

    }

    showLoader();

});

/* ==========================================================
   RESEND BUTTON
========================================================== */

resendButton.addEventListener("click",()=>{

    alert("OTP resend request initiated.");

});

/* ==========================================================
   EXPORTS
========================================================== */

export{

    showLoader,

    hideLoader,

    phoneInput,

    otpSection,

    otpInputs

};
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



/* ==========================================================
   ELEMENTS
========================================================== */

const googleButton=document.getElementById("googleLogin");



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
