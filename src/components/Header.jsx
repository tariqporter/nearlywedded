import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
    borderBottom: '1px solid #999',
    textTransform: 'uppercase',
    letterSpacing: 4,
    position: 'sticky',
    top: 0,
    height: 110,
    width: '100%',
    zIndex: 1,
    display: 'flex'
  },
  titleContainer: {
    margin: 'auto',
    transform: 'translateX(-50%)'
  },
  welcomeContainer: {
    alignSelf: 'center',
    padding: 10
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
};

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