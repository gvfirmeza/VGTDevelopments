import './App.css';
import Nav from './components/Nav/Nav';
import Banner from './components/Banner/Banner';
import Sobre from './components/Sobre/Sobre';
import Fazemos from './components/Fazemos/Fazemos';
import Portfolio from './components/Portfolio/Portfolio';
import Fale from './components/Footer/Fale';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <header className="App-header">
        <Sobre />
        <Fazemos />
        <Portfolio />
        <Fale />
      </header>
    </div>
  );
}

export default App;
