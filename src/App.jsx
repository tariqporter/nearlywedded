import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserAction } from './actions';
import { withStyles, Tabs, Tab, useTheme } from '@material-ui/core';
import {
  HomeOutlined,
  HotelOutlined,
  AirplanemodeActiveOutlined,
  CardGiftcardOutlined,
  EventAvailableOutlined,
  LiveHelpOutlined,
  PhotoOutlined,
} from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import Home from './components/Home';
import TabPanel from './components/TabPanel';
import Registry from './components/Registry';
import Rsvp from './components/Rsvp';
import Faq from './components/Faq';
import Travel from './components/Travel';
import Photos from './components/Photos';

const styles = theme => ({
  root: {
    fontFamily: "'Quattrocento', serif",
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    // height: '100%',
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'block',
      alignItems: 'start',
    },
  },
});

// const tabs = ['/', '/photos', '/travel', '/registry', '/rsvp', '/faq'];
const tabs = ['/', '/photos', '/travel', '/faq'];

const App = props => {
  const { classes = '', getUser, user } = props;
  const history = useHistory();
  const theme = useTheme();
  const location = useLocation();
  const tabIndex = tabs.indexOf(location.pathname);
  const [tabValue, setTabValue] = useState(tabIndex === -1 ? 0 : tabIndex);

  useEffect(() => {
    const tabIndex = tabs.indexOf(location.pathname);
    setTabValue(tabIndex === -1 ? 0 : tabIndex);
  }, [location]);

  useEffect(() => {
    const search = qs.parse(location.search);
    const userId = search.userid;
    if (userId) {
      delete search.userid;
      const newSearch = qs.stringify(search);
      console.log(userId);
      history.replace(`${location.pathname}?${newSearch}`);
    }
    getUser(userId);
  }, []);

  const tabChange = (e, value) => {
    setTabValue(value);
    history.push(`${tabs[value]}${location.search}`);
  };

  const handleChangeIndex = index => {
    setTabValue(index);
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.tabsContainer}>
        <Tabs value={tabValue} onChange={tabChange} textColor="secondary" variant="scrollable" scrollButtons="auto">
          <Tab icon={<HomeOutlined />} label="Home" />
          <Tab icon={<PhotoOutlined />} label="Photos" />
          <Tab
            icon={
              <span>
                <HotelOutlined />
                <AirplanemodeActiveOutlined />
              </span>
            }
            label="Travel & Accommodation"
          />
          {/* <Tab icon={<CardGiftcardOutlined />} label="Registry" /> */}
          {/* <Tab icon={<EventAvailableOutlined />} label="RSVP" disabled={!user.id} /> */}
          <Tab icon={<LiveHelpOutlined />} label="FAQ" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <Home />
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            <Photos />
          </TabPanel>
          <TabPanel value={tabValue} index={2} dir={theme.direction}>
            <Travel />
          </TabPanel>
          <TabPanel value={tabValue} index={3} dir={theme.direction}>
            <Registry />
          </TabPanel>
          <TabPanel value={tabValue} index={4} dir={theme.direction}>
            {user.id && <Rsvp />}
          </TabPanel>
          <TabPanel value={tabValue} index={5} dir={theme.direction}>
            <Faq />
          </TabPanel>
        </SwipeableViews>
      </div>
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
      getUser: getUserAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
