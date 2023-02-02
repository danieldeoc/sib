import React, { useEffect, useState } from "react";
import Menu from "./menu";
import ResponseMessage, {showMessage} from "./responseMessage";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs,  doc, deleteDoc } from "firebase/firestore";
import { getDbId } from "../auth/auth.js";
import DecisionHistoryItem from "./DecisionHistoryItem";

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

// "<li id="loadingList"><div className='loader'></div></li>"
function DecisionsList(){

    const dbName = getDbId();
    const loader = (<li id="loadingList"><div className='loader'></div></li>);
    const decisionItens = [];
    const [decisionList, setDecisionList] = useState(loader)
    
    const [alertMessage, setAlertMessage] = useState("none");
    

    const results = [
        "Not recomended",
        "Neutral",
        "Recomended"
    ]   

    async function firebaseData(){
        setDecisionList(loader);
        const q = query(collection(db, dbName));        
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot.empty)

        if(querySnapshot.empty){
            setDecisionList(<li>No results</li>);
        } else {
            querySnapshot.forEach((doc) => {
                
                const productNameResult = doc.data().PurchaseName;
                const scoreResult = doc.data().Score;
                var scoreClass = "score";
                var scoreText = results[0];
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
                const item = (<DecisionHistoryItem key={doc.id} productNameResult={productNameResult} scoreClass={scoreClass} scoreResult={scoreResult} scoreText={scoreText} id={doc.id} action={() => { remove(doc.id) }} />);
                decisionItens.push(item);
                setDecisionList(decisionItens)       
                      
            });
            
            
        }
        
    }
    
    
    useEffect(() => {
        firebaseData();    
    }, []);


    async function remove(document){
        await deleteDoc(doc(db, dbName, document)).then( () => {
            setAlertMessage("Decision successfully deleted!");
            showMessage();
            firebaseData();
            return true;
        }).catch((error) => {
            console.error("Error removing decision: ", error);
            return false;
        });              
    }
      
    return(
        <>
        <div className="pageBox">
            <div className="limitor">
                <Menu />
                <div id="decisionBox">
                    <h2>Decisions</h2>
                    <ul id="decisionList">
                        {decisionList}
                    </ul>        
                </div>
            </div>
        </div>
        <ResponseMessage message={alertMessage} />
        </>
    )
}

export default DecisionsList;