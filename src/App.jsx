import React, { PureComponent } from 'react';
import Header from './components/Header';
// import MapBox from './components/MapBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Events from './components/Events';

class App extends PureComponent {

  render() {
    return (
      <div className="app">
        <Header />
        <Events />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // const { center, zoom } = state;
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);