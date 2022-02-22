import React, { Component } from 'react'
import './App.scss';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import AceHeader from './components/AceHeader';

export class App extends Component {
  render() {
    return (
      <>

          <AceHeader />
          {/* <Home />
          <Footer /> */}

      </>
    )
  }
}

export default App