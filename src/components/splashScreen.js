import React, { useEffect } from "react";
import ShoppingCar from "../images/chart.png";
import { getDbId } from "../auth/auth.js";

function SplashScreen(){
    async function destinationHandler(){
        let destination = "/decision";
        const dbDataName = getDbId();
        console.log(dbDataName)

        const terms = document.cookie
            .split('; ')
            .find((row) => row.startsWith('terms='))
            ?.split('=')[1];

        if(!terms){
            console.log("Need privacy acknowledge")
            destination = "/termsandconditions";
        } 
        setTimeout(() => {
            window.location.href = destination;           
        }, 4000)

    }
    useEffect(()=>{
        destinationHandler();
    }, [])
    
    return(
        <div className="splashScreenBox">

            <div className="splashContentBox">
                <h1>
                    Should I<br/>
                    buy it?
                </h1>
                <span>Better decisions in your purchases</span>
                <img src={ShoppingCar} alt="Should I buy it? Logo" className="imageScreem" />
            </div>

            <div className="yellowLine"></div>
            
        </div>
    )
}
export default SplashScreen;