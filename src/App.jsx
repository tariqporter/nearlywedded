import React, { useEffect } from 'react';
import Header from './components/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEventsAction, getUserAction } from './actions';
import Events from './components/Events';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

const styles = theme => ({
  root: {
    fontFamily: "'Quattrocento', serif",
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%',
  },
  body: {
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

const App = props => {
  const {
    classes = '',
    daysUntilWedding = null,
    location = {},
    getUser = () => {},
    getEvents = () => {},
  } = props;
  const history = useHistory();

  useEffect(() => {
    getEvents();
  });

  useEffect(() => {
    const search = qs.parse(location.search);
    const userId = search.userid;
    if (userId) {
      delete search.userid;
      const newSearch = qs.stringify(search);
      console.log(userId);
      history.replace(`${location.pathname}?${newSearch}`);
      getUser(userId);
    }
  }, [location]);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.body}>
        <div className={classes.imgContainer}>
          <div alt="Holly Hedge" className={classes.img} />
          <a
            href="https://www.hollyhedge.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Holly Hedge Estate
          </a>
        </div>
        <Events />
        <div className={classes.countdown}>
          See you in {daysUntilWedding} days!
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { daysUntilWedding } = state;
  return {
    daysUntilWedding,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      getEvents: getEventsAction,
      getUser: getUserAction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
