import React from 'react';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Home extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xl={12}>subheader</Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item lg={4}>
                    <Paper>
                        <Link to="/incidents">Recent Incidents</Link><br></br>
                    </Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper>
                        <Link to="/locations">View Map</Link><br></br>
                    </Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper>
                        <a target="_blank" href="http://www.github.com">Report an Event (Github)</a>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
  }
}