import React from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Radio, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  formControlLabel: {
    height: 62,
  },
});

const FormControlLabels = props => {
  const { classes, rsvp, user, disabled, guestName, setGuestName, guestError } = props;
  // console.log(user);
  const { isCouple, hasPlusOne } = user;

  const formControlLabels = [];
  if (isCouple) {
    formControlLabels.push(
      <FormControlLabel
        key="yes-both"
        className={classes.formControlLabel}
        value="yes-both"
        control={<Radio />}
        label="Yes, we can both make it!"
      />
    );

    formControlLabels.push(
      <FormControlLabel
        key="yes-both-one"
        className={classes.formControlLabel}
        value="yes-both-one"
        control={<Radio />}
        label={
          <div style={{ display: 'flex' }}>
            <span style={{ alignSelf: 'center' }}>Only </span>
            <span style={{ marginLeft: 5, paddingBottom: 15 }}>
              <TextField
                error={!!guestError}
                helperText={guestError}
                disabled={disabled || rsvp !== 'yes-both-one'}
                label="Guest Full Name"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
              />
            </span>
            <span style={{ alignSelf: 'center' }}>can make it.</span>
          </div>
        }
      />
    );

    formControlLabels.push(
      <FormControlLabel
        key="no"
        className={classes.formControlLabel}
        value="no"
        control={<Radio />}
        label="No, unfortunately we can't make it."
      />
    );
  } else {
    formControlLabels.push(
      <FormControlLabel
        key="yes-one"
        className={classes.formControlLabel}
        value="yes-one"
        control={<Radio />}
        label="Yes, I can make it!"
      />
    );

    if (hasPlusOne) {
      formControlLabels.push(
        <FormControlLabel
          key="yes-plus-one"
          className={classes.formControlLabel}
          value="yes-plus-one"
          control={<Radio />}
          label={
            <div style={{ display: 'flex' }}>
              <span style={{ alignSelf: 'center' }}>Yes, </span>
              <span style={{ marginLeft: 5, paddingBottom: 15 }}>
                <TextField
                  error={!!guestError}
                  helperText={guestError}
                  disabled={disabled || rsvp !== 'yes-plus-one'}
                  label="Guest Full Name"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                />
              </span>
              <span style={{ alignSelf: 'center' }}>and I can make it!</span>
            </div>
          }
        />
      );
    }

    formControlLabels.push(
      <FormControlLabel
        key="no"
        className={classes.formControlLabel}
        value="no"
        control={<Radio />}
        label="No, unfortunately I can't make it."
      />
    );
  }
  return formControlLabels;
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormControlLabels));
