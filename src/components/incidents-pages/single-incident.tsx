import React from "react";
import { createBrowserHistory } from "history";
import { IEvent } from '../../shared/interfaces';
import { EventCard } from '../events/event-card';

interface IProps {
  allEvents: any
}

interface IState {
  event: IEvent | null;
}

export default class SingleIncident extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      event: null
    };
  }

  componentDidMount() {
    const history = createBrowserHistory();
    const id = history.location.pathname.split('/')[2];
    let event = this.findEvent(id);
    this.setState({
      event
    });
  }

  private findEvent(incidentId: string): IEvent {
    const allEventsCopy = JSON.parse(JSON.stringify(this.props.allEvents));

    let incident = allEventsCopy.filter((event: IEvent) => {
      return event ? (event.id === incidentId) : null;
    });

    return incident[0];
  }

  render() {
    let { event } = this.state;
    if (!event) {
      return <div>...loading</div>
    }
    return (
        <div className="margin">
          <EventCard event={event}></EventCard>
        </div>
    )
  }
}