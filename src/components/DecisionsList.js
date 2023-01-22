import React, { useEffect, useState } from "react";
import Menu from "./menu";


function DecisionsList(){
    const [decisionItens, setDecisionItens] = useState([]);

    const results = [
        "Not recomended",
        "Neutral",
        "Recomended"
    ]


    function purchasedItens(){
        fetch("http://localhost:5000/ListaDeCompras", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then( (resp) => resp.json() )
        .then( function(response) {
            setDecisionItens(response);
        }).catch( (err) => console.log(err) )
    }
    useEffect(() => {
        purchasedItens();

    }, []);



    
    return(
        <>
            <Menu />
            <div id="decisionBox">
                <h2>Decisions</h2>
                <ul id="decisionList">
                    {
                        decisionItens.map( (data) => (
                            <li key={data.id}>
                                <span className="productName">{data.PurchaseName}</span>
                                <span className={data.Score > 5 ? "score green" : data.Score < -4 ? "score" : "score pink"}>
                                    {data.Score} | {data.Score > 5 ? "Recomended" : data.Score < -4 ? "Not Recomended" : "Neutral"}
                                </span>
                            </li>
                        ))
                    }
                </ul>        
            </div>
        </>
    )
}

export default DecisionsList;