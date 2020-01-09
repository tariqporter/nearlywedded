import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Button, Typography, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 700,
    },
  },
  card: {
    position: 'relative',
  },
  media: {
    height: 400,
  },
});

const Home = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="body1" align="left" gutterBottom>
        We know that some of you are traveling very far to join us for our special day. Your presence is enough of a
        present to us! But for those of you who are stubborn, we've put together a wish-list on Zola to help you out.
      </Typography>
      <div className={classes.honeymoonPill}>
        <a
          style={{ textDecoration: 'none' }}
          href="https://www.zola.com/wedding/tariqandirina/registry"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card className={classes.card} variant="outlined">
            <CardActionArea>
              <CardMedia className={classes.media} image="/img/resort.jpg" title="Honeymoon Fund" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Our Honeymoon Fund
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  We appreciate any help with our honeymoon!
                </Typography>
              </CardContent>
              <Button component="div" variant="contained" style={{ marginBottom: 10 }}>
                Contribute to Gift
              </Button>
            </CardActionArea>
          </Card>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
