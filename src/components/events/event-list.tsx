import React from "react";
import { styled } from '@material-ui/core/styles';
import { IEvent } from '../../shared/interfaces';
import { EventCard } from './event-card';
import { EVENTS_PER_PAGE } from '../../shared/consts';
import PaginationComponent from '../pagination/pagination';

interface IProps {
  events: IEvent[];
}

export interface IState {
  page: number;
};

const StyledLi = styled('li')({
  marginTop: 50,
})

export default class EventList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      page: 1
    };
  }

  public paginationClickHandler(page: number) {
    this.setState({
      page
    });
  }

  private getPaginatedEvents(events: IEvent[], page: number): IEvent[] {
    let start = 0;
    if (page > 1) {
      start = (EVENTS_PER_PAGE * (page - 1));
    }
    let finish = (start + EVENTS_PER_PAGE);
    let paginatedEvents = events.slice(start, finish);
    return paginatedEvents;
  }

  render() {
    let { events } = this.props;
    let { page } = this.state;
    let paginatedEvents = this.getPaginatedEvents(events, page);

    return (
      <div>
        <ul>
          {paginatedEvents.map((event: IEvent, index) => {
            return (
              <StyledLi key={ event.id }>
                <EventCard event={event}></EventCard>
              </StyledLi>
            )
          })}
        </ul>
        <PaginationComponent
            events={events}
            paginationClickHandler={this.paginationClickHandler.bind(this)}
            page={page}>
        </PaginationComponent>
      </div>
    )
  }
}