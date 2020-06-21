import React from "react";
import { IEvent } from '../../shared/interfaces';
import EventList from '../events/event-list';

interface IProps {
  events: IEvent[];
}
interface IState {
}

export default class SingleLocation extends React.Component<IProps, IState>  {
  constructor(props: any) {
    super(props);
    this.state = { };
  }

  render() {
    let {events} = this.props;
    return (
        <div>
          <EventList
            events={events}>
          </EventList>
        </div>
    )
  }
}