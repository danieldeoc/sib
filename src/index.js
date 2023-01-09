import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import QuestionMarkup from './components/question';
import Button from './components/button';
import ProgressBar from './components/progressbar';


const questions = [
  "Pesquisei o preço e informações sobre o produto antes de comprar? Conheço o que estou comprando?",
  "Tenho todo o dinheiro necessário para comprar?",
  "Se gastar esse dinheiro, ele me fará falta?",
  "Vou usar dinheiro guardado para comprar isso?",
  "Comprar esse produto vai me fazer gastar mais dinheiro?",
  "Comprar esse produto vai me fazer ganhar mais dinheiro?",
  "Esse produto/serviço pode me causar danos? (problemas de saúde, acidentes, etc)",
  "Esse produto vai me gerar muitos benefícios ou vantagens? (melhorar saude, tempo, etc)",
  "Esse produto vem em boa quantidade ou tem bom custo benefício?",
  "Esse produto vai me trazer algum tipo de economia de dinheiro, tempo ou esforço? Ele otimiza a minha vida?",
  "É essencial para algum projeto ou objetivo da minha vida?",
  "Esse produto vai me ajudar a resolver algum problema em minha vida?",
  "É para me fazer sentir melhor ou me dar algum prazer?",
  "Tenho bons motivos para comprar uma coisa para me fazer sentir melhor ou me dar prazer?",
  "Eu preciso realmente disso para me sentir melhor ou posso fazer outra coisa?",
  "Preciso comprar agora, é urgente?",
  "Existe outra opção semelhante  por melhor preço/qualidade?",
  "Posso substituir esse produto por outra coisa sem gastar nada?",
  "Tenho certeza de que esse produto vai me dar o que espero ou funciona da maneira esperada?",
  "É para algum motivo especial, excecional? (presentes, motivos afetivos)"
]

const positiveAnswers = [0,1,1,1,0,3,0,2,1,2,2,2,-1,1,1,-1,-1,-1,1,3];
const negativeAnswers = [-1,-1,-1,-2,-3,0,-2,0,-1,0,0,0,0,-1,-1,0,0,1,-1,0];
console.log(positiveAnswers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className='questionBody'>
      <QuestionMarkup question={questions[0]} />
      <Button label="Sim" />
      <Button label="Não" />
      <ProgressBar />
    </div>
  </>
);


