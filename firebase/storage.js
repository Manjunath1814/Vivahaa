/* ==========================================================
   VIVAHA
   FIREBASE STORAGE
   Part 1
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    storage

} from "./firebase-config.js";

import {

    ref,

    uploadBytesResumable,

    getDownloadURL,

    deleteObject

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

/* ==========================================================
   CONSTANTS
========================================================== */

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [

    "image/jpeg",

    "image/png",

    "image/webp"

];

/* ==========================================================
   VALIDATE IMAGE
========================================================== */

export function validateImage(file){

    if(!file){

        throw new Error("No file selected.");

    }

    if(!ALLOWED_IMAGE_TYPES.includes(file.type)){

        throw new Error("Only JPG, PNG and WEBP images are allowed.");

    }

    if(file.size > MAX_IMAGE_SIZE){

        throw new Error("Image size should be less than 5 MB.");

    }

    return true;

}

/* ==========================================================
   UPLOAD PROFILE PHOTO
========================================================== */

export function uploadProfilePhoto(

    uid,

    file,

    onProgress = ()=>{}

){

    validateImage(file);

    return new Promise((resolve,reject)=>{

        const fileReference = ref(

            storage,

            `users/${uid}/profile/profile.jpg`

        );

        const uploadTask = uploadBytesResumable(

            fileReference,

            file

        );

        uploadTask.on(

            "state_changed",

            (snapshot)=>{

                const progress =

                Math.round(

                    (snapshot.bytesTransferred/

                    snapshot.totalBytes)*100

                );

                onProgress(progress);

            },

            (error)=>{

                reject(error);

            },

            async()=>{

                const url = await getDownloadURL(

                    uploadTask.snapshot.ref

                );

                resolve(url);

            }

        );

    });

}

/* ==========================================================
   UPLOAD GALLERY IMAGE
========================================================== */

export function uploadGalleryImage(

    uid,

    file,

    index,

    onProgress = ()=>{}

){

    validateImage(file);

    return new Promise((resolve,reject)=>{

        const extension =

        file.name.split(".").pop();

        const fileReference = ref(

            storage,

            `users/${uid}/gallery/image_${index}.${extension}`

        );

        const uploadTask = uploadBytesResumable(

            fileReference,

            file

        );

        uploadTask.on(

            "state_changed",

            (snapshot)=>{

                const progress =

                Math.round(

                    (snapshot.bytesTransferred/

                    snapshot.totalBytes)*100

                );

                onProgress(progress);

            },

            reject,

            async()=>{

                const url = await getDownloadURL(

                    uploadTask.snapshot.ref

                );

                resolve(url);

            }

        );

    });

}
/* ==========================================================
   VIVAHA
   FIREBASE STORAGE
   Part 2
========================================================== */

"use strict";

/* ==========================================================
   IMPORTS
========================================================== */

import {

    storage

} from "./firebase-config.js";

import {

    ref,

    deleteObject,

    getDownloadURL,

    uploadBytesResumable

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

/* ==========================================================
   DELETE PROFILE PHOTO
========================================================== */

export async function deleteProfilePhoto(uid){

    try{

        const fileReference=ref(

            storage,

            `users/${uid}/profile/profile.jpg`

        );

        await deleteObject(fileReference);

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   DELETE GALLERY IMAGE
========================================================== */

export async function deleteGalleryImage(

    uid,

    fileName

){

    try{

        const fileReference=ref(

            storage,

            `users/${uid}/gallery/${fileName}`

        );

        await deleteObject(fileReference);

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   GET DOWNLOAD URL
========================================================== */

export async function getFileURL(path){

    try{

        return await getDownloadURL(

            ref(storage,path)

        );

    }

    catch(error){

        console.error(error);

        throw error;

    }

}

/* ==========================================================
   UPLOAD VERIFICATION DOCUMENT
========================================================== */

export function uploadVerificationDocument(

    uid,

    file,

    fileName,

    onProgress=()=>{}

){

    return new Promise((resolve,reject)=>{

        const fileReference=ref(

            storage,

            `users/${uid}/verification/${fileName}`

        );

        const uploadTask=

        uploadBytesResumable(

            fileReference,

            file

        );

        uploadTask.on(

            "state_changed",

            snapshot=>{

                const progress=Math.round(

                    snapshot.bytesTransferred/

                    snapshot.totalBytes*100

                );

                onProgress(progress);

            },

            reject,

            async()=>{

                resolve(

                    await getDownloadURL(

                        uploadTask.snapshot.ref

                    )

                );

            }

        );

    });

}

/* ==========================================================
   PATH HELPERS
========================================================== */

export function profilePhotoPath(uid){

    return `users/${uid}/profile/profile.jpg`;

}

export function galleryImagePath(

    uid,

    fileName

){

    return `users/${uid}/gallery/${fileName}`;

}

export function verificationPath(

    uid,

    fileName

){

    return `users/${uid}/verification/${fileName}`;

}

/* ==========================================================
   STORAGE LIMITS
========================================================== */

export const STORAGE_LIMITS={

    MAX_PROFILE_IMAGES:6,

    MAX_IMAGE_SIZE_MB:5,

    MAX_DOCUMENT_SIZE_MB:10

};

/* ==========================================================
   END
========================================================== */
