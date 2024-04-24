import "./Sobre-Style.css";
import Foto from "./imgs/foto3.png";
import Css from "./imgs/CSS.png";
import Html from "./imgs/HTML.png";
import Js from "./imgs/JS.png";
import React from "./imgs/REACT.png";
import Python from "./imgs/PYTHON.png";
import Bootstrap from "./imgs/bootstrap.png";
import Mui from "./imgs/mui.png";
import Java from "./imgs/java.png";
import Go from "./imgs/golang.png";
import Spring from "./imgs/Speing.png";

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

const Sobre = () => (
  <div className="sobre reveal fade-bottom" id="quem">
    <br />

    <h4>QUEM SOMOS</h4>

    <div className="container1 reveal fade-bottom">
      <img className="foto" alt="foto-vgts" src={Foto} />
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
    <div className="container2 reveal fade-bottom">
      <h4 className="skills">NOSSAS SKILLS</h4>
      <ul className="lista">
        <li>
          <img className="item" alt="html" src={Html} />
        </li>
        <li>
          <img className="item" alt="css" src={Css} />
        </li>
        <li>
          <img className="item" alt="react" src={React} />
        </li>
        <li>
          <img className="item" alt="js" src={Js} />
        </li>
        <li>
          <img className="item" alt="python" src={Python} />
        </li>
      </ul>
      <ul className="lista">
        <li>
          <img className="item" alt="bootstrap" src={Bootstrap} />
        </li>
        <li>
          <img className="item" alt="mui" src={Mui} />
        </li>
        <li>
          <img className="item" alt="java" src={Java} />
        </li>
        <li>
          <img className="item" alt="go" src={Go} />
        </li>
        <li>
          <img className="item" alt="spring boot" src={Spring} />
        </li>
      </ul>
    </div>
    <hr className="quebra reveal fade-bottom" />
  </div>
);

export default Sobre;
