import React, {FC} from 'react';
import logo from './assets/logo.svg';
import './css/App.css';
import Title from "./components/Title";

const App : FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Title title='Application de gestion de Tâches' subtitle='Liste des utilisateurs'/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
