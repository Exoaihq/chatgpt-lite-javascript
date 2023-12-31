const { useState, useEffect, useRef, useCallback } = require('react');

const useFullScreen = () => {
  const [fullScreen, setFullScreen] = useState(false);

  const docElmRef = useRef(null);

  const toggleFullScreen = useCallback(() => {
    if (fullScreen) {
      document.exitFullscreen();
    } else {
      docElmRef.current.requestFullscreen();
    }
  }, [fullScreen]);

  useEffect(() => {
    docElmRef.current = document.documentElement;

    const fullScreenChangeHandle = () => {
      const { fullscreenElement } = document;
      setFullScreen(!!fullscreenElement);
    };

    const keydownF11Handle = (e) => {
      if (e.key === 'F11') {
        toggleFullScreen();
        e.stopPropagation();
        e.preventDefault();
      }
    };

    document.addEventListener('fullscreenchange', fullScreenChangeHandle, false);
    document.addEventListener('keydown', keydownF11Handle, false);

    return () => {
      document.removeEventListener('fullscreenchange', fullScreenChangeHandle, false);
      document.removeEventListener('keydown', keydownF11Handle, false);
    };
  }, []);

  return { fullScreen, toggleFullScreen };
};

module.exports = { useFullScreen };