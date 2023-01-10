import React from "react";
import Button from "./button";

function Result(props){
    return(
        <>
            <div id="resultBox" className="resultQuestion">
                
                <div className="resultBox">
                    <h1 id="purchaseScale">{props.scale}</h1>
                    <h2 id="textResult">{props.resultText}</h2>
                </div>
                <div id="scale" className="scale">
                    <div id="scaleIndicator" className="scaleIndicator"></div>
                </div>
                <div>
                    <Button label="Nova decisão" action={props.action} />
                </div>
            </div>
        </>
    )
}

export default Result;