import React from "react";
import ShoppingCar from "../images/chart.png";

function SplashScreen(){
    function splashScreenHideOut(){
        setTimeout(() => {
            window.location.href = "/decision";           
        }, 4000)
    }
    splashScreenHideOut();
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