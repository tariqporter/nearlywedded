import React, { useState, useEffect, useRef } from 'react';
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
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  logInOutAction,
  setSignedInAction,
  getUsersAction,
  setSaveDateSearchAction,
  sendSaveDateEmailAction,
} from '../actions';
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
    filterUsers,
    signedIn,
    signInError,
    setSignedIn,
    logInOut,
    getUsers,
    saveDateSearch,
    setSaveDateSearch,
    sendSaveDateEmail,
    sendingEmailUserIds,
  } = props;

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const saveDateSearchRef = useRef(null);

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
      {signedIn && (
        <>
          <TextField
            inputRef={saveDateSearchRef}
            className={classes.loginField}
            label="Search..."
            value={saveDateSearch}
            onChange={e => setSaveDateSearch(e.target.value)}
            onKeyDown={e => onEnter(e, setSaveDateSearch, saveDateSearch)}
            InputProps={
              saveDateSearch === ''
                ? null
                : {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="clear search"
                          onClick={() => {
                            setSaveDateSearch('');
                            saveDateSearchRef.current.focus();
                          }}
                        >
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
            }
          />
          <TableContainer component={Paper}>
            <Table aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Save Date Views</TableCell>
                  <TableCell align="left">Save Date Last Viewed</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row" title={user.id}>
                      {user.name}
                    </TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.saveDateViewDates.length}</TableCell>
                    <TableCell align="left">
                      {user.saveDateViewDates.length
                        ? new Date(
                            user.saveDateViewDates[user.saveDateViewDates.length - 1].date.seconds * 1000
                          ).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell align="center">
                      {sendingEmailUserIds.includes(user.id) ? (
                        <CircularProgress />
                      ) : (
                        <Button onClick={() => sendSaveDateEmail(user.id)}>Send Email</Button>
                      )}
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

const mapStateToProps = state => {
  return {
    filterUsers: state.filterUsers,
    signedIn: state.signedIn,
    signInError: state.signInError,
    saveDateSearch: state.saveDateSearch,
    sendingEmailUserIds: state.sendingEmailUserIds,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      logInOut: logInOutAction,
      setSignedIn: setSignedInAction,
      getUsers: getUsersAction,
      setSaveDateSearch: setSaveDateSearchAction,
      sendSaveDateEmail: sendSaveDateEmailAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Admin));
