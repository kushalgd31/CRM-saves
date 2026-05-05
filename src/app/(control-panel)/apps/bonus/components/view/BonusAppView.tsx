"use client";

import { useState } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import ActiveBonusesTab from "./components/ActiveBonusesTab";
import BonusTemplatesTab from "./components/BonusTemplatesTab";
import CreateBonusDrawer from "./components/CreateBonusDrawer";
import HistoryTab from "./components/HistoryTab";

const stats = [
  {
    title: "Active Bonus",
    value: "342",
    subtitle: "Across 281 Players",
    color: "#1F232B",
  },
  {
    title: "Non-cash in Play",
    value: "₹18.6L",
    subtitle: "Total Bonus Balance",
    color: "#16A34A",
  },
  {
    title: "Converted to cash(MTD)",
    value: "₹3.2L",
    subtitle: "Wagering completed",
    color: "#1F232B",
  },
  {
    title: "Expired/forfeited",
    value: "₹6.2L",
    subtitle: "Rs 3.8L outstanding",
    color: "#1F232B",
  },
  {
    title: "Bonus Cost Ratio",
    value: "8.9%",
    subtitle: "Bonus / Deposits",
    color: "#1F232B",
  },
];

const tabs = ["Bonus Templates", "Active Bonuses", "History"] as const;

function BonusAppView() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof tabs)[number]>("Bonus Templates");
  const [openCreateBonus, setOpenCreateBonus] = useState(false);

  const renderTabContent = () => {
    if (selectedTab === "Active Bonuses") {
      return <ActiveBonusesTab />;
    }

    if (selectedTab === "History") {
      return <HistoryTab />;
    }

    return <BonusTemplatesTab />;
  };
  return (

    <FusePageSimple
      content={
        <div className="w-full px-4 pt-4 pb-6 md:px-8">
          <h1 className="mb-6 text-[#1F232B] font-geist text-[30px] font-semibold not-italic leading-[30.25px] tracking-[-0.55px]">
            Bonus Management
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((item) => (
              <div
                key={item.title}
                className="h-[197px] rounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-5 "
              >
                <p className="text-[#4B5563] font-geist text-[14px] font-medium not-italic leading-[24px] tracking-[-0.35px]">
                  {item.title}
                </p>

                <h2
                  className="mt-7 text-center text-[40px] font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </h2>

                <p className="mt-7 text-center text-[#4B5563] font-geist text-[13px] font-normal not-italic leading-[19.5px] tracking-[0.122px]">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-b border-[#BFC7D5]">
            <div className="grid grid-cols-3 text-center">
              {tabs.map((tab) => {
                const isActive = selectedTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedTab(tab)}
                    className={`pb-3 text-[16px] ${
                      isActive
                        ? "border-b-2 border-[#1566C0] font-semibold text-[#1566C0] font-poppins"
                        : "font-medium text-[#1F232B]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 items-end gap-[24px] md:grid-cols-[1.2fr_1.2fr_1.2fr_auto_auto]">
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[#1F232B] font-poppins ">
                Search
              </label>
              <input
                type="text"
                placeholder="Search Whitelabel"
                className="flex h-[43px] w-full flex-col items-start gap-[10px] py-[13px] pr-[16px] pb-[12px] pl-[15px] rounded-[8px] border border-[#B1BAC8] bg-white"
              />
            </div>

            <div className="relative">
              <label className="mb-2 block text-[14px] font-medium text-[#1F232B] font-poppins">
                Status
              </label>

              <select className="flex h-[43px] w-full appearance-none rounded-[8px] border border-[#B1BAC8] bg-white py-[12px] pl-[15px] pr-[40px] text-[14px] text-[#1F232B] outline-none">
                <option>Name...</option>
              </select>

              {/* Icon */}
              <img
                src="/assets/images/apps/profile/Vector (8).svg"
                alt="dropdown"
                className="pointer-events-none absolute right-3 top-[38px] h-4 w-4"
              />
            </div>

            <div className="relative">
              <label className="mb-2 block text-[14px] font-medium text-[#1F232B] font-poppins">
                Status
              </label>

              <select className="flex h-[43px] w-full appearance-none rounded-[8px] border border-[#B1BAC8] bg-white py-[12px] pl-[15px] pr-[40px] text-[14px] text-[#1F232B] outline-none">
                <option>Name...</option>
              </select>

            
              <img
                src="/assets/images/apps/profile/Vector (8).svg"
                alt="dropdown"
                className="pointer-events-none absolute right-3 top-[38px] h-4 w-4"
              />
            </div>

            <button className="h-[43px] rounded-[8px] border border-[#1566C0] bg-[linear-gradient(180deg,rgba(48,48,48,0)_63.53%,rgba(255,255,255,0.15)_100%)] px-6 text-black font-geist text-[13px] font-medium leading-[13px] tracking-[0.122px]">
              Reset Filter
            </button>

            <button
              type="button"
              onClick={() => setOpenCreateBonus(true)}
              className="h-[43px] rounded-[8px] bg-black px-6 text-[13px] font-semibold text-white"
            >
              + Create Template
            </button>
          </div>

          {renderTabContent()}

          <CreateBonusDrawer
            open={openCreateBonus}
            onClose={() => setOpenCreateBonus(false)}
          />
        </div>
      }
    />
  );
}

export default BonusAppView;
