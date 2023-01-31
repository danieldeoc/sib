import React, { useEffect, useState } from "react";
import Menu from "./menu";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getDbId } from "../auth/auth.js";

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
    const [dbName, setDbName] = useState(getDbId)

    const results = [
        "Not recomended",
        "Neutral",
        "Recomended"
    ]

    

    async function firebaseData(){
        console.log(dbName)
        const q = query(collection(db, dbName));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
                       
            const decisionList = document.getElementById("decisionList");
            const productNameResult = doc.data().PurchaseName;
            const scoreResult = doc.data().Score;

            var scoreClass = "score";
            var scoreText = results[0];

            console.log(scoreResult + " ")

            if(scoreResult > 3){
                scoreClass = "score green";
                scoreText = results[2];
            } else if(scoreResult < -3) {
                scoreClass = "score pink"
                scoreText = results[0];
            } else {
                scoreClass = "score"
                scoreText = results[1];
            };

            const item = `<li><span class='productName'>${productNameResult}</span><span class='${scoreClass}'>${scoreResult} | ${scoreText}</span></li>`;

            decisionList.innerHTML += item;
            
        });
        document.getElementById("loadingList").style.display = "none";
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
        <div className="pageBox">
            <div className="limitor">
                <Menu />
                <div id="decisionBox">
                    <h2>Decisions</h2>
                    <ul id="decisionList">
                        <li id="loadingList">
                            <div className="loader"></div>
                        </li>    
                    </ul>        
                </div>
            </div>
        </div>
    )
}

export default DecisionsList;