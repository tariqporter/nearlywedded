import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Paper, Button, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
  honeymoonPill: {
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  honeymoonImg: {
    background: 'url(/img/resort.jpg) 50% 50%',
    height: 300,
    backgroundSize: 'cover',
  },
  buttonContainer: {
    padding: 20,
  },
});

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="body1" align="left" gutterBottom>
        We know that some of you are traveling very far to join us for our
        special day. Your presence is enough of a present to us! But for those
        of you who are stubborn, we've put together a wish-list to help you out
        with Zola.
      </Typography>
      <div className={classes.honeymoonPill}>
        <a
          style={{ textDecoration: 'none' }}
          href="https://www.zola.com/wedding/tariqandirina/registry"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Paper>
            <div className={classes.honeymoonImg} />
            <div className={classes.buttonContainer}>
              <Button component="div" variant="contained">
                Contribute to Gift
              </Button>
            </div>
          </Paper>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
