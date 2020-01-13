import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { debounce } from 'lodash';

const styles = theme => ({
  root: {
    fontFamily: "'Quattrocento', serif",
    borderBottom: '1px solid #999',
    background: 'url(/img/pink_rice.png)',
    textTransform: 'uppercase',
    letterSpacing: 4,
    position: 'sticky',
    // position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  titleContainer: {
    margin: 'auto',
  },
  welcomeContainer: {
    alignSelf: 'center',
    position: 'absolute',
    padding: 10,
    transition: `font-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  },
  welcomeContainer_small: {
    fontSize: '0.7em',
  },
  title: {
    margin: '5px 0',
    transition: `font-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
  },
  title_small: {
    fontSize: '1em',
  },
  subTitle: {
    transition: `font-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    margin: '5px 0',
  },
  subTitle_small: {
    fontSize: '0.7em',
  },
  cursive: {
    fontFamily: "'Cedarville Cursive', cursive",
  },
});

const Header = props => {
  const { user, classes } = props;
  const distanceY = window.pageYOffset || document.documentElement.scrollTop;
  const [headerSmall, setHeaderSmall] = useState(distanceY > 0);

  useEffect(() => {
    const scrollEventListener = debounce(e => {
      const distanceY2 = window.pageYOffset || document.documentElement.scrollTop;
      setHeaderSmall(distanceY2 > 0);
    }, 10);
    window.addEventListener('scroll', scrollEventListener);
    return () => window.removeEventListener('scroll', scrollEventListener);
  }, []);

  return (
    <div className={classes.root}>
      <div className={clsx(classes.welcomeContainer, headerSmall && classes.welcomeContainer_small)}>
        {user.id && (
          <div>
            <span>Welcome {user.name}!</span>
          </div>
        )}
      </div>
      <div className={classes.titleContainer}>
        <h1 className={clsx(classes.title, headerSmall && classes.title_small)}>
          Tariq <span className={classes.cursive}>&amp;</span> Irina
        </h1>
        <h4 className={clsx(classes.subTitle, headerSmall && classes.subTitle_small)}>September 4 2020</h4>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
