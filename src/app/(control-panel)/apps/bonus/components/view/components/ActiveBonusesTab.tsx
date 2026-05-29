"use client";

import { useMemo } from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { type MRT_ColumnDef } from "material-react-table";
import DataTable from "src/components/data-table/DataTable";

type ActiveBonusRow = {
  id: number;
  player: string;
  bonusType: string;
  nonCash: string;
  cashWageringProgress: string;
  progress: number;
  wagered: string;
  target: string;
  expires: string;
  maxBet: string;
  status: string;
  actionLabel: string;
};

const activeBonuses: ActiveBonusRow[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  player: "Rajesh Kumar",
  bonusType: "Deposit",
  nonCash: "8.2K",
  cashWageringProgress: "3.1L",
  progress: 76,
  wagered: "38.0K",
  target: "50.0K",
  expires: "2 days",
  maxBet: "500",
  status: "Active",
  actionLabel: "View",
}));

function ActiveBonusesTab() {
  const columns = useMemo<MRT_ColumnDef<ActiveBonusRow>[]>(
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
        accessorKey: "bonusType",
        header: "Bonus Type",
        size: 130,
        Cell: ({ row }) => (
          <span className="inline-flex items-center justify-center gap-[10px] rounded-[25px] bg-[#EEF5FF] px-[9px] py-[1px] font-geist text-[12px] font-medium leading-[24px] tracking-[-0.4px] whitespace-nowrap text-[#2563EB]">
            {row.original.bonusType}
          </span>
        ),
      },
      {
        accessorKey: "nonCash",
        header: "Non-Cash",
        size: 100,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.nonCash}
          </span>
        ),
      },
      {
        accessorKey: "cashWageringProgress",
        header: "Cash Wagering Progress",
        size: 220,
        Cell: ({ row }) => (
          <div className="flex min-w-[170px] items-center gap-[8px]">
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
        accessorKey: "wagered",
        header: "Wagered",
        size: 100,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.wagered}
          </span>
        ),
      },
      {
        accessorKey: "target",
        header: "Target",
        size: 90,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.target}
          </span>
        ),
      },
      {
        accessorKey: "expires",
        header: "Expires",
        size: 90,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap font-geist text-[13px] font-medium leading-[24px] tracking-[-0.4px] text-[#EF4444]">
            {row.original.expires}
          </span>
        ),
      },
      {
        accessorKey: "maxBet",
        header: "Max Bet",
        size: 90,
        Cell: ({ row }) => (
          <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
            {row.original.maxBet}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell: ({ row }) => (
          <span className="inline-flex items-center justify-center gap-[10px] rounded-[25px] bg-[#EEF5FF] px-[9px] py-[1px] font-geist text-[12px] font-medium leading-[24px] tracking-[-0.4px] whitespace-nowrap text-[#2563EB]">
            {row.original.status}
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
            className="inline-flex items-center gap-1 text-[#6B7280] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]"
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
          Active Bonuses
        </Typography>
      </div>

      <DataTable
        data={activeBonuses}
        columns={columns}
        enableRowActions={false}
        muiTableContainerProps={{
          className: "flex-auto overflow-x-auto",
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

export default ActiveBonusesTab;
