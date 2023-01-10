import React, { useState } from "react";
import QuestionMarkup from "./question";
import ProgressBar from "./progressbar";
import Button from "./button";
import Result from "./result";

function AppHome(){
    const questions = [
        "Pesquisei o preço e informações sobre o produto antes de comprar? Conheço o que estou comprando?",
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
        "Eu preciso realmente disso para me sentir melhor ou posso fazer outra coisa?",
        "Preciso comprar agora, é urgente?",
        "Existe outra opção semelhante  por melhor preço/qualidade?",
        "Posso substituir esse produto por outra coisa sem gastar nada?",
        "Tenho certeza de que esse produto vai me dar o que espero ou funciona da maneira esperada?",
        "É para algum motivo especial, excecional? (presentes, motivos afetivos)"
    ];
    const [questionNumber, setQuestionNumber] = useState(0);
    const [question, setQuestion] = useState(questions[questionNumber]);
    const [result, setResult] = useState(0)
    var [points,setPoints] = useState(0);

    const positiveAnswers = [0,1,1,1,0,3,0,2,1,2,2,2,-1,1,1,-1,-1,-1,1,3];
    const negativeAnswers = [-1,-1,-1,-2,-3,0,-2,0,-1,0,0,0,0,-1,-1,0,0,1,-1,0];
    // max positive 22
    // max negative -18


    // avança nas perguntas
    function AdvanceQuestion(){
        if(questionNumber < 19){
            let number = questionNumber + 1;
            setQuestionNumber( number );
            setQuestion(questions[number]);

            let progressBarWidth = (questionNumber + 2) * 5;
            document.getElementById("progressBar").style.width = progressBarWidth+"%";

            // document.getElementById("yes").style.display = "block";
        } else {
            setResult(points)
            document.getElementById("yes").style.display = "none";
            document.getElementById("no").style.display = "none";
            document.getElementById("question").style.display = "none";
            document.getElementById("progressContainer").style.display = "none";
            document.getElementById("resultBox").style.display = "block";

            let width = document.getElementById("scale").offsetWidth; // width of the scale
            let midPoint = width/2; // midpoint
            
            if(points > 0){   
                let sideProportion = (points / 22);
                var indicatorPosition = (sideProportion * midPoint) + midPoint;
            } else {
                let sideProportion = (points / 18);
                var indicatorPosition = midPoint - (sideProportion * midPoint);
            }
            console.log(indicatorPosition)
            document.getElementById("scaleIndicator").style.marginLeft = indicatorPosition+"px";


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
    
    return(
        <div className="questionBody">
            <QuestionMarkup question={question} />
            <Button id="yes" label="Sim" action={answersYes} />
            <Button id="no" label="Não" action={answersNo} />
            <ProgressBar />
            <Result resultText={result} />
        </div>
    )
}

export default AppHome;