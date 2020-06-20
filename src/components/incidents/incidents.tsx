import React from "react";
import CardList from '../../components/card-list/card-list';
import PaginationComponent from '../../components/pagination/pagination';
import { IEvent } from '../../shared/interfaces';

interface IProps {
    allEvents: any
}

interface IState {
    allEvents: IEvent[],
    page: number;
}

export default class Incidents extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
        allEvents: [],
        page: 1
    };
  }

  public paginationClickHandler(page: number) {
    this.setState({
      page
    });
  }


  render() {
    let {allEvents} = this.props;
    let {page} = this.state;
    return (
        <div>
          <CardList
              page={1}
              events={allEvents}>
          </CardList>
          <PaginationComponent
              events={allEvents}
              paginationClickHandler={this.paginationClickHandler.bind(this)}
              page={page}>
          </PaginationComponent>
        </div>
    )
  }
}