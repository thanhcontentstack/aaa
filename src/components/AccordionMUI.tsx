import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Contentstack from 'contentstack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const stackInstance = Contentstack.Stack({ 
  "api_key": `${process.env.REACT_APP_APIKEY}`, 
  "delivery_token": `${process.env.REACT_APP_DELIVERY_TOKEN}`, 
  "environment": `${process.env.REACT_APP_ENVIRONMENT}`
});

interface IProps {
}

interface IState {
  accordionTitle: string;
  accordion: IAcccordion[],
  cardTitle: string;
  card: any
}

interface ICard {
  title: string,
  description: string,
  image: string,
  cta: ILink
  _metadata: {
    uid: string
  }
}

interface IAcccordion {
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

export class AccordionMUI extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      accordionTitle: '',
      accordion: [
        {
          title: '',
          description: '',
          cta: {
            title: '',
            href: ''
          },
          _metadata: {
            uid: ''
          }
        }
      ],
      cardTitle: '',
      card: [
        {
          title: '',
          description: '',
          image: '',
          cta: {
            title: '',
            href: ''
          },
          _metadata: {
            uid: ''
          }
        }
      ]
    }
  }

  fetchAccordion = () => {
    let entryUID = 'blt61bc661c3de79e9f';
    let contentTypeUID = 'accordion';
    let query = stackInstance.ContentType(contentTypeUID).Entry(entryUID).toJSON().fetch();
    query.then((res: any) => {
      // console.log(res.items);
      this.setState({
        accordionTitle: res.title,
        accordion: res.items
      })
    })
  }

  componentDidMount() {
    this.fetchAccordion();
  }

  render() {
    return (
      <div className="accordion-wrapper">
        <h3>{this.state.accordionTitle}</h3>  
        <Grid>
          <Grid item xs={4}>
            {
              this.state.accordion.map((res: IAcccordion, index: number) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{res.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{res.description}</Typography>
                    <Button className="cta-btn" color="secondary">{res.cta.title}</Button>
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