// @flow
import React, { useState, useRef } from 'react';
// import { findDOMNode } from 'react-dom';
// import glam from 'glam';
// import rafScheduler from 'raf-schd';
import { ViewPager, Frame, Track, View as PageView } from 'react-view-pager';

// import { defaultCarouselComponents } from './defaultComponents';
import { defaultCarouselStyles } from '../styles';
// import { type ModalProps } from './Modal/Modal';
import { className, isTouch } from '../utils';
import defaultFormatters from '../formatters';
// import { type ViewsType } from '../types';
import Container from './Container';
import View from './View';
import { Navigation, NavigationPrev, NavigationNext } from './Navigation';

const viewPagerStyles = { flex: '1 1 auto', position: 'relative' };
const frameStyles = { outline: 0 };

const Carousel = props => {
  const {
    currentIndex: startIndex = 0,
    formatters = defaultFormatters,
    // hideControlsWhenIdle = 3000,
    showNavigationOnTouchDevice = false,
    styles = {},
    trackProps = {
      instant: !isTouch(),
      swipe: 'touch',
    },
    modalProps,
    frameProps,
    views,
    beforeTrack = () => {},
  } = props;

  const container = useRef(null);
  const frame = useRef(null);
  const track = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  // const [isNext, setIsNext] = useState(null);

  // useEffect(() => {
  //   if (isNext !== null) {
  //     setTimeout(() => {
  //       setCurrentIndex(p => (isNext ? ++p : --p));
  //     }, 100);
  //   }
  // }, [views]);

  const handleViewChange = indices => {};

  const getStyles = (key, props) => {
    const base = defaultCarouselStyles[key](props);
    base.boxSizing = 'border-box';
    const custom = styles[key];
    return custom ? custom(base, props) : base;
  };

  const prev = event => {
    event.stopPropagation();
    setTimeout(() => {
      setCurrentIndex(p => --p);
    }, 200);

    // setIsNext(false);
    beforeTrack(currentIndex - 1);
    // track.current.prev();
  };

  const next = event => {
    event.stopPropagation();
    setTimeout(() => {
      setCurrentIndex(p => ++p);
    }, 200);

    // setIsNext(true);
    beforeTrack(currentIndex + 1);
    // track.current.next();
  };

  const getCommonProps = () => {
    // const { frameProps, trackProps, modalProps, views, showNavigationOnTouchDevice } = this.props;
    const isModal = Boolean(modalProps);
    const isFullscreen = Boolean(modalProps && modalProps.isFullscreen);
    // const { currentIndex, interactionIsIdle } = this.state;
    const currentView = views[currentIndex];

    return {
      // carouselProps: this.props,
      currentIndex,
      currentView,
      formatters,
      frameProps,
      getStyles,
      showNavigationOnTouchDevice,
      isFullscreen,
      isModal,
      modalProps,
      // interactionIsIdle,
      trackProps,
      views,
    };
  };

  const commonProps = getCommonProps();

  console.log(currentIndex);

  return (
    <Container {...commonProps} innerProps={{ innerRef: ref => (container.current = ref) }}>
      {/* {this.renderHeader()} */}
      <ViewPager tag="main" style={viewPagerStyles} className={className('pager')}>
        <Frame {...frameProps} ref={ref => (frame.current = ref)} className={className('frame')} style={frameStyles}>
          <Track
            // {...this.getTrackProps(this.props)}
            style={{ display: 'flex', alignItems: 'center' }}
            currentView={currentIndex}
            className={className('track')}
            onViewChange={handleViewChange}
            ref={ref => (track.current = ref)}
          >
            {views &&
              views.map((data, index) => {
                return (
                  <PageView className={className('view-wrapper')} key={index}>
                    <View {...commonProps} data={data} index={index} />
                  </PageView>
                );
              })}
          </Track>
        </Frame>
        <Navigation {...commonProps}>
          {currentIndex > 0 && (
            <NavigationPrev
              {...commonProps}
              align="left"
              innerProps={{
                'aria-label': formatters.getPrevLabel(commonProps),
                onClick: prev,
                title: formatters.getPrevTitle(commonProps),
              }}
            />
          )}
          {currentIndex < views.length - 1 && (
            <NavigationNext
              {...commonProps}
              align="right"
              innerProps={{
                'aria-label': formatters.getNextLabel(commonProps),
                onClick: next,
                title: formatters.getNextTitle(commonProps),
              }}
            />
          )}
        </Navigation>
      </ViewPager>
      {/* {this.renderFooter()} */}
    </Container>
  );
};
export default Carousel;
