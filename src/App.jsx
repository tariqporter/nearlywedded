import React, { PureComponent } from 'react';
import Header from './components/Header';
// import MapBox from './components/MapBox';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Events from './components/Events';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    background: 'url(img/pink_rice.png)',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%'
  }
};

class App extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Events />
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