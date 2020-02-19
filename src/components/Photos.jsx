import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import Gallery from 'react-photo-gallery';
// import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Modal, ModalGateway } from 'react-images';
import Carousel from './carousel/components/Carousel';

const styles = theme => {
  return {
    root: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 900,
      },
    },
    image: {
      width: 'auto',
      height: '90%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: 4,
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    navigate: {
      position: 'fixed',
    },
  };
};

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="left" ref={ref} {...props} />;
// });

const Photos = props => {
  const { classes, photos } = props;

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [viewedImages, setViewedImage] = useState({});

  const openLightbox = useCallback((event, { photo, index }) => {
    setViewedImage(p => {
      return { ...p, [index]: true, [index - 1]: true, [index + 1]: true };
    });
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <Gallery photos={photos.map(x => ({ ...x, src: x.src() }))} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              beforeTrack={e => {
                setViewedImage(p => {
                  const t = { ...p, [e]: true, [e - 1]: true, [e + 1]: true };
                  return t;
                });
              }}
              currentIndex={currentImage}
              views={photos.map((x, i) => ({ ...x, src: viewedImages[i] ? x.src(3) : '#' }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    photos: state.photos,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Photos));
