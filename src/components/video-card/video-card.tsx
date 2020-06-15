import React from "react";
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IEvent, ILink } from '../../shared/interfaces';

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
  width: 500,
  maxWidth: `90%`,
  marginLeft: 'auto',
  marginRight: 'auto'
});

export class VideoCard extends React.Component<IProps, {}> {

  constructor(props: IProps) {
    super(props);
  }

  state: IState = {
    isExpandOpen: false
  }

  handleExpandClick = () => {
    this.setState({isExpandOpen: !this.state.isExpandOpen});
  };


  render() {
    if (!this.props.event) { return "...loading"};

    const { isExpandOpen } = this.state;
    const { event } = this.props;
    const subheader = `${ event.state }, ${ event.date_text }`;

    return (
        <StyledCard>
          <CardHeader
            title={ event.name }
            subheader={ subheader }
          />
          {event.links.map((link: ILink, index) => {
            if (index === 0) {
              return (
                <div key={`${event.id}-media`}>
                  {link.spaces_url ?
                    <CardMedia
                      component="video"
                      src={link.spaces_url}
                      controls
                      title={event.name}>
                    </CardMedia>
                  : null }
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Credit: <a href={link.link}>{link.link}</a>
                    </Typography>
                  </CardContent>
                </div>
              )
            }
          })}

          {event.links.length > 1 ?
              <CardActions disableSpacing>
                  View More
                  <IconButton
                    className={ clsx('expand', {'expanded': isExpandOpen}) }
                    onClick={ this.handleExpandClick }
                    aria-expanded={ isExpandOpen }
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
              </CardActions>
          : null}


          <Collapse in={isExpandOpen} timeout="auto" unmountOnExit>
            <CardContent>
              {event.links.map((link: ILink, index) => {
                if (index !== 0) {
                  return (
                    <div key={`${event.id}-collapsed`}>
                      {link.spaces_url ?
                        <CardMedia
                          component="video"
                          src={link.spaces_url}
                          controls
                          title={event.name}>
                        </CardMedia>
                      : null }
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Credit: <a href={link.link}>{link.link}</a>
                        </Typography>
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