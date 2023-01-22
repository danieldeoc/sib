import React from "react";

function SplashScreen(){
    function splashScreenHideOut(){
        setTimeout(() => {
            window.location.href = "/decision";           
           // document.getElementById("totalQuestions").innerHTML = questions.length;
        }, 3000)
    }
    splashScreenHideOut();
    return(
        <div id="splashScreen" className="splashScreen"></div>
    )
}
export default SplashScreen;