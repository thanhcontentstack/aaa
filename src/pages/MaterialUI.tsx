import React, { Component } from 'react'
import { AccordionMUI } from './../components/AccordionMUI';
import { CardMUI } from './../components/CardMUI';
import '../styles/material-ui.scss'

export class MaterialUI extends Component {
  render() {
    return (
      <>
        <div className="material-ui-wrapper">
          <AccordionMUI />
          <CardMUI />
        </div>
      </>
    )
  }
}

export default MaterialUI