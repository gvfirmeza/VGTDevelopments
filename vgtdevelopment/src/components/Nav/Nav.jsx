import "./Nav-Style.css"
import Logo from "../../vgt2.png"

const Nav = () => (
        <div className="barra-nav">
            <ul className="barra-nav_lista">
                <li className="barra-nav_item"><a className="barra-nav_A" href="#quem">QUEM SOMOS</a></li>
                <li className="barra-nav_item-g"><a className="barra-nav_A" href="#fazemos">O QUE FAZEMOS</a></li>
                <li><img className="barra-nav_foto" src={Logo}/></li>
                <li className="barra-nav_item"><a className="barra-nav_A" href="#portfolio">PORTFÓLIO</a></li>                
                <li className="barra-nav_item"><a className="barra-nav_A" href="#fale">FALE CONOSCO</a></li>                
            </ul>
        </div>
);
  
export default Nav;