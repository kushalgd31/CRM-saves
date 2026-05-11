import { type InfoItem } from "../types";
import type {
  ActivitySection,
  DailySummaryItem,
  DeviceHistoryItem,
  LastSigninIpHistoryItem,
  OsHistoryItem,
  PermissionItem,
  ProfileHeaderData,
  ReferralItem,
  TabItem,
  TransactionItem,
} from "../types";

const INR = "\u20B9";

export const tabs: TabItem[] = [
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

export const profileHeader: ProfileHeaderData = {
  avatar: "/assets/images/apps/profile/mukti02.svg",
  name: "Dileesh Prakash",
  location: "Kanyakumari, Tamil Nadu (TN), India",
  phone: "+91 1234 567 890",
  email: "dileesh@gmail.com",
};

export function getBasicDetailsPersonalDetails({
  onOpenLastSigninIpDrawer,
  onOpenDeviceDrawer,
  onOpenOsDrawer,
}: {
  onOpenLastSigninIpDrawer: () => void;
  onOpenDeviceDrawer: () => void;
  onOpenOsDrawer: () => void;
}): InfoItem[] {
  return [
    { label: "User ID:", value: "23232110" },
    { label: "Name:", value: "Dilesh Prakash" },
    { label: "Username:", value: "@dileshprakash" },
    { label: "Phone Number:", value: "+91 1234 567 890" },
    { label: "City:", value: "Bangalore" },
    {
      label: "Last Sign Ip:",
      value: (
        <span>
          22.55.12.01
          <button
            type="button"
            onClick={onOpenLastSigninIpDrawer}
            className="text-[#3182CE] font-poppins text-[12px] font-semibold underline"
          >
            <span className="text-[#1F232B]">(</span>
            View History
            <span className="text-[#1F232B]">)</span>
          </button>
        </span>
      ),
    },
    {
      label: "Device:",
      value: (
        <span>
          Desktop
          <button
            type="button"
            onClick={onOpenDeviceDrawer}
            className="text-[#3182CE] font-poppins text-[12px] font-semibold underline"
          >
            <span className="text-[#1F232B]">(</span>
            View History
            <span className="text-[#1F232B]">)</span>
          </button>
        </span>
      ),
    },
    {
      label: "OS:",
      value: (
        <span>
          Windows
          <button
            type="button"
            onClick={onOpenOsDrawer}
            className="text-[#3182CE] font-poppins text-[12px] font-semibold underline"
          >
            <span className="text-[#1F232B]">(</span>
            View History
            <span className="text-[#1F232B]">)</span>
          </button>
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
  ];
}

export const basicDetailsOtherDetails: InfoItem[] = [
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
];

export const financialPersonalDetails: InfoItem[] = [
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
];

export const financialOtherDetails: InfoItem[] = [
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
];

export const activitySections: ActivitySection[] = [
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

export const transactionRows: TransactionItem[] = [
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

export const simpleTimelineSections: ActivitySection[] = [
  {
    title: "Today",
    items: [
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage changed from <strong>Punched</strong> to{" "}
            <strong>Confirmed</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              System
            </span>{" "}
            through <strong>Automation</strong>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
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
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "10 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
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
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "09 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
    ],
  },
];

export const notesTimelineSections: ActivitySection[] = [
  {
    title: "Today",
    items: [
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage changed from <strong>Punched</strong> to{" "}
            <strong>Confirmed</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              System
            </span>{" "}
            through <strong>Automation</strong>
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
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "10 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
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
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "09 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
      {
        title: (
          <>
            Lead stage change from <strong>Confirmed</strong> to{" "}
            <strong>Shipped</strong> by{" "}
            <span className="text-[#1566C0] font-poppins text-[12px] font-bold not-italic leading-normal">
              Praz
            </span>
          </>
        ),
        time: "11 Apr 2026 | 04:22 PM",
      },
    ],
  },
];

export const permissions: PermissionItem[] = [
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

export const playerSettings = [
  "Daily Betting Limit",
  "Weekly Betting Limit",
  "Monthly Betting Limit",
  "Daily Deposit Limit",
  "Weekly Deposit Limit",
  "Monthly Deposit Limit",
  "Account age: 2 days, no KYC docs yet",
  "Account age: 2 days, no KYC docs yet",
];

export const referrals: ReferralItem[] = Array.from({ length: 11 }).map(
  (_, index) => ({
    id: 5454 + index,
    refereeName: "Aman S.",
    referralCode: "amansing@gmail.com",
    referralType: "+91 1234 5678 90",
    status: "Pankaj Solanki",
    bonusType: "3444",
    referralEvent: "5%",
    referrerBonusAmt: "12/Mar/2026",
    refereeBonusAmt: "500",
  })
);

export const dailySummary: DailySummaryItem[] = Array.from({
  length: 13,
}).map(() => ({
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

export const lastSigninIpHistory: LastSigninIpHistoryItem[] = [
  { date: "04-04-2026", ip: "223.83.87.01" },
  { date: "04-04-2026", ip: "223.83.87.01" },
  { date: "04-04-2026", ip: "223.83.87.01" },
  { date: "04-04-2026", ip: "223.83.87.01" },
  { date: "04-04-2026", ip: "223.83.87.01" },
];

export const deviceHistory: DeviceHistoryItem[] = [
  { date: "04-04-2026", device: "Desktop" },
  { date: "04-04-2026", device: "Samsung A90" },
  { date: "04-04-2026", device: "iPhone 16 Pro" },
  { date: "04-04-2026", device: "Mobile" },
  { date: "04-04-2026", device: "Desktop" },
  { date: "04-04-2026", device: "Desktop" },
];

export const osHistory: OsHistoryItem[] = [
  { date: "04-04-2026", os: "Windows 11" },
  { date: "04-04-2026", os: "Android 14" },
  { date: "04-04-2026", os: "Windows 10" },
  { date: "04-04-2026", os: "iOS 16.4.1" },
  { date: "04-04-2026", os: "Desktop" },
  { date: "04-04-2026", os: "Desktop" },
];
