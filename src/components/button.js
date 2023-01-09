import React from "react";

function Button(props){
    return(
        <a id={props.id} className="button" onClick={props.action} >{props.label}</a>
    )
}

export default Button;