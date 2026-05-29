"use client";

import { useMemo } from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { type MRT_ColumnDef } from "material-react-table";
import DataTable from "src/components/data-table/DataTable";

type HistoryRow = {
  player: string;
  type: string;
  typeBg: string;
  typeColor: string;
  bonusAmt: string;
  wagered: string;
  cashWageringProgress: string;
  progress: number;
  converted: string;
  issued: string;
  closed: string;
  outcome: string;
  outcomeBg: string;
  outcomeColor: string;
  actionLabel: string;
};

const historyRows: HistoryRow[] = Array.from({ length: 10 }, () => ({
  player: "Rajesh Kumar",
  type: "Deposit",
  typeBg: "#EEF5FF",
  typeColor: "#2563EB",
  bonusAmt: "8.2K",
  wagered: "38.0K",
  cashWageringProgress: "3.1L",
  progress: 76,
  converted: "50.0K",
  issued: "2 days",
  closed: "500",
  outcome: "Converted",
  outcomeBg: "#EEF5FF",
  outcomeColor: "#2563EB",
  actionLabel: "View",
}));

function HistoryTab() {
  const columns = useMemo<MRT_ColumnDef<HistoryRow>[]>(
    () => [
      {
        accessorKey: "player",
        header: "Player",
        size: 150,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-medium leading-[24px] tracking-[-0.4px]">
            {row.original.player}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 120,
        Cell: ({ row }) => (
          <span
            className="inline-flex items-center justify-center gap-[10px] rounded-[25px] px-[9px] py-[1px] font-geist text-[12px] font-medium leading-[24px] tracking-[-0.4px] whitespace-nowrap"
            style={{
              backgroundColor: row.original.typeBg,
              color: row.original.typeColor,
            }}
          >
            {row.original.type}
          </span>
        ),
      },
      {
        accessorKey: "bonusAmt",
        header: "Bonus Amt",
        size: 90,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.bonusAmt}
          </span>
        ),
      },
      {
        accessorKey: "wagered",
        header: "Wagered",
        size: 90,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.wagered}
          </span>
        ),
      },
      {
        accessorKey: "cashWageringProgress",
        header: "Cash Wagering Progress",
        size: 220,
        Cell: ({ row }) => (
          <div className="flex items-center gap-[8px]">
            <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
              {row.original.cashWageringProgress}
            </span>

            <div className="h-[4px] w-[54px] overflow-hidden rounded-full bg-[#E5E7EB]">
              <div
                className="h-full rounded-full bg-[#F59E0B]"
                style={{ width: `${row.original.progress}%` }}
              />
            </div>

            <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
              {row.original.progress}%
            </span>
          </div>
        ),
      },
      {
        accessorKey: "converted",
        header: "Converted",
        size: 90,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.converted}
          </span>
        ),
      },
      {
        accessorKey: "issued",
        header: "Issued",
        size: 80,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap font-geist text-[13px] font-medium leading-[24px] tracking-[-0.4px] text-[#EF4444]">
            {row.original.issued}
          </span>
        ),
      },
      {
        accessorKey: "closed",
        header: "Closed",
        size: 70,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.closed}
          </span>
        ),
      },
      {
        accessorKey: "outcome",
        header: "Outcome",
        size: 110,
        Cell: ({ row }) => (
          <span
            className="inline-flex items-center justify-center gap-[10px] rounded-[25px] px-[9px] py-[1px] font-geist text-[12px] font-medium leading-[24px] tracking-[-0.4px] whitespace-nowrap"
            style={{
              backgroundColor: row.original.outcomeBg,
              color: row.original.outcomeColor,
            }}
          >
            {row.original.outcome}
          </span>
        ),
      },
      {
        accessorKey: "actionLabel",
        header: "Actions",
        size: 90,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ row }) => (
          <button
            type="button"
            className="inline-flex items-center gap-[6px] text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]"
          >
            <img
              src="/assets/images/apps/profile/mukti12.svg"
              alt="view"
              className="h-[12px] w-[12px]"
            />
            {row.original.actionLabel}
          </button>
        ),
      },
    ],
    []
  );

  return (
    <Paper
      className="flex mt-[16px] w-full flex-auto flex-col overflow-hidden rounded-b-none"
      elevation={2}
    >
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold">
          History
        </Typography>
      </div>

      <DataTable
        data={historyRows}
        columns={columns}
        enableRowActions={false}
        muiTableContainerProps={{
          className: "flex-auto",
          sx: {
            "& table": {
              minWidth: "1180px",
            },
          },
        }}
      />
    </Paper>
  );
}

export default HistoryTab;
