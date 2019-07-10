import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
    background: 'url(img/pink_rice.png)',
    backgroundSize: '200px auto',
    borderBottom: '1px solid #000000',
    textTransform: 'uppercase',
    letterSpacing: 4,
    position: 'sticky',
    top: 0,
    height: 110
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className={classes.title}>Tariq <span className={classes.cursive}>&amp;</span> Irina</h1>
        <h4 className={classes.subTitle}>September 4 2020</h4>
      </div>
    );
  }
}

export default withStyles(styles)(Header);