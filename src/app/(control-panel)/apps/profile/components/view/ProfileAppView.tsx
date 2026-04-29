"use client";

import FusePageSimple from "@fuse/core/FusePageSimple";
import DataTable from "src/components/data-table/DataTable";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { type MRT_ColumnDef } from "material-react-table";
import { Tabs, Tab, Paper, Box, Button } from "@mui/material";
import { SyntheticEvent, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.vars.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.vars.palette.divider,
    "& > .container": {
      maxWidth: "100% !important",
    },
  },
}));

type InfoItem = {
  label: string;
  value: ReactNode;
};

type ActivityItem = {
  title: ReactNode;
  time: string;
};

type TransactionItem = {
  time: string;
  player: string;
  type: string;
  typeBg: string;
  typeColor: string;
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  details: string;
  amount: string;
  amountColor: string;
  status: string;
  statusDot: string;
};

const INR = "\u20B9";

type ReferralItem = {
  id: number;
  refereeName: string;
  referralCode: string;
  referralType: string;
  status: string;
  bonusType: string;
  referralEvent: string;
  referrerBonusAmt: string;
  refereeBonusAmt: string;
};

type DailySummaryItem = {
  date: string;
  bet: string;
  betAmt: string;
  refund: string;
  winRefund: string;
  won: string;
  winPercent: string;
  winAmt: string;
  loss: string;
  ggr: string;
  bonus: string;
  ngr: string;
};

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <Typography className="text-[#1F232B] font-poppins text-[12px] font-medium">
        {label}
      </Typography>

      <Box className="text-right text-[#1F232B] font-poppins text-[12px] font-normal">
        {value}
      </Box>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography className="mb-3 text-[#4B5563] font-poppins text-[14px] font-semibold uppercase leading-normal">
      {children}
    </Typography>
  );
}

function ActivityGroup({
  title,
  items,
}: {
  title: string;
  items: ActivityItem[];
}) {
  return (
    <div className="mb-6">
      <Typography className="mb-3 mt-3 text-[#4B5563] font-poppins text-[14px] font-semibold leading-normal uppercase">
        {title}
      </Typography>

      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <Typography className="text-[#1F232B] font-poppins text-[12px] font-semibold leading-normal">
            {item.title}
          </Typography>
          <Typography className="mt-1 text-[#4B5563] font-poppins text-[12px] font-medium leading-normal">
            {item.time}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default function ProfileAppView() {
  const [selectedTab, setSelectedTab] = useState("basic-details");
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  function handleTabChange(event: SyntheticEvent, value: string) {
    setSelectedTab(value);
    if (value !== "notes") {
      setIsNoteDrawerOpen(false);
    }
    if (value !== "tasks") {
      setIsTaskDrawerOpen(false);
    }
  }

  const tabs = [
    { label: "Basic Details", value: "basic-details" },
    { label: "Financials", value: "financials" },
    { label: "Activities", value: "activities" },
    { label: "Transactions", value: "transactions" },
    { label: "Tasks", value: "tasks" },
    { label: "Notes", value: "notes" },
    { label: "Permission", value: "permission" },
    { label: "Referrals", value: "referrals" },
    { label: "Daily Summary", value: "daily-summary" },
  ];

  const profileHeader = {
    avatar: "/assets/images/apps/profile/mukti02.svg",
    name: "Dileesh Prakash",
    location: "Kanyakumari, Tamil Nadu (TN), India",
    phone: "+91 1234 567 890",
    email: "dileesh@gmail.com",
  };

  const basicDetails = {
    personalDetails: [
      { label: "User ID:", value: "23232110" },
      { label: "Name:", value: "Dilesh Prakash" },
      { label: "Username:", value: "@dileshprakash" },
      { label: "Phone Number:", value: "+91 1234 567 890" },
      { label: "City:", value: "Bangalore" },
      {
        label: "Last Sign In:",
        value: (
          <span>
            22.55.12.01
            <span className=" text-[#3182CE] font-poppins text-[12px] font-semibold underline">
              <span className="text-[#1F232B]">(</span>
              View History
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
      {
        label: "Device:",
        value: (
          <span>
            Desktop
            <span className=" text-[#3182CE] font-poppins text-[12px] font-semibold underline">
              <span className="text-[#1F232B]">(</span>
              View History
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
      {
        label: "OS:",
        value: (
          <span>
            Windows
            <span className=" text-[#3182CE] font-poppins text-[12px] font-semibold underline">
              <span className="text-[#1F232B]">(</span>
              View History
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
      {
        label: "Browser:",
        value: (
          <span>
            Chrome
            <span className=" text-[#3182CE] font-poppins text-[12px] font-semibold underline">

              <span className="text-[#1F232B]">(</span>
              View History
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
    ] as InfoItem[],
    otherDetails: [
      { label: "Creation Time:", value: "8 Nov 2024, 10:24 AM" },
      { label: "Referred By:", value: "amansingh@gmail.com" },
      { label: "Verified By (Type):", value: "Agent" },
      {
        label: "KYC:",
        value: (
          <div className="flex items-center justify-end gap-[10px]">
            <img
              src="/assets/images/apps/profile/mukti01.svg"
              alt="tick"
              className="h-[12px] w-[12px]"
            />
            <span>Approved</span>
          </div>
        ),
      },
      { label: "Profile Percentage:", value: "2%" },
      { label: "Last Percentage:", value: "2%" },
    ] as InfoItem[],
  };

  const financialDetails = {
    personalDetails: [
      { label: "Currency", value: "INR" },
      { label: "Available Balance", value: "2000.0" },
      { label: "Non-Cash Chip Balance", value: "0.00" },
      { label: "Loosing Bonus", value: "YES" }, 
      { label: "Loosing Bonus Percentage", value: "10%" },
      
      {
        label: "Active Bonus Code",
        value: <span className="text-[#1F232B;]">NA</span>,
      },
      {
        label: "Active Bonus Type",
        value: <span className="text-[#1F232B;]">NA</span>,
      },
      { label: "VIP Level", value: "00" },
    ] as InfoItem[],
    otherDetails: [
      { label: "Agent:", value: "rajshankar@gmail.com" },
      {
        label: "Selfie with govt. ID:",
        value: <span className="text-[#A1A8B5]">No data to display</span>,
      },
      { label: "Creation Time:", value: "8 Nov 2025, 10:23 AM" },
      {
        label: "KYC Status:",
        value: (
          <div className="flex items-center justify-end gap-[10px]">
            <img
              src="/assets/images/apps/profile/mukti01.svg"
              alt="tick"
              className="h-[12px] w-[12px]"
            />
            <span>Approved</span>
          </div>
        ),
      },
      {
        label: "KYC Docs:",
        value: (
          <span>
            YES
            <span className="ml-1 text-[#3182CE] font-poppins text-[12px] font-semibold underline">
              <span className="text-[#1F232B]">(</span>
              View Files
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
      {
        label: "Bank Accounts:",
        value: (
          <span>
            YES
            <span className="ml-1 text-[#3182CE] font-poppins text-[12px] font-semibold underline">
              <span className="text-[#1F232B]">(</span>
              View List
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
      {
        label: "Payin Details:",
        value: (
          <span>
            YES
            <span className="ml-1 text-[#3182CE] font-poppins text-[12px] font-semibold underline">
              <span className="text-[#1F232B]">(</span>
              View List
              <span className="text-[#1F232B]">)</span>
            </span>
          </span>
        ),
      },
      { label: "Risk Percentage:", value: "1%" },
    ] as InfoItem[],
  };

  const activitySections = [
    {
      title: "Today",
      items: [
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage changed from <strong>Punched</strong> to{" "}
              <strong>Confirmed</strong> by{" "}
              <span className="text-[#1566C0] font-bold">System</span> through{" "}
              <strong>Automation</strong>
            </> 
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "10 Apr 2026 | 04:22 PM",
        },
      ],
    },
    {
      title: "Yesterday",
      items: [
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "10 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
      ],
    },
    {
      title: "09 Apr 2026",
      items: [
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "09 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        
      ],
    },
  ];

  const transactions: TransactionItem[] = [
    {
      time: "2 min",
      type: "Big Win",
      typeBg: "#EAF5EA",
      typeColor: "#418643",
      player: "Rajesh K.",
      badge: "VIP",
      badgeBg: "#ECEDEF",
      badgeColor: "#8B9097",
      details: "IPL - CSK vs MI, 34 bets, live match",
      amount: "4,82,000",
      amountColor: "#67C38A", 
      status: "Monitoring",
      statusDot: "#F4A621",
    },
    {
      time: "8 min",
      type: "Risk Alert",
      typeBg: "#FBEDEE",
      typeColor: "#D97C7F",
      player: "-",
      details: "Multi-account: 3 accounts on same device fingerprint",
      amount: "-",
      amountColor: "#6B7280",
      status: "Action Needed",
      statusDot: "#FF4D4F",
    },
    {
      time: "12 min",
      type: "Big Win",
      typeBg: "#EAF7EE",
      typeColor: "#69B47C",
      player: "Priya R.",
      badge: "VIP",
      badgeBg: "#ECEDEF",
      badgeColor: "#8B9097",
      details: "Played 6 hrs today, requesting cashout",
      amount: "4,82,000",
      amountColor: "#FF6C63",
      status: "Under Review",
      statusDot: "#F4A621",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FBEDEE",
      typeColor: "#D97C7F",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EE",
      badgeColor: "#7FC790",
      details: "Account age: 2 days, no KYC docs yet",
      amount: "2,82,000",
      amountColor: "#67C38A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
  ];

  const transactionRows: TransactionItem[] = [
    {
      time: "2 min",
      type: "Big Win",
      typeBg: "#E8F7EC",
      typeColor: "#38995B",
      player: "Rajesh K.",
      badge: "VIP",
      badgeBg: "#F2F4F7",
      badgeColor: "#7C8493",
      details: "IPL - CSK vs MI, 34 bets, live match",
      amount: `+${INR}4,82,000`,
      amountColor: "#2FA45A",
      status: "Monitoring",
      statusDot: "#F5A623",
    },
    {
      time: "8 min",
      type: "Risk Alert",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "-",
      details: "Multi-account: 3 accounts on same device fingerprint",
      amount: "-",
      amountColor: "#6B7280",
      status: "Action Needed",
      statusDot: "#FF4D4F",
    },
    {
      time: "12 min",
      type: "Big Win",
      typeBg: "#E8F7EC",
      typeColor: "#38995B",
      player: "Priya R.",
      badge: "VIP",
      badgeBg: "#F2F4F7",
      badgeColor: "#7C8493",
      details: "Played 6 hrs today, requesting cashout",
      amount: `+${INR}4,82,000`,
      amountColor: "#FF6B5F",
      status: "Under Review",
      statusDot: "#F5A623",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Lg withdrawal",
      typeBg: "#FFF1E6",
      typeColor: "#C67B3D",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Lg withdrawal",
      typeBg: "#FFF1E6",
      typeColor: "#C67B3D",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
    {
      time: "22 min",
      type: "Big Loss",
      typeBg: "#FDECEC",
      typeColor: "#D46868",
      player: "Deepa T",
      badge: "New",
      badgeBg: "#EAF7EC",
      badgeColor: "#5EBA7D",
      details: "Account age: 2 days, no KYC docs yet",
      amount: `+${INR}2,82,000`,
      amountColor: "#2FA45A",
      status: "Flagged",
      statusDot: "#FF4D4F",
    },
  ];

  const transactionColumns = useMemo<MRT_ColumnDef<TransactionItem>[]>(
    () => [
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
    ],
    []
  );

  const simpleTimelineSections = [
   {
      title: "Today",
      items: [
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage changed from <strong>Punched</strong> to{" "}
              <strong>Confirmed</strong> by{" "}
              <span className="text-[#1566C0] font-bold">System</span> through{" "}
              <strong>Automation</strong>
            </> 
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
      ],
    },
    {
      title: "Yesterday",
      items: [
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "10 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        
      ],
    },
    {
      title: "09 Apr 2026",
      items: [
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "09 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
        {
          title: (
            <>
              Lead stage change from <strong>Confirmed</strong> to{" "}
              <strong>Shipped</strong> by{" "}
              <span className="text-[#1566C0] font-bold">Praz</span>
            </>
          ),
          time: "11 Apr 2026 | 04:22 PM",
        },
      ],
    },
  ];

  const permissions = [
    { name: "Deposit", enabled: true },
    { name: "Withdraw", enabled: true },
    {
      name: "Gameplay",
      enabled: true,
      children: [
        { name: "Gameplay", enabled: true },
        { name: "Sports", enabled: true },
      ],
    },
    { name: "Deposit", enabled: true },
  ];

  const playerSettings = [
    "Daily Betting Limit",
    "Weekly Betting Limit",
    "Monthly Betting Limit",
    "Daily Deposit Limit",
    "Weekly Deposit Limit",
    "Monthly Deposit Limit",
    "Account age: 2 days, no KYC docs yet",
    "Account age: 2 days, no KYC docs yet",
  ];

  const referrals: ReferralItem[] = Array.from({ length: 11 }).map((_, index) => ({
    id: 5454 + index,
    refereeName: "Aman S.",
    referralCode: "amansing@gmail.com",
    referralType: "+91 1234 5678 90",
    status: "Pankaj Solanki",
    bonusType: "3444",
    referralEvent: "5%",
    referrerBonusAmt: "â‚¹12/Mar/2026",
    refereeBonusAmt: "â‚¹500",
  }));

  const referralColumns = useMemo<MRT_ColumnDef<ReferralItem>[]>(
    () => [
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
        accessorKey: "refereeBonusAmt",
        header: "Referee Bonus Amt",
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
    ],
    []
  );

  const dailySummary: DailySummaryItem[] = Array.from({ length: 13 }).map(() => ({
    date: "10-04-26",
    betcount: "30",
    betAmt: "20,900.00",
    betRefundamt: "20,900.00",
    winRefund: "20,900.00",
    won: "3444",
    winPercent: "5%",
    winAmt: "1288",
    loss: "56",
    ggr: "12",
    bonus: "67",
    ngr: "67",
  }));

  const dailySummaryColumns = useMemo<MRT_ColumnDef<DailySummaryItem>[]>(
    () => [
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
      { accessorKey: "ngr", header: "Actions", size: 80 },
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
    ],
    []
  );

  return (
    <Root
      header={
        <div className="bg-white w-[1568px] h-[172px] ml-[52px]">
          <div className="flex w-[1464px] flex-col items-start gap-4">
            <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="mt-[14px] flex items-center gap-[14px]">
                <Avatar
                  src={profileHeader.avatar}
                  alt="User avatar"
                  className="h-[94px] w-[94px] rounded-full"
                />

                <div className="flex items-center gap-8">
                  <div>
                    <Typography className="self-stretch text-[#1F232B] font-poppins text-sm font-semibold">
                      {profileHeader.name}
                    </Typography>
                    <Typography className="text-[#4B5563] font-poppins text-xs font-medium">
                      {profileHeader.location}
                    </Typography>
                  </div>

                  <div>
                    <Typography className="text-[#1F232B] font-poppins text-sm font-medium">
                      {profileHeader.phone}
                    </Typography>
                    <Typography className="text-[#4B5563] font-poppins text-xs font-medium">
                      Phone No.
                    </Typography>
                  </div>

                  <div>
                    <Typography className="text-[#1F232B] font-poppins text-sm font-medium">
                      {profileHeader.email}
                    </Typography>
                    <Typography className="text-[#4B5563] font-poppins text-xs font-medium">
                      Email
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .Mui-selected": {
                    color: "#1F232B",
                    fontFamily: "Geist, sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    lineHeight: "16.25px",
                    letterSpacing: "0.122px",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#fff",
                    height: "2px",
                  },
                }}
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      }
      content={
        <div className="w-full p-4 sm:p-6">
          {selectedTab === "basic-details" && (
            <Paper className="relative w-fullrounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-6 shadow-none">
              <div className="mb-5 flex items-center justify-between">
                <Typography className="text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
                  Basic Details
                </Typography>

                <Button
  size="small"
  variant="text"
  sx={{
    color: "#1566C0",
    fontFamily: "Poppins, sans-serif",
    fontSize: "14px",
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
                  {basicDetails.personalDetails.map((item, index) => (
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
                  {basicDetails.otherDetails.map((item, index) => (
                    <InfoRow
                      key={`${item.label}-${index}`}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Box>
              </div>
            </Paper>
          )}

          {selectedTab === "financials" && (
            <Paper className="relative w-fullrounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-6 shadow-none">
              <div className="mb-5 flex items-center justify-between">
                <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
                  Financial Details
                </Typography>
              </div>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <Box>
                  <SectionTitle>Personal Details</SectionTitle>
                  {financialDetails.personalDetails.map((item, index) => (
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
                  {financialDetails.otherDetails.map((item, index) => (
                    <InfoRow
                      key={`${item.label}-${index}`}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </Box>
              </div>
            </Paper>
          )}

          {selectedTab === "activities" && (
            <Paper className="relative w-fullrounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-6 shadow-none">
              <div className="mb-5 flex items-center justify-between">
                <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
                  Activities
                </Typography>
              </div>

              <div className=" pb-6">
                {activitySections.map((section) => (
                  <ActivityGroup
                    key={section.title}
                    title={section.title}
                    items={section.items}
                  />
                ))}
              </div>
            </Paper>
          )}

          {selectedTab === "transactions" && (
            <Paper
              className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
              elevation={2}
            >
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <Typography className="text-[14px] font-semibold text-[#1F232B]">
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
          )}

          {selectedTab === "tasks" && (
            <>
              <Paper className="relative w-full rounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10) p-6 shadow-none">
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
                    Tasks
                  </Typography>

                  <button
                    onClick={() => setIsTaskDrawerOpen(true)}
                    className="inline-flex items-center justify-center gap-[10px] rounded-[4px] bg-[#1566C0] px-[10px] py-[8px] text-white font-poppins text-[14px] font-medium leading-normal"
                  >
                    + Create Task
                  </button>
                </div>

                <div className="px-4 pb-4">
                  {simpleTimelineSections.map((section) => (
                    <div key={section.title} className="pt-5 first:pt-1">
                      <Typography className="text-[#4B5563] font-poppins text-[14px] font-semibold leading-normal uppercase">
                        {section.title}
                      </Typography>

                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          className="mt-4 border-b border-[#E5E7EB] pb-3"
                        >
                          <Typography className="text-[#1F232B] font-poppins text-[12px] font-medium leading-normal">
                            {item.title}
                          </Typography>
                          <Typography className="mt-1 text-[#4B5563] font-poppins text-[12px] font-medium leading-normal">
                            {item.time}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Paper>

              {isTaskDrawerOpen &&
                typeof document !== "undefined" &&
                createPortal(
                  <div className="fixed inset-0 z-[1400] flex justify-end bg-[rgba(17,24,39,0.45)]">
                    <button
                      aria-label="Close task details"
                      className="flex-1 cursor-default"
                      onClick={() => setIsTaskDrawerOpen(false)}
                    />

                    <div className="flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-8px_0_24px_rgba(15,23,42,0.12)]">
                      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
                        <Typography className="text-[#1F232B] font-poppins text-[15px] font-semibold leading-normal">
                          Create New Notes
                        </Typography>

                        <button
                          onClick={() => setIsTaskDrawerOpen(false)}
                          className="text-[18px] leading-none text-[#9CA3AF]"
                        >
                          Ã—
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto px-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <Typography className="mb-1.5 text-[12px] font-medium text-[#1F232B]">
                              Name
                            </Typography>
                            <input
                              type="text"
                              placeholder="Name..."
                              className="h-[38px] w-full rounded-[6px] border border-[#D1D5DB] px-3 text-[12px] text-[#1F232B] outline-none placeholder:text-[#9CA3AF]"
                            />
                          </div>

                          <div>
                            <Typography className="mb-1.5 text-[12px] font-medium text-[#1F232B]">
                              Type
                            </Typography>
                            <select className="h-[38px] w-full rounded-[6px] border border-[#D1D5DB] bg-white px-3 text-[12px] text-[#1F232B] outline-none">
                              <option>Task...</option>
                              <option>Follow Up</option>
                              <option>Reminder</option>
                              <option>Meeting</option>
                            </select>
                          </div>

                          <div>
                            <Typography className="mb-1.5 text-[12px] font-medium text-[#1F232B]">
                              Date & Time
                            </Typography>
                            <input
                              type="text"
                              placeholder="Select..."
                              className="h-[38px] w-full rounded-[6px] border border-[#D1D5DB] px-3 text-[12px] text-[#1F232B] outline-none placeholder:text-[#9CA3AF]"
                            />
                          </div>

                          <div>
                            <Typography className="mb-1.5 text-[12px] font-medium text-[#1F232B]">
                              Reminder Before
                            </Typography>
                            <input
                              type="text"
                              placeholder="None..."
                              className="h-[38px] w-full rounded-[6px] border border-[#D1D5DB] px-3 text-[12px] text-[#1F232B] outline-none placeholder:text-[#9CA3AF]"
                            />
                          </div>

                          <div>
                            <Typography className="mb-1.5 text-[12px] font-medium text-[#1F232B]">
                              Comments
                            </Typography>
                            <textarea
                              placeholder="Task details..."
                              className="min-h-[110px] w-full resize-none rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-[12px] text-[#1F232B] outline-none placeholder:text-[#9CA3AF]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#E5E7EB] px-4 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => setIsTaskDrawerOpen(false)}
                            className="inline-flex h-[36px] min-w-[104px] items-center justify-center rounded-[6px] border border-[#3B82F6] bg-white px-4 text-[12px] font-medium text-[#2563EB]"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => setIsTaskDrawerOpen(false)}
                            className="inline-flex h-[36px] min-w-[120px] items-center justify-center rounded-[6px] bg-[#1566C0] px-4 text-[12px] font-medium text-white"
                          >
                            + Create Task
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
            </>
          )}

          {selectedTab === "notes" && (
            <>
              <Paper className="relative w-full rounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10) p-6 shadow-none">
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <Typography className="self-stretch text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
                    Notes
                  </Typography>

                  <button
                    onClick={() => setIsNoteDrawerOpen(true)}
                    className="inline-flex items-center justify-center gap-[10px] rounded-[4px] bg-[#1566C0] px-[10px] py-[8px] text-white font-poppins text-[14px] font-medium leading-normal"
                  >
                    + Create Note
                  </button>
                </div>

                <div className="px-4 pb-4">
                  {simpleTimelineSections.map((section) => (
                    <div key={section.title} className="pt-5 first:pt-1">
                      <Typography className="text-[#4B5563] font-poppins text-[14px] font-semibold leading-normal uppercase">
                        {section.title}
                      </Typography>

                      {section.items.map((item, index) => (
                        <div
                          key={index}
                          className="mt-4 border-b border-[#E5E7EB] pb-3"
                        >
                          <Typography className="text-[#1F232B] font-poppins text-[12px] font-medium leading-normal">
                            {item.title}
                          </Typography>
                          <Typography className="mt-1 text-[#4B5563] font-poppins text-[12px] font-medium leading-normal">
                            {item.time}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Paper>

              {isNoteDrawerOpen &&
                typeof document !== "undefined" &&
                createPortal(
                  <div className="fixed inset-0 z-[1400] flex justify-end bg-[rgba(17,24,39,0.45)]">
                    <button
                      aria-label="Close note details"
                      className="flex-1 cursor-default"
                      onClick={() => setIsNoteDrawerOpen(false)}
                    />

                    <div className="flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-8px_0_24px_rgba(15,23,42,0.12)]">
                      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
                        <Typography className="text-[#1F232B] font-poppins text-[15px] font-semibold leading-normal">
                          Create New Notes
                        </Typography>

                        <button
                          onClick={() => setIsNoteDrawerOpen(false)}
                          className="text-[18px] leading-none text-[#9CA3AF]"
                        >
                          Ã—
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto px-4 py-4">
                        <div>
                          <Typography className="mb-1.5 text-[12px] font-medium text-[#1F232B]">
                            Notes
                          </Typography>
                          <textarea
                            placeholder="Name..."
                            className="min-h-[78px] w-full resize-none rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-[12px] text-[#1F232B] outline-none placeholder:text-[#9CA3AF]"
                          />
                        </div>
                      </div>

                      <div className="border-t border-[#E5E7EB] px-4 py-4">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => setIsNoteDrawerOpen(false)}
                            className="inline-flex h-[36px] min-w-[104px] items-center justify-center rounded-[6px] border border-[#3B82F6] bg-white px-4 text-[12px] font-medium text-[#2563EB]"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => setIsNoteDrawerOpen(false)}
                            className="inline-flex h-[36px] min-w-[120px] items-center justify-center rounded-[6px] bg-[#1566C0] px-4 text-[12px] font-medium text-white"
                          >
                            + Create Note
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
            </>
          )}

          {selectedTab === "permission" && (
            <div className="space-y-4">
              <div className="relative w-full rounded-[12px] border border-[#E6ECF2] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <Typography className="text-[#1F232B] font-poppins text-[16px] font-semibold leading-normal">
                  Permissions
                </Typography>

                <div className="mt-4 space-y-2">
                  {permissions.map((item, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-[6px] border border-[#E5E7EB] bg-white"
                    >
                      <div className="flex items-center justify-between px-4 py-[9px]">
                        <div className="flex items-center gap-[8px]">
                          <span className="w-[10px] text-[12px] leading-none text-[#6B7280]">
                            {">"}
                          </span>
                          <Typography className="text-[#1F232B] font-geist text-[13px] font-medium leading-[16.25px] tracking-[0.122px]">
                            {item.name}
                          </Typography>
                        </div>

                        <button
                          className={`relative h-[12px] w-[26px] rounded-full ${
                            item.enabled ? "bg-[#45B26B]" : "bg-[#D1D5DB]"
                          }`}
                        >
                          <span className="absolute right-[2px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-white"></span>
                        </button>
                      </div>

                      {item.children && (
                        <div className="border-t border-[#E5E7EB] px-4 py-1.5">
                          {item.children.map((child, childIndex) => (
                            <div
                              key={childIndex}
                              className="flex items-center justify-between py-[6px] pr-[10px]"
                            >
                              <div className="flex items-center gap-2 pl-3">
                                <span className="text-[13px] text-[#6B7280]">
                                  •
                                </span>
                                <Typography className="text-[#1F232B] font-poppins text-[13px] font-medium leading-normal">
                                  {child.name}
                                </Typography>
                              </div>

                              <button
                                className={`relative h-[14px] w-[26px] rounded-full gap-[10px]  ${
                                  child.enabled ? "bg-[#45B26B]" : "bg-[#D1D5DB]"
                                }`}
                              >
                                <span className="absolute right-[2px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-white"></span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-full rounded-[12px] border border-[#E6ECF2] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Typography className="text-[#1F232B] font-geist text-[16px] font-medium leading-[24px] tracking-[-0.4px]">
                      Player Settings
                    </Typography>

                    <div className="flex items-center gap-2">
                      <Typography className="text-[#6B7280] font-poppins text-[13px] font-medium leading-normal">
                        Filter By Type:
                      </Typography>

                      <select className="flex w-[96px] items-center justify-center rounded-[8px] border border-[#BDBEBF] bg-[rgba(255,255,255,0.06)] pt-[10px] pr-[11.302px] pb-[9px] pl-[11.961px]">
                        <option>Player</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Typography className="mt-2 text-[#6B7280] font-poppins text-[14px] font-normal leading-normal">
                  1 pending, 4 completed
                </Typography>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                      <tr className="border-b border-[#E0E0E0]">
                        {["Type", "Value", "Updated At", "Action"].map((head) => (
                          <th
                            key={head}
                            className="py-3  text-left text-[#1F232B] font-poppins text-[14px] font-medium leading-normal"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {playerSettings.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#E0E0E0] last:border-b-0"
                        >
                          <td className="py-2.5 text-[#1F232B] font-poppins text-[14px] font-normal leading-normal">
                            {item}
                          </td>
                          <td className="py-2.5 text-[#1F232B] font-poppins text-[14px] font-normal leading-normal">
                            Not Set
                          </td>
                          <td className="py-2.5 text-[#1F232B] font-poppins text-[14px] font-normal leading-normal">
                            NA
                          </td>
                          <td className="py-2.5 text-[#1F232B] font-poppins text-[14px] font-normal leading-none">
                            ...
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "referrals" && (
            <Paper
              className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
              elevation={2}
            >
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <Typography className="text-[14px] font-semibold text-[#1F232B]">
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
          )}

          {selectedTab === "daily-summary" && (
            <Paper
              className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
              elevation={2}
            >
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <Typography className="text-[14px] font-semibold text-[#1F232B]">
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
          )}
        </div>
      }
      scroll="page"
    />
  );
}
