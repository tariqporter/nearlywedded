// @flow

// NOTE: props aren't used by default for some getters but consumers may need
// them, this needs to be reflected in the flow type.

/* eslint-disable no-unused-vars */

// ==============================
// Navigation
// ==============================

/* ARIA label for the next button */
function getNextLabel({ currentIndex, views }) {
  return `Show slide ${currentIndex + 2} of ${views.length}`;
}

/* ARIA label for the previous button */
function getPrevLabel({ currentIndex, views }) {
  return `Show slide ${currentIndex} of ${views.length}`;
}

/* HTML title for the next button */
function getNextTitle(props) {
  return 'Next (right arrow)';
}

/* HTML title for the previous button */
function getPrevTitle(props) {
  return 'Previous (left arrow)';
}

// ==============================
// Header
// ==============================

// type FullscreenProps = { isFullscreen: boolean };

/* ARIA label for the close button */
function getCloseLabel(props) {
  return 'Close (esc)';
}
/* ARIA label for the fullscreen button */
function getFullscreenLabel({ isFullscreen }) {
  return isFullscreen ? 'Exit fullscreen (f)' : 'Enter fullscreen (f)';
}

// ==============================
// View
// ==============================

/* alt text for each image in the carousel */
function getAltText({ data, index }) {
  if (data.caption) return data.caption;

  return `Image ${index + 1}`;
}

// ==============================
// Exports
// ==============================

export default {
  getAltText,
  getNextLabel,
  getPrevLabel,
  getNextTitle,
  getPrevTitle,
  getCloseLabel,
  getFullscreenLabel,
};
