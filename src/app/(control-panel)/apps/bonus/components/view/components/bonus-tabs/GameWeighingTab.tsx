"use client";

import { useState } from "react";

type ContributionRow = {
  id: string;
  label: string;
  value: number;
};

const contributionDefaults: ContributionRow[] = [
  { id: "slots", label: "Slots", value: 100 },
  { id: "crash-aviator", label: "Crash/Aviator", value: 80 },
  { id: "sports-betting", label: "Sports betting", value: 80 },
  { id: "roulette", label: "Roulette", value: 20 },
  { id: "live-casino", label: "Live Casino", value: 15 },
  { id: "blackjack", label: "Blackjack", value: 15 },
  { id: "baccarat", label: "Baccarat", value: 10 },
  { id: "poker", label: "Poker", value: 5 },
];

const excludedGameDefaults = [
  "Mines",
  "Plinko",
  "Dice",
  "Hi-Lo",
  "Keno",
  "Limbo",
  "Dragon Tiger",
  "Video Poker",
];

function GameWeighingTab() {
  const [contributions, setContributions] =
    useState<ContributionRow[]>(contributionDefaults);
  const [excludedGames, setExcludedGames] =
    useState<string[]>(excludedGameDefaults);

  const updateContribution = (id: string, value: number) => {
    setContributions((current) =>
      current.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const toggleExcludedGame = (game: string) => {
    setExcludedGames((current) =>
      current.includes(game)
        ? current.filter((item) => item !== game)
        : [...current, game]
    );
  };

  return (
    <div className=" sm:p-1">
      <div className="space-y-7">
        <section className="space-y-3">
          <div>
            <h2 className="w-full text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[22.286px] tracking-[0.122px]">
              Wagering contribution by game type
            </h2>
            <p className="mt-0 w-full text-[#4B5563] font-[Poppins] text-[11px] font-normal">
              100% = full contribution, 0% = game excluded from wagering
            </p>
          </div>

          <div className=" pb-3">
            <div className="space-y-3   pb-4">
              {contributions.map((item) => (
                <div
                  key={item.id}
                  className="grid items-center gap-3  border-b border-[#E4E4E4] pb-3 sm:grid-cols-[72px_minmax(0,1fr)_42px]"
                >
                  <label
                    htmlFor={item.id}
                    className="font-[Poppins] text-[11px] font-medium leading-4 text-[#1F232B]"
                  >
                    {item.label}
                  </label>

                  <div className="flex items-center">
                    <input
                      id={item.id}
                      type="range"
                      min={0}
                      max={100}
                      value={item.value}
                      onChange={(event) =>
                        updateContribution(item.id, Number(event.target.value))
                      }
                      className="h-[4px] w-full cursor-pointer appearance-none rounded-[14px]  bg-[#E9E9E9]
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-[13px]
                        [&::-webkit-slider-thumb]:w-[13px]
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:border
                        [&::-webkit-slider-thumb]:border-[#E9E9E9]
                        [&::-webkit-slider-thumb]:bg-[#E9E9E9]
                        [&::-webkit-slider-thumb]:shadow-[0_1px_2px_rgba(15,23,42,0.08)]
                        [&::-moz-range-thumb]:h-[13px]
                        [&::-moz-range-thumb]:w-[13px]
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:border
                        [&::-moz-range-thumb]:border-[#E9E9E9]
                        [&::-moz-range-thumb]:bg-[#E9E9E9]
                        [&::-moz-range-thumb]:shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                    />
                  </div>

                  <span className="text-right font-[Poppins] text-[11px] font-semibold leading-4 text-[#1F232B]">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>

              <div className="pt-5 -mt-4">
                <h3 className="self-stretch text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[22.286px] tracking-[0.122px]">
                  Excluded Games
                </h3>
                <p className="mt-1 self-stretch text-[#4B5563] font-[Poppins] text-[11.44px] font-normal">
                  These games cannot be played at all while bonus is active
                </p>

                <div className="mt-2 mb-15 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {excludedGameDefaults.map((game) => {
                    const checked = excludedGames.includes(game);

                    return (
                      <label
                        key={game}
                        className={`flex h-[26px] cursor-pointer items-center gap-2 rounded-[4px] border px-3 transition ${
                          checked
                            ? "border-[1px solid #E1E1E1] rounded-[6px]"
                            : "border-[#D9DEE7] bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleExcludedGame(game)}
                          className="peer sr-only"
                        />

                        <span
                          className={`flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-[3px] border transition ${
                            checked
                              ? "border-[#B0B0B0] bg-white"
                              : "border border-[#B0B0B0] bg-white rounded-[4px]"
                          }`}
                        >
                          <span
                            className={`h-[6px] w-[6px] rounded-[2px] transition ${
                              checked ? "bg-[#2F80ED]" : "bg-transparent"
                            }`}
                          />
                        </span>

                        <span className="font-[Poppins] text-[11px] font-normal leading-4 text-[#1F232B]">
                          {game}
                        </span>
                      </label>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default GameWeighingTab;
