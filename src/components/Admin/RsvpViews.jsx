import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  TextField,
  Button,
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
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
} from '@material-ui/core';
import { Close, ExpandMore } from '@material-ui/icons';
import { setSaveDateSearchAction, sendEmailAction } from '../../actions';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  loginField: {
    width: 200,
    margin: 8,
  },
}));

const RsvpViews = props => {
  const { filterUsers, saveDateSearch, setSaveDateSearch, sendEmail, sendingEmailUserIds } = props;
  const classes = useStyles();
  const saveDateSearchRef = useRef(null);

  const onEnter = (e, fn, value) => {
    if (e.key === 'Enter') fn(value);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>Save The Date</ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
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
                <TableCell align="left">RSVP Views</TableCell>
                <TableCell align="left">RSVP Date Last Viewed</TableCell>
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
                  <TableCell align="left">{(user.rsvpDateViewDates && user.rsvpDateViewDates.length) || 0}</TableCell>
                  <TableCell align="left">
                    {user.rsvpDateViewDates && user.rsvpDateViewDates.length
                      ? new Date(
                          user.rsvpDateViewDates[user.rsvpDateViewDates.length - 1].date.seconds * 1000
                        ).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell align="center">
                    {sendingEmailUserIds.includes(user.id) ? (
                      <CircularProgress />
                    ) : (
                      <Button onClick={() => sendEmail(user.id)}>Send Email</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const mapStateToProps = state => {
  return {
    filterUsers: state.filterUsers,
    saveDateSearch: state.saveDateSearch,
    sendingEmailUserIds: state.sendingEmailUserIds,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators(
    {
      setSaveDateSearch: setSaveDateSearchAction,
      sendEmail: sendEmailAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RsvpViews);
