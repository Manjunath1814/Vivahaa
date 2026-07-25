import { auth, db } from "../firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const form=document.getElementById("profileForm");

const progressFill=document.querySelector(".progress-fill");
const progressText=document.getElementById("progressText");

const fullName=document.getElementById("fullName");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const gender=document.getElementById("gender");
const dob=document.getElementById("dob");
const age=document.getElementById("age");

const country=document.getElementById("country");
const state=document.getElementById("state");
const city=document.getElementById("city");

const lookingFor=document.getElementById("lookingFor");
const religion=document.getElementById("religion");
const caste=document.getElementById("caste");
const motherTongue=document.getElementById("motherTongue");
const maritalStatus=document.getElementById("maritalStatus");
const height=document.getElementById("height");

const education=document.getElementById("education");
const occupation=document.getElementById("occupation");
const income=document.getElementById("income");

const about=document.getElementById("about");
const hobbies=document.getElementById("hobbies");

const terms=document.getElementById("terms");


let currentUser=null;



/* ---------------------------------------
   Authentication
----------------------------------------*/

onAuthStateChanged(auth,async(user)=>{

    if(!user){

        window.location.href="../login/";

        return;

    }

    currentUser=user;

    const ref=doc(db,"users",user.uid);

    const snap=await getDoc(ref);

    if(snap.exists()){

        const data=snap.data();

        if(data.profileCompleted){

            window.location.href="../dashboard/";

            return;

        }

    }

    fullName.value=user.displayName||"";

    email.value=user.email||"";

});



/* ---------------------------------------
   Age
----------------------------------------*/

dob.addEventListener("change",()=>{

    if(!dob.value){

        age.value="";

        return;

    }

    const birth=new Date(dob.value);

    const today=new Date();

    let years=today.getFullYear()-birth.getFullYear();

    const month=today.getMonth()-birth.getMonth();

    if(month<0 || (month===0 && today.getDate()<birth.getDate())){

        years--;

    }

    age.value=years;

});



/* ---------------------------------------
   Progress
----------------------------------------*/

const fields=[
fullName,
phone,
gender,
dob,
country,
state,
city,
lookingFor,
religion,
caste,
motherTongue,
maritalStatus,
height,
education,
occupation,
income,
about,
hobbies
];

function updateProgress(){

    let completed=0;

    fields.forEach(field=>{

        if(field.value.trim()!==""){

            completed++;

        }

    });

    if(terms.checked){

        completed++;

    }

    const total=fields.length+1;

    const percent=Math.round((completed/total)*100);

    progressFill.style.width=percent+"%";

    progressText.innerText=percent+"%";

}

fields.forEach(field=>{

    field.addEventListener("input",updateProgress);

    field.addEventListener("change",updateProgress);

});

terms.addEventListener("change",updateProgress);



/* ---------------------------------------
   Submit
----------------------------------------*/

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    if(!terms.checked){

        alert("Please accept Terms & Privacy Policy.");

        return;

    }

    try{

        await setDoc(doc(db,"users",currentUser.uid),{

            uid:currentUser.uid,

            fullName:fullName.value,

            email:email.value,

            phone:phone.value,

            gender:gender.value,

            dob:dob.value,

            age:Number(age.value),

            country:country.value,

            state:state.value,

            city:city.value,

            lookingFor:lookingFor.value,

            religion:religion.value,

            caste:caste.value,

            motherTongue:motherTongue.value,

            maritalStatus:maritalStatus.value,

            height:height.value,

            education:education.value,

            occupation:occupation.value,

            annualIncome:income.value,

            about:about.value,

            hobbies:hobbies.value,

            photoURL:currentUser.photoURL,

            profileCompleted:true,

            createdAt:serverTimestamp(),

            updatedAt:serverTimestamp()

        },{merge:true});

        window.location.href="../dashboard/";

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

});

updateProgress();
