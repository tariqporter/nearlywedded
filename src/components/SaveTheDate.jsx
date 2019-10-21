import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserAction } from '../actions';
import { withStyles } from '@material-ui/core';
import qs from 'query-string';

const styles = theme => ({
  root: {
  }
});

const SaveTheDate = ({
  classes = '',
  location = {},
  getUser = () => { },
}) => {

  useEffect(() => {
    const userId = qs.parse(location.search).userid;
    if (userId) {
      getUser(userId);
    }
  }, [location]);

  return (
    <div className={classes.root}>
      Save the date!
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getUser: getUserAction
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SaveTheDate));