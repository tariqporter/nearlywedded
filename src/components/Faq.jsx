import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Card, CardContent, Typography } from '@material-ui/core';
import { getFaqsAction } from '../actions';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
});

const Faq = props => {
  const { classes, faqs, getFaqs } = props;
  useEffect(() => {
    // don't get events if we already have them
    if (!faqs.length) {
      getFaqs();
    }
  }, []);
  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent>
          {faqs.map(faq => (
            <div key={faq.id}>
              <Typography variant="h5" color="textSecondary" gutterBottom style={{ textTrasnform: 'uppercase' }}>
                {faq.question}
              </Typography>
              <Typography variant="body2" component="p">
                {faq.answer}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    faqs: state.faqs,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      getFaqs: getFaqsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Faq));
