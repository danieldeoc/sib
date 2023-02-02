import React from "react";

function QuestionMarkup(props){
    return(
        <div id="questionBox">
            <div id="questionIndexer"> <span id="currentQuestion">1</span> / <span id="totalQuestions">{props.totalQuestions}</span> </div>
            <h1 id="question" >{props.question}</h1>
        </div>
    )
}

export default QuestionMarkup;