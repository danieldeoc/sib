import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';


function Menu(){

    useEffect(() => {
        const page = window.location.href;    
        if(page.includes("decisionsList")){
            document.getElementById("decisions").classList.remove("selected");
            document.getElementById("decisionsList").classList.add("selected");    
        }
    }, []);    

    return(
        <>
            <div id="menuBar" className="menuBar">
                <Link id="decisions" to="/decision" className="selected"> <FontAwesomeIcon icon={faCircleQuestion} />Decide</Link>
                <Link id="decisionsList" to="/decisionsList"><FontAwesomeIcon icon={faClockRotateLeft} />Decisions</Link>
            </div>
        </>
    )
}

export default Menu;