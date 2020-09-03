import React from 'react';
import Welcome from './components/Welcome'
import About from './components/About'
import Footer from './components/Footer'
import './App.css';



function App() {
  return (
   <div className="App">
     <h1>MERM Auth Frontend</h1>
     < Welcome />
     <About />
     <Footer />
   </div>
  );
}

export default App;
