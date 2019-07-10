import React, { PureComponent } from 'react';
import Header from './components/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventsAction, getUserAction } from './actions';
import Events from './components/Events';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%'
  },
  img: {
    background: 'url(/img/SLIDER-holly-hedge-wedding-country-romantic-fieldstone-barn-fountain-flowers-nighttime-beautiful1.jpg)',
    height: '250px',
    backgroundSize: 'cover'
  },
  link: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: '#fff'
  }
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    props.getEvents();
  }

  componentDidMount = () => {
    const { match, getUser } = this.props;
    const { userId } = match.params;
    if (userId) {
      getUser(userId);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <div>
          <div style={{ height: '100%', marginTop: 20, position: 'relative' }}>
            <div alt="Holly Hedge" className={classes.img} />
            <a href="https://www.hollyhedge.com/" target="_blank" rel="noopener noreferrer" className={classes.link}>Holly Hedge Estate</a>
          </div>
          <Events />
        </div>
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
  getUser: getUserAction
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));