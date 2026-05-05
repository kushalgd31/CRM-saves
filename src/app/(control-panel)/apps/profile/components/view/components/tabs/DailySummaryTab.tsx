import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import DataTable from "src/components/data-table/DataTable";
import { dailySummaryColumns } from "../../columns/dailySummaryColumns";
import { dailySummary } from "../../data/profileData";

export default function DailySummaryTab() {
  return (
    <Paper
      className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
      elevation={2}
    >
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold">
          Daily Summary
        </Typography>
      </div>

      <DataTable
        data={dailySummary}
        columns={dailySummaryColumns}
        enableRowActions={false}
        muiTableContainerProps={{
          className: "flex-auto",
          sx: {
            "& table": {
              minWidth: "900px",
            },
          },
        }}
      />
    </Paper>
  );
}
