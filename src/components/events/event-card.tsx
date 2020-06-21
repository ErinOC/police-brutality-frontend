import React from "react";
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TwitterIcon from '@material-ui/icons/Twitter';
import { IEvent, ILink } from '../../shared/interfaces';
import theme from '../../assets/mui-theme';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import CopyToClipboard from 'react-copy-to-clipboard';

export interface IState {
  isExpandOpen: boolean,
  shouldDisplayLocation: boolean;
  linkValue: string;
  copied: false;
};

interface IProps {
  event: IEvent
}

const StyledCard = styled(Card)({
  border: `1px solid lightgray`,
  borderRadius: 3,
  margin: 5,
  padding: 0,
  width: `90%`,
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '600px'
});

const LocationHeader = styled('h3')({
  // backgroundColor: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.main,
  padding: '10px',
  margin: 0,
  fontWeight: 'bold',
  color: 'white'
});

const Video = styled('video')({
  width: '100%',
  height: 'auto',
  maxHeight: '500px',
  backgroundColor: '#a7a7a7'
});


export class EventCard extends React.Component<IProps, {}> {

  constructor(props: IProps) {
    super(props);
  }

  state: IState = {
    isExpandOpen: false,
    shouldDisplayLocation: true,
    linkValue: '',
    copied: false
  }

  componentDidMount() {
    const history = createBrowserHistory();
    const path = history.location.pathname;

    if (path.includes('locations')) {
      this.setState({
        shouldDisplayLocation: false
      })
    }

    let baseUrl = window.location.hostname;
    let linkValue = `${baseUrl}/incident/${this.props.event.id}`;
    this.setState({
      linkValue
    });
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
    if (!this.props.event) { return };
    const { isExpandOpen, shouldDisplayLocation, linkValue } = this.state;
    const { event } = this.props;

    let viewMoreButton = (
      <Button
        variant="contained"
        color="secondary"
        onClick={ this.handleExpandClick }
        aria-expanded={ isExpandOpen }
        aria-label="show more"
        className="margin-small"
      >
        View More Coverage
        <ExpandMoreIcon className={ clsx('expand', {'expanded': isExpandOpen}) }/>
      </Button>
    )

    let copyLinkButton = (
      <CopyToClipboard
        text={linkValue}
        onCopy={() => this.setState({copied: true})}>
        <Button
          variant="contained"
          color="secondary"
          aria-label="copy link to this incident"
          className="margin-small"
        >
          {this.state.copied ?
            'Copied'
          :
            'Copy Link'
          }
          &nbsp; <LinkOutlinedIcon />
        </Button>
      </CopyToClipboard>

    )

    return (
        <StyledCard>
            <LocationHeader className="clearfix">
              { shouldDisplayLocation ?
                <div>
                  <span>{event.city}, {event.state}</span>
                  <span className="float-right weight-regular">{event.date_text}</span>
                </div>
              :
                <span className="float-right weight-regular">{event.date_text}</span>
              }
            </LocationHeader>
          <CardHeader
            title={ event.name }
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
              <CardActions disableSpacing className="cta">
                {viewMoreButton}
                <span>&nbsp;</span>
                {copyLinkButton}

              </CardActions>
            :
              <CardActions disableSpacing className="cta">
                 {copyLinkButton}
              </CardActions>
            }


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