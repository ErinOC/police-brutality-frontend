import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { EVENTS_PER_PAGE } from '../../shared/consts';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function PaginationComponent(props: any) {
    const classes = useStyles();
    const handleChange = (event: any, value: any) => {
        setPage(value);
        // Informs parent element of selected page:
        props.paginationClickHandler(value);
    };
    const eventsTotal = props.events.length;
    let count = Math.ceil(eventsTotal / EVENTS_PER_PAGE);


    let [page, setPage] = React.useState(1);

    if (props.page) {
        page = props.page;
    }

    if (eventsTotal > EVENTS_PER_PAGE) {
      return (
          <div className={classes.root}>
            <Typography>Page: {page}</Typography>
            <Pagination count={count} page={page} onChange={handleChange} />
          </div>
        );
    }
    return null;
}