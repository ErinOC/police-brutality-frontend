import React from "react";
import { styled } from '@material-ui/core/styles';
import { IEvent } from '../../shared/interfaces';
import { VideoCard } from '../video-card/video-card';
import { EVENTS_PER_PAGE } from '../../shared/consts';

interface IProps {
  events: IEvent[];
  page: any;
}

export interface IState {
  isExpandOpen: boolean,
};

const StyledLi = styled('li')({
  marginTop: 50,
})

export default class CardList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isExpandOpen: false
    };
  }

  handleExpandClick = () => {
    this.setState({isExpandOpen: !this.state.isExpandOpen});
  };

  render() {
    let page = this.props.page;
    let start = 0;
    if (page > 1) {
      start = (EVENTS_PER_PAGE * (page - 1));
    }
    let finish = (start + EVENTS_PER_PAGE);
    let paginatedEvents = this.props.events.slice(start, finish)

    return (
      <ul>
        {paginatedEvents.map((event: IEvent, index) => {
          return (
            <StyledLi key={ event.id }>
              <VideoCard event={event}></VideoCard>
            </StyledLi>
          )
        })}
      </ul>
    )
  }
}