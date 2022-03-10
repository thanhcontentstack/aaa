import React, { Component } from 'react'
import './App.scss';
import Home from './pages/Home';
import AceHeader from './components/AceHeader';
import Container from '@mui/material/Container';
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
        <Container>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='material-ui' element={<MaterialUI />}/>
          </Routes>
        </Container>
      </>
    )
  }
}

export default App