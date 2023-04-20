import { FC } from 'react';

import './assets/css/App.css';
import Header from './components/Header';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'


const App: FC = () => {


  return (

    <div className="App">

     
        <div>

        <Header />
        <Navbar />
        </div>
        
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
     

    </div>

  );
}

export default App;
