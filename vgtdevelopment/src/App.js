import './App.css';
import Nav from './components/Nav/Nav';
import Banner from './components/Banner/Banner';
import Sobre from './components/Sobre/Sobre';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <header className="App-header">
        <Sobre />
      </header>
    </div>
  );
}

export default App;
