"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PageType } from "@/app/bookLayout";
import { useGame } from "@/useGame";
import BookLayout from "@/app/bookLayout";

type MarketProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
};

export default function Market({ setOpen, page, setPage }: MarketProps) {
  const { currencies } = useGame();

  return (
    <BookLayout
      setOpen={setOpen}
      page={page}
      setPage={setPage}
      leftPage={
        <div className="absolute flex flex-col left-[8rem] top-[-3rem] gap-15">
          <h1 className="relative font-bold text-center">Monnaies</h1>
          {currencies.map((c) => (
            <p key={c.name} className="relative left-[-6rem] font-sm">{c.name}</p>
          ))}
        </div>
      }
      rightPage={
        <div className="absolute flex flex-col left-[7rem] top-[-3rem] gap-15 text-center">
          <h2 className="relative font-bold">en Ducats</h2>
          {currencies.map((c) => (
            <p key={c.name} className="relative font-sm">{c.baseValue}</p>
          ))}
        </div>
      }
    />
  );
}
