import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'


function Menu(){
    return(
        <>
            <div id="menuBar" className="menuBar">
                <Link to="/" className="selected"> <FontAwesomeIcon icon={faCircleQuestion} /> Decision</Link>
                <Link to="/purchaseList">Products</Link>
            </div>
        </>
    )
}

export default Menu;