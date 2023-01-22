import React from "react";
import Button from "./button";
import InputText from "./input";
import Arrow from '../images/arrow.png';


function Result(props){
    return(
        <div id="resultBox" className="resultQuestion"> 
            <InputText 
                label="Product name"
                inputClass="productName" 
                id="productName" 
                placeholder={props.product} 
                change={props.nameSetter} />
            <div className="resultBox">
                <h1 id="purchaseScale">{props.scale}</h1>
                <h2 id="textResult">{props.resultText}</h2>
            </div>

            <div id="scale" className="scale">
                <div id="scaleIndicator" className="scaleIndicator">
                    <img src={Arrow} />
                </div>
            </div>
            <div className="scaleLegend">
                <span id="not">Not Recomended</span>
                <span id="maybe">Neutral</span>
                <span id="yes">Recomended</span>
            </div>
            <div id="buttonBox">
                <Button id="save" label="Save" action={props.saveAction} />
                <Button id="newDecision" label="Nova decisão" action={props.newAction} />
            </div>
        </div>
        
    )
}

export default Result;