import React from 'react';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import theme from '../../assets/mui-theme';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { styled } from '@material-ui/core/styles';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const SectionHeader = styled('h3')({
  backgroundColor: theme.palette.secondary.main,
  padding: '10px',
  margin: 0,
  fontWeight: 'bold',
  color: 'white'
});


export default class Home extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="margin-large">
            <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                        <DateRangeRoundedIcon/>
                      </CardContent>
                      <Link to="/incidents">
                        <CardHeader
                          title='Recent Incidents'
                        />
                      </Link>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                      <CardContent>
                      <CalendarTodayRoundedIcon/>
                      </CardContent>
                      <Link to="/locations">
                        <CardHeader
                          title='View Map'
                        />
                      </Link>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                      <CardContent>
                        <CreateRoundedIcon/>
                      </CardContent>
                      <a target="_blank" href="http://www.github.com">
                        <CardHeader
                          title='Report an Event (Github)'
                        />
                      </a>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
  }
}