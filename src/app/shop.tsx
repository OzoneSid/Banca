"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PageType } from "@/app/bookLayout";
import BookLayout from "@/app/bookLayout";

type ShopProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
};

export default function Shop({ setOpen, page, setPage }: ShopProps) {
  return (
    <BookLayout
      setOpen={setOpen}
      page={page}
      setPage={setPage}
      leftPage={
        <div className="relative flex grid gap-x-10 gap-y-40 grid-cols-2 text-center">
          <p>Badge</p>
          <p>Pipe</p>
          <p>Plume</p>
          <p>Chapeau</p>
        </div>
      }
      rightPage={
        <div className="relative flex left-[-12%] grid gap-x-10 gap-y-40 grid-cols-2 text-center">
          <p>Armoire</p>
          <p>Chandelier</p>
          <p>Cheminée</p>
          <p>Fauteuil</p>
        </div>
      }
    />
  );
}
