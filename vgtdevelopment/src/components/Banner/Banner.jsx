import "./Banner-Style.css"
import Pc from "./pc.png"

const Banner = () => (
        <div className="banner-div">
            <div className="container">
            <h1>VGT Developments ®</h1>
            <p>Equipe de Desenvolvimento Full Stack</p>
            <img src={Pc} alt="pc-icon" />
            </div>
        </div>
);
  
export default Banner;