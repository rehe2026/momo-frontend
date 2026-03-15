"use client";
import { useRef, useState } from "react";
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <audio ref={audioRef} src="/momo-song.mp3" onEnded={() => setIsPlaying(false)} />
      <button onClick={toggle} aria-label={isPlaying ? "Pause" : "Abspielen"} style={{width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,0.2)",backdropFilter:"blur(4px)",border:"2px solid rgba(255,255,255,0.5)",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>
        {isPlaying ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{marginLeft:3}}><polygon points="6,3 20,12 6,21" /></svg>
        )}
      </button>
    </>
  );
}
