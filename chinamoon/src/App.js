import React from 'react';
import './App.css';
import NavBar from './components/navBar';
import SlideShow from './common/slideShow';

function App() {
  return (
    <main className="container">
      <NavBar />
      <SlideShow />
    </main>
  );
}

export default App;
