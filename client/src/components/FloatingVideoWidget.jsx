"use client";

import { Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const unlockAudioContext = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
    }
  } catch {
    /* ignore */
  }
};

const FloatingVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  // Starts muted as browser requires initial silent autoplay; immediately unlocked on load/interaction
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);
  const timersRef = useRef([]);

  // Video URL with autoplay, loop, and preload
  const videoSrc =
    "https://iframe.mediadelivery.net/embed/769180/7d317061-5646-4a41-89ff-4e4faa54b595" +
    "?autoplay=true&loop=true&preload=true&muted=false";

  // Dispatch commands to the Bunny Stream iframe across Player.js, Plyr, and native message protocols
  const sendCommand = useCallback((method, value) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    // 1. Player.js standard protocol
    win.postMessage(
      JSON.stringify({
        context: "player.js",
        version: "0.0.11",
        method,
        ...(value !== undefined ? { value } : {}),
      }),
      "*",
    );

    // 2. Direct JSON method format
    win.postMessage(
      JSON.stringify({
        method,
        ...(value !== undefined ? { value } : {}),
      }),
      "*",
    );

    // 3. Plyr native command event format
    win.postMessage(
      JSON.stringify({
        event: "command",
        func: method,
        args: value !== undefined ? [value] : [],
      }),
      "*",
    );

    // 4. Bunny Stream native command format
    if (method === "play") {
      win.postMessage({ command: "activate" }, "*");
      win.postMessage({ command: "play" }, "*");
      win.postMessage({ command: "toggleControls", parameter: false }, "*");
    } else if (method === "unmute") {
      win.postMessage({ command: "increaseVolume", parameter: 1.0 }, "*");
    }
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Immediate and aggressive unmuting with 100% volume
  const unmuteVideo = useCallback(() => {
    unlockAudioContext();

    sendCommand("play");
    sendCommand("unmute");
    sendCommand("setVolume", 100); // PlayerJS setVolume expects 0-100 (100 = 100% full volume)

    setIsMuted(false);
  }, [sendCommand]);

  const muteVideo = useCallback(() => {
    sendCommand("mute");
    sendCommand("setVolume", 0);
    setIsMuted(true);
  }, [sendCommand]);

  // Attempt playback with sound immediately and on progressive intervals
  const attemptUnmutedAutoplay = useCallback(() => {
    clearTimers();

    const kick = () => {
      unmuteVideo();
    };

    kick();

    // Aggressively re-dispatch unmute commands as the iframe and player bundle load
    [50, 150, 300, 600, 1000, 1500, 2200, 3200].forEach((t) =>
      timersRef.current.push(setTimeout(kick, t)),
    );
  }, [unmuteVideo]);

  // Listen to Player.js events from Bunny Stream
  useEffect(() => {
    if (!isOpen) return;

    const onMessage = (e) => {
      if (!String(e.origin).includes("mediadelivery.net")) return;

      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

        if (data?.context === "player.js") {
          if (data?.event === "ready" || data?.event === "play") {
            unmuteVideo();
          }
        }
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
      clearTimers();
    };
  }, [isOpen, unmuteVideo]);

  // Listen for custom unmute broadcast from WelcomePopup or other triggers
  useEffect(() => {
    const handleCustomUnmute = () => {
      unmuteVideo();
    };

    window.addEventListener("careernova:unmute_video", handleCustomUnmute);
    return () =>
      window.removeEventListener("careernova:unmute_video", handleCustomUnmute);
  }, [unmuteVideo]);

  // Fallback: Immediate unmute on the very first user interaction anywhere on the website
  useEffect(() => {
    if (!isOpen) return;

    const events = [
      "pointerdown",
      "mousedown",
      "touchstart",
      "touchend",
      "click",
      "keydown",
      "scroll",
      "wheel",
    ];

    const onFirstInteraction = () => {
      unmuteVideo();
      events.forEach((ev) => {
        window.removeEventListener(ev, onFirstInteraction, { capture: true });
        document.removeEventListener(ev, onFirstInteraction, { capture: true });
      });
    };

    events.forEach((ev) => {
      window.addEventListener(ev, onFirstInteraction, { capture: true, passive: true });
      document.addEventListener(ev, onFirstInteraction, { capture: true, passive: true });
    });

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, onFirstInteraction, { capture: true });
        document.removeEventListener(ev, onFirstInteraction, { capture: true });
      });
    };
  }, [isOpen, unmuteVideo]);

  // Trigger unmuted autoplay on initial mount
  useEffect(() => {
    if (isOpen) {
      attemptUnmutedAutoplay();
    }
  }, [isOpen, attemptUnmutedAutoplay]);

  // Toggle button handler
  const handleToggleSound = (e) => {
    e?.stopPropagation();
    if (isMuted) {
      unmuteVideo();
    } else {
      muteVideo();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[80]
        w-screen
        h-full
        h-[100dvh]
        max-h-[100dvh]
        bg-black/95
        flex
        flex-col
        items-center
        justify-center
        overflow-hidden
        animate-in
        fade-in
        duration-300

        sm:inset-auto
        sm:bottom-5
        sm:right-5
        sm:w-[230px]
        sm:h-auto
        sm:aspect-[9/16]
        sm:max-w-none
        sm:max-h-[calc(100dvh-1.5rem)]
        sm:rounded-2xl
        sm:border
        sm:border-white/20
        sm:bg-black
        sm:shadow-[0_15px_45px_rgba(0,0,0,0.65)]
        sm:ring-1
        sm:ring-white/10
        sm:slide-in-from-bottom-6

        md:bottom-6
        md:right-6
        md:w-[260px]

        lg:w-[280px]
      "
    >
      {/* Sound Toggle Button */}
      <button
        type="button"
        onClick={handleToggleSound}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        title={isMuted ? "Click to unmute" : "Mute"}
        className="
          absolute
          left-4
          top-4
          z-40
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black/75
          text-white
          border
          border-white/20
          shadow-lg
          backdrop-blur-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black
          active:scale-95

          sm:left-2
          sm:top-2
          sm:h-7
          sm:w-7
          sm:border-none
        "
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse" />
        ) : (
          <Volume2 className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-emerald-400" />
        )}
      </button>

      {/* Dismiss / Close Button */}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close video"
        title="Close"
        className="
          absolute
          right-4
          top-4
          z-40
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-black/75
          text-white
          border
          border-white/20
          shadow-lg
          backdrop-blur-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black
          active:scale-95

          sm:right-2
          sm:top-2
          sm:h-7
          sm:w-7
          sm:border-none
        "
      >
        <X className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
      </button>

      {/* Tap anywhere on video to unmute with full volume */}
      {isMuted && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            unmuteVideo();
          }}
          className="absolute inset-0 z-30 cursor-pointer flex flex-col items-center justify-end pb-8 sm:pb-5 select-none bg-black/10 hover:bg-black/20 transition-colors"
          title="Tap anywhere to enable sound"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-3 sm:py-1.5 rounded-full bg-blue-600/95 hover:bg-blue-600 text-white text-xs sm:text-[11px] font-bold shadow-2xl backdrop-blur-md animate-bounce border border-white/20">
            <Volume2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white" />
            <span>Tap for Sound 🔊</span>
          </div>
        </div>
      )}

      {/* Responsive Video Container */}
      <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center overflow-hidden">
        <iframe
          ref={iframeRef}
          src={videoSrc}
          loading="eager"
          onLoad={() => attemptUnmutedAutoplay()}
          style={{ width: "100%", height: "100%", border: 0 }}
          className="w-full h-full block border-0 m-0 p-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          title="CareerNova Overview Video"
        />
      </div>
    </div>
  );
};

export default FloatingVideoWidget;
