import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Typography, Card, CardContent, CardActionArea, Grid, CircularProgress } from '@material-ui/core';
import { AirplanemodeActiveOutlined, HotelOutlined } from '@material-ui/icons';
import { getHotelsAction } from '../actions';
// import clsx from 'clsx';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
  heading: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  hotel_left: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: 10,
    },
  },
  hotel_right: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 10,
    },
  },
  media: {
    height: 150,
  },
  headingIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

const Travel = props => {
  const { hotels, getHotels } = props;

  useEffect(() => {
    // don't get hotels if we already have them
    if (!hotels.length) {
      getHotels();
    }
  }, []);

  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.heading}>
        <AirplanemodeActiveOutlined className={classes.headingIcon} /> Airports
      </Typography>
      <a
        style={{ textDecoration: 'none' }}
        href="https://goo.gl/maps/GMVi1Sxan2UuD15R7"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card variant="outlined" className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom style={{ textTransform: 'uppercase' }}>
                John F. Kennedy International Airport (JFK)
              </Typography>
              <Typography variant="body2">~1h 45m drive</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href="https://goo.gl/maps/gsMQ9SpQMujMhxoy9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card variant="outlined" className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom style={{ textTransform: 'uppercase' }}>
                Newark Liberty International Airport (EWR)
              </Typography>
              <Typography variant="body2">~1h 10m drive</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href="https://goo.gl/maps/tdGe8qgiT7QD4rnBA"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card variant="outlined" className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom style={{ textTransform: 'uppercase' }}>
                Philadelphia International Airport (PHL)
              </Typography>
              <Typography variant="body2">~1h drive</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </a>
      <Typography variant="h5" className={classes.heading}>
        <HotelOutlined className={classes.headingIcon} /> Accommodation
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Here are a few picks of hotels. This is not a complete list, and we encourage you to look into AirBnb if staying
        for multiple nights.
      </Typography>
      <Grid container>
        {!hotels.length && (
          <Grid item xs={12}>
            <CircularProgress color="secondary" />
          </Grid>
        )}
        {hotels.map((hotel, index) => (
          <Grid item xs={12} sm={6} key={hotel.id} className={index % 2 ? classes.hotel_right : classes.hotel_left}>
            <a style={{ textDecoration: 'none' }} href={hotel.link} target="_blank" rel="noopener noreferrer">
              <Card variant="outlined" className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom style={{ textTransform: 'uppercase' }}>
                      {hotel.name}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      {hotel.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {hotel.info}
                    </Typography>
                    <Typography variant="body2">{hotel.address}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hotels: state.hotels,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      getHotels: getHotelsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Travel));
