import React from "react";
import Button from "./button";

function PrivacyPolice(){

    function accept(){
        console.log("cookie")
        document.cookie = "terms=accepted";
        console.log(document.cookie )
        window.location.href = '/decision';          
    }

    return(
        <>
            <div className="privacyPolicePage">
                <h1>Terms, Conditions and Privacy Policy</h1>
                <p>How we use your data</p>

                <h2>This app use cookies</h2>
                <p>In order to keep records of the purchase decision in this app, we use cookies that store an anonymous id and your agreement with the privacy policy of this app. We do not store any other information in cookies and we don’t share this information with any other company or person. However, this data may be accessible by content providers such as google play store or legal and governmental agencies.</p>

                <h2>How we use and store your data</h2>
                <p>We do not store any data that enables us or anyone to identify your identity. All activity in this app is anonymous. However, your decision list is stored in our database for an undetermined period of time. If you don’t provide any identification information in your decisions list, there will be no identity information stored in our databases. We do not get or record any other information such as phone number, model, location, accounts, or any other. Here is the information that we save and store in our databases:</p>
                <ul>
                    <li>Decision lists products names</li>
                    <li>Decision list score of decisions</li>
                    <li>Anonymous user id (generated randomly)</li>
                    <li>Terms and conditions acceptance for the anonymous user id</li>
                </ul>

                <h2>For how long my data is stored?</h2>
                <p>Your data will be stored anonymously in our databases for an undetermined period of time, and will remain anonymous while you do not provide identification information in your decision list records. </p>

                <p>A random user id is setted for every new user in this app. Every time the app cache is cleaned the phone will no longer be able to use the anonymous user id, and a new anonymous user will be generated and used. All the stored information with the previous anonymous user id becomes unreachable by the phone, but it will remain stored in our database for an undetermined period of time.</p>

                <h2>With how we share your information</h2>
                <p>We do not share your information with any company or person. However, your anonymous data may be accessible by content providers such as Google Play Store, Google Firebase policies and legal agencies when requested.</p>

                <h2>Terms and conditions </h2>
                <p>By using this app you agree with the use and storage of cookies in your phone, and with storage of your decision list and score in our database with an anonymous user id. If you do not agree with this condition, you should not use this app.</p>

                <div className="buttonAcceptance">
                    <Button id="acceptance" label="I agree" action={accept} />
                </div>
            </div>
        </>
    );
}

export default PrivacyPolice;