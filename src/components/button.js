import React from "react";

function Button(props){
    return(
        <a className="button" onClick={props.action} >{props.label}</a>
    )
}

export default Button;