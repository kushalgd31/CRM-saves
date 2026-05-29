import { type MRT_ColumnDef } from "material-react-table";
import type { DailySummaryItem } from "../types";

export const dailySummaryColumns: MRT_ColumnDef<DailySummaryItem>[] = [
  { accessorKey: "date", header: "Date", size: 90 },
  { accessorKey: "betcount", header: "Bet Count", size: 70 },
  { accessorKey: "betAmt", header: "Bet Amt.", size: 110 },
  { accessorKey: "betRefundamt", header: "Bet Refund Amt.", size: 110 },
  { accessorKey: "winRefund", header: "Win Refund Amt.", size: 120 },
  { accessorKey: "won", header: "Won Count", size: 70 },
  { accessorKey: "winPercent", header: "Won Amt.", size: 80 },
  { accessorKey: "winAmt", header: "Loss", size: 100 },
  { accessorKey: "loss", header: "GGR", size: 70 },
  { accessorKey: "ggr", header: "Bonus", size: 70 },
  { accessorKey: "bonus", header: "NGR", size: 80 },
  {
    id: "action",
    header: "Action",
    size: 90,
    enableSorting: false,
    enableColumnFilter: false,
    enableColumnActions: false,
    Cell: () => (
      <button className="flex items-center gap-1 text-[10px] text-[#1F232B]">
        <img
          src="/assets/images/apps/profile/mukti12.svg"
          className="h-[12px] w-[12px]"
        />
        View
      </button>
    ),
  },
];
