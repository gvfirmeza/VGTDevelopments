import "./Fale-Style.css"
import zap from "./whatsapp.png"
import email from "./email.png"

const Fale = () => (
    <div className="container-footer" id="fale">
        <div className="container-conteudo">
        <div className="container-menu">
            <h2 className="h2-footer">Menu</h2>
            <a href="#quem" className="ancora-footer">QUEM SOMOS</a>
            <a href="#fazemos" className="ancora-footer">O QUE FAZEMOS</a>
            <a href="#portfolio" className="ancora-footer">PORTIFÓLIO</a>
        </div>
        <div className="container-infos">
            <h2 className="h2-footer">Contato</h2>
            <div className="contato-footer">
                <img src={zap} width="35px"/>
                <p className="p-footer">&nbsp;(21)99735-6384</p>
            </div>
            <div className="contato-footer">
                <img src={email} width="35px"/>
                <p className="p-footer">&nbsp;vgtdevelopments@gmail.com</p>
            </div>
        </div>
        </div>
    </div>
);

export default Fale;
