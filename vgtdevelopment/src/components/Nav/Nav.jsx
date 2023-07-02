import "./Nav-Style.css"
import Logo from "../../vgt.png"

const Nav = () => (
        <div className="barra-nav">
            <ul className="barra-nav_lista">
                <li className="barra-nav_item1"><a className="barra-nav_A" href="#quem">QUEM SOMOS</a></li>
                <li className="barra-nav_item2"><a className="barra-nav_A" href="#fazemos">O QUE FAZEMOS</a></li>
                <li><img className="barra-nav_foto" src={Logo}/></li>
                <li className="barra-nav_item3"><a className="barra-nav_A" href="#portfolio">PORTFÓLIO</a></li>                
                <li className="barra-nav_item4"><a className="barra-nav_A" href="#">FALE CONOSCO</a></li>                
            </ul>
        </div>
);
  
export default Nav;