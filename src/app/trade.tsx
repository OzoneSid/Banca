"use client";

import type { Dispatch, SetStateAction } from "react";
import { useGame } from "@/useGame";
import type { PageType } from "@/app/bookLayout";
import BookLayout from "@/app/bookLayout";

type TradeProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
};

export default function Trade({ setOpen, page, setPage }: TradeProps) {
  const {
    client,
    ducats,
    score,
    streak,
    multiplier,
    offer,
    setOffer,
    handlePropose,
    feedback,
  } = useGame();

  return (
    <BookLayout
      setOpen={setOpen}
      page={page}
      setPage={setPage}
      leftPage={
        <div className="flex flex-col gap-2">
          <p className="w-full flex justify-center font-bold">{client.name}</p>
          <p className="w-full flex justify-center">
            {client.amount} {client.currency}
          </p>

          <input
            type="number"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="border border-[#0000000] bg-transparent px-2 py-1 text-black"
          />

          <button
            onClick={handlePropose}
            className="
              absolute bottom-[-3%] left-1/2 -translate-x-1/2
              transition hover:scale-105
            "
          >
            <img
              src="/assets/propose-button.png"
              alt="propose"
              className="w-50"
            />

            <span className="mt-1 text-m font-semibold tracking-wide">
              Proposer
            </span>
          </button>

          {feedback.message && (
            <p
              className={
                feedback.type === "success" ? "text-green-700" : "text-red-600"
              }
            >
              {feedback.message}
            </p>
          )}
        </div>
      }
      rightPage={
        <div className="absolute flex flex-col left-1/5 gap-10 text-center">
          <p>Ducats : {ducats}</p>
          <p>Score : {score}</p>
          <p>Série : {streak}</p>
          <p>Multiplicateur : x{multiplier}</p>
        </div>
      }
    />
  );
}
