import React from "react";

function DecisionHistoryItem(props){
    return(
        <li 
            key={props.id}>
                <span className='productName'>{props.productNameResult}</span>
                <span className={props.scoreClass}>
                    {props.scoreResult} | {props.scoreText}  <span className="removal" id={props.id} onClick={props.action}>X</span>
                </span>
        </li> 
    )
}

export default DecisionHistoryItem;