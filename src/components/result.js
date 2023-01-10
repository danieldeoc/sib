import React from "react";

function Result(props){
    return(
        <>
            <div id="resultBox" className="resultQuestion">
                
                <h2 id="textResult">{props.resultText}</h2>
                <div id="scale" className="scale">
                    <div id="scaleIndicator" className="scaleIndicator"></div>
                </div>
            </div>
        </>
    )
}

export default Result;