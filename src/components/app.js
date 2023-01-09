import  { React}  from "react";
import QuestionMarkup from "./question";
import ProgressBar from "./progressbar";

function App(){
  

    const question = "q";

    return(
        <div className='questionBody'>
            <QuestionMarkup question={question} />
            
            <ProgressBar />
        </div>
    )

}

export default App();