"use client";

import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { notesTimelineSections } from "../../data/profileData";
import NoteDrawer from "../drawers/NoteDrawer";

export default function NotesTab() {
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);

  return (
    <>
      <Paper className="relative w-full rounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10) p-6 shadow-none">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
            Notes
          </Typography>

          <button
            onClick={() => setIsNoteDrawerOpen(true)}
            className="inline-flex items-center justify-center gap-[10px] rounded-[4px] bg-[#1566C0] px-[10px] py-[8px] text-white font-poppins text-[14px] font-medium leading-normal"
          >
            + Create Note
          </button>
        </div>

        <div className="px-4 pb-4">
          {notesTimelineSections.map((section) => (
            <div key={section.title} className="pt-5 first:pt-1">
              <Typography className="text-[#4B5563] font-poppins text-[14px] font-semibold leading-normal uppercase">
                {section.title}
              </Typography>

              {section.items.map((item, index) => (
                <div key={index} className="mt-4 border-b border-[#E5E7EB] pb-3">
                  <Typography className="text-[#1F232B] font-poppins text-[12px] font-medium leading-normal">
                    {item.title}
                  </Typography>
                  <Typography className="mt-1 text-[#4B5563] font-poppins text-[12px] font-medium leading-normal">
                    {item.time}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Paper>

      <NoteDrawer
        open={isNoteDrawerOpen}
        onClose={() => setIsNoteDrawerOpen(false)}
      />
    </>
  );
}
