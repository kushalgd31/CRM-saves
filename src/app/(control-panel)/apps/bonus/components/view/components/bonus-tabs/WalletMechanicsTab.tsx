"use client";

import { useState } from "react";

type Option = {
  id: string;
  title: string;
  description: string;
  tokens?: string[];
  preview?: {
    amount?: string;
    balance: string;
    tags: Array<{
      label: string;
      tone: PreviewTone;
    }>;
    note?: string;
  };
};

type PreviewTone = "non-cash" | "cash" | "gone" | "payout";

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
    sidebarMeta: "Player bets ₹500",
    options: [
      {
        id: "deduct-non-cash-first",
        title: "Deduct from non-cash first",
        description:
          "Bonus is consumed before real money. Player's cash stays safe longer.",
        preview: {
          amount: "Bet ₹500",
          balance: "\u2193219",
          tags: [
            { label: "NC:-500", tone: "non-cash" },
            { label: "Cash: 0", tone: "cash" },
          ],
          note: "if non-cash = 0, then cash is used",
        },
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
      "Player bets ₹500 and wins ₹1,200. Where does the stake go? Where do winnings go?",
    sidebarTitle: "Player wins",
    sidebarAmount: "Stake ₹500, Payout",
    sidebarMeta: "₹1,200",
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
          "Non-cash stake is deducted but total payout ₹1,700 goes to cash. Most generous to player.",
        preview: {
          balance: "\u2193219",
          tags: [
            { label: "NC:-500", tone: "non-cash" },
            { label: "Gone", tone: "gone" },
            { label: "Payout", tone: "payout" },
            { label: "Cash: 0", tone: "cash" },
          ],
        },
      },
    ],
  },
  {
    id: "on-losing",
    heading: "On Losing",
    description: "Player bets Rs 500 and loses. What gets deducted?",
    sidebarTitle: "Player Losses",
    sidebarAmount: "Stake ₹500, Payout",
    sidebarMeta: "₹0",
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
    return "bg-[#FAEEDA] rounded-[17px] text-[#5F4731] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  if (token.includes("Cash")) {
    return "bg-[#E1F1E1] rounded-[17px] text-[#357533] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  if (token.includes("Win") || token.includes("Winnings")) {
    return "rounded-[17px] bg-[#F6EDED]  text-[#A42F29] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  if (token.includes("Lost")) {
    return "rounded-[17px] bg-[#F6EDED] text-[#A42F29] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  return "bg-[#F3F4F6] text-[#6B7280]";
}

function getPreviewTagClasses(tone: PreviewTone) {
  if (tone === "non-cash") {
    return "bg-[#FAEEDA] rounded-[17px] text-[#5F4731] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  if (tone === "gone") {
    return "rounded-[17px] bg-[#F6EDED] text-[#A42F29] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  if (tone === "payout") {
    return "rounded-[17px] bg-[#E7F1FB] text-[#1566C0] font-[Poppins] text-[10px] font-normal leading-normal";
  }

  return "bg-[#DCFCE7] text-[#166534]";
}

function getCardClasses(selected: boolean) {
  if (selected) {
    return "border-[#D6E6F8] bg-[#EAF3FE] shadow-none rounded-[8px]";
  }

  return "border border-[#DFE4EA] bg-white shadow-none hover:border-[#CBD5E1]";
}

function WalletMechanicsTab() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    defaultSelections
  );

  return (
    <div className="sm:p-2">
      <div className="space-y-7">
        {sections.map((section) => (
          <section key={section.id} className="space-y-3">
            <div className="-mt-2">
              <h2 className="self-stretch text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[22.286px] tracking-[0.122px]">
                {section.heading}
              </h2>
              <p className="-mt-1 self-stretch text-[#4B5563] font-[Poppins] text-[11px] font-normal leading-normal">
                {section.description}
              </p>
            </div>

            <div className="grid w-full overflow-hidden rounded-[14px] border border-[#E0E0E0] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:grid-cols-[132px_minmax(0,1fr)]">
              <div className="flex min-h-[176px] w-[132px] flex-col justify-center border-r border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4">
                <p className="self-stretch text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[22.286px] tracking-[0.122px]">
                  {section.sidebarTitle}
                </p>
                {section.sidebarAmount ? (
                  <p className="mt-1 whitespace-nowrap self-stretch text-[#4B5563] font-[Poppins] text-[11px] font-normal leading-normal">
                    {section.sidebarAmount}
                  </p>
                ) : null}
                <p className="mt-1 whitespace-nowrap self-stretch text-[#4B5563] font-[Poppins] text-[11px] font-normal leading-normal">
                  {section.sidebarMeta}
                </p>
              </div>

              <div className="space-y-2.5 p-3">
                {section.options.map((option) => {
                  const selected = selectedOptions[section.id] === option.id;
                  const isStakeDeductionOrder = section.id === "bet-placed";
                  const isWinningSection = section.id === "on-winning";
                  const isLosingSection = section.id === "on-losing";

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
                          className="peer sr-only"
                        />

                        <span
                          className={`mt-[3px] flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border transition ${
                            selected
                              ? "border-[#5A9BEF] bg-white"
                              : "border-[#C9D2DE] bg-white"
                          }`}
                        >
                          <span
                            className={`h-[6px] w-[6px] rounded-full transition ${
                              selected ? "bg-[#2F80ED]" : "bg-transparent"
                            }`}
                          />
                        </span>

                        <div className="min-w-0 flex-1 -ml-1">
                          <p className="self-stretch text-[#1F232B] font-[Geist] text-[13px] font-semibold leading-[16px] tracking-[0.122px]">
                            {option.title}
                          </p>
                          <p className="-mt-0 self-stretch text-[#4B5563] font-[Poppins] text-[11px] font-normal leading-normal">
                            {option.description}
                          </p>

                          {option.preview ? (
                            <div
                              className={`mt-2 -ml-5 rounded-[8px] border px-3 py-1 ${
                                isStakeDeductionOrder || isWinningSection || isLosingSection
                                  ? "border-[#D9E0E8] bg-white"
                                  : "border-[#E0E0E0] bg-white"
                              }`}
                            >
                              <div className="flex flex-wrap items-center gap-[6px]">
                                {option.preview.amount ? (
                                  <span className="mr-1 font-[Poppins] text-[11px] font-medium leading-4 text-[#4B5563]">
                                    {option.preview.amount}
                                  </span>
                                ) : null}

                                <span className="self-stretch text-[#7B8794] font-[Poppins] text-[11px] font-normal leading-normal">
                                  {option.preview.balance}
                                </span>

                                {option.preview.tags.map((tag) => (
                                  <span
                                    key={`${option.id}-${tag.label}`}
                                    className={`rounded-full px-2 py-[1px] font-[Poppins] text-[9px] font-medium leading-4 ${getPreviewTagClasses(
                                      tag.tone
                                    )}`}
                                  >
                                    {tag.label}
                                  </span>
                                ))}
                              </div>

                              {option.preview.note ? (
                                <p className="mt-1 font-[Poppins] text-[11px] leading-4 text-[#6B7280]">
                                  {option.preview.note}
                                </p>
                              ) : null}
                            </div>
                          ) : option.tokens ? (
                            <div
                              className={`mt-3 rounded-[8px] border bg-white px-4 py-3 ${
                                isLosingSection
                                  ? "border-[#D9E0E8]"
                                  : "border-[#E5E7EB]"
                              }`}
                            >
                              <div className="flex flex-wrap items-center gap-[6px]">
                                {option.tokens.map((token, index) => (
                                  <span
                                    key={`${option.id}-${token}-${index}`}
                                    className={`rounded-full px-2 py-[1px] font-[Poppins] text-[9px] font-medium leading-4 ${getTokenClasses(
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
