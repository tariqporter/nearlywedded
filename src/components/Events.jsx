import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import { getEventsAction } from '../actions';

export const styles = {
  root: {

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
            <div key={event.id}>
              <div>{event.title}</div>
              <div>{event.date}</div>
              <div>{event.time}</div>
              <div>{event.description}</div>
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