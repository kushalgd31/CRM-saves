"use client";

import { useState } from "react";

const ledgerRows = [
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "11,700",
    wagered: "500",
  },
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "10,000",
    wagered: "1000",
  },
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "11,700",
    wagered: "1500",
  },
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "10,000",
    wagered: "0",
  },
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "10,000",
    wagered: "0",
  },
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "10,000",
    wagered: "0",
  },
  {
    event: "Deposit Rs 10,000 + bonus credited",
    nonCash: "7,500",
    cash: "10,000",
    wagered: "0",
  },
];

function PreviewTab() {
  const [betAmount, setBetAmount] = useState("500");
  const [gameType, setGameType] = useState("Slots (100%)");
  const [progress] = useState(1500);
  const total = 37500;
  const progressPercent = (progress / total) * 100;

  return (
    <div className=" sm:p-1">
      <div className="space-y-5">
        <section className="space-y-3">
          <div>
            <h2 className="-mt-2 self-stretch text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[22.286px] tracking-[0.122px]">
              Live Simulator
            </h2>
            <p className="-mt-1 font-[Poppins] text-[11px] leading-[18px] text-[#6B7280]">
              When a player places a bet, which wallet is debited first?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-[10px] border border-[#F4C58A] bg-[#FFF9F2] px-5 py-4 text-center">
              <p className="text-[#A36E2C] font-[Poppins] text-[12px] font-normal">
                Non-cash(bonus)
              </p>
              <p className="mt-1 text-[#A36E2C] font-[Geist] text-[17px] font-bold leading-[26.519px] tracking-[0.145px]">
                6,000
              </p>
              <p className="mt-1 text-[#A36E2C] font-[Poppins] text-[12] font-normal">
                Deposit bonus 75% on ₹10,000
              </p>
            </div>

            <div className="rounded-[10px] border border-[#CDE8DC] bg-[#E6F7EF] px-5 py-4 text-center">
              <p className="text-[#075041] font-[Poppins] text-[12px] font-normal">
                Non-cash(bonus)
              </p>
              <p className="mt-2 text-[#075041] font-[Geist] text-[17px] font-bold leading-[19px] tracking-[0.145px]">
                6,000
              </p>
              <p className="mt-2 text-[#075041] font-[Poppins] text-[12px] font-normal">
                Deposit bonus 75% on ₹10,000
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="grid items-center gap-3 sm:grid-cols-[72px_minmax(0,1fr)_86px] border-b border-[#D1D5DB] pb-3">
            <span className="text-[#1F232B] font-[Poppins] text-[12px] font-normal">
              Wagering
            </span>

            <div className="h-[6px] rounded-[14px] bg-[#E9E9E9]">
              <div
                className="h-full rounded-full bg-[#2563EB]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="text-right font-[Poppins] text-[12px] font-medium leading-4 text-[#1F232B]">
              {progress}/ {total}
            </span>
          </div>

          <div className="grid items-center gap-3 sm:grid-cols-[72px_72px_44px_minmax(0,1fr)]">
            <label
              htmlFor="bet-amount"
              className="text-[#1F232B] font-[Poppins] text-[12px] font-normal"
            >
              Bet amount
            </label>

            <input
              id="bet-amount"
              value={betAmount}
              onChange={(event) => setBetAmount(event.target.value)}
              className="h-[30px] rounded-[8px] border border-[#B5BCC6] px-3  outline-none bg-white text-[#2D3E55] font-[Poppins] text-[11px] font-medium"
            />

            <span className="text-[#1F232B] font-[Poppins] text-[12px] font-normal">
              Game
            </span>

            <select
              value={gameType}
              onChange={(event) => setGameType(event.target.value)}
              className="col-span-4 sm:col-span-4 h-[30px] rounded-[8px] border border-[#B5BCC6] bg-white px-3 font-[Poppins] text-[12px] text-[#1F232B] outline-none"
            >
              <option>Slots (100%)</option>
              <option>Crash/Aviator (80%)</option>
              <option>Sports betting (80%)</option>
              <option>Roulette (20%)</option>
            </select>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="self-stretch text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[22.951px] tracking-[0.126px]">
            User Details
          </h3>

          <div className="-mt-3 -ml-3">
            <div className="grid grid-cols-[1.7fr_0.8fr_0.8fr_0.7fr] gap-x-6 border-b border-[#E5E7EB] px-4 py-3">
              <span className="whitespace-nowrap text-[#4B5563] font-[Geist] text-[13px] font-normal leading-[22.951px] tracking-[0.126px]">
                Event
              </span>
              <span className="whitespace-nowrap text-[#4B5563] font-[Geist] text-[13px] font-normal leading-[22.951px] tracking-[0.126px] ml-2">
                Non-Cash
              </span>
              <span className="whitespace-nowrap text-[#4B5563] font-[Geist] text-[13px] font-normal leading-[22.951px] tracking-[0.126px] -ml-0">
                Cash
              </span>
              <span className="whitespace-nowrap text-[#4B5563] font-[Geist] text-[13px] font-normal leading-[22.951px] tracking-[0.126px]">
                Wagered
              </span>
            </div>

            {ledgerRows.map((row, index) => (
              <div
                key={`${row.event}-${index}`}
                className="grid grid-cols-[1.7fr_0.8fr_0.8fr_0.7fr] gap-x-6 border-b border-[#F1F5F9] px-4 py-3 last:border-b-0"
              >
                <span className="whitespace-nowrap text-[#1F232B] font-[Geist] text-[10.77px] font-semibold leading-[22.951px] tracking-[0.126px] ">
                  {row.event}
                </span>
                <span className="text-[#1F232B] font-[Geist] text-[10.77px] font-semibold leading-[22.951px] tracking-[0.126px] ml-3">
                  {row.nonCash}
                </span>
                <span className="text-[#1F232B] font-[Geist] text-[10.77px] font-semibold leading-[22.951px] tracking-[0.126px]">
                  {row.cash}
                </span>
                <span className="text-[#1F232B] font-[Geist] text-[10.77px] font-semibold leading-[22.951px] tracking-[0.126px]">
                  {row.wagered}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-[2px] bg-[#E0F6EE] px-4 py-2 text-center">
            <p className="text-[#4B9B48] font-[Geist] text-[11px] font-semibold leading-[22.951px] tracking-[0.126px]">
              Wagering complete remaining non-cash(Rs 700) converts to cash
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PreviewTab;
