import React from "react";
import { Link } from "react-router-dom";


function Menu(){
    return(
        <>
            <Link to="/">Decision</Link>
            <Link to="/purchaseList">Products</Link>
        </>
    )
}

export default Menu;