"use client";

import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { simpleTimelineSections } from "../../data/profileData";
import TaskDrawer from "../drawers/TaskDrawer";

export default function TasksTab() {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  return (
    <>
    <div className="-mt-2">
      <Paper className="relative w-full rounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10) p-3 shadow-none ">
        <div className="flex items-center justify-between px-4 pt-4 pb-1">
          <Typography className="self-stretch text-[#1F232B] font-poppins text-[13px] font-semibold leading-normal">
            Tasks
          </Typography>

          <button
            onClick={() => setIsTaskDrawerOpen(true)}
            className="inline-flex h-8 items-center justify-center gap-[10px] rounded-[4px] bg-[#1566C0] px-[10px] py-[8px] text-white font-poppins text-[11px] font-medium leading-normal"
          >
            + Create Task
          </button>
        </div>

        <div className="px-4 pb-4">
          {simpleTimelineSections.map((section) => (
            <div key={section.title} className="pt-2 first:pt-1">
              <Typography className="text-[#4B5563] font-poppins text-[11px] font-semibold leading-normal uppercase">
                {section.title}
              </Typography>

              {section.items.map((item, index) => (
                <div key={index} className="mt-3 border-b border-[#E5E7EB] pb-3">
                  <Typography className="text-[#1F232B] font-poppins text-[10px] font-medium leading-normal">
                    {item.title}
                  </Typography>
                  <Typography className="mt-1 text-[#4B5563] font-poppins text-[10px] font-medium leading-normal">
                    {item.time}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Paper>
      </div>

      <TaskDrawer
        open={isTaskDrawerOpen}
        onClose={() => setIsTaskDrawerOpen(false)}
      />
    </>
  );
}
