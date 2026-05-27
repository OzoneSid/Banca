"use client";

import { useEffect, useState } from "react";
import type { PageType } from "@/app/bookLayout";
import Market from "@/app/market";
import Trade from "@/app/trade";
import Shop from "@/app/shop";
import Leaderboards from "@/app/leaderboards";
import Settings from "@/app/settings";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<PageType>("trade");

  useEffect(() => {
    if (!open) return;
  }, [page, open]);

  const renderPage = () => {
    switch (page) {
      case "market":
        return <Market setOpen={setOpen} page={page} setPage={setPage} />;
      case "trade":
      default:
        return <Trade setOpen={setOpen} page={page} setPage={setPage} />;
      case "shop":
        return <Shop setOpen={setOpen} page={page} setPage={setPage} />;
      case "leaderboards":
        return <Leaderboards setOpen={setOpen} page={page} setPage={setPage} />;
      case "settings":
        return <Settings setOpen={setOpen} page={page} setPage={setPage} />;
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* BACKGROUND */}
      <img
        src="/assets/background.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      {/* BANKER */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corps */}
        <img
          src="/assets/banker-not-moving.png"
          className="absolute z-10 bottom-[8%] right-[32.1%]"
        />

        {/* Tete bouge */}
        <img
          src="/assets/banker-moving-head.png"
          className="absolute z-20 bottom-[39%] right-[34.5%] animate-[idleHead_3.3s_ease-in-out_infinite]"
        />

        {/* Bras bouge */}
        <img
          src="/assets/banker-moving-arm.png"
          className="absolute z-0 bottom-[29%] right-[37.7%] animate-[idleArm_2s_ease-in-out_infinite]"
        />
      </div>

      {/* CUSTOMER */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corps */}
        <img
          src="/assets/customer-not-moving.png"
          className="absolute z-10 bottom-[6.6%] left-[34.8%]"
        />

        {/* Tete bouge */}
        <img
          src="/assets/customer-moving-head.png"
          className="absolute z-20 bottom-[37.6%] left-[37.3%] animate-[idleHead_3s_ease-in-out_infinite]"
        />

        {/* Bras bouge */}
        <img
          src="/assets/customer-moving-arm.png"
          className="absolute z-0 bottom-[27.6%] left-[40.5%] animate-[idleArm_2.2s_ease-in-out_infinite]"
        />
      </div>

      {/* UI BUTTON */}
      <button
        onClick={() => {
          setPage("trade");
          setOpen(true);
        }}
        className="absolute top-6 left-33 z-20"
      >
        <img
          src="/assets/ui-button.png"
          alt="open book"
          className="w-33 hover:scale-105 transition"
        />
      </button>

      {open && renderPage()}
    </main>
  );
}
