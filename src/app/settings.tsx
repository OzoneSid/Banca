"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PageType } from "@/app/bookLayout";
import { useState } from "react";
import BookLayout from "@/app/bookLayout";

type SettingsProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
};

export default function Settings({ setOpen, page, setPage }: SettingsProps) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [volume, setVolume] = useState(50);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BookLayout
      setOpen={setOpen}
      page={page}
      setPage={setPage}
      leftPage={
        <div className="relative flex flex-col items-center justify-center w-1/2 left-1/4 top-1/6 gap-2">
          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            className="
              relative 
              transition hover:scale-105
            "
          >
            <img
              src="/assets/propose-button.png"
              alt="propose"
              className="w-30"
            />

            <span className={isSoundOn ? "text-green-700" : "text-red-600"}>
              {isSoundOn ? "Son activé" : "Son désactivé"}
            </span>
          </button>
          <input
            type="range"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="relative w-full custom-slider"
          ></input>
        </div>
      }
      rightPage={
        <div className="flex w-full">
          <form
            className="flex flex-col items-center gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom"
              className="
               px-10 py-2
               border border-[#5a3e2b]
               bg-transparent
               text-[#3b2a1a]
               placeholder:text-[#7a6a4f]
               focus:outline-none
              "
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="
               px-10 py-2
               border border-[#5a3e2b]
               bg-transparent
               text-[#3b2a1a]
               placeholder:text-[#7a6a4f]
               focus:outline-none
              "
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de Passe"
              className="
               px-10 py-2
               border border-[#5a3e2b]
               bg-transparent
               text-[#3b2a1a]
               placeholder:text-[#7a6a4f]
               focus:outline-none
              "
            />
            <button
              className="
               mt-2
               px-10 py-2
               border border-[#5a3e2b]
               bg-transparent
               hover:bg-[#d9ad71]
               "
            >
              Créer un compte
            </button>
          </form>
        </div>
      }
    />
  );
}
