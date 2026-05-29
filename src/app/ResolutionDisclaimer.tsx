"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ResolutionDisclaimer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [userAllowed, setUserAllowed] = useState(false);

  useEffect(() => {
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isMobile = window.innerWidth < 1024; // Tailwind breakpoint
      const is16_9 = Math.abs(aspectRatio - 16 / 9) < 0.1; // 10% tolerance
      const shouldShow = !userAllowed && (isMobile || !is16_9);

      setShowDisclaimer(shouldShow);
      setHasChecked(true);
    };

    checkAspectRatio();
    window.addEventListener("resize", checkAspectRatio);

    return () => {
      window.removeEventListener("resize", checkAspectRatio);
    };
  }, [userAllowed]);

  const handleLoadAnyway = () => {
    setUserAllowed(true);
    setShowDisclaimer(false);
  };

  if (!hasChecked) {
    return null;
  }

  if (showDisclaimer && !userAllowed) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div
          className={`${inter.className} bg-amber-900 border-4 border-amber-700 rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm mx-2 text-center shadow-2xl`}
        >
          {/* Title */}
          <h1 className="text-base sm:text-lg font-bold text-amber-100 mb-3">
            Resolution Warning
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-amber-50 mb-3 leading-relaxed">
            This application is optimized for{" "}
            <strong>16:9 widescreen displays</strong> and
            <strong> desktop devices</strong>.
          </p>

          <p className="text-[65%] sm:text-xs text-amber-100 mb-4">
            Images and layout will not display correctly on mobile devices or
            non-widescreen resolutions. While I am working on responsiveness,
            please use a desktop computer with 16:9 screen for a proper
            experience.
          </p>

          {/* Button */}
          <button
            onClick={handleLoadAnyway}
            className="px-4 sm:px-6 py-2 bg-amber-700 hover:bg-amber-600 text-amber-50 text-sm font-bold rounded-lg border-2 border-amber-600 transition-all hover:scale-105 active:scale-95"
          >
            Load Anyway
          </button>

          {/* Preferences */}
          <p className="text-[55%] sm:text-xs text-amber-300 mt-3">
            This choice will not be remembered on reload.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
