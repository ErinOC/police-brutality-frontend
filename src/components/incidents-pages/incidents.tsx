import React from "react";
import EventList from '../events/event-list';
import { IEvent } from '../../shared/interfaces';

interface IProps {
    allEvents: any
}

interface IState {
    allEvents: IEvent[];
}

export default class Incidents extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        allEvents: [],
    };
  }

  render() {
    let {allEvents} = this.props;
    return (
        <div className="margin">
          <EventList
            events={allEvents}>
          </EventList>
        </div>
    )
  }
}