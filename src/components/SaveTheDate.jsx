import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserAction, updateSaveTheDateViewsAction } from '../actions';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import qs from 'query-string';
import MrAndMrs1 from '../icons/MrAndMrs3';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Lobster Two', cursive",
  },
});

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    // textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: "'Quattrocento', serif",
  },
  body: {
    display: 'flex',
    padding: '6px 16px',
    margin: '0 auto 0 auto',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      margin: '20px auto',
    },
  },
  divider: {
    lineHeight: 0.5,
  },
  link: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  img: {
    background: 'url(/img/_CFZ0358_main2.jpg) 50% 40px',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffffff',
    width: 560,
    height: 930,
    backgroundSize: 'cover',
  },
  paperContent: {
    position: 'relative',
    margin: '0 auto auto auto',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto auto 0',
    },
  },
  elevation1: {
    boxShadow: '0 12px 36px -2px rgba(0,0,0,.4)',
  },
  title: {
    margin: '6px 0',
    lineHeight: '1em',
  },
  cursive: {
    fontFamily: "'Cedarville Cursive', cursive",
  },
});

const SaveTheDate = props => {
  const { classes = '', getUser, updateSaveTheDateViews } = props;
  const location = useLocation();

  useEffect(() => {
    const userId = qs.parse(location.search).userid;
    if (userId) {
      getUser(userId);
      updateSaveTheDateViews(userId);
    }
  }, [location]);

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Paper className={clsx(classes.body, classes.img)} square={true} classes={{ elevation1: classes.elevation1 }}>
          <div className={classes.paperContent}>
            <h1 className={classes.title}>
              Tariq <span className={classes.cursive}>&amp;</span> Irina
            </h1>
            <Typography variant="h4">Save the Date</Typography>
            <Typography variant="h5" style={{ display: 'block' }}>
              Friday, September 4, 2020
            </Typography>
            <Typography variant="h5">
              <a href="https://www.hollyhedge.com/" target="_blank" rel="noopener noreferrer" className={classes.link}>
                Holly Hedge Estate <span className={classes.divider}>—</span> New Hope, PA
              </a>
            </Typography>
          </div>
          <MrAndMrs1 size={120} style={{ position: 'absolute', right: 0, bottom: 0 }} />
        </Paper>
      </MuiThemeProvider>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      getUser: getUserAction,
      updateSaveTheDateViews: updateSaveTheDateViewsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SaveTheDate));
