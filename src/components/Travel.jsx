import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Typography, Card, CardContent, CardMedia, CardActionArea } from '@material-ui/core';
import { AirplanemodeActiveOutlined } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
  media: {
    height: 150,
  },
  headingIcon: {
    width: 40,
    height: 40,
  },
});

const Travel = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.heading}>
        <AirplanemodeActiveOutlined className={classes.headingIcon} /> Airports
      </Typography>
      <a
        style={{ textDecoration: 'none' }}
        href="https://goo.gl/maps/GMVi1Sxan2UuD15R7"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card variant="outlined" className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="textSecondary" gutterBottom style={{ textTrasnform: 'uppercase' }}>
                John F. Kennedy International Airport (JFK)
              </Typography>
              <Typography variant="body2" component="p">
                ~1h 45m drive
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image="/img/jfk.jpg"
              title="John F. Kennedy International Airport (JFK)"
            />
          </CardActionArea>
        </Card>
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href="https://goo.gl/maps/gsMQ9SpQMujMhxoy9"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card variant="outlined" className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="textSecondary" gutterBottom style={{ textTrasnform: 'uppercase' }}>
                Newark Liberty International Airport (EWR)
              </Typography>
              <Typography variant="body2" component="p">
                ~1h 10m drive
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image="/img/ewr.jpg"
              title="Newark Liberty International Airport (EWR)"
            />
          </CardActionArea>
        </Card>
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href="https://goo.gl/maps/tdGe8qgiT7QD4rnBA"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card variant="outlined" className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="textSecondary" gutterBottom style={{ textTrasnform: 'uppercase' }}>
                Philadelphia International Airport (PHL)
              </Typography>
              <Typography variant="body2" component="p">
                ~1h drive
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image="/img/phl.jpg"
              title="Philadelphia International Airport (PHL)"
            />
          </CardActionArea>
        </Card>
      </a>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Travel));
