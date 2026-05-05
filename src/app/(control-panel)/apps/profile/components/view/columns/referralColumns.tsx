import { type MRT_ColumnDef } from "material-react-table";
import type { ReferralItem } from "../types";

export const referralColumns: MRT_ColumnDef<ReferralItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "refereeName",
    header: "Referee Name",
    size: 140,
    Cell: ({ row }) => (
      <span className="text-[13px] font-medium">{row.original.refereeName}</span>
    ),
  },
  {
    accessorKey: "referralCode",
    header: "Referral Code",
    size: 130,
  },
  {
    accessorKey: "referralType",
    header: "Referral Type",
    size: 120,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
  },
  {
    accessorKey: "bonusType",
    header: "Bonus Type",
    size: 110,
  },
  {
    accessorKey: "referralEvent",
    header: "Referral Event",
    size: 130,
  },
  {
    accessorKey: "referrerBonusAmt",
    header: "Referrer Bonus Amt",
    size: 150,
  },
  {
    id: "actions",
    header: "Actions",
    size: 120,
    enableSorting: false,
    enableColumnFilter: false,
    enableColumnActions: false,
    Cell: () => (
      <div className="flex items-center justify-end gap-2">
        <button className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[#F3F4F6]">
          <img
            src="/assets/images/apps/profile/mukti12.svg"
            className="h-[12px] w-[12px]"
          />
          <span className="text-[12px]">View</span>
        </button>

        <img
          src="/assets/images/apps/profile/menu.svg"
          className="h-[12px] w-[12px]"
        />
      </div>
    ),
  },
];
