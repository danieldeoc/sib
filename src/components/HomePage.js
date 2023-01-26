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
        "Pesquisei o preço e informações sobre o produto antes de comprar?",
        "Tenho todo o dinheiro necessário para comprar?",
        "Se gastar esse dinheiro, ele me fará falta?",
        "Vou usar dinheiro guardado para comprar isso?",
        "Comprar esse produto vai me fazer gastar mais dinheiro?",
        "Comprar esse produto vai me fazer ganhar mais dinheiro?",
        "Esse produto/serviço pode me causar danos? (problemas de saúde, acidentes, etc)",
        "Esse produto vai me gerar muitos benefícios ou vantagens? (melhorar saude, tempo, etc)",
        "Esse produto vem em boa quantidade ou tem bom custo benefício?",
        "Esse produto vai me trazer algum tipo de economia de dinheiro, tempo ou esforço? Ele otimiza a minha vida?",
        "É essencial para algum projeto ou objetivo da minha vida?",
        "Esse produto vai me ajudar a resolver algum problema em minha vida?",
        "É para me fazer sentir melhor ou me dar algum prazer?",
        "Tenho bons motivos para comprar uma coisa para me fazer sentir melhor ou me dar prazer?",
        "Eu preciso realmente disso para me sentir melhor?",
        "Preciso comprar agora, é urgente?",
        "Existe outra opção semelhante  por melhor preço/qualidade?",
        "Posso substituir esse produto por outra coisa sem gastar nada?",
        "Tenho certeza de que esse produto vai me dar o que espero ou funciona da maneira esperada?",
        "É para algum motivo especial, excecional? (presentes, motivos afetivos)"
    ];

    

    const [questionNumber, setQuestionNumber] = useState(0);
    const [question, setQuestion] = useState(questions[questionNumber]);
    const [result, setResult] = useState(0)
    const [scale, setScale] = useState(0)
    const [points,setPoints] = useState(0);
    const [product, setProduct] = useState("Product name")
    const [saved, setSaved] = useState(false);
    const positiveAnswers = [0,1,1,1,0,3,0,2,1,2,2,2,-1,1,1,-1,-1,-1,1,3];
    const negativeAnswers = [-1,-1,-1,-2,-3,0,-2,0,-1,0,0,0,0,-1,-1,0,0,1,-1,0];
    
    const purchase = {
        PurchaseName: product,
        Score: scale
    }
    const results = [
        "Provavelmente você não deve fazer esta compra agora, espere, pense e pesquise mais um pouco.",
        "Essa compra parece ser neutra, pense um pouco mais ou procure melhores opções.",
        "Esta compra parece ser boa para você."
    ]

    useEffect(() => {
        document.getElementById("totalQuestions").innerHTML = questions.length;
    }, []);
    

    // avança nas perguntas
    function AdvanceQuestion(){
        if(questionNumber < 19){
            let number = questionNumber + 1;
            setQuestionNumber( number );
            setQuestion(questions[number]);

            let progressBarWidth = (questionNumber + 2) * 5;
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
                let sideProportion = (points / 22);
                var indicatorPosition = (sideProportion * midPoint) + midPoint;
            } else {
                let sideProportion = (points / 18);
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
            } else if(points < 18){
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
        try {
        const docRef = await addDoc(collection(db, "default"), purchaseProp);
            console.log("Document written with ID: ", docRef.id);
            const saveBt = document.getElementById("save");
            saveBt.classList.add("saved");
            saveBt.textContent = "Saved";
            setSaved(true);
        } catch (e) {
            console.error("Error adding document: ", e);
            setSaved(false);
        }
        savedDataLayoutInteraction();
    }

    

    function saveProductDb(){
        if(!saved){    
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
                    <Button id="yes" label="Sim" action={answersYes} />
                    <Button id="no" label="Não" action={answersNo} />
                </div>                
            </div>
            <ProgressBar />
            <Result 
                placeholder={product} 
                scale={scale} 
                resultText={result} 
                newAction={novaDecisao}
                saveAction={saveProductDb}
                nameSetter={setProductName}
                 />            
        </>
    )
}


export default AppHome;