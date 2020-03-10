import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, TextField, Button, FormHelperText } from '@material-ui/core';
import { logInOutAction, setSignedInAction, getUsersAction } from '../../actions';
import RsvpViews from './RsvpViews';
import * as firebase from 'firebase/app';

const styles = theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  loginField: {
    width: 200,
    margin: 8,
  },
});

const Admin = props => {
  const { classes, signedIn, signInError, setSignedIn, logInOut, getUsers } = props;

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setSignedIn(true);
        getUsers();
        setCredentials({ email: '', password: '' });
        // console.log(user);
      } else {
        setSignedIn(false);
      }
    });
  }, []);

  const updateCredentials = (id, value) => {
    setCredentials(p => ({ ...p, [id]: value }));
  };

  const onEnter = (e, fn, value) => {
    if (e.key === 'Enter') fn(value);
  };

  return (
    <div>
      <div className={classes.flex}>
        {!signedIn && (
          <>
            <TextField
              className={classes.loginField}
              label="Email"
              value={credentials.email}
              onChange={e => updateCredentials('email', e.target.value)}
              onKeyDown={e => onEnter(e, logInOut)}
            />
            <TextField
              className={classes.loginField}
              label="Password"
              type="password"
              value={credentials.password}
              onChange={e => updateCredentials('password', e.target.value)}
              onKeyDown={e => onEnter(e, logInOut)}
            />
          </>
        )}
        <Button onClick={() => logInOut(credentials.email, credentials.password)}>
          {signedIn ? 'Log Out' : 'Log In'}
        </Button>
      </div>
      <FormHelperText error>{signInError}</FormHelperText>
      {signedIn && <RsvpViews />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    signInError: state.signInError,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      logInOut: logInOutAction,
      setSignedIn: setSignedInAction,
      getUsers: getUsersAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Admin));
