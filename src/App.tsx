import React, { Component } from 'react'
import './App.scss';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';

export class App extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Header />
          <Home />
          <Footer />
        </div>
      </>
    )
  }
}

export default App