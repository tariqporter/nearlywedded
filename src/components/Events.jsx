import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Grid } from '@material-ui/core';
import { getEventsAction } from '../actions';

const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
  },
  event: {
    margin: '20px 0',
    padding: 10,
    textAlign: 'left',
    overflow: 'hidden',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxShadow: 'inset 0 0 0 200px rgba(255,255,255,0.3)',
      filter: 'blur(45px)',
    },
  },
  eventLeft: {
    flex: '0 0 250px',
    alignSelf: 'center',
  },
  eventRight: {},
  eventTitle: {
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
};

const Events = props => {
  const { classes, events, getEvents = () => {} } = props;

  useEffect(() => {
    // don't get events if we already have them
    if (!events.length) {
      getEvents();
    }
  }, []);

  return (
    <div className={classes.root}>
      {events.map(event => (
        <Grid container key={event.id} className={classes.event}>
          <Grid item xs={12} md={6} className={classes.eventLeft1}>
            <div>{event.time}</div>
            <div>{event.location}</div>
          </Grid>
          <Grid item xs={12} md={6}>
            <h4 className={classes.eventTitle}>{event.title}</h4>
            <div>{event.description}</div>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  const { events } = state;
  return {
    events,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      getEvents: getEventsAction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Events));
