"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ResolutionDisclaimer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasBypass, setHasbypass] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if user bypass
    const bypass = localStorage.getItem("disclaimerBypass") === "true";
    setHasbypass(bypass);
    setShowDisclaimer(!bypass);

    // Check ratio resolution
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isMobile = window.innerWidth < 1024; // Tailwind lg breakpoint
      const is16_9 = Math.abs(aspectRatio - 16 / 9) < 0.1; // Allow 10% tolerance

      const shouldShow = !bypass && (isMobile || !is16_9);
      setShowDisclaimer(shouldShow);
    };

    checkAspectRatio();
    window.addEventListener("resize", checkAspectRatio);

    return () => {
      window.removeEventListener("resize", checkAspectRatio);
    };
  }, []);

  const handleLoadAnyway = () => {
    localStorage.setItem("disclaimerBypass", "true");
    setShowDisclaimer(false);
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  if (!showDisclaimer) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className={`${inter.className} bg-amber-900 border-4 border-amber-700 rounded-lg p-8 max-w-2xl mx-4 text-center shadow-2xl`}
      >
        {/* Title */}
        <h1 className="text-[100%] font-bold text-amber-100 mb-4">
          Resolution Warning
        </h1>

        {/* Description */}
        <p className="text-[90%] text-amber-50 mb-6 leading-relaxed">
          This application is optimized for{" "}
          <strong>16:9 widescreen displays</strong> and
          <strong> desktop devices</strong>.
        </p>

        <p className="text-[70%] text-amber-100 mb-8">
          Images and layout will not display correctly on mobile devices or
          non-widescreen resolutions. While I am working on responsiveness,
          please use a desktop computer with 16:9 screen for a proper
          experience.
        </p>

        {/* Button */}
        <button
          onClick={handleLoadAnyway}
          className="px-8 py-3 bg-amber-700 hover:bg-amber-600 text-amber-50 font-bold rounded-lg border-2 border-amber-600 transition-all hover:scale-105 active:scale-95"
        >
          Load Anyway
        </button>

        {/* Preferences */}
        <p className="text-[60%] text-amber-300 mt-6">
          This choice will be remembered for this browser.
        </p>
      </div>
    </div>
  );
}
