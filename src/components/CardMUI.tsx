import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Contentstack from 'contentstack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const stackInstance = Contentstack.Stack({ 
  "api_key": `${process.env.REACT_APP_APIKEY}`, 
  "delivery_token": `${process.env.REACT_APP_DELIVERY_TOKEN}`, 
  "environment": `${process.env.REACT_APP_ENVIRONMENT}`
});

interface IProps {
}

interface IState {
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

interface ILink {
  title: string,
  href: string
}

export class CardMUI extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
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

  fetchCard = () => {
    let entryUID = 'blt9150790ae2804f60';
    let contentTypeUID = 'card';
    let query = stackInstance.ContentType(contentTypeUID).Entry(entryUID)
    .includeReference(['components.feature.item'])
    .toJSON().fetch();
    query.then((res: any) => {

      this.setState({
        cardTitle: res.components[1].feature.title,
        card: res.components[1].feature.item
      })
      console.log(this.state.card);
    })
  }

  componentDidMount() {
    this.fetchCard();
  }

  render() {
    return (
      <div className="card-wrapper">
        <h3>{this.state.cardTitle}</h3>  
        <Grid container spacing={2}>
          {this.state.card 
          ?  
          this.state.card.map((res: any, index: number) => (
            <Grid key={index} item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={res.image.url}
                  alt={res.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {res.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {res.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="secondary" size="small">{res.cta.title}</Button>
                </CardActions>
              </Card>
            </Grid>
          )) 
          :
          <div>Not available</div>
         }
      </Grid>

         <br />
      <Grid container spacing={2}>
          {this.state.card 
          ?  
          this.state.card.map((res: any, index: number) => (
            <Grid key={index} item xs={4}>
              <Card sx={{ display: 'flex' }}>
              <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={res.image.url}
                    alt="Live from space album cover"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                      {res.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                      {res.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                  <Button color="secondary" size="small">{res.cta.title}</Button>
                </CardActions>
                  </Box>

                </Card>
            </Grid>
          )) 
          :
          <div>Not available</div>
         }
      </Grid>
    </div>
    )
  }
}

export default CardMUI