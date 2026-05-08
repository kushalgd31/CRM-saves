import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import InfoRow from "../common/InfoRow";
import SectionTitle from "../common/SectionTitle";
import {
  financialOtherDetails,
  financialPersonalDetails,
} from "../../data/profileData";

export default function FinancialDetailsTab() {
  return (
    <Paper className="relative w-fullrounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-6 shadow-none">
      <div className="mb-5 flex items-center justify-between">
        <Typography className="self-stretch text-[#1F232B] font-poppins text-[14px] font-semibold leading-normal">
          Financial Details
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Box>
          <SectionTitle>Personal Details</SectionTitle>
          {financialPersonalDetails.map((item, index) => (
            <InfoRow
              key={`${item.label}-${index}`}
              label={item.label}
              value={item.value}
            />
          ))}
        </Box>

        <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-gray-200 lg:block"></div>

        <Box>
          <SectionTitle>Other Details</SectionTitle>
          {financialOtherDetails.map((item, index) => (
            <InfoRow
              key={`${item.label}-${index}`}
              label={item.label}
              value={item.value}
            />
          ))}
        </Box>
      </div>
    </Paper>
  );
}
