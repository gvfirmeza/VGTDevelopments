import "./Fazemos-Style.css"

import Site from "./site.png";
import Ux from "./ux.png";

const Fazemos = () => (
        <div className="container-fazemos" id="fazemos">
             <h4>O QUE FAZEMOS</h4>
            <div className="listas">
            
            <ul className="lista-ux">
                <li><img src={Ux} /></li>
                <li><h5 className="titulo-lista">UX/UI</h5></li>
                <li><p className="paragrafo-lista">Desenvolvimento de protótipos em baixa fidelidade para validação de fluxo e experiência do usuário.</p></li>
            </ul>

            <ul className="lista-site">
                <li><img src={Site} /></li>
                <li><h5 className="titulo-lista">WebSites</h5></li>
                <li><p className="paragrafo-lista">Desenvolvemos websites personalizados para fornecer uma experiência única e impactante aos visitantes.</p></li>
            </ul>

            </div>
            <hr className="quebra"/>
        </div>
);
  
export default Fazemos;