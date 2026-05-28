"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const stats = [
  { value: "3", label: "Total Banners", color: "#1F2937" },
  { value: "2", label: "Active Banners", color: "#16A34A" },
  { value: "81,479", label: "Total Impressions", color: "#2563EB" },
  { value: "2,582", label: "Total Clicks", color: "#9333EA" },
];

const banners = [
  {
    id: 1,
    title: "Welcome Bonus Banner",
    status: "active",
    media: "image",
    animation: "Fade In",
    duration: "5s",
    url: "https://example.com/promotions/welcome",
    impressions: "45,678",
    clicks: "1,234",
  },
  {
    id: 2,
    title: "Sports Betting Promo",
    status: "active",
    media: "video",
    animation: "Slide Left",
    duration: "8s",
    url: "https://example.com/sports",
    impressions: "23,456",
    clicks: "892",
  },
  {
    id: 3,
    title: "Casino Launch",
    status: "inactive",
    media: "image",
    animation: "Zoom In",
    duration: "6s",
    url: "https://example.com/casino",
    impressions: "12,345",
    clicks: "456",
  },
];

function IconButton({
  icon,
  className = "",
  disabled = false,
}: {
  icon: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`flex items-center justify-center rounded-[7px] border border-[#E5E7EB] bg-white text-[#111827] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <FuseSvgIcon size={13}>{icon}</FuseSvgIcon>
    </button>
  );
}

function TogglePill({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={onChange}
      className={`relative inline-flex h-[18px] w-[32px] items-center rounded-full transition ${
        checked ? "bg-[#111827]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`inline-block h-[14px] w-[14px] rounded-full bg-white transition ${
          checked ? "translate-x-[15px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

function CreateBannerDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [isBannerActive, setIsBannerActive] = useState(true);
  const [displayDuration, setDisplayDuration] = useState("5");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [open]);

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
        aria-label="Close create banner drawer"
        onClick={onClose}
        className={`absolute inset-0 bg-[rgba(17,24,39,0.45)] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-[490px] max-w-[585px] flex-col rounded-[10px] border-[0.625px] border-[rgba(0,0,0,0.10)] bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-banner-drawer-title"
      >
        <div className="flex items-start justify-between  px-5 py-4">
          <div>
            <h2
              id="create-banner-drawer-title"
              className="text-[#0A0A0A] font-geist text-[16px] font-semibold leading-[24px]"
            >
              Create New Banner
            </h2>
            <p className="mt-0 text-[#717182] font-poppins text-[11px] font-normal leading-[18px]">
              Upload media and configure banner settings
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-full text-[#667085] transition hover:bg-[#F3F4F6]"
            aria-label="Close drawer"
          >
            <FuseSvgIcon size={14}>lucide:x</FuseSvgIcon>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white px-5 -pt-7 pb-4">
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-[#0A0A0A] font-poppins text-[12px] font-medium leading-[18px]">
                Banner Title <span className="text-[#0A0A0A]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Welcome Bonus Banner"
                className="h-[30px] w-full rounded-[8px] border-[0.625px] border-[rgba(0,0,0,0)] bg-[#F3F3F5] px-2 text-[#717182] font-poppins text-[11px] font-normal leading-[18px] outline-none placeholder:text-[#98A2B3]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[#0A0A0A] font-poppins text-[12px] font-medium leading-[18px]">
                Media Upload <span className="text-[#0A0A0A]">*</span>
              </label>

              <div className="flex min-h-[126px] flex-col items-center justify-center rounded-[10px] border-[1.875px] border-dashed border-[#D1D5DC] px-4 py-6 text-center">
                <FuseSvgIcon size={34} className="text-[#98A2B3] w-[40px] h-[40px]">
                  lucide:upload
                </FuseSvgIcon>
                <p className="mt-3 text-[#4A5565] font-poppins text-[12px] font-normal leading-[18px]">
                  <span className="font-medium text-[#155DFC]">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="mt-1 text-[#98A2B3] font-poppins text-[10px] font-normal leading-[16px]">
                  PNG, JPG, GIF, MP4, WebM (Max 10MB)
                </p>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[#0A0A0A] font-poppins text-[12px] font-medium leading-[18px]">
                Animation Type
              </label>
              <div className="relative">
                <select className="h-[30px] w-full appearance-none rounded-[8px] border-[0.625px] border-[rgba(0,0,0,0)] bg-[#F3F3F5] px-3 text-[#0A0A0A] font-poppins text-[11px] font-normal leading-[18px] outline-none">
                  <option>Fade In</option>
                  <option>Slide Left</option>
                  <option>Zoom In</option>
                </select>
                <FuseSvgIcon
                  size={14}
                  className="pointer-events-none absolute right-3 top-[8px] text-[#98A2B3]"
                >
                  lucide:chevron-down
                </FuseSvgIcon>
              </div>
              <p className="mt-1 text-[#6A7282] font-poppins text-[10px] font-normal leading-[16px]">
                Smooth fade effect
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-[#0A0A0A] font-poppins text-[12px] font-medium leading-[18px]">
                Display Duration (seconds)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={displayDuration}
                  onChange={(event) => setDisplayDuration(event.target.value)}
                  className="h-[28px] w-[98px] rounded-[8px] border-[0.625px] border-transparent bg-[#F3F3F5] px-3 text-[#111827] font-poppins text-[11px] font-normal leading-[18px] outline-none"
                />
                <div className="flex items-center gap-1.5 text-[#4A5565] font-poppins text-[11px] font-normal leading-[18px]">
                  <FuseSvgIcon size={14}>lucide:clock-3</FuseSvgIcon>
                  {displayDuration || "0"} seconds per rotation
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[#0A0A0A] font-poppins text-[12px] font-medium leading-[18px]">
                Hyperlink URL <span className="text-[#0A0A0A]">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex h-[30px] w-[16px] items-center justify-center">
                  <img
                    src="/assets/images/apps/profile/Icon (1).svg"
                    alt="Link icon"
                    className="h-[14px] w-[14px]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/promotion"
                  className="h-[30px] flex-1 rounded-[8px] border-[0.625px] border-transparent bg-[#F3F3F5] px-3 text-[#717182] font-poppins text-[11px] font-normal leading-[18px] outline-none placeholder:text-[#98A2B3]"
                />
              </div>
              <p className="mt-1 text-[#6A7282] font-poppins text-[10px] font-normal leading-[16px]">
                Users will be redirected to this URL when clicking the banner
              </p>
            </div>

            <div className="flex items-center justify-between rounded-[10px] border-[0.625px] border-[#E5E7EB] px-4 py-3">
              <div>
                <p className="text-[#0A0A0A] font-poppins text-[12px] font-medium leading-[18px]">
                  Active Status
                </p>
                <p className="text-[#6A7282] font-poppins text-[10px] font-normal leading-[16px]">
                  Enable this banner to show on the site
                </p>
              </div>

              <TogglePill
                checked={isBannerActive}
                onChange={() => setIsBannerActive((current) => !current)}
              />
            </div>
          </div>
        </div>

        <div className=" px-5 py-4">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-[28px] items-center justify-center rounded-[8px] border-[0.625px] border-[rgba(0,0,0,0.10)] bg-white px-4 text-[#111827] font-poppins text-[12px] font-medium leading-[18px]"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex h-[28px] items-center justify-center rounded-[8px] bg-[#155DFC] px-4 text-[#FFF] font-poppins text-[12px] font-medium leading-[18px]"
            >
              Create Banner
            </button>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}

function BannerManagementAppView() {
  const [isCreateBannerOpen, setIsCreateBannerOpen] = useState(false);

  return (
    <>
      <FusePageSimple
        content={
          <div className="w-full bg-[#F8FAFC] px-6 py-6 pb-70">
            <div className="mx-auto w-full max-w-[1120px]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div >
                  <h1 className="text-[#1F2937] font-geist text-[19px] font-semibold leading-[28px]">
                    Banner Management
                  </h1>
                  <p className="mt-0 text-[#667085] font-poppins text-[11px] font-normal leading-[18px]">
                    Create and manage promotional banners with images or videos
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateBannerOpen(true)}
                  className="inline-flex h-[33px] items-center gap-2 self-start rounded-[9px] bg-[#2563EB] px-4 text-white font-poppins text-[12px] font-medium leading-[18px] shadow-[0_1px_2px_rgba(37,99,235,0.18)] mt-3"
                >
                  <FuseSvgIcon size={15}>lucide:plus</FuseSvgIcon>
                  Create Banner
                </button>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[14px] border border-[#E5E7EB] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                  >
                    <p
                      className="font-geist text-[21px] font-semibold leading-[28px] tracking-[-0.18px]"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </p>
                    <p className="text-[#667085] font-poppins text-[12px] font-normal leading-[18px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-5">
                {banners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="overflow-hidden rounded-[14px] border border-[#D9F0DE] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.06)]"
                  >
                    <div
                      className={`relative h-[146px] ${
                        banner.media === "video" ? "bg-black" : "bg-[#F5F7FB]"
                      }`}
                    >
                      <div className="absolute left-2 top-2 flex flex-col gap-1">
                        <IconButton
                          icon="lucide:arrow-up"
                          disabled={index === 0}
                          className="h-[20px] w-[20px] rounded-[8px] border-[0.625px] border-[rgba(0,0,0,0.10)] bg-white"
                        />
                        <IconButton
                          icon="lucide:arrow-down"
                          disabled={index === banners.length - 1}
                          className="h-[20px] w-[20px] rounded-[8px] border-[0.625px] border-[rgba(0,0,0,0.10)] bg-white"
                        />
                      </div>

                      <div className="absolute right-2 top-2 flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-2 py-[2px] font-poppins text-[9px] font-semibold capitalize leading-[14px] ${
                            banner.status === "active"
                              ? "bg-[#16A34A] text-white"
                              : "bg-[#4B5563] text-white"
                          }`}
                        >
                          {banner.status}
                        </span>
                        <IconButton
                          icon={
                            banner.media === "video"
                              ? "lucide:video"
                              : "lucide:image"
                          }
                          className="h-[18px] w-[18px] border-0 text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
                        />
                      </div>

                      {banner.media === "video" ? (
                        <div className="flex h-full items-center justify-center text-white">
                          <FuseSvgIcon size={36}>lucide:video</FuseSvgIcon>
                        </div>
                      ) : null}
                    </div>

                    <div className="px-5 py-5">
                      <h2 className="text-[#1F2937] font-[geist] text-[15px] font-semibold leading-[24px] tracking-[-0.25px]">
                        {banner.title}
                      </h2>

                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#667085] font-poppins text-[10px] font-normal leading-[16px]">
                          <FuseSvgIcon size={11}>lucide:play</FuseSvgIcon>
                          Animation: {banner.animation}
                        </div>

                        <div className="flex items-center gap-1.5 text-[#667085] font-poppins text-[10px] font-normal leading-[16px]">
                          <FuseSvgIcon size={11}>lucide:clock-3</FuseSvgIcon>
                          Duration: {banner.duration}
                        </div>

                        <div className="flex items-center gap-1.5 text-[#2563EB] font-poppins text-[10px] font-normal leading-[16px]">
                          <FuseSvgIcon size={11}>lucide:link-2</FuseSvgIcon>
                          {banner.url}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-[6px] bg-[#EEF4FF] px-3 py-2 text-center">
                          <p className="text-[#2563EB] font-geist text-[12px] font-semibold leading-[16px]">
                            {banner.impressions}
                          </p>
                          <p className="text-[#2563EB] font-poppins text-[10px] font-normal leading-[14px]">
                            Impressions
                          </p>
                        </div>
                        <div className="rounded-[6px] bg-[#F7F0FF] px-3 py-2 text-center">
                          <p className="text-[#9333EA] font-geist text-[12px] font-semibold leading-[16px]">
                            {banner.clicks}
                          </p>
                          <p className="text-[#9333EA] font-poppins text-[10px] font-normal leading-[14px]">
                            Clicks
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex h-[24px] flex-1 items-center justify-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white text-[#111827] font-poppins text-[11px] font-medium leading-[16px]"
                        >
                          <FuseSvgIcon size={13}>lucide:eye</FuseSvgIcon>
                          Preview
                        </button>

                        <IconButton
                          icon={
                            banner.media === "video"
                              ? "lucide:pause"
                              : "lucide:play"
                          }
                          className="h-[24px] w-[28px]"
                        />
                        <IconButton
                          icon="lucide:square-pen"
                          className="h-[24px] w-[28px]"
                        />
                        <IconButton
                          icon="lucide:trash-2"
                          className="h-[24px] w-[28px] border-[#FECACA] text-[#EF4444]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <CreateBannerDrawer
        open={isCreateBannerOpen}
        onClose={() => setIsCreateBannerOpen(false)}
      />
    </>
  );
}

export default BannerManagementAppView;
