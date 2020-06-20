import React from "react";
import { IEvent } from '../../shared/interfaces';
import CardList from '../../components/card-list/card-list';
import PaginationComponent from '../../components/pagination/pagination';

interface IProps {
  events: IEvent[];
}
interface IState {
  page: number;
}


export default class SingleLocation extends React.Component<IProps, IState>  {
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

  render() {
    let {events} = this.props;
    let {page} = this.state;
    return (
        <div>
          <CardList
              page={1}
              events={events}>
          </CardList>
          <PaginationComponent
              events={events}
              paginationClickHandler={this.paginationClickHandler.bind(this)}
              page={page}>
          </PaginationComponent>
        </div>
    )
  }
}