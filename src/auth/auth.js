import React, { useEffect, useState } from "react";
//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { getAuth, signInAnonymously, onAuthStateChanged  } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe_2yUGRfVvSPdH4I8XRmFyFjPWUTPXiQ",
  authDomain: "shouldibuyit-2704a.firebaseapp.com",
  projectId: "shouldibuyit-2704a",
  storageBucket: "shouldibuyit-2704a.appspot.com",
  messagingSenderId: "313953031300",
  appId: "1:313953031300:web:83ddcc0f21647abf0c9ed1",
  measurementId: "G-1FHFS1K5W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

const dbName = undefined;



function authUser(){
    const auth = getAuth();
    signInAnonymously(auth)
    .then(() => {
        // Signed in..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...

        });
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("4. user loged and id seted as "+uid)
            defineDataBase(uid)
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}
// user authentication
function defineDataBase(id){
    //console.log("id: "+id+" / stid: "+dbId)
    //setDbId(id)
    document.cookie = "db="+id+"_purchaseList; ; expires=Thu, 1 Jan 2060 12:00:00 UTC"; 
    console.log("5. cookie created")
    const dbName = id+"_purchaseList";
    console.log("6. database name exported as "+ dbName)
    return dbName;
}

export function getDbId(){
    let cookies = document.cookie; 
    console.log("1. entered auth mode")
    const dbName = document.cookie
        .split('; ')
        .find((row) => row.startsWith('db='))
        ?.split('=')[1];
    if(dbName){
        console.log("2. db already exist as "+dbName)
        console.log(dbName)
        return dbName;
    } else {
        console.log("2. no database, set new one")
        authUser();
    }
    
}   