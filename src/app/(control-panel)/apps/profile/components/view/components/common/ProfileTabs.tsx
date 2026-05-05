import { Tabs, Tab } from "@mui/material";
import type { SyntheticEvent } from "react";
import type { TabItem, TabValue } from "../../types";

export default function ProfileTabs({
  selectedTab,
  tabs,
  onChange,
}: {
  selectedTab: TabValue;
  tabs: TabItem[];
  onChange: (event: SyntheticEvent, value: TabValue) => void;
}) {
  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .Mui-selected": {
            color: "#1F232B",
            fontFamily: "Geist, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: "16.25px",
            letterSpacing: "0.122px",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#fff",
            height: "2px",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
    </div>
  );
}
