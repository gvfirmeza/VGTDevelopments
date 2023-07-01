import logo from './vgt.png';
import './App.css';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <b>VGT Developments ®</b>
        </p>
      </header>
    </div>
  );
}

export default App;
