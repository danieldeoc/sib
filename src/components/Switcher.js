import React from "react";

export function modeSimple(){
    document.getElementById("switcherButtonSpace").classList.remove("complete");
    document.getElementById("modeSimple").classList.add("active");
    document.getElementById("modeComplete").classList.remove("active");
}

export function modeComplete(){
    document.getElementById("switcherButtonSpace").classList.add("complete");
    document.getElementById("modeSimple").classList.remove("active");
    document.getElementById("modeComplete").classList.add("active");
}

function Switcher(props){
    return(
        <div className="switcherBox">
            <span className="switcherTitle">Decision type:</span>
            <div className="switcherSpace">
                <div id="switcherButtonSpace" className="switcherButtonSpace">
                    <div className="switcherButton"></div>
                </div>
                <div className="switcherLabels">
                    <div id="modeSimple" className="switcherSimple active" onClick={props.actionSimple}>Simple</div>
                    <div id="modeComplete" className="switcherComplete" onClick={props.actionComplete}>Complete</div>
                </div>

            </div>
        </div>
    )
}

export default Switcher;