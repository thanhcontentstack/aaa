import React, { Component } from 'react';
import banner from '../assets/home-banner.png';
import '../styles/home.scss';

export class Home extends Component {
  render() {
    return (
      <>
        <div className="banner">
          <img src={banner} alt="" />
        </div>
      </>
    )
  }
}

export default Home