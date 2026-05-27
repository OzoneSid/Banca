"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PageType } from "@/app/bookLayout";
// import type { playersSet } from "@/app/playersSet";
import BookLayout from "@/app/bookLayout";

type LeaderboardsProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
};

export default function Leaderboards({
  setOpen,
  page,
  setPage,
}: LeaderboardsProps) {
  /* const { players } = playersSet(); */
  /* const { scores } = playersSet(); */
  return (
    <BookLayout
      setOpen={setOpen}
      page={page}
      setPage={setPage}
      leftPage={
        <div className="absolute flex flex-col left-1/3 top-[-3rem] gap-15 text-center">
          <h3 className="relative font-bold text-center">Joueur</h3>
          {/* {players.map((c) => (
            <p className="relative left-[5%] font-sm">{c.name}</p>
          ))}  */}
          <p>Ze de Scou</p>
          <p>La Faux Dure</p>
          <p>Le Rondain</p>
        </div>
      }
      rightPage={
        <div className="absolute flex flex-col left-1/3 top-[-3rem] gap-15 text-center">
          <h4 className="relative font-bold text-center">Score</h4>
          {/* {scores.map((c) => (
            <p className="relative left-[5%] font-sm">{c.name}</p>
          ))}  */}
          <p>568</p>
          <p>354</p>
          <p>125</p>
        </div>
      }
    />
  );
}
