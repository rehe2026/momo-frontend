"use client";
import { useRef, useState, useEffect } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const circumference = 2 * Math.PI * 25;

  return (
    <>
      <audio
        ref={audioRef}
        src="/momo-song.mp3"
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
      />

      {/* Floating button – fixed bottom-right, always visible */}
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Tooltip */}
        <span
          className="absolute right-[68px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            background: "var(--slate-900, #1e1b2e)",
            color: "white",
          }}
        >
          {isPlaying ? "Pause" : "Hör mal rein"}
        </span>

        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Hör mal rein"}
          className="relative flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--coral), var(--purple))",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            border: "none",
            cursor: "pointer",
          }}
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2.5"
            />
            {isPlaying && (
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.3s ease" }}
              />
            )}
          </svg>

          {/* Play / Pause icon */}
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              style={{ marginLeft: 2 }}
            >
              <polygon points="6,3 20,12 6,21" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
