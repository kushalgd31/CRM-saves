"use client";
  
import { Box, Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import InfoRow from "../common/InfoRow";
import SectionTitle from "../common/SectionTitle";
import DeviceHistoryDrawer from "../drawers/DeviceHistoryDrawer";
import LastSigninIpHistoryDrawer from "../drawers/LastSigninIpHistoryDrawer";
import OsHistoryDrawer from "../drawers/OsHistoryDrawer";
import {
  basicDetailsOtherDetails,
  deviceHistory,
  getBasicDetailsPersonalDetails,
  lastSigninIpHistory,
  osHistory,
} from "../../data/profileData";

export default function BasicDetailsTab() {
  const [isLastSigninIpDrawerOpen, setIsLastSigninIpDrawerOpen] =
    useState(false);
  const [isDeviceDrawerOpen, setIsDeviceDrawerOpen] = useState(false);
  const [isOsDrawerOpen, setIsOsDrawerOpen] = useState(false);

  const personalDetails = useMemo(
    () =>
      getBasicDetailsPersonalDetails({
        onOpenLastSigninIpDrawer: () => setIsLastSigninIpDrawerOpen(true),
        onOpenDeviceDrawer: () => setIsDeviceDrawerOpen(true),
        onOpenOsDrawer: () => setIsOsDrawerOpen(true),
      }),
    []
  );

  return (
    <>
    <div className="-mt-2">
      <Paper className="relative w-full  rounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-4 shadow-none ">
        <div className="mb-4 ml-1 flex items-center justify-between">
          <Typography className="text-[#1F232B] font-poppins text-[13px] font-semibold leading-normal mt-1">
            Basic Details
          </Typography>

          <Button
            size="small"
            variant="text"
            sx={{
              ml: "-8px",
              color: "#1566C0",
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              textTransform: "none",
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationSkipInk: "auto",
              textDecorationThickness: "auto",
              textUnderlineOffset: "auto",
              textUnderlinePosition: "from-font",
              minWidth: "auto",
              padding: 0,
            }}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Box>
            <SectionTitle>Personal Details</SectionTitle>
            {personalDetails.map((item, index) => (
              <InfoRow
                key={`${item.label}-${index}`}
                label={item.label}
                value={item.value}
              />
            ))}
          </Box>

          <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-gray-200 lg:block -ml-0"></div>

          <Box>
            <SectionTitle>Other Details</SectionTitle>
            {basicDetailsOtherDetails.map((item, index) => (
              <InfoRow
                key={`${item.label}-${index}`}
                label={item.label}
                value={item.value}
              />
            ))}
          </Box>
        </div>
      </Paper>
      </div>

      <LastSigninIpHistoryDrawer
        open={isLastSigninIpDrawerOpen}
        onClose={() => setIsLastSigninIpDrawerOpen(false)}
        history={lastSigninIpHistory}
      />

      <DeviceHistoryDrawer
        open={isDeviceDrawerOpen}
        onClose={() => setIsDeviceDrawerOpen(false)}
        history={deviceHistory}
      />

      <OsHistoryDrawer
        open={isOsDrawerOpen}
        onClose={() => setIsOsDrawerOpen(false)}
        history={osHistory}
      />
    </>
  );
}
