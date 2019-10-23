import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserAction, updateSaveTheDateViewsAction } from '../actions';
import { withStyles, Paper, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import qs from 'query-string';
import MrAndMrs1 from '../icons/MrAndMrs3';
import clsx from 'clsx';

const theme = createMuiTheme({
  typography: {
    // fontFamily: "'Quattrocento', serif",
    // fontFamily: "'Dancing Script', cursive",
    fontFamily: "'Lobster Two', cursive",
    h5: {
      // fontWeight: 600
    },
    subtitle1: {
      // fontWeight: 600
    }
  }
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
    padding: '24px 16px',
    margin: '0 auto 0 auto',
    // width: '100%',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      // width: 600
      margin: '20px auto',
    }
  },
  divider: {
    lineHeight: .5
  },
  link: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  img: {
    background: 'url(/img/_CFZ0358_main2.jpg) 50% 40px',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffffff',
    width: 560,
    height: 875,
    backgroundSize: 'cover'
  },
  paperContent: {
    padding: 15,
    position: 'relative',
    // background: 'url(/img/pink_rice_transparent.png)',
    // backgroundColor: 'rgba(255, 255, 255, .15)',
    // backgroundColor: '#ffffff',
    // width: 300,
    margin: '0 auto auto auto',
    [theme.breakpoints.up('sm')]: {
      margin: '-20px auto auto -20px',
    }
  },
  title: {
    margin: '5px 0',
    lineHeight: '1em'
  },
  cursive: {
    fontFamily: "'Cedarville Cursive', cursive"
  }
});

const SaveTheDate = (props) => {
  const {
    // user,
    classes = '',
    location = {},
    getUser,
    updateSaveTheDateViews
  } = props;

  useEffect(() => {
    const userId = qs.parse(location.search).userid;
    if (userId) {
      getUser(userId);
      updateSaveTheDateViews(userId);
    }
  }, [location]);

  // ["h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","caption","button","overline","srOnly","inherit"].

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Paper className={clsx(classes.body, classes.img)} square={true}>
          <div className={classes.paperContent}>
            <h1 className={classes.title}>Tariq <span className={classes.cursive}>&amp;</span> Irina</h1>
            {/* <Typography variant="h6">
              {user.id ? `Hi ${user.name}` : ''}
            </Typography> */}
            <Typography variant="h4">
              Save the Date
            </Typography>
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
}

const mapStateToProps = ({ user }) => {
  return {
    // user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getUser: getUserAction,
  updateSaveTheDateViews: updateSaveTheDateViewsAction
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SaveTheDate));