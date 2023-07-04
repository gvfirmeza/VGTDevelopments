import "./Burguer-Style.css"
import React from 'react';
import { slide as Menu } from 'react-burger-menu'

class Burger extends React.Component {
    showSettings(event) {
      event.preventDefault();
      // Lógica para mostrar as configurações
    }
  
    render() {
      return (
        <div className="bubu">
        <Menu>
          <a id="home" className="bm-item-list" href="#quem">
            QUEM SOMOS
          </a>
          <a id="about" className="bm-item-list" href="#fazemos">
            O QUE FAZEMOS
          </a>
          <a id="contact" className="bm-item-list" href="#portfolio">
            PORTFÓLIO
          </a>
          <a className="bm-item-list" href="#fale">
            FALE CONOSCO
          </a>
        </Menu>
        </div>
      );
    }
  }
  
  export default Burger;
  