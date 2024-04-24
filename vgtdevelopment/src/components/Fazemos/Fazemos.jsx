import "./Fazemos-Style.css"

import Site from "./site.png";
import Ux from "./ux.png";

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
            reveals[i].classList.remove("fade-out");
        } else {
            reveals[i].classList.remove("active");
            reveals[i].classList.add("fade-out");
        }
    }
}

window.addEventListener("scroll", reveal);

const Fazemos = () => (
    <div className="container-fazemos reveal fade-bottom" id="fazemos">
        <h4>O QUE FAZEMOS</h4>
        <div className="listas reveal fade-bottom">

            <ul className="lista-ux">
                <li><img src={Ux} alt="ux" /></li>
                <li><h5 className="titulo-lista">UX/UI</h5></li>
                <li><p className="paragrafo-lista">Desenvolvimento de protótipos em baixa fidelidade para validação de fluxo e experiência do usuário.</p></li>
            </ul>

            {/* <ul className="lista-ux">
                <li><img src={Ux} alt="ux" /></li>
                <li><h5 className="titulo-lista">Apps</h5></li>
                <li><p className="paragrafo-lista">Experiente em desenvolvimento de aplicativos móveis de ponta para proporcionar soluções únicas e memoráveis aos usuários.</p></li>
            </ul> */}

            <ul className="lista-site">
                <li><img src={Site} alt="websites" /></li>
                <li><h5 className="titulo-lista">WebSites</h5></li>
                <li><p className="paragrafo-lista">Desenvolvemos websites personalizados para fornecer uma experiência única e impactante aos visitantes.</p></li>
            </ul>

        </div>
        <hr className="quebra reveal fade-bottom" />
    </div>
);

export default Fazemos;