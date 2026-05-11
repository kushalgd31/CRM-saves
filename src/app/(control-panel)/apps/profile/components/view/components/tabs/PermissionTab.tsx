"use client";

import Typography from "@mui/material/Typography";
import { useState } from "react";
import { permissions, playerSettings } from "../../data/profileData";
import type { PermissionItem } from "../../types";

export default function PermissionTab() {
  const [permissionItems, setPermissionItems] = useState<PermissionItem[]>(
    () =>
      permissions.map((item) => ({
        ...item,
        children: item.children?.map((child) => ({ ...child })),
      }))
  );

  const togglePermission = (permissionIndex: number) => {
    setPermissionItems((currentItems) =>
      currentItems.map((item, index) => {
        if (index !== permissionIndex) {
          return item;
        }

        const nextEnabled = !item.enabled;

        return {
          ...item,
          enabled: nextEnabled,
          children: item.children?.map((child) => ({
            ...child,
            enabled: nextEnabled,
          })),
        };
      })
    );
  };

  const toggleChildPermission = (
    permissionIndex: number,
    childIndex: number
  ) => {
    setPermissionItems((currentItems) =>
      currentItems.map((item, index) => {
        if (index !== permissionIndex || !item.children) {
          return item;
        }

        const nextChildren = item.children.map((child, currentChildIndex) =>
          currentChildIndex === childIndex
            ? { ...child, enabled: !child.enabled }
            : child
        );

        return {
          ...item,
          enabled: nextChildren.every((child) => child.enabled),
          children: nextChildren,
        };
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full rounded-[12px] border border-[#E6ECF2] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <Typography className="text-[#1F232B] font-poppins text-[13px] font-semibold leading-normal">
          Permissions
        </Typography>

        <div className="mt-4 space-y-2">
          {permissionItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[6px] border border-[#E5E7EB] bg-white"
            >
              <div className="flex items-center justify-between px-4 py-[9px]">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[10px] text-[13px] leading-none text-[#6B7280]">
                    {">"}
                  </span>
                  <Typography className="text-[#1F232B] font-geist text-[12px] font-medium leading-[16.25px] tracking-[0.122px]">
                    {item.name}
                  </Typography>
                </div>

                <button
                  type="button"
                  aria-pressed={item.enabled}
                  onClick={() => togglePermission(index)}
                  className={`relative h-[14px] w-[26px] rounded-full ${
                    item.enabled ? "bg-[#45B26B]" : "bg-[#D1D5DB]"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-white transition-all ${
                      item.enabled ? "right-[2px]" : "left-[2px]"
                    }`}
                  ></span>
                </button>
              </div>

              {item.children && (
                <div className="border-t border-[#E5E7EB] px-4 py-1.5">
                  {item.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      className="flex items-center justify-between py-[6px] pr-[10px]"
                    >
                      <div className="flex items-center gap-2 pl-3">
                        <span className="text-[13px] text-[#6B7280]">
                          {"•"}
                        </span>
                        <Typography className="text-[#1F232B] font-poppins text-[13px] font-medium leading-normal">
                          {child.name}
                        </Typography>
                      </div>

                      <button
                        type="button"
                        aria-pressed={child.enabled}
                        onClick={() => toggleChildPermission(index, childIndex)}
                        className={`relative h-[14px] w-[26px] rounded-full gap-[10px]  ${
                          child.enabled ? "bg-[#45B26B]" : "bg-[#D1D5DB]"
                        }`}
                      >
                        <span
                          className={`absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-white transition-all ${
                            child.enabled ? "right-[2px]" : "left-[2px]"
                          }`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full rounded-[12px] border border-[#E6ECF2] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Typography className="text-[#1F232B] font-geist text-[13px] font-medium leading-[24px] tracking-[-0.4px]">
              Player Settings
            </Typography>

            <div className="flex items-center gap-2">
              <Typography className="text-[#6B7280] font-poppins text-[11px] font-medium leading-normal">
                Filter By Type:
              </Typography>

              <select className="w-[96px] h-[30px] rounded-[8px] border border-[#BDBEBF] bg-[rgba(255,255,255,0.06)] px-[12px] text-[11px] text-[#1F232B] outline-none">
                <option>Player</option>
                
              </select>
            </div>
          </div>
        </div>

        <Typography className="-mt-1 text-[#6B7280] font-poppins text-[11px] font-normal leading-normal">
          1 pending, 4 completed
        </Typography>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-[#E0E0E0]">
                {["Type", "Value", "Updated At", "Action"].map((head) => (
                  <th
                    key={head}
                    className="py-3 pl-40  text-left text-[#1F232B] font-poppins text-[12px] font-medium leading-normal"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {playerSettings.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E0E0E0] last:border-b-0"
                >
                  <td className="py-2.5 pl-40 text-[#1F232B] font-poppins text-[11px] font-normal leading-normal ">
                    {item}
                  </td>
                  <td className="py-2.5 pl-40 text-[#1F232B] font-poppins text-[11px] font-normal leading-normal">
                    Not Set
                  </td>
                  <td className="py-2.5 pl-40 text-[#1F232B] font-poppins text-[11px] font-normal leading-normal">
                    NA
                  </td>
                  <td className="py-2.5 pl-40 text-[#1F232B] font-poppins text-[11px] font-normal leading-none">
  ...
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
