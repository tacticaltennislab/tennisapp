import { useCallback, useEffect, useRef, useState } from "react";

/** Playback state of the <video>: time, length, speed, frame stepping. The element itself stays in the ref. */
export function usePlayer(fps: number, src: string | null) {
  const ref = useRef<HTMLVideoElement>(null);
  const raf = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRateState] = useState(1);
  const [size, setSize] = useState({ w: 16, h: 9 });

  // Smooth time while playing: timeupdate alone is too coarse for frame work.
  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      if (ref.current) setTime(ref.current.currentTime);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  // A new video starts from the beginning.
  useEffect(() => {
    setTime(0);
    setPlaying(false);
  }, [src]);

  const seek = useCallback((t: number) => {
    const v = ref.current;
    if (!v) return;
    const clamped = Math.min(Math.max(0, t), Number.isFinite(v.duration) ? v.duration : t);
    v.currentTime = clamped;
    setTime(clamped);
  }, []);

  const toggle = useCallback(() => {
    const v = ref.current;
    if (!v || !v.src) return;
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const pause = useCallback(() => ref.current?.pause(), []);

  const step = useCallback(
    (frames: number) => {
      const v = ref.current;
      if (!v) return;
      v.pause();
      seek(v.currentTime + frames / fps);
    },
    [fps, seek]
  );

  const jump = useCallback((seconds: number) => seek((ref.current?.currentTime ?? 0) + seconds), [seek]);

  const setRate = useCallback((r: number) => {
    setRateState(r);
    if (ref.current) ref.current.playbackRate = r;
  }, []);

  const handlers = {
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const v = e.currentTarget;
      setDuration(v.duration);
      if (v.videoWidth) setSize({ w: v.videoWidth, h: v.videoHeight });
      v.playbackRate = rate;
    },
    onDurationChange: (e: React.SyntheticEvent<HTMLVideoElement>) => setDuration(e.currentTarget.duration),
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onEnded: () => setPlaying(false),
    onSeeked: (e: React.SyntheticEvent<HTMLVideoElement>) => setTime(e.currentTarget.currentTime),
  };

  return { ref, time, duration, playing, rate, size, seek, toggle, pause, step, jump, setRate, handlers };
}

export type PlayerApi = ReturnType<typeof usePlayer>;
