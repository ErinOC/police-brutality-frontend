import React from 'react';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import mapImg from '../../assets/map.png';
import videoImg from '../../assets/video-screenshot.png';

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
                <Grid item xs={12} sm={3} md={2}></Grid>
                <Grid item xs={12} sm={3} md={4}>
                    <Card className="align-center">
                      <Link to="/incidents">
                        <img src={videoImg} alt="map" className="home-img" />
                        <span  className="home-link">View All Incidents</span>
                      </Link>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3} md={4}>
                    <Card className="align-center">
                      <Link to="/locations">
                        <img src={mapImg} alt="map" className="home-img" />
                        <span  className="home-link">View by City</span>
                      </Link>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3} md={2}></Grid>
            </Grid>
        </div>
    )
  }
}