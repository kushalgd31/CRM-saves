import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import DataTable from "src/components/data-table/DataTable";
import { transactionColumns } from "../../columns/transactionColumns";
import { transactionRows } from "../../data/profileData";

export default function TransactionsTab() {
  return (
    <Paper
      className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
      elevation={2}
    >
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <Typography className="self-stretch text-[#1F232B] font-poppins text-[13px] font-semibold">
          Transactions
        </Typography>
      </div>

      <DataTable
        data={transactionRows}
        columns={transactionColumns}
        enableRowActions={false}
        muiTableContainerProps={{
          className: "flex-auto",
          sx: {
            "& table": {
              minWidth: "1080px",
            },
          },
        }}
      />
    </Paper>
  );
}
