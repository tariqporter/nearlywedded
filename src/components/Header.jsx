import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

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
  title: {
    margin: '5px 0',
    transition: `font-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
  },
  subTitle: {
    transition: `font-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
    margin: '5px 0',
  },
  cursive: {
    fontFamily: "'Cedarville Cursive', cursive",
  },
});

const Header = props => {
  const { user, classes } = props;

  return (
    <div className={classes.root}>
      <div className={clsx(classes.welcomeContainer)}>
        {user.id && (
          <div>
            <span>Welcome {user.name}!</span>
          </div>
        )}
      </div>
      <div className={classes.titleContainer}>
        <h1 className={clsx(classes.title)}>
          Tariq <span className={classes.cursive}>&amp;</span> Irina
        </h1>
        <h4 className={clsx(classes.subTitle)}>September 4 2020</h4>
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
