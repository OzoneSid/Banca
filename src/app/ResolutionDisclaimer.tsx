"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
      const is16_9 = Math.abs(aspectRatio - 16 / 9);
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
          className={`${inter.className} bg-gray-900 border-4 border-gray-600 rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-sm mx-2 text-center shadow-2xl scale-[1.1]`}
        >
          <Image
            src="./assets/not-responsive-icon.svg"
            alt=""
            width={440}
            height={390}
            className="mx-auto mb-4 h-auto w-36 sm:w-40"
          />
          {/* Title */}
          <h1 className="text-base sm:text-lg font-bold text-amber-100 mb-3">
            Not responsive yet...
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-amber-50 mb-3 leading-relaxed">
            This application and assets are made on 16:9 and not optimized for{" "}
            <strong>mobile devices</strong>.
          </p>

          {/* Button */}
          <button
            onClick={handleLoadAnyway}
            className="px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-500 text-orange-400 text-sm font-bold rounded-lg border-2 border-gray-600 transition-all hover:scale-105 active:scale-95"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
