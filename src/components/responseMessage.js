import React from "react";

export function showMessage() {
    const msgBox = document.getElementById("messageBox");
    msgBox.classList.add("show");
    setTimeout(() => {
        msgBox.classList.remove("show")
    }, 7000)
}

function ResponseMessage(props){
    return(
        <div id="messageBox" className="responseMessage">
            <span>{props.message}</span>
        </div>
    )
}

export default ResponseMessage;