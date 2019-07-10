import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import { getEventsAction } from '../actions';

const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
  },
  event: {
    display: 'flex',
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
      filter: 'blur(45px)'
    }
  },
  eventLeft: {
    flex: '0 0 250px',
    alignSelf: 'center'
  },
  eventRight: {

  },
  eventTitle: {
    marginTop: 0,
    textTransform: 'uppercase'
  }
};

class Events extends PureComponent {
  constructor(props) {
    super(props);
    props.getEvents();
  }

  render() {
    const { classes, events } = this.props;
    return (
      <div className={classes.root}>
        {
          events.map(event => (
            <div key={event.id} className={classes.event}>
              <div className={classes.eventLeft}>
                <div>{event.time}</div>
                <div>{event.location}</div>
              </div>
              <div>
                <h4 className={classes.eventTitle}>{event.title}</h4>
                <div>{event.description}</div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { events } = state;
  return {
    events
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getEvents: getEventsAction,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Events));