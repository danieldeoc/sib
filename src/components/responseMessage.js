import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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
            <div className="action">
                <FontAwesomeIcon icon={faCircleXmark} />
            </div>
        </div>
    )
}

export default ResponseMessage;