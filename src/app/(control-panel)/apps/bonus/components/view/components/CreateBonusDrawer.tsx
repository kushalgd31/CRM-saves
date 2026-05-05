"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import BasicsTab from "./bonus-tabs/BasicsTab";
import GameWeighingTab from "./bonus-tabs/GameWeighingTab";
import PreviewTab from "./bonus-tabs/PreviewTab";
import WalletMechanicsTab from "./bonus-tabs/WalletMechanicsTab";

type CreateBonusDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const tabs = [
  "Basics",
  "Wallet Mechanics",
  "Game Weighing",
  "Preview",
] as const;

type TabKey = (typeof tabs)[number];

function CreateBonusDrawer({ open, onClose }: CreateBonusDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("Basics");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setActiveTab("Basics");
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [open]);

  const activeIndex = useMemo(
    () => tabs.findIndex((tab) => tab === activeTab),
    [activeTab]
  );

  const isLastTab = activeIndex === tabs.length - 1;

  const handleNext = () => {
    if (isLastTab) {
      return;
    }

    setActiveTab(tabs[activeIndex + 1]);
  };

  const renderContent = () => {
    if (activeTab === "Wallet Mechanics") {
      return <WalletMechanicsTab />;
    }

    if (activeTab === "Game Weighing") {
      return <GameWeighingTab />;
    }

    if (activeTab === "Preview") {
      return <PreviewTab />;
    }

    return <BasicsTab />;
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-300 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close create bonus drawer"
        onClick={onClose}
        className={`absolute inset-0 bg-[#111827]/55 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-[-16px_0_40px_rgba(15,23,42,0.18)] transition-transform duration-300 sm:w-[600px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-bonus-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-[#DADADA] bg-white px-[26px] py-[10px]">
          <h2
            id="create-bonus-drawer-title"
            className="text-[#1F232B] font-[Geist] text-[16px] font-bold leading-[22.286px] tracking-[0.122px]"
          >
            Create Bonus
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#111827]"
            aria-label="Close drawer"
          >
            <img src="/assets/images/apps/profile/vector.svg" alt="kkk" className="w-4 h-4" />
          </button>
        </div>

        <div className="border-b border-[#E5E7EB] px-3 pt-1">
          <div className="grid grid-cols-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`border-b px-3 py-4 text-center text-[16px] font-medium transition sm:text-[12px] font-[Geist] font-normal ${
                    isActive
                      ? "border-[#1566C0] text-[#1566C0]"
                      : "border-transparent text-[#D7D7D7] hover:text-[#1F232B]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#FAFBFC] px-4 py-4 sm:px-5">
          {renderContent()}
        </div>

        <div className=" px-4 py-4 sm:px-5">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex w-[264px] px-[10px] py-[11px] justify-center items-center gap-[10px] rounded-[8px] border border-[#1566C0] bg-white text-[#2D3E55] font-[Poppins] text-[14px] font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isLastTab}
              className={`flex w-[264px] px-[10px] py-[11px] justify-center items-center gap-[10px] rounded-[8px] bg-[#1566C0] text-white font-[Poppins] text-[14px] font-medium ${
                isLastTab
                  ? "cursor-not-allowed bg-[#93C5FD]"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}

export default CreateBonusDrawer;
