"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const FloatingVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const iframeRef = useRef(null);
  const timersRef = useRef([]);

  const videoSrc =
    "https://iframe.mediadelivery.net/embed/769180/7d317061-5646-4a41-89ff-4e4faa54b595" +
    "?autoplay=true&loop=true&preload=true";

  const sendCommand = useCallback((method, value) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;

    win.postMessage(
      JSON.stringify({
        context: "player.js",
        version: "0.0.11",
        method,
        ...(value !== undefined ? { value } : {}),
      }),
      "*",
    );
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const forcePlay = useCallback(() => {
    clearTimers();

    const attempt = () => sendCommand("play");

    attempt();

    [300, 800, 1500, 3000].forEach((t) =>
      timersRef.current.push(setTimeout(attempt, t)),
    );
  }, [sendCommand]);

  useEffect(() => {
    if (!isOpen) return;

    const onMessage = (e) => {
      if (!String(e.origin).includes("mediadelivery.net")) return;

      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;

        if (data?.context === "player.js" && data?.event === "ready") {
          forcePlay();
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
  }, [isOpen, forcePlay]);

  useEffect(() => {
    if (!isOpen) return;

    const events = ["pointerdown", "click", "touchend", "keydown"];

    const onFirstInteraction = () => {
      forcePlay();

      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    };

    events.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, { passive: true }),
    );

    return () =>
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
  }, [isOpen, forcePlay]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        bottom-3
        right-3
        z-[80]
        aspect-[9/16]
        w-[180px]
        min-[380px]:w-[200px]
        min-[440px]:w-[215px]
        max-w-[calc(100vw-1.5rem)]
        max-h-[calc(100dvh-1.5rem)]
        overflow-hidden
        rounded-xl
        border
        border-white/20
        bg-black
        shadow-[0_15px_45px_rgba(0,0,0,0.65)]
        ring-1
        ring-white/10
        animate-in
        fade-in
        slide-in-from-bottom-6
        duration-300

        sm:bottom-5
        sm:right-5
        sm:w-[230px]
        sm:rounded-2xl

        md:bottom-6
        md:right-6
        md:w-[260px]

        lg:w-[280px]
      "
    >
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close video"
        className="
          absolute
          right-2
          top-2
          z-30
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-black/75
          text-white
          shadow-md
          backdrop-blur-xs
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black
          active:scale-95
        "
      >
        <X size={14} />
      </button>

      <iframe
        ref={iframeRef}
        src={videoSrc}
        loading="eager"
        style={{ width: "100%", height: "100%", border: 0 }}
        className="w-full h-full block border-0 m-0 p-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        title="CareerNova Overview Video"
      />
    </div>
  );
};

export default FloatingVideoWidget;
