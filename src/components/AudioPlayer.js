import React, { useRef, useReducer, useState, useEffect } from 'react';
import Box from '@codeday/topo/Atom/Box';
import PropTypes from 'prop-types'

export default function AudioPlayer({ tracks }) {
  const ref = useRef();
  const [playbackAllowed, setPlaybackAllowed] = useState(true);
  const [nowPlayingIndex, next] = useReducer((s) => { return (s + 1) % tracks.length }, 0);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || !playbackAllowed) return;
    ref.current.load();
    ref.current.play().catch(() => setPlaybackAllowed(false));
  }, [typeof window, ref.current, playbackAllowed, nowPlayingIndex]);

  return (
    <audio
      ref={ref}
      onEnded={(e) => { ref.current.pause(); next(); }}
    >
      <source src={tracks[nowPlayingIndex]} />
    </audio>
  )
}
