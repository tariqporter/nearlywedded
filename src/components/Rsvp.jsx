import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, FormControl, FormLabel, RadioGroup, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { submitRsvpSelectionAction } from '../actions';
import FormControlLabels from './FormControlLabels';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    margin: 20,
    textAlign: 'left',
  },
});

const Rsvp = props => {
  const { classes, user, submitRsvpSelection } = props;
  const [rsvp, setRsvp] = useState(user.rsvp || 'no');
  const [guestName, setGuestName] = useState(user.guestName || '');
  const [snackOpen, setSnackOpen] = React.useState(false);

  useEffect(() => {
    if (user.rsvp) {
      setSnackOpen(true);
    }
  }, [user.rsvp]);

  const changeRsvp = e => {
    setRsvp(e.target.value);
    setGuestName('');
  };

  const submitRsvp = () => {
    submitRsvpSelection(rsvp, guestName);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formGroup} disabled={!!user.rsvp}>
        <FormLabel component="legend" style={{ marginBottom: 10 }}>
          Let us know if you can make it &hellip;
        </FormLabel>
        <RadioGroup value={rsvp} aria-label="rsvp" name="rsvp" onChange={changeRsvp}>
          <FormControlLabels disabled={!!user.rsvp} rsvp={rsvp} guestName={guestName} setGuestName={setGuestName} />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={submitRsvp} disabled={!!user.rsvp}>
        Submit
      </Button>
      {ReactDOM.createPortal(
        <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success">
            Thank you for submitting your RSVP. We look forward to seeing you!
          </Alert>
        </Snackbar>,
        document.body
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      submitRsvpSelection: submitRsvpSelectionAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Rsvp));
