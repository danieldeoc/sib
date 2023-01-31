import React from "react";
import Button from "./button";
import InputText from "./input";
import Arrow from '../images/arrow.png';
import { useEffect } from "react";

function Result(props){
    const saveOverlay = document.getElementById("saveOverlay");
    function openSaveOverlay(){
        saveOverlay.classList.remove("closed");
        saveOverlay.classList.add("open");

        document.getElementById("productName").focus();
    }   

    function hideOverlay(){
        saveOverlay.classList.remove("open");
        saveOverlay.classList.add("closed");
    }

    return(
        <>        
            <div id="resultBox" className="resultQuestion"> 
                <div className="resultBox">
                    <span className="scoreLabel">Score:</span>
                    <h1 id="purchaseScale">{props.points}</h1>
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
                    <Button id="saveOverlayButton" label="Save" action={openSaveOverlay} />
                    <Button id="newDecision" label="New Decision" action={props.newAction} />
                </div>
            </div>

            <div id="saveOverlay" className="overlaySave">
                <div className="overlayBox">
                    <InputText 
                        label="Insert a product name"
                        inputClass="productName" 
                        id="productName" 
                        placeholder={props.product} 
                        change={props.nameSetter} />
                    <Button id="save" label="Save" action={props.saveAction} />
                </div>
                <div className="overlayBg" onClick={hideOverlay}></div>
            </div>
        </>
    )
}

export default Result;

/*   */