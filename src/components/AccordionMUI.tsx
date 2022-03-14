import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'

interface IProps {
  accordionFeature: {
    title: string,
    item: IAccordion[]
  }
}

export interface IAccordion {
  title: string,
  description: string,
  cta: ILink
  _metadata: {
    uid: string
  }
}

interface ILink {
  title: string,
  href: string
}

export class AccordionMUI extends Component<any> {

  render() {
    return (
      <div className="accordion-wrapper">
        <h3 {...this.props.accordionFeature.$?.title}>{this.props.accordionFeature.title}</h3>  
        <Grid>
          <Grid item xs={4}>
            {
              this.props.accordionFeature.item.map((res: any, index: number) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography {...res.$?.title}>{res.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography {...res.$?.description}>{res.description}</Typography>
                    <Button className="cta-btn" color="secondary" {...res.cta.$?.title}>{res.cta.title}</Button>
                  </AccordionDetails>
                </Accordion>
              ))
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default AccordionMUI