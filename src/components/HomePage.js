import React, { useEffect, useState } from "react";
import QuestionMarkup from "./question";
import ProgressBar from "./progressbar";
import Button from "./button";
import Result from "./result";

import Menu from "./menu";






//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

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


function AppHome(){
    
    const questions = [
        "Did I researched the price and product informations?",
    	"Do I have all the money needed to buy it?",
    	"If I spend this money, will I regret?",
    	"Will I use saved money to buy this?",
    	"Buying this product will make me spend more money in the future?",
    	"Buying this product will make me earn more money in the future?",
    	"Can this product be harmful to me or others? (health problems, accidents, etc.)",
    	"Does this product cames in a good amount or is it at a very good price?",
    	"Will this product save me any money, time or effort?",
    	"Is it essential for some project or purpose in my life?",
    	"Am I buying this to make me feel better or to give me some pleasure?",
    	"Do I need to buy this right now?",
    	"Are there any other or similar options with better price or quality?",
    	"Can I replace this product with something else without spending anything?",
    	"Am I sure that this product will give me what I'm expecting or will it work as expected?",
    	"Is it for some special reason? (gifts, emotional reasons)"
    ];

    

    const [questionNumber, setQuestionNumber] = useState(0);
    const [question, setQuestion] = useState(questions[questionNumber]);
    const [result, setResult] = useState(0)
    const [scale, setScale] = useState(0)
    const [points,setPoints] = useState(0);
    const [product, setProduct] = useState("Product name")
    const [saved, setSaved] = useState(false);
    const positiveAnswers = [1,1,-1,-1,-2,2,-2,1,2,2,-1,1,-1,-1,1,1];
    const negativeAnswers = [-1,-1,0,1,0,0,0,0,0,0,0,-1,1,1,0,0];

    const scaleMetric = {
        min: -12,
        mid: 0,
        max: 15
    }
    
    const purchase = {
        PurchaseName: product,
        Score: scale
    }
    const results = [
    	"This purchase is not recommended right now. It's wise to wait and do a better research, looking for better prices or product alternatives.",
    	"This purchase doesn't seem to be good or bad, so, follow your heart! :D",
    	"This purchase looks to be fine, you probably should buy it!"
	]

    useEffect(() => {
        document.getElementById("totalQuestions").innerHTML = questions.length;
        const wH = window.innerHeight;
        const cH = document.getElementById("root").offsetHeight;
    }, []);
    

    // avança nas perguntas
    function AdvanceQuestion(){
        if(questionNumber < questions.length - 1){
            let number = questionNumber + 1;
            setQuestionNumber( number );
            setQuestion(questions[number]);
            let progressBarWidth = ( (questionNumber+2) / questions.length) * 100;
            document.getElementById("progressBar").style.width = progressBarWidth+"%";
            document.getElementById("currentQuestion").innerHTML = number+1;

        } else {
            setResult(points)
            document.getElementById("questionContentBox").style.display = "none";
            document.getElementById("resultBox").style.display = "block";

            ///////////////////////////////////////////
            // scale pointer position
            let width = document.getElementById("scale").offsetWidth; // width of the scale
            let midPoint = width/2; // midpoint
            if(points > 0){   
                let sideProportion = (points / scaleMetric.max);
                var indicatorPosition = (sideProportion * midPoint) + midPoint;
            } else {
                let sideProportion = (points / (scaleMetric.min * -1) );
                let reduce = sideProportion * midPoint;
                var indicatorPosition = midPoint - (reduce * -1 );
            };
            document.getElementById("scaleIndicator").style.marginLeft = indicatorPosition+"px";
 
            ///////////////////////////////////////////
            // recomendation
            let resultMessage = 0;
            if(points < -4){
                resultMessage = 0;
            } else if(points > -4 && points < 5){
                resultMessage = 1;
            } else if(points < questions.length){
                resultMessage = 2;
            } else {
                alert("Algo saiu errado, muiiiiito errado....")
                return;
            }
            setResult( results[resultMessage] );
            setScale(points);

            purchase.PurchaseName = product;
            purchase.Score = points;
        }
           
            
    }

    function answersYes(){
        AdvanceQuestion();
        var newPoints = points + positiveAnswers[questionNumber];
        setPoints(newPoints)
    }
        
    // resposta negativa
    function answersNo(){
        AdvanceQuestion();
        var newPoints = points + negativeAnswers[questionNumber];
        setPoints(newPoints)
    }

    function novaDecisao(){        
        document.getElementById("questionContentBox").style.display = "block";
        document.getElementById("resultBox").style.display = "none";
        document.getElementById("progressBar").style.width = "0%";
        document.getElementById("productName").value = "";
        document.getElementById("totalQuestions").innerHTML = questions.length;
        document.getElementById("currentQuestion").innerHTML = 1;
        document.getElementById("saveOverlayButton").style.display = "block";

        const saveBt = document.getElementById("save");
        saveBt.classList.remove("saved");
        saveBt.classList.remove("saving");
        saveBt.textContent = "Save";

        setQuestionNumber(0);
        setQuestion(questions[0]);
        setResult(0);
        setScale(0);
        setPoints(0);
        setProduct(" ");
        setSaved(false);
    }

    function savedDataLayoutInteraction(){
        const saveOverlay = document.getElementById("saveOverlay");
        setTimeout(() => {
            saveOverlay.classList.remove("open");
            saveOverlay.classList.add("closed");
        }, 2000)

        document.getElementById("saveOverlayButton").style.display = "none";
    }

    async function firebaseAdd(purchaseProp){
        const saveBt = document.getElementById("save");
        try {
        const docRef = await addDoc(collection(db, "default"), purchaseProp);
            console.log("Document written with ID: ", docRef.id);
            saveBt.classList.add("saved");
            saveBt.classList.remove("saving");
            saveBt.textContent = "Saved";
            setSaved(true);
        } catch (e) {
            console.error("Error adding document: ", e);
            setSaved(false);
            
            saveBt.classList.remove("saving");
            saveBt.textContent = "Save";
        }
        savedDataLayoutInteraction();
    }

    

    function saveProductDb(){
        if(!saved){    
            const saveBt = document.getElementById("save");
            saveBt.classList.add("saving");
            saveBt.textContent = "saving...";

            firebaseAdd(purchase); 
        /*
            fetch("http://localhost:5000/ListaDeCompras", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(purchase),
            }).then( (resp) => resp.json() )
            .then( function(response) {
                const saveBt = document.getElementById("save");
                saveBt.classList.add("saved");
                saveBt.textContent = "Saved";
                setSaved(true);
    
            }).catch( (err) => console.log(err) );
            */
        }
    }

    function setProductName(){
        let value = document.getElementById("productName").value;
        setProduct(value);
    }

    
    
    return(
        <>
            <Menu />
            <div id="questionContentBox">
                <QuestionMarkup question={question} />
                
                <div id="buttonsBox">
                    <Button id="yes" label="Yes" action={answersYes} />
                    <Button id="no" label="No" action={answersNo} />
                </div>                
            </div>
            <ProgressBar />
            <Result 
                placeholder={product} 
                scale={scale} 
                points={points}
                resultText={result} 
                newAction={novaDecisao}
                saveAction={saveProductDb}
                nameSetter={setProductName}
                 />            
        </>
    )
}


export default AppHome;