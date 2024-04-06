import React from 'react';
import './App.css';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h3 className="title"> Welcome to Shopiyay 🎉</h3>
        <p className="subtitle">Shop today for the best prices!</p>
      </header>
      <main className="main">
        <div className="container">
          <ProductList />
     
    
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Online Store. All rights are reserved.</p>
      </footer>
    </div>
  );
}

export default App;
