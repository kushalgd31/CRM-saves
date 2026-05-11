"use client";

import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import { type SyntheticEvent, useMemo, useState } from "react";
import ProfileHeader from "./components/common/ProfileHeader";
import ActivitiesTab from "./components/tabs/ActivitiesTab";
import BasicDetailsTab from "./components/tabs/BasicDetailsTab";
import DailySummaryTab from "./components/tabs/DailySummaryTab";
import FinancialDetailsTab from "./components/tabs/FinancialDetailsTab";
import NotesTab from "./components/tabs/NotesTab";
import PermissionTab from "./components/tabs/PermissionTab";
import ReferralsTab from "./components/tabs/ReferralsTab";
import TasksTab from "./components/tabs/TasksTab";
import TransactionsTab from "./components/tabs/TransactionsTab";
import { profileHeader, tabs } from "./data/profileData";
import type { TabValue } from "./types";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.vars.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.vars.palette.divider,
    "& > .container": {
      maxWidth: "100% !important",
    },
  },
}));

export default function ProfileAppView() {
  const [selectedTab, setSelectedTab] = useState<TabValue>("basic-details");

  function handleTabChange(_event: SyntheticEvent, value: TabValue) {
    setSelectedTab(value);
  }

  const tabContent = useMemo(() => {
    switch (selectedTab) {
      case "basic-details":
        return <BasicDetailsTab />;
      case "financials":
        return <FinancialDetailsTab />;
      case "activities":
        return <ActivitiesTab />;
      case "transactions":
        return <TransactionsTab />;
      case "tasks":
        return <TasksTab />;
      case "notes":
        return <NotesTab />;
      case "permission":
        return <PermissionTab />;
      case "referrals":
        return <ReferralsTab />;
      case "daily-summary":
        return <DailySummaryTab />;
      default:
        return null;
    }
  }, [selectedTab]);

  return (
    <Root
      header={
        <ProfileHeader
          profileHeader={profileHeader}
          selectedTab={selectedTab}
          tabs={tabs}
          onTabChange={handleTabChange}
        />
      }
      content={<div className="w-full  p-4 sm:p-6">{tabContent}</div>}
      scroll="page"
    />
  );
}
