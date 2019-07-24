import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  root: {
    fontFamily: "'Quattrocento', serif",
    borderBottom: '1px solid #999',
    background: 'url(/img/pink_rice.png)',
    textTransform: 'uppercase',
    letterSpacing: 4,
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 1,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  titleContainer: {
    margin: 'auto'
  },
  welcomeContainer: {
    alignSelf: 'center',
    position: 'absolute',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      position: 'relative'
    },
  },
  title: {
    margin: '5px 0'
  },
  subTitle: {
    margin: '5px 0'
  },
  cursive: {
    fontFamily: "'Cedarville Cursive', cursive"
  }
});

class Header extends PureComponent {
  render() {
    const { user, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.welcomeContainer}>
          {
            user.id &&
            <div>
              <span>Welcome { user.firstName } { user.lastName }!</span>
            </div>
          }
        </div>
        <div className={classes.titleContainer}>
          <h1 className={classes.title}>Tariq <span className={classes.cursive}>&amp;</span> Irina</h1>
          <h4 className={classes.subTitle}>September 4 2020</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));