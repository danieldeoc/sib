import React from "react";

function InputText(props){
    return(
        <div className="inputContainer">
            <label>{props.label}</label>
            <input 
                type="text" 
                name={props.name} 
                id={props.id} 
                value={props.value}
                className={props.inputClass}
                placeholder={props.placeholder}
                onChange={props.change}
                />
        </div>
    )
}

export default InputText;