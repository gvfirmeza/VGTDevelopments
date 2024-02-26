import "./Sobre-Style.css";
import Foto from "./imgs/foto2.png";
import Css from "./imgs/CSS.png";
import Html from "./imgs/HTML.png";
import Js from "./imgs/JS.png";
import React from "./imgs/REACT.png";
import Python from "./imgs/PYTHON.png";

const Sobre = () => (
  <div className="sobre" id="quem">
    <br />

    <h4>QUEM SOMOS</h4>

    <div className="container1">
      <img className="foto" src={Foto} />
      <p className="paragrafo">
        <span className="span">Olá,</span>
        <br />
        <p className="sobre-texto">Somos um grupo de três estudantes dedicados e comprometidos com a
        tecnologia full stack, prontos para contribuir para o sucesso do seu
        projeto.</p>
        <p className="sobre-texto">Com habilidades abrangentes que abrangem tanto o
        desenvolvimento front-end quanto o back-end, estamos preparados para
        enfrentar desafios e oferecer soluções inovadoras. Desde a concepção até
        a implementação, nossa equipe está focada em entregar resultados de alta
        qualidade que atendam às suas necessidades e superem suas expectativas.</p>
        <p className="sobre-texto">Junte-se a nós para levar seu projeto adiante.</p>
      </p>
    </div>
    <br />
    <div className="container2">
      <h4 className="skills">NOSSAS SKILLS</h4>
      <ul className="lista">
        <li>
          <img className="item" src={Html} />
        </li>
        <li>
          <img className="item" src={Css} />
        </li>
        <li>
          <img className="item" src={React} />
        </li>
        <li>
          <img className="item" src={Js} />
        </li>
        <li>
          <img className="item" src={Python} />
        </li>
      </ul>
    </div>
    <hr className="quebra" />
  </div>
);

export default Sobre;
