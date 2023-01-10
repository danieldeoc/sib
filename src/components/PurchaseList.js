import React, { useEffect, useState } from "react";


function PurchaseList(){
    const [purchaseItens, setPurchaseItens] = useState([]);

    function purchasedItens(){
        fetch("http://localhost:5000/ListaDeCompras", {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then( (resp) => resp.json() )
        .then( function(response) {
            setPurchaseItens(response);
        }).catch( (err) => console.log(err) )
    }
    useEffect(() => {
        purchasedItens();
    }, []);

    
    return(
        <>
          {
            purchaseItens.map( (data) => (
                <li key={data.id}>{data.PurchaseName} {data.Score}</li>
            ))
          }
        
        </>
    )
}

export default PurchaseList;