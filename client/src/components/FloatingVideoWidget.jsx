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

  // Play command retry ke saath bhejna
  const forcePlay = useCallback(() => {
    clearTimers();
    const attempt = () => sendCommand("play");
    attempt();
    [300, 800, 1500, 3000].forEach((t) =>
      timersRef.current.push(setTimeout(attempt, t)),
    );
  }, [sendCommand]);

  // Player ready hote hi play
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

  // Agar browser ne autoplay roka ho, to pehli click/tap pe play kar do
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
    <div className="fixed bottom-4 right-4 z-50 aspect-[9/16] h-[55vh] overflow-hidden rounded-xl bg-black shadow-[0_15px_40px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-6 duration-300 sm:bottom-6 sm:right-6 sm:h-[68vh] lg:h-[50vh]">
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Close video"
        className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
      >
        <X size={15} />
      </button>

      <iframe
        ref={iframeRef}
        src={videoSrc}
        loading="eager"
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        title="CareerNova Overview Video"
      />
    </div>
  );
};

export default FloatingVideoWidget;
