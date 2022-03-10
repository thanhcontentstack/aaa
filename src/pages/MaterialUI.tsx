import React, { Component } from 'react'
import { AccordionMUI, IAccordion } from './../components/AccordionMUI';
import { CardMUI, ICard, ICardFeature } from './../components/CardMUI';
import '../styles/material-ui.scss'
import Contentstack from 'contentstack';

const stackInstance = Contentstack.Stack({ 
  "api_key": `${process.env.REACT_APP_APIKEY}`, 
  "delivery_token": `${process.env.REACT_APP_DELIVERY_TOKEN}`, 
  "environment": `${process.env.REACT_APP_ENVIRONMENT}`
});

interface IProps {
}

interface IState {
  accordionFeature: {
    title: string,
    item: IAccordion[]
  },
  cardFeature: ICardFeature
}

export class MaterialUI extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    
    this.state = {
      accordionFeature: {
        title: '',
        item: [
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
        ]
      },
      cardFeature: {
        title: '',
        align_image_left: false,
        background_color: '',
        is_button_outlined: false,
        item: [
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
  }

  fetchEntry = () => {
    let entryUID = 'bltd3b86919223d5907';
    let contentTypeUID = 'Material_Page';
    let query = stackInstance.ContentType(contentTypeUID).Entry(entryUID)
    .includeReference(['components.accordion_feature.item', 'components.card_feature.item'])
    .toJSON().fetch();
    query.then((res: any) => {
      // console.log(res)
      this.setState({
        accordionFeature: res.components[0].accordion_feature,
        cardFeature: res.components[1].card_feature
      })
      // console.log(this.state.cardFeature);
    })
  }

  componentDidMount() {
    this.fetchEntry();
  }

  render() {
    return (
      <>
        <div className="material-ui-wrapper">
          <AccordionMUI accordionFeature={this.state.accordionFeature} />
          <CardMUI cardFeature={this.state.cardFeature} />
        </div>
      </>
    )
  }
}

export default MaterialUI