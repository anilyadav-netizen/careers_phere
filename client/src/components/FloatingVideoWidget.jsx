"use client";

import { Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const IFRAME_ID = "careernova-floating-video";

// Unlock browser AudioContext
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
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef(null);
  const playerJsInstanceRef = useRef(null);

  // Modern Bunny Stream Player URL with muted=false so sound starts immediately
  const videoSrc =
    "https://player.mediadelivery.net/embed/769180/7d317061-5646-4a41-89ff-4e4faa54b595" +
    "?autoplay=true&loop=true&preload=true&muted=false";

  // Dispatch multi-protocol commands directly to Bunny Stream iframe
  const sendCommand = useCallback((method, value) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    // 1. Player.js official format with player_id
    win.postMessage(
      JSON.stringify({
        context: "player.js",
        version: "0.0.11",
        method,
        player_id: IFRAME_ID,
        ...(value !== undefined ? { value } : {}),
      }),
      "*",
    );

    // 2. Direct JSON method format with player_id
    win.postMessage(
      JSON.stringify({
        method,
        player_id: IFRAME_ID,
        ...(value !== undefined ? { value } : {}),
      }),
      "*",
    );

    // 3. Alternative setMuted variations
    if (method === "unmute") {
      win.postMessage(
        JSON.stringify({
          context: "player.js",
          version: "0.0.11",
          method: "setMuted",
          value: false,
          player_id: IFRAME_ID,
        }),
        "*",
      );
      win.postMessage(
        JSON.stringify({
          method: "setMuted",
          value: false,
          player_id: IFRAME_ID,
        }),
        "*",
      );
    } else if (method === "mute") {
      win.postMessage(
        JSON.stringify({
          context: "player.js",
          version: "0.0.11",
          method: "setMuted",
          value: true,
          player_id: IFRAME_ID,
        }),
        "*",
      );
    }

    // 4. Plyr command format (underlying Bunny engine)
    win.postMessage(
      JSON.stringify({
        event: "command",
        func: method,
        args: value !== undefined ? [value] : [],
      }),
      "*",
    );

    // 5. Bunny Stream native command objects
    if (method === "play") {
      win.postMessage({ command: "activate" }, "*");
      win.postMessage({ command: "play" }, "*");
    } else if (method === "unmute") {
      win.postMessage({ command: "unmute" }, "*");
      win.postMessage({ command: "setVolume", parameter: 1.0 }, "*");
      win.postMessage({ command: "increaseVolume", parameter: 1.0 }, "*");
    }
  }, []);

  // Unmute video and enforce 100% volume
  const unmuteVideo = useCallback(() => {
    unlockAudioContext();

    if (playerJsInstanceRef.current) {
      try {
        playerJsInstanceRef.current.setMuted(false);
        playerJsInstanceRef.current.unmute();
        playerJsInstanceRef.current.setVolume(100);
      } catch {
        /* fallback to postMessage */
      }
    }

    // PostMessage broadcasts across all formats
    sendCommand("unmute");
    sendCommand("setVolume", 100);
    sendCommand("setVolume", 1.0);

    setIsMuted(false);
  }, [sendCommand]);

  // Only called when the user explicitly clicks the Mute button
  const muteVideo = useCallback(() => {
    if (playerJsInstanceRef.current) {
      try {
        playerJsInstanceRef.current.setMuted(true);
        playerJsInstanceRef.current.mute();
        playerJsInstanceRef.current.setVolume(0);
      } catch {
        /* ignore */
      }
    }

    sendCommand("mute");
    sendCommand("setVolume", 0);
    setIsMuted(true);
  }, [sendCommand]);

  // Connect Player.js instance and ensure unmuted playback
  const setupPlayer = useCallback(() => {
    if (typeof window === "undefined" || !iframeRef.current) return;

    if (window.playerjs) {
      try {
        const player = new window.playerjs.Player(iframeRef.current);
        playerJsInstanceRef.current = player;

        player.on("ready", () => {
          player.setMuted(false);
          player.unmute();
          player.setVolume(100);
          player.play();
          setIsMuted(false);
        });

        player.on("play", () => {
          player.setMuted(false);
          player.unmute();
          player.setVolume(100);
          setIsMuted(false);
        });
      } catch (err) {
        console.warn("Player.js init fallback:", err);
      }
    }
  }, []);

  // Listen to ready/play messages from Bunny Stream player via postMessage
  useEffect(() => {
    if (!isOpen) return;

    const onMessage = (e) => {
      if (!String(e.origin).includes("mediadelivery.net")) return;

      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

        if (data?.context === "player.js" || data?.event) {
          if (data?.event === "ready" || data?.event === "play") {
            sendCommand("unmute");
            sendCommand("setVolume", 100);
            setIsMuted(false);
          }
        }
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [isOpen, sendCommand]);

  // Listen for custom unmute broadcast from WelcomePopup
  useEffect(() => {
    const handleCustomUnmute = () => {
      unmuteVideo();
    };

    window.addEventListener("careernova:unmute_video", handleCustomUnmute);
    return () =>
      window.removeEventListener("careernova:unmute_video", handleCustomUnmute);
  }, [unmuteVideo]);

  // Universal gesture listener: Unmute on any user interaction
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
      window.addEventListener(ev, onFirstInteraction, {
        capture: true,
        passive: true,
      });
      document.addEventListener(ev, onFirstInteraction, {
        capture: true,
        passive: true,
      });
    });

    return () => {
      events.forEach((ev) => {
        window.removeEventListener(ev, onFirstInteraction, { capture: true });
        document.removeEventListener(ev, onFirstInteraction, { capture: true });
      });
    };
  }, [isOpen, unmuteVideo]);

  // Initialize on mount
  useEffect(() => {
    if (isOpen) {
      setupPlayer();
      unmuteVideo();
    }
  }, [isOpen, setupPlayer, unmuteVideo]);

  // Sound toggle button click handler
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
        title={isMuted ? "Click to unmute" : "Mute audio"}
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
          bg-black/80
          text-white
          border
          border-white/25
          shadow-xl
          backdrop-blur-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black
          active:scale-95
          cursor-pointer

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
          bg-black/80
          text-white
          border
          border-white/25
          shadow-xl
          backdrop-blur-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black
          active:scale-95
          cursor-pointer

          sm:right-2
          sm:top-2
          sm:h-7
          sm:w-7
          sm:border-none
        "
      >
        <X className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
      </button>

      {/* Tap anywhere on video to unmute (only shown if muted) */}
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
          id={IFRAME_ID}
          ref={iframeRef}
          src={videoSrc}
          loading="eager"
          onLoad={() => {
            setupPlayer();
            unmuteVideo();
          }}
          style={{ width: "100%", height: "100%", border: 0 }}
          className="w-full h-full block border-0 m-0 p-0"
          allow="accelerometer; autoplay *; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="CareerNova Overview Video"
        />
      </div>
    </div>
  );
};

export default FloatingVideoWidget;
