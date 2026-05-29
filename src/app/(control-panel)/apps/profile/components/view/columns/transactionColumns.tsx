import { type MRT_ColumnDef } from "material-react-table";
import type { TransactionItem } from "../types";

export const transactionColumns: MRT_ColumnDef<TransactionItem>[] = [
  {
    accessorKey: "time",
    header: "Time",
    size: 90,
    Cell: ({ row }) => (
      <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
        {row.original.time}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 130,
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
    accessorKey: "player",
    header: "Player",
    size: 150,
    Cell: ({ row }) => (
      <div className="flex items-center gap-[8px]">
        <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-medium leading-[24px] tracking-[-0.4px]">
          {row.original.player}
        </span>

        {row.original.badge && (
          <span
            className="inline-flex items-center justify-center gap-[10px] rounded-[25px] px-[9px] py-[1px] whitespace-nowrap text-[12px]"
            style={{
              backgroundColor: row.original.badgeBg,
              color: row.original.badgeColor,
            }}
          >
            {row.original.badge}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    size: 360,
    Cell: ({ row }) => (
      <div className="flex items-center gap-[6px] pl-[4px]">
        <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
          {row.original.details}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 120,
    Cell: ({ row }) => (
      <span
        className="whitespace-nowrap font-geist text-[13px] font-medium leading-[24px] tracking-[-0.4px]"
        style={{ color: row.original.amountColor }}
      >
        {row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 160,
    Cell: ({ row }) => (
      <div className="flex items-center gap-[9px]">
        <span
          className="h-[6px] w-[6px] rounded-full"
          style={{ backgroundColor: row.original.statusDot }}
        />
        <span className="whitespace-nowrap text-[#1F232B] font-geist text-[13px] font-normal leading-[24px] tracking-[-0.4px]">
          {row.original.status}
        </span>
      </div>
    ),
  },
];
