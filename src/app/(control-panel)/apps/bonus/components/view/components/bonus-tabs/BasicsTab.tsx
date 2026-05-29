function BasicsTab() {
  return (
    <div className="space-y-5">
      <section className=" p-1">
        <h3 className="self-stretch text-[#1F232B] font-[Geist] text-[14px] font-semibold leading-[22.286px] tracking-[0.122px]">
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
      className={`flex h-[50px] flex-col items-start gap-[4px] rounded-[6px] border p-[3px] ${
        item.active
          ? "border-[#1566C0] bg-[#E9F3FF]"
          : "border border-[#DADADA] bg-white "
      }`}
    >
      <p
        className={`w-full text-center font-[Geist] text-[12px] font-semibold leading-[22.286px] tracking-[0.122px] ${
          item.active
            ? "font-[Geist] text-[#1566C0]"
            : "text-[#1F232B]"
        }`}
      >
        {item.title}
      </p>

      <p className="-mt-1 w-full text-center font-[Geist] text-[11px] font-normal leading-[14px] text-[#6B7280]">
        {item.subtitle}
      </p>
    </button>
  ))}
</div>
      </section>

      <section className=" border-b border-[#D7D7D7] p-0 pb-3">
  <h3 className="-mt-2 mb-2 text-[#1F232B] font-[Geist] text-[14px] font-semibold leading-[22.286px] tracking-[0.122px]">
    Configuration
  </h3>

  <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
    <div>
      <label className="-mt-1 mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-semibold leading-normal">
        Template name
      </label>
      <input
        type="text"
        defaultValue="Weekend reload bonus"
        className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none "
      />
    </div>

    <div>
      <label className="-mt-1 mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
        Match percentage
      </label>
      <input
        type="number"
        defaultValue={75}
        className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none "
      />
      <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[10px] font-normal leading-[14px] tracking-[0.122px]">
        % of deposit added on non-cash
      </p>
    </div>

    <div>
      <label className="mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
        Minimum deposit
      </label>
      <input
        type="number"
        defaultValue={500}
        className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none "
      />
    </div>

    <div>
      <label className="mb-0 block self-stretch text-[#1F232B] font-[Poppins] font-[semibold] text-[13px] font-medium leading-normal">
        Maximum bonus (cap)
      </label>
      <input
        type="text"
        defaultValue="7/500"
        className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none "
      />
      <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[10px] font-normal leading-[14px] tracking-[0.122px]">
        Max non-cash credited per deposit
      </p>
    </div>

    <div>
      <label className="mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
        Wagering multiplier
      </label>
      <input
        type="number"
        defaultValue={5}
        className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none "
      />
      <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[10px] font-normal leading-[14px] tracking-[0.122px]">
        Player must wager 5x bonus amount
      </p>
    </div>

    <div>
      <label className="mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
        Expiry period
      </label>
      <select className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none">
        <option>14 days</option>
        <option>30 days</option>
        <option>60 days</option>
      </select>
    </div>
  </div>
</section>

      <section className="p-0  border-b border-[#D7D7D7] pb-3 ">
        <h3 className=" -mt-2 mb-2 self-stretch text-[#1F232B] font-[Geist] text-[14px] font-semibold leading-[22.286px] tracking-[0.122px]">Limits</h3>

        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="-mt-1 mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
              Max bet while bonus active
            </label>
            <input
              type="number"
              defaultValue={500}
              className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none"
            />
            <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[10px] font-normal leading-[14px] tracking-[0.122px]">
             Prevents single bts to game wagering
            </p>
          </div>

          <div>
            <label className="-mt-1 mb-0 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
              Max cashout from bonus
            </label>
            <select className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none">
              <option>5x bonus amount</option>
              <option>10x bonus amount</option>
              <option>No cap</option>
            </select>
          </div>
        </div>
      </section>

      <section className=" p-0">
        <h3 className="-mt-2 mb-2 self-stretch text-[#1F232B] font-[Geist] text-[14px] font-semibold leading-[22.286px] tracking-[0.122px]">
          Eligibility
        </h3>

        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="-mt-1 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
              Player segments
            </label>
            <select className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none">
              <option>All players</option>
              <option>New players</option>
              <option>VIP players</option>
            </select>
            <p className="mt-1 self-stretch text-[#4B5563] font-[Geist] text-[10px] font-normal leading-[14px] tracking-[0.122px]">
              Prevents single bts to game wagering
            </p>
          </div>

          <div>
            <label className="-mt-1 block self-stretch text-[#1F232B] font-[Poppins] text-[13px] font-medium leading-normal">
              Max claims per player
            </label>
            <select className="h-[35px] w-full rounded-[8px] border border-[#B1BAC8] bg-white px-[15px] text-[#1F232B] font-[Geist] text-[10px] font-normal leading-[22.286px] tracking-[0.122px] outline-none">
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
