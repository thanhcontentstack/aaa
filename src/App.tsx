import React, { Component } from 'react'
import './App.scss';
import Home from './pages/Home';
import Footer from './components/Footer';
import AceHeader from './components/AceHeader';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { MaterialUI } from './pages/MaterialUI';

export class App extends Component {
  render() {
    return (
      <>
          <AceHeader />
          <div className="container">
          <Router>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/material-ui' element={<MaterialUI />}/>
            </Routes>
          </Router>
          </div>


          {/* <Home /> */}
          {/* <Footer /> */}
      </>
    )
  }
}

export default App