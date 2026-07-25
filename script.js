/* ==========================================================
   VIVAHA SPLASH SCREEN
   Production Ready
========================================================== */

"use strict";

// ======================================
// Loading Messages
// ======================================

const loadingMessages = [

    "Building Meaningful Connections...",

    "Finding Your Perfect Match...",

    "Preparing Your Journey...",

    "Welcome To Vivaha ❤"

];

const loadingText = document.getElementById("loadingText");

let currentMessage = 0;


// ======================================
// Change Loading Text
// ======================================

const messageInterval = setInterval(() => {

    currentMessage++;

    if (currentMessage < loadingMessages.length) {

        loadingText.style.opacity = "0";

        setTimeout(() => {

            loadingText.textContent = loadingMessages[currentMessage];

            loadingText.style.opacity = "1";

        }, 250);

    }

}, 1000);


// ======================================
// Redirect After Splash
// ======================================

setTimeout(() => {

    clearInterval(messageInterval);

    document.body.style.transition = "opacity .6s ease";

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "login/";

    }, 600);

}, 3000);


// ======================================
// Prevent Right Click (Optional)
// ======================================

document.addEventListener("contextmenu", (event) => {

    event.preventDefault();

});


// ======================================
// Prevent Dragging Images
// ======================================

document.querySelectorAll("img").forEach(image => {

    image.setAttribute("draggable", "false");

});


// ======================================
// Prevent Text Selection
// ======================================

document.addEventListener("selectstart", (event) => {

    event.preventDefault();

});


// ======================================
// Prevent Zoom (Double Tap)
// ======================================

let lastTouchEnd = 0;

document.addEventListener("touchend", (event) => {

    const now = Date.now();

    if (now - lastTouchEnd <= 300) {

        event.preventDefault();

    }

    lastTouchEnd = now;

}, { passive: false });


// ======================================
// Prevent Pinch Zoom
// ======================================

document.addEventListener("gesturestart", (event) => {

    event.preventDefault();

});


// ======================================
// Page Loaded
// ======================================

window.addEventListener("load", () => {

    console.log("Vivaha Splash Screen Loaded Successfully");

});
