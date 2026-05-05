function BasicsTab() {
  return (
    <div className="space-y-5">
      <section className=" p-4">
        <h3 className="self-stretch text-[#1F232B] font-[Geist] text-[16px] font-semibold leading-[22.286px] tracking-[0.122px]">
          Bonus Type
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              title: "Deposit Bonus",
              subtitle: "Match% on deposit",
              active: true,
            },
            { title: "Losing Bonus", subtitle: "Match% on deposit" },
            { title: "Free Bet", subtitle: "Match% on deposit" },
            { title: "Referral", subtitle: "Match% on deposit" },
          ].map((item) => (
            <button
              key={item.title}
              type="button"
              className={`flex  flex-col items-start gap-[10px] p-[10px] rounded-[6px] border border-[#1566C0] bg-[#E9F3FF] ${
                item.active
                  ? "border-[#1566C0] bg-[#E9F3FF]"
                  : "border-[#E5E7EB] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <p
                className={`w-full text-center text-[11px] font-semibold ${
                  item.active
                    ? "text-[#1566C0] font-[Geist] leading-[22.286px] tracking-[0.122px]"
                    : "text-[#1F232B] leading-[22.286px] tracking-[0.122px]"
                }`}
              >
                {item.title}
              </p>
              <p className=" text-[10px] text-[#6B7280] text-center font-[Geist] font-normal leading-[22.286px] tracking-[0.122px] w-full">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="p-5">
  <h3 className="mb-4 text-[#1F232B] font-[Geist] text-[16px] font-semibold leading-[22.286px] tracking-[0.122px]">
    Configuration
  </h3>

  <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
    <div>
      <label className="mb-1 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
        Template name
      </label>
      <input
        type="text"
        defaultValue="Weekend reload bonus"
        className="h-[43px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[14px] font-normal leading-[22.286px] tracking-[0.122px] outline-none focus:border-[#1566C0]"
      />
    </div>

    <div>
      <label className="mb-1 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
        Match percentage
      </label>
      <input
        type="number"
        defaultValue={75}
        className="h-[43px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[14px] font-normal leading-[22.286px] tracking-[0.122px] outline-none focus:border-[#1566C0]"
      />
      <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[11px] font-normal leading-[14px] tracking-[0.122px]">
        % of deposit added on non-cash
      </p>
    </div>

    <div>
      <label className="mb-1 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
        Minimum deposit
      </label>
      <input
        type="number"
        defaultValue={500}
        className="h-[43px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[14px] font-normal leading-[22.286px] tracking-[0.122px] outline-none focus:border-[#1566C0]"
      />
    </div>

    <div>
      <label className="mb-1 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
        Maximum bonus (cap)
      </label>
      <input
        type="text"
        defaultValue="7/500"
        className="h-[43px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[14px] font-normal leading-[22.286px] tracking-[0.122px] outline-none focus:border-[#1566C0]"
      />
      <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[11px] font-normal leading-[14px] tracking-[0.122px]">
        Max non-cash credited per deposit
      </p>
    </div>

    <div>
      <label className="mb-1 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
        Wagering multiplier
      </label>
      <input
        type="number"
        defaultValue={5}
        className="h-[43px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[14px] font-normal leading-[22.286px] tracking-[0.122px] outline-none focus:border-[#1566C0]"
      />
      <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[11px] font-normal leading-[14px] tracking-[0.122px]">
        Player must wager 5x bonus amount
      </p>
    </div>

    <div>
      <label className="mb-1 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
        Expiry period
      </label>
      <select className="h-[43px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[14px] font-normal leading-[22.286px] tracking-[0.122px] outline-none focus:border-[#1566C0]">
        <option>14 days</option>
        <option>30 days</option>
        <option>60 days</option>
      </select>
    </div>
  </div>
</section>

      <section className="p-4  border-b border-[#D7D7D7] ">
        <h3 className="self-stretch text-[#1F232B] font-[Geist] text-[16px] font-semibold leading-[22.286px] tracking-[0.122px]">Limits</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
              Max bet while bonus active
            </label>
            <input
              type="number"
              defaultValue={500}
              className="h-10 w-full rounded-[8px] border border-[#D1D5DB] px-3 text-[12px] text-[#111827] outline-none transition focus:border-[#93C5FD]"
            />
            <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[11px] font-normal leading-[14px] tracking-[0.122px]">
             Prevents single bts to game wagering
            </p>
          </div>

          <div>
            <label className="mb-1.5 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
              Max cashout from bonus
            </label>
            <select className="h-10 w-full rounded-[8px] border border-[#D1D5DB] bg-white px-3 text-[12px] text-[#111827] outline-none transition focus:border-[#93C5FD]">
              <option>5x bonus amount</option>
              <option>10x bonus amount</option>
              <option>No cap</option>
            </select>
          </div>
        </div>
      </section>

      <section className=" p-4">
        <h3 className="self-stretch text-[#1F232B] font-[Geist] text-[16px] font-semibold leading-[22.286px] tracking-[0.122px]">
          Eligibility
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
              Player segments
            </label>
            <select className="h-10 w-full rounded-[8px] border border-[#D1D5DB] bg-white px-3 text-[12px] text-[#111827] outline-none transition focus:border-[#93C5FD]">
              <option>All players</option>
              <option>New players</option>
              <option>VIP players</option>
            </select>
            <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[11px] font-normal leading-[14px] tracking-[0.122px]">
              Prevents single bts to game wagering
            </p>
          </div>

          <div>
            <label className="mb-1.5 block self-stretch text-[#1F232B] font-[Poppins] text-[14px] font-medium">
              Max claims per player
            </label>
            <select className="h-10 w-full rounded-[8px] border border-[#D1D5DB] bg-white px-3 text-[12px] text-[#111827] outline-none transition focus:border-[#93C5FD]">
              <option>Once per day</option>
              <option>Once per week</option>
              <option>Unlimited</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BasicsTab;
