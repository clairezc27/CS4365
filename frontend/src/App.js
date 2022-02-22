import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function App() {
  require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
console.log(window.React1);
console.log(window.React2);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button variant="outlined">Text</Button>
        <Link to="/expenses">Expenses</Link>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
