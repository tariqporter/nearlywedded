import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    fontFamily: "'Quattrocento', serif",
    background: 'url(img/sand-background.png)',
    backgroundSize: '200px auto',
    borderBottom: '1px solid #000000',
    textTransform: 'uppercase',
    letterSpacing: 4,
    position: 'sticky',
    top: 0
  }
};

class Header extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1>Tariq &amp; Irina</h1>
      </div>
    );
  }
}

export default withStyles(styles)(Header);