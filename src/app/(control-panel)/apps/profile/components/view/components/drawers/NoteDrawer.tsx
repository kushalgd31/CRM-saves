"use client";

import Typography from "@mui/material/Typography";
import { createPortal } from "react-dom";

export default function NoteDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[1400] flex justify-end bg-[rgba(17,24,39,0.45)]">
      <button
        aria-label="Close note details"
        className="flex-1 cursor-default"
        onClick={onClose}
      />

      <div className="flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-8px_0_24px_rgba(15,23,42,0.12)]">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
          <Typography className="text-[#1F232B] font-poppins text-[14px] font-semibold">
            Create New Notes
          </Typography>

          <button onClick={onClose} className="w-[15px] h-[15px] shrink-0 aspect-square">
            <img src="/assets/images/apps/profile/vector.svg" alt="vector" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div>
            <Typography className="mb-1.5 self-stretch text-[#1F232B] font-poppins text-[14px] font-medium">
              Notes
            </Typography>
            <textarea
              placeholder="Name..."
              className="min-h-[131px] w-full resize-none rounded-lg border border-[#B1BAC8] bg-white px-3 py-2 text-[12px] text-[#1F232B] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div className=" px-4 py-4">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="flex w-[231.5px] px-[10px] py-[11px] justify-center items-center gap-[10px] rounded-lg border border-[#1566C0] bg-white text-[#2D3E55] font-poppins text-[14px] font-medium"
            >
              Cancel
            </button>

            <button
              onClick={onClose}
              className="flex w-[231.5px] px-[10px] py-[11px] justify-center items-center gap-[10px] rounded-lg bg-[#1566C0] text-white font-poppins text-[14px] font-medium"
            >
              + Create Note
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
