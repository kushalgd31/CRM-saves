import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import DataTable from "src/components/data-table/DataTable";
import { referralColumns } from "../../columns/referralColumns";
import { referrals } from "../../data/profileData";

export default function ReferralsTab() {
  return (
    <Paper
      className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
      elevation={2}
    >
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold">
          Referrals
        </Typography>
      </div>

      <DataTable
        data={referrals}
        columns={referralColumns}
        enableRowActions={false}
        muiTableContainerProps={{
          className: "flex-auto",
          sx: {
            "& table": {
              minWidth: "1400px",
            },
          },
        }}
      />
    </Paper>
  );
}
