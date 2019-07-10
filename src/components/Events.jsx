import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import { getEventsAction } from '../actions';

export const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
  },
  event: {
    display: 'flex',
    margin: '40px 0',
    textAlign: 'left'
  },
  eventLeft: {
    flex: '0 0 250px'
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