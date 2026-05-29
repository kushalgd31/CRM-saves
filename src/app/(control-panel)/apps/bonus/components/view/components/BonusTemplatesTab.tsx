"use client";

const bonusTemplates = [
  {
    id: 1,
    category: "Deposit",
    name: "Welcome Deposit Bonus",
    status: "Active",
    playersCount: 224,
    stats: [
      { label: "Match", value: "100%" },
      { label: "Max bonus", value: "₹10,000" },
      { label: "Min deposit", value: "500" },
      { label: "Wagering", value: "5x bonus" },
      { label: "Expiry", value: "14 Days" },
      { label: "Max bet", value: "₹500" },
      { label: "Max cashout", value: "5x bonus" },
      { label: "Forfeit", value: "On cash withdrawal" },
    ],
    winnings: "Winnings → cash, stake vanishes",
    weightings: [
      { label: "Max bonus", value: 100 },
      { label: "Roulette", value: 100 },
      { label: "Blackjack", value: 100 },
			{ label: "Sports", value:  100 },
			{ label: "Live Casino", value:  100 },
			
			
    ],
  },
  {
    id: 2,
    category: "Deposit",
    name: "Reload Bonus",
    status: "Active",
    playersCount: 124,
    stats: [
      { label: "Match", value: "50%" },
      { label: "Max bonus", value: "₹5,000" },
      { label: "Min deposit", value: "1000" },
      { label: "Wagering", value: "3x bonus" },
      { label: "Expiry", value: "7 days" },
      { label: "Max bet", value: "₹1000" },
      { label: "Max cashout", value: "3x bonus" },
      { label: "Forfeit", value: "On cash withdrawal" },
    ],
    winnings: "Winnings + cash, stake vanishes",
    weightings: [
      { label: "Slots", value: 100 },
      { label: "Roulette", value: 100 },
      { label: "Blackjack", value: 100 },
      { label: "Sports", value: 100 },
      { label: "Live Casino", value: 100 }
    ],
  },
  {
    id: 3,
    category: "Deposit",
    name: "Weekly Cashback",
    status: "Active",
    playersCount: 124,
    stats: [
      { label: "Match", value: "10%" },
      { label: "Max bonus", value: "₹25,000" },
      { label: "Min deposit", value: "-" },
      { label: "Wagering", value: "1x bonus" },
      { label: "Expiry", value: "7 Days" },
      { label: "Max bet", value: "₹No limit" },
      { label: "Max cashout", value: "No cap" },
      { label: "Forfeit", value: "None" },
    ],
    winnings: "Winnings + cash, stake vanishes",
    weightings: [
      { label: "Slots", value: 100 },
      { label: "Roulette", value: 100 },
      { label: "Blackjack", value: 100 },
      { label: "Sports", value: 100 },
      { label: "Live Casino", value: 100 }
    ],
  },
  {
    id: 4,
    category: "Deposit",
    name: "VIP Loss Recovery",
    status: "Active",
    playersCount: 164,
    stats: [
      { label: "Match", value: "15%" },
      { label: "Max bonus", value: "₹50,000" },
      { label: "Min deposit", value: "-" },
      { label: "Wagering", value: "2x bonus" },
      { label: "Expiry", value: "14 Days" },
      { label: "Max bet", value: "₹5000" },
      { label: "Max cashout", value: "No cap" },
      { label: "Forfeit", value: "None" },
    ],
    winnings: "Winnings + cash, stake vanishes",
    weightings: [
      { label: "Slots", value: 100 },
      { label: "Roulette", value: 100 },
      { label: "Blackjack", value: 100 },
      { label: "Sports", value: 100 },
      { label: "Live Casino", value: 100 }
    ],
  },
  {
    id: 5,
    category: "Deposit",
    name: "First Deposit 200%",
    status: "Active",
    playersCount: 164,
    stats: [
      { label: "Match", value: "200%" },
      { label: "Max bonus", value: "₹20,000" },
      { label: "Min deposit", value: "500" },
      { label: "Wagering", value: "8x bonus" },
      { label: "Expiry", value: "30 Days" },
      { label: "Max bet", value: "₹300" },
      { label: "Max cashout", value: "5x bonus" },
      { label: "Forfeit", value: "On cash withdrawal" },
    ],
    winnings: "Winnings + cash, stake vanishes",
    weightings: [
      { label: "Slots", value: 100 },
      { label: "Roulette", value: 100 },
      { label: "Blackjack", value: 100 },
      { label: "Sports", value: 100 },
      { label: "Live Casino", value: 100 }
    ],
  },
];

function BonusTemplatesTab() {
  return (
    <div className="mt-3 space-y-6">
      {bonusTemplates.map((template) => (
        <div
          key={template.id}
          className="overflow-hidden rounded-[12px]  bg-white"
        >
          <div className="flex flex-wrap rounded-t-[12px] border-b border-[#CDCDCD] bg-white py-2">
            {/* LEFT SIDE */}
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-[22px] items-center justify-center rounded-[17px] border border-[#E5E7EB] bg-[#F2F2F2] px-[13px] gap-[10px] px-[14px] py-[2px] ml-4 text-[13px] font-normal text-[#1F232B] tracking-[-0.55px] font-[Geist]">
                {template.category}
              </span>

              <h3 className=" text-[#1F232B] font-geist text-[15px] font-semibold leading-[30.25px] tracking-[-0.55px]">
                {template.name}
              </h3>
            </div>

            {/* STATUS + PLAYERS (push to right) */}
            <div className="flex items-center gap-3 ml-auto mr-5">
              <span className="flex h-[22px] items-center rounded-[17px] bg-[#E1FFE0] px-[14px] text-[13px] font-[Geist] font-normal text-[#4B9B48] leading-[24px] tracking-[-0.55px]">
                {template.status}
              </span>

              <p className="text-[13px] font-normal text-[#1F232B] whitespace-nowrap font-[Geist] leading-[30.25px] tracking-[-0.55px]">
                {template.playersCount} Players
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#4B5563]"
              aria-label={`Edit ${template.name}`}
            >
             <img
                src="/assets/images/apps/profile/Button [MuiButtonBase-root].svg"
                alt="dropdown"
                className="mr-4"
              />
            </button>
          </div>

          <div className="mx-auto flex w-[98%] overflow-x-auto rounded-t-[12px] border-b border-[#CDCDCD] bg-white -pb-2">
            {template.stats.map((stat) => (
              <div
                key={stat.label}
                className="w-1/2 sm:w-1/3 lg:w-1/4 px-4 py-3"
              >
                {/* VALUE */}
                <p className="truncate text-[15px] font-[Geist] font-semibold leading-[30.25px] text-[#1F232B]">
                  {typeof stat.value === "string"
                    ? stat.value.replace("Rs ", "\u20B9")
                    : stat.value}
                </p>

                {/* LABEL */}
                <p className="-mt-1 text-[11px] font-normal font-[Geist] self-stretch lleading-[20px] text-[#767E88] tracking-[-0.55px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-1 grid lg:grid-cols-[0.95fr_1.65fr]">
            <div className="border-b border-[#EAECEF] px-4 py-4 ">
              <p className="text-[10px] font-normal leading-[20px] text-[#767E88] tracking-[-0.55px] font-[Geist]">
                Winning Distribution
              </p>
              <p className="-mt-2 text-[14px] font-semibold leading-[30.25px] font-[Geist] text-[#1F232B]">
                {template.winnings}
              </p>
            </div>

            <div className="px-4 py-4">
              <p className="self-stretch text-[#1F232B] font-[Geist] text-[14px] font-semibold leading-[20px] tracking-[-0.55px]">
                Game Weighting
              </p>

              <div className="mt-3 space-y-2.5">
                {template.weightings.map((weighting) => (
                  <div
                    key={weighting.label}
                    className="grid grid-cols-[1fr_minmax(120px,1.25fr)_44px] items-center gap-3 border-b border-[#E5E7EB] pb-1"
                  >
                    <p className="-mt-1 text-[#767E88] font-[Geist] text-[11px] font-normal leading-[20px] tracking-[-0.55px]">
                      {weighting.label}
                    </p>

                    <div className=" ml-28 w-[220px] h-[7px] bg-[#D9D9D9] rounded-[20px] overflow-hidden">
                      <div
                        className="w-[90%] h-full bg-[#1566C0] rounded-[20px]"
                        style={{ width: `${weighting.value}%` }}
                      />
                    </div>

                    <p className="text-right text-[#1F232B] font-[Geist] text-[11px] font-semibold leading-[20px] tracking-[-0.55px]">
                      {weighting.value}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BonusTemplatesTab;
