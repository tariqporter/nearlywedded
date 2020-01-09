import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Card, CardContent, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
});

const Faq = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" color="textSecondary" gutterBottom style={{ textTrasnform: 'uppercase' }}>
            Are children invited to the wedding?
          </Typography>
          <Typography variant="body2" component="p">
            To allow all of our guests to have an enjoyable and relaxing night, we've chosen to make our wedding
            adults-only. We know that many of you are travelling and so will have nannies on-premises to look after any
            children you may bring.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Faq));
