/* ==========================================================
   VIVAHA
   FIRESTORE
   Part 1
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    db

} from "./firebase-config.js";

import {

    doc,

    setDoc,

    getDoc,

    updateDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================================
   CREATE USER PROFILE
========================================================== */

export async function createUserProfile(

    uid,

    profileData

){

    try{

        await setDoc(

            doc(db,"users",uid),

            {

                ...profileData,

                createdAt:serverTimestamp(),

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   GET USER PROFILE
========================================================== */

export async function getUserProfile(uid){

    try{

        const snapshot=await getDoc(

            doc(db,"users",uid)

        );

        if(snapshot.exists()){

            return snapshot.data();

        }

        return null;

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   UPDATE USER PROFILE
========================================================== */

export async function updateUserProfile(

    uid,

    updatedData

){

    try{

        await updateDoc(

            doc(db,"users",uid),

            {

                ...updatedData,

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   CHECK PROFILE EXISTS
========================================================== */

export async function profileExists(uid){

    try{

        const snapshot=await getDoc(

            doc(db,"users",uid)

        );

        return snapshot.exists();

    }

    catch(error){

        console.error(error);

        throw error;

    }

}
/* ==========================================================
   VIVAHA
   FIRESTORE
   Part 2
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    db

} from "./firebase-config.js";

import {

    doc,

    deleteDoc,

    updateDoc,

    serverTimestamp,

    increment

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================================
   DELETE USER PROFILE
========================================================== */

export async function deleteUserProfile(uid){

    try{

        await deleteDoc(

            doc(db,"users",uid)

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   MERGE USER PROFILE
========================================================== */

export async function mergeUserProfile(

    uid,

    data

){

    try{

        await updateDoc(

            doc(db,"users",uid),

            {

                ...data,

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   UPDATE PROFILE COMPLETION
========================================================== */

export async function updateProfileCompletion(

    uid,

    percentage

){

    try{

        await updateDoc(

            doc(db,"users",uid),

            {

                profileCompletion:percentage,

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   UPDATE LAST ACTIVE
========================================================== */

export async function updateLastActive(uid){

    try{

        await updateDoc(

            doc(db,"users",uid),

            {

                lastActive:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   INCREMENT PROFILE VIEWS
========================================================== */

export async function incrementProfileViews(uid){

    try{

        await updateDoc(

            doc(db,"users",uid),

            {

                profileViews:increment(1),

                updatedAt:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   TOGGLE ONLINE STATUS
========================================================== */

export async function updateOnlineStatus(

    uid,

    status

){

    try{

        await updateDoc(

            doc(db,"users",uid),

            {

                online:status,

                lastSeen:serverTimestamp()

            }

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   SERVER TIMESTAMP
========================================================== */

export function getServerTimestamp(){

    return serverTimestamp();

}

/* ==========================================================
   COLLECTION NAMES
========================================================== */

export const COLLECTIONS={

    USERS:"users",

    MATCHES:"matches",

    CHATS:"chats",

    MESSAGES:"messages",

    INTERESTS:"interests",

    NOTIFICATIONS:"notifications",

    PREMIUM:"premium",

    PAYMENTS:"payments",

    REPORTS:"reports",

    SETTINGS:"settings"

};

/* ==========================================================
   END OF MODULE
========================================================== */
