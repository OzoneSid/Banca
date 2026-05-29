import type { ReactNode, Dispatch, SetStateAction } from "react";

export type PageType =
  | "trade"
  | "market"
  | "shop"
  | "leaderboards"
  | "settings";

type BookLayoutProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: PageType;
  setPage: Dispatch<SetStateAction<PageType>>;
  leftPage: ReactNode;
  rightPage: ReactNode;
};

const tabs: PageType[] = [
  "trade",
  "market",
  "shop",
  "leaderboards",
  "settings",
];

const tabIcons: Record<PageType, string> = {
  trade: "/assets/trade-button.png",
  market: "/assets/market-button.png",
  shop: "/assets/shop-button.png",
  leaderboards: "/assets/leaderboards-button.png",
  settings: "/assets/settings-button.png",
};

export default function BookLayout({
  setOpen,
  page,
  setPage,
  leftPage,
  rightPage,
}: BookLayoutProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      />

      {/* LIVRE */}
      <div
        className="relative w-[130%] max-w-[1250px]"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        <img
          src="/assets/ui-background.png"
          className="w-full pointer-events-none"
        />

        {/* ONGLETS */}
        <div className="absolute left-[6%] top-[17%] flex flex-col gap-4">
          {tabs.map((tab) => {
            const typedTab = tab as PageType;
            const isActive = page === typedTab;

            return (
              <button
                key={tab}
                onClick={() => setPage(tab)}
                className={`
                  transition-all duration-200 ease-out
                  ${
                    isActive
                      ? "scale-110 brightness-110 translate-x-2 z-10"
                      : "opacity-100"
                  }
                  hover:scale-110 hover:brightness-110 hover:translate-x-1
                `}
              >
                <img src={tabIcons[tab]} className="w-18 pointer-events-none" />
              </button>
            );
          })}
        </div>

        {/* PAGE GAUCHE */}
        <div className="absolute animate-fade top-[27%] left-[15%] w-[32%] h-[50%]">
          <div key={page + "-left"} className="relative w-full h-full">
            {leftPage}
          </div>
        </div>

        {/* PAGE DROITE */}
        <div
          key={page + "-right"}
          className="absolute animate-fade top-[27%] right-[10%] w-[32.5%] h-[50%]"
        >
          {rightPage}
        </div>
      </div>
    </div>
  );
}
