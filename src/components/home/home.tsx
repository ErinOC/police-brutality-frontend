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
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import mapImg from '../../assets/map.png';
import videoImg from '../../assets/video-screenshot.png';
import reportImg from '../../assets/report-incident.png';
import Button from '@material-ui/core/Button';

const githubLink = 'https://github.com/2020PB/police-brutality';

const CardHeaderStyled = styled('h2')({
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
                    <Card className="align-center">
                      <Link to="/incidents">
                        <img src={videoImg} alt="map" className="home-img" />
                        <span  className="home-link">View All Incidents</span>
                      </Link>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className="align-center">
                      <Link to="/locations">
                        <img src={mapImg} alt="map" className="home-img" />
                        <span  className="home-link">View by City</span>
                      </Link>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card className="align-center">
                      <a target="_blank" href={githubLink}>
                        <img src={reportImg} alt="map" className="home-img"/>
                        <span className="home-link">Report Incident (Github)</span>
                      </a>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
  }
}