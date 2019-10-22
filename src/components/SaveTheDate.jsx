import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserAction } from '../actions';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import qs from 'query-string';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Quattrocento', serif",
  }
});

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  body: {
    padding: '24px 16px',
    margin: '20px auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700
    },
    paper: {
      fontFamily: "'Cedarville Cursive', cursive",
    }
  },
  divider: {
    lineHeight: .5
  }
});

const SaveTheDate = ({
  user,
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
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.body} square={true}>
          <Typography variant="h6" component="h6">
            { user.id ? `${user.name} ` : '' }
          </Typography>
          <Typography variant="h5" component="h5">
            Please Save the Date
          </Typography>
          <Typography component="p">
            Friday, September 4, 2020
          </Typography>
          {/* <div className={classes.divider}>—</div> */}
          <Typography component="p">
            Holly Hedge Estate <span className={classes.divider}>—</span> New Hope, PA
          </Typography>
        </Paper>
      </MuiThemeProvider>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getUser: getUserAction
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SaveTheDate));