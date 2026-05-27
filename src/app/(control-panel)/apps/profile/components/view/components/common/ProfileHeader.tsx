import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { type SyntheticEvent } from "react";
import ProfileTabs from "./ProfileTabs";
import type { ProfileHeaderData, TabItem, TabValue } from "../../types";

export default function ProfileHeader({
  profileHeader,
  selectedTab,
  tabs,
  onTabChange,
}: {
  profileHeader: ProfileHeaderData;
  selectedTab: TabValue;
  tabs: TabItem[];
  onTabChange: (event: SyntheticEvent, value: TabValue) => void;
}) {
  return (
    <div className="bg-white w-full h-[150px] ml-[44px]">
      <div className="flex w-[1464px] flex-col items-start gap-4">
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="mt-[14px] flex items-center gap-[14px]">
            <Avatar
              src={profileHeader.avatar}
              alt="User avatar"
              className="h-[75px] w-[75px] rounded-full"
            />

            <div className="flex items-center gap-8">
              <div className="space-y-1">
                <Typography className="self-stretch text-[#1F232B] font-poppins text-sm font-semibold">
                  {profileHeader.name}
                </Typography>
                <Typography className="text-[#4B5563] font-poppins text-xs font-medium ">
                  {profileHeader.location}
                </Typography>
              </div>

              <div className="space-y-1">
                <Typography className="text-[#1F232B] font-poppins text-sm font-medium">
                  {profileHeader.phone}
                </Typography>
                <Typography className="text-[#4B5563] font-poppins text-xs font-medium">
                  Phone No.
                </Typography>
              </div>

              <div className="space-y-1">
                <Typography className="text-[#1F232B] font-poppins text-sm font-medium">
                  {profileHeader.email}
                </Typography>
                <Typography className="text-[#4B5563] font-poppins text-xs font-medium">
                  Email
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <ProfileTabs
          selectedTab={selectedTab}
          tabs={tabs}
          onChange={onTabChange}
        />
      </div>
    </div>
  );
}
