import React from "react";
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TwitterIcon from '@material-ui/icons/Twitter';
import { IEvent, ILink } from '../../shared/interfaces';
import theme from '../../assets/mui-theme';
import Button from '@material-ui/core/Button';

export interface IState {
  isExpandOpen: boolean
};

interface IProps {
  event: IEvent
}

const StyledCard = styled(Card)({
  border: `1px solid lightgray`,
  borderRadius: 3,
  margin: 5,
  padding: 0,
  maxWidth: `90%`,
  marginLeft: 'auto',
  marginRight: 'auto'
});

const LocationHeader = styled('h3')({
  backgroundColor: theme.palette.secondary.main,
  padding: '10px',
  margin: 0,
  fontWeight: 'bold',
  color: 'white'
});

const Video = styled('video')({
  width: '100%',
  height: 'auto',
  maxHeight: '500px'
});


export class VideoCard extends React.Component<IProps, {}> {

  constructor(props: IProps) {
    super(props);
  }

  state: IState = {
    isExpandOpen: false
  }

  generateSourceLink = (source: any) => {
    if (source.includes('twitter.com')) {
      return (
        <span>
        <TwitterIcon></TwitterIcon>
        <a href={source}>
          {`${source.split('/')[3]}`}
        </a>
      </span>
      )
    } else {
      return (
        <a href={source}>{source}</a>
      )
    }
  }

  handleExpandClick = () => {
    this.setState({isExpandOpen: !this.state.isExpandOpen});
  };


  render() {
    if (!this.props.event) { return "...loading"};
    const { isExpandOpen } = this.state;
    const { event } = this.props;

    return (
        <StyledCard>
          <LocationHeader>
            {event.city}, {event.state}
          </LocationHeader>
          <CardHeader
            title={ event.name }
            subheader= { event.date_text }
          />
          {event.links.map((link: ILink, index) => {
            if (index === 0) {
              return (
                <div key={`${event.id}-media`}>
                  {link.spaces_url ?
                    <Video controls title={event.name}>
                      <source src={link.spaces_url} type="video/mp4" />
                    </Video>
                  :
                    null
                  }
                  <CardContent>
                    Source: {this.generateSourceLink(link.link)}
                  </CardContent>
                </div>
              )
            }
          })}

          {event.links.length > 1 ?
              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={ this.handleExpandClick }
                  aria-expanded={ isExpandOpen }
                  aria-label="show more"
                >
                  View More Coverage
                  <ExpandMoreIcon className={ clsx('expand', {'expanded': isExpandOpen}) }/>
                </Button>
              </CardActions>
          : null}


          <Collapse in={isExpandOpen} timeout="auto" unmountOnExit>
            <CardContent>
              {event.links.map((link: ILink, index) => {
                if (index !== 0) {
                  return (
                    <div key={`${event.id}-collapsed`}>
                      {link.spaces_url ?
                        <Video controls title={event.name}>
                          <source src={link.spaces_url} type="video/mp4" />
                        </Video>
                      :
                        null
                      }
                      <CardContent>
                        Source: {this.generateSourceLink(link.link)}
                      </CardContent>
                    </div>
                  )
                }
              })}
            </CardContent>
          </Collapse>

        </StyledCard>
    )
  }
}