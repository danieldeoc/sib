import React, { useEffect, useState } from "react";
import Menu from "./menu";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

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
const db = getFirestore(app);




function DecisionsList(){
    const [decisionItens, setDecisionItens] = useState([]);

    const results = [
        "Not recomended",
        "Neutral",
        "Recomended"
    ]

    async function firebaseData(){

        const q = query(collection(db, "default"));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            
            const decisionList = document.getElementById("decisionList");
            const productNameResult = doc.data().PurchaseName;
            const scoreResult = doc.data().Score;

            var scoreClass = "score";
            var scoreText = results[0];
            if(scoreResult > 5){
                scoreClass = "score green";
                scoreText = results[1];
            } else if(scoreResult < -4) {
                scoreClass = "score pink"
                scoreText = results[2];
            } else {
                scoreClass = "score"
            };

            const item = `<li><span class='productName'>${productNameResult}</span><span class='${scoreClass}'>${scoreResult} | ${scoreText}</span></li>`;

            decisionList.innerHTML += item;
            
        });
    }

    
    

    // function purchasedItens(){
    //     fetch("http://localhost:5000/ListaDeCompras", {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     }).then( (resp) => resp.json() )
    //     .then( function(response) {
    //         setDecisionItens(response);
    //     }).catch( (err) => console.log(err) )
    // }

    useEffect(() => {
        // purchasedItens();
        firebaseData();
    }, []);



    
    return(
        <>
            <Menu />
            <div id="decisionBox">
                <h2>Decisions</h2>
                <ul id="decisionList"></ul>        
            </div>
        </>
    )
}

export default DecisionsList;