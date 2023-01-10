import React from "react";

function InputText(props){
    return(
        <input 
            type="text" 
            name={props.name} 
            id={props.id} 
            value={props.value}
            className={props.class}
            placeholder={props.placeholder}
            onChange={props.change}
            />
    )
}

export default InputText;