import React from 'react';
import './App.scss';

import Board from './components/board';

function App() {
  return (
    <div className="app">
      <header className="header" >
        {/* <h4 className="title">Tetris</h4> */}
      </header>
      <main className="main">
        <Board />
      </main>
    </div>
  );
}

export default App;
