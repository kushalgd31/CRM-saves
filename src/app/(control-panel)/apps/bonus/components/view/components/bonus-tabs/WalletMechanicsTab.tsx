"use client";

import { useState } from "react";

type Option = {
  id: string;
  title: string;
  description: string;
  tokens?: string[];
};

type Scenario = {
  id: string;
  heading: string;
  description: string;
  sidebarTitle: string;
  sidebarAmount?: string;
  sidebarMeta: string;
  options: Option[];
};

const sections: Scenario[] = [
  {
    id: "bet-placed",
    heading: "Stake Deduction Order",
    description: "When a player places a bet, which wallet is debited first?",
    sidebarTitle: "Bet Placed",
    sidebarMeta: "Player bets Rs 500",
    options: [
      {
        id: "deduct-non-cash-first",
        title: "Deduct from non-cash first",
        description:
          "Bonus is consumed before real money. Player's cash stays safer longer.",
        tokens: ["Bet Rs 500", "Rs 289", "NC-500", "Cash"],
      },
      {
        id: "deduct-cash-first",
        title: "Deduct from cash first",
        description:
          "Real money depletes first. Bonus is the safety net. Wagering still counts.",
      },
      {
        id: "proportional-split",
        title: "Proportional split",
        description:
          "Deducted from both wallets based on their balance ratio.",
      },
    ],
  },
  {
    id: "on-winning",
    heading: "On winning",
    description:
      "Player bets Rs 500 and wins Rs 1,200. Where does the stake go? Where do winnings go?",
    sidebarTitle: "Player wins",
    sidebarAmount: "Stake Rs 500, Payout",
    sidebarMeta: "Rs 1,200",
    options: [
      {
        id: "stake-vanishes",
        title: "Stake vanishes, winnings to cash",
        description:
          "The Rs 500 non-cash disappears. Rs 1,200 winnings credited to cash. Non-cash can only shrink.",
      },
      {
        id: "stake-returns",
        title: "Stake returns to non-cash, winnings to cash",
        description:
          "The Rs 500 non-cash disappears. Rs 1,200 winnings credited to cash. Non-cash can only shrink.",
      },
      {
        id: "entire-payout",
        title: "Entire payout to cash(stake + winnings)",
        description:
          "Non-cash stake is deducted but total payout Rs 1,200 goes to cash. Most generous to player.",
        tokens: ["Rs 289", "NC-500", "Game", "Winnings", "Cash"],
      },
    ],
  },
  {
    id: "on-losing",
    heading: "On Losing",
    description: "Player bets Rs 500 and loses. What gets deducted?",
    sidebarTitle: "Player Losses",
    sidebarAmount: "Stake Rs 500, Payout",
    sidebarMeta: "Rs 0",
    options: [
      {
        id: "loss-non-cash",
        title: "Loss deducted from non-cash",
        description:
          "The Rs 500 stake was already taken from non-cash. It's simply gone. Cash untouched.",
        tokens: ["NC-500", "Rs 246", "Lost", "Cash no change"],
      },
      {
        id: "loss-proportionally",
        title: "Loss split proportionally",
        description:
          "Both wallets absorb the loss based on balance ratio. Matches proportional stake settings.",
      },
    ],
  },
];

const defaultSelections = {
  "bet-placed": "deduct-non-cash-first",
  "on-winning": "entire-payout",
  "on-losing": "loss-non-cash",
} as const;

function getTokenClasses(token: string) {
  if (token.includes("NC") || token.includes("Non-cash")) {
    return "bg-[#FEF3C7] text-[#92400E]";
  }

  if (token.includes("Cash")) {
    return "bg-[#DCFCE7] text-[#166534]";
  }

  if (token.includes("Win") || token.includes("Winnings")) {
    return "bg-[#DBEAFE] text-[#1D4ED8]";
  }

  if (token.includes("Lost")) {
    return "bg-[#FEE2E2] text-[#B91C1C]";
  }

  return "bg-[#F3F4F6] text-[#6B7280]";
}

function getCardClasses(selected: boolean) {
  if (selected) {
    return "border-[#93C5FD] bg-[#E8F1FF] shadow-[0_8px_18px_rgba(37,99,235,0.08)]";
  }

  return "border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-[#CBD5E1]";
}

function WalletMechanicsTab() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    defaultSelections
  );

  return (
    <div className="sm:p-5">
      <div className="space-y-7">
        {sections.map((section) => (
          <section key={section.id} className="space-y-3">
            <div>
              <h2 className="font-[Poppins] text-[16px] font-semibold leading-6 text-[#1F232B]">
                {section.heading}
              </h2>
              <p className="mt-1 font-[Poppins] text-[12px] leading-[18px] text-[#6B7280]">
                {section.description}
              </p>
            </div>

            <div className="grid overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:grid-cols-[96px_minmax(0,1fr)]">
              <div className="flex min-h-[176px] flex-col justify-center border-r border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4">
                <p className="font-[Poppins] text-[13px] font-semibold leading-[18px] text-[#1F232B]">
                  {section.sidebarTitle}
                </p>
                {section.sidebarAmount ? (
                  <p className="mt-2 font-[Poppins] text-[11px] font-medium leading-4 text-[#6B7280]">
                    {section.sidebarAmount}
                  </p>
                ) : null}
                <p className="mt-1 font-[Poppins] text-[11px] leading-4 text-[#6B7280]">
                  {section.sidebarMeta}
                </p>
              </div>

              <div className="space-y-2.5 p-3">
                {section.options.map((option) => {
                  const selected = selectedOptions[section.id] === option.id;

                  return (
                    <label
                      key={option.id}
                      className={`block cursor-pointer rounded-[8px] border px-3 py-3 transition ${getCardClasses(
                        selected
                      )}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name={section.id}
                          checked={selected}
                          onChange={() =>
                            setSelectedOptions((current) => ({
                              ...current,
                              [section.id]: option.id,
                            }))
                          }
                          className="mt-[2px] h-4 w-4 border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="font-[Poppins] text-[13px] font-semibold leading-[18px] text-[#1F232B]">
                            {option.title}
                          </p>
                          <p className="mt-1 font-[Poppins] text-[11px] leading-[16px] text-[#6B7280]">
                            {option.description}
                          </p>

                          {option.tokens ? (
                            <div className="mt-3 rounded-[6px] border border-[#E5E7EB] bg-white px-3 py-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {option.tokens.map((token, index) => (
                                  <span
                                    key={`${option.id}-${token}-${index}`}
                                    className={`rounded-full px-2 py-[3px] font-[Poppins] text-[10px] font-medium leading-4 ${getTokenClasses(
                                      token
                                    )}`}
                                  >
                                    {token}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default WalletMechanicsTab;
