import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

interface IProps {
  cardFeature: any
}

export interface ICardFeature {
  title: string,
  item: ICard[],
  align_image_left: boolean,
  background_color: string,
  is_button_outlined: boolean
}

export interface ICard {
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

export class CardMUI extends Component<IProps> {

  componentDidMount() {
    // console.log(this.props.cardFeature);
  }

  render() {

    let styles = {
      backgroundColor: this.props.cardFeature.background_color
    }

    const cardImageTop = <Grid container spacing={2}>
      {
        this.props.cardFeature
        ?  
        this.props.cardFeature.item.map((res: any, index: number) => (
          <Grid key={index} item xs={4}>
            <Card style={styles}>
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
                <Button color="secondary" size="small" variant={this.props.cardFeature.is_button_outlined ? "outlined" : "text"}>{res.cta.title}</Button>
              </CardActions>
            </Card>
          </Grid>
        )) 
        :
        <div>Not available</div>
      }
  </Grid>

  const cardImageLeft = <Grid container spacing={2}>
    {
    this.props.cardFeature
    ?  
    this.props.cardFeature.item.map((res: any, index: number) => (
      <Grid key={index} item xs={4}>
        <Card sx={{ display: 'flex' }} style={styles}>
        <CardMedia
              height="285"
              component="img"
              sx={{ width: 151 }}
              image={res.image.url}
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" {...res.$?.title}>
                {res.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" {...res.$?.description}>
                {res.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="secondary" size="small" {...res.cta.$?.title}>{res.cta.title}</Button>
              </CardActions>
            </Box>
          </Card>
      </Grid>
    )) 
    :
    <div>Not available</div>
    }
  </Grid>
    return (
      <div className="card-wrapper">
        <h3 {...this.props.cardFeature.$?.title}>{this.props.cardFeature.title}</h3>
        {this.props.cardFeature.align_image_left ? cardImageLeft : cardImageTop}
      </div>
    )
  }
}

export default CardMUI