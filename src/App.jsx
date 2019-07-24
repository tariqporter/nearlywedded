import React, { PureComponent } from 'react';
import Header from './components/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventsAction, getUserAction } from './actions';
import Events from './components/Events';
import { withStyles } from '@material-ui/core';
import qs from 'query-string';

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
    background: 'url(/img/SLIDER-holly-hedge-wedding-country-romantic-fieldstone-barn-fountain-flowers-nighttime-beautiful1.jpg) 50% 50%',
    height: '300px',
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
    const { location, getUser } = this.props;
    const userId = qs.parse(location.search).userid;
    if (userId) {
      getUser(userId);
    }
  }

  render() {
    const { classes } = this.props;
    const date1 = new Date('9/4/2020');
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return (
      <div className={classes.root}>
        <Header />
        <div>
          <div style={{ marginTop: 20, position: 'relative' }}>
            <div alt="Holly Hedge" className={classes.img} />
            <a href="https://www.hollyhedge.com/" target="_blank" rel="noopener noreferrer" className={classes.link}>Holly Hedge Estate</a>
          </div>
          <Events />
          <div style={{ fontWeight: 'bold' }}>See you in { diffDays } days!</div>
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