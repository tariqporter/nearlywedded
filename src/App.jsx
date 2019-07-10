import React, { PureComponent } from 'react';
import Header from './components/Header';
// import MapBox from './components/MapBox';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
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
    background: 'url(img/SLIDER-holly-hedge-wedding-country-romantic-fieldstone-barn-fountain-flowers-nighttime-beautiful1.jpg)',
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <div>
          <div style={{ height: '100%', marginTop: 20, position: 'relative' }}>
            <div alt="Holly Hedge" className={classes.img} />
            <a href="https://www.hollyhedge.com/" className={classes.link}>Holly Hedge Estate</a>
          </div>
          <Events />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);

// const mapStateToProps = (state) => {
//   // const { center, zoom } = state;
//   return {

//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

// }, dispatch);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);