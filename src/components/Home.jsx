import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Button } from '@material-ui/core';
import { MapOutlined } from '@material-ui/icons';
import Events from './Events';
import { useHistory, useLocation } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
  imgContainer: {
    marginTop: 20,
    position: 'relative',
  },
  img: {
    background: 'url(/img/holly-hedge.jpg) 50% 50%',
    height: '300px',
    backgroundSize: 'cover',
  },
  link: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: '#fff',
  },
  countdown: {
    fontWeight: 'bold',
  },
});

const Home = props => {
  const { classes, user, daysUntilWedding = null } = props;
  // const history = useHistory();
  // const location = useLocation();

  // const browseToRsvp = () => {
  //   history.push(`/rsvp${location.search}`);
  // };

  return (
    <div className={classes.root}>
      {/* {!user.rsvp && (
        <Button variant="contained" color="secondary" onClick={browseToRsvp}>
          Please take a moment to RSVP
        </Button>
      )} */}
      <div className={classes.imgContainer}>
        <div alt="Holly Hedge" className={classes.img} />
        <a href="https://www.hollyhedge.com/" target="_blank" rel="noopener noreferrer" className={classes.link}>
          Holly Hedge Estate
        </a>
      </div>
      <Button
        style={{ margin: '20px 0' }}
        variant="contained"
        component="a"
        href="https://goo.gl/maps/sTQF2Efp7T9qFUKH9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapOutlined style={{ marginRight: 5 }} /> Map to HollyHedge Estate
      </Button>
      <Events />
      <div className={classes.countdown}>See you in {daysUntilWedding} days!</div>
    </div>
  );
};

const mapStateToProps = state => {
  const { user, daysUntilWedding } = state;
  return {
    user,
    daysUntilWedding,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
