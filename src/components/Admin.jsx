import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withStyles,
  TextField,
  Button,
  FormHelperText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import { logInOutAction, setSignedInAction, getUsersAction } from '../actions';
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
  const {
    classes,
    users,
    signedIn,
    signInError,
    setSignedIn,
    logInOut,
    getUsers,
  } = props;

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

  const onEnter = e => {
    if (e.key === 'Enter') logInOut();
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
              onKeyDown={onEnter}
            />
            <TextField
              className={classes.loginField}
              label="Password"
              type="password"
              value={credentials.password}
              onChange={e => updateCredentials('password', e.target.value)}
              onKeyDown={onEnter}
            />
          </>
        )}
        <Button
          onClick={() => logInOut(credentials.email, credentials.password)}
        >
          {signedIn ? 'Log Out' : 'Log In'}
        </Button>
      </div>
      <FormHelperText error>{signInError}</FormHelperText>
      {signedIn && (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Save Date Views</TableCell>
                  <TableCell align="left">Save Date Last Viewed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">
                      {user.saveDateViewDates.length}
                    </TableCell>
                    <TableCell align="left">
                      {user.saveDateViewDates.length
                        ? new Date(
                            user.saveDateViewDates.pop().date.seconds * 1000
                          ).toLocaleDateString()
                        : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ users, signedIn, signInError }) => {
  return {
    users,
    signedIn,
    signInError,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Admin));
