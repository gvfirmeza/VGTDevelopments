import "./Sobre-Style.css";
import Foto from "./imgs/foto.png";
import Css from "./imgs/CSS.png";
import Html from "./imgs/HTML.png";
import Js from "./imgs/JS.png";
import React from "./imgs/REACT.png";
import Python from "./imgs/PYTHON.png";

const Sobre = () => (
    <div className="sobre">
        <br />

        <h4>QUEM SOMOS</h4>

        <div className="container1" id="quem">
            <img className="foto" src={Foto}/>
            <p className="paragrafo"><span className="span">Olá,</span>
            <br />
            <br />
            Somos um grupo de 3 estudantes dedicados à área de desenvolvimento web. 
            Com habilidades em frameworks front-end e diversas linguagens de programação criamos interfaces elegantes e responsivas.
            Além disso, estamos aprendendo Node.js, Python e bancos de dados. Estamos prontos para contribuir para o sucesso do seu projeto.
            </p>
        </div>
        <br />
        <div className="container2">
        <h4 className="skills">NOSSAS SKILLS</h4>
        <ul className="lista">
            <li><img className="item" src={Html}/></li>
            <li><img className="item" src={Css}/></li>
            <li><img className="item" src={React}/></li>
            <li><img className="item" src={Js}/></li>
            <li><img className="item" src={Python}/></li>
        </ul>
        </div>
        <hr className="quebra"/>
    </div>
);
  
export default Sobre;