import { type ReactNode } from "react";

export type TabValue =
  | "basic-details"
  | "financials"
  | "activities"
  | "transactions"
  | "tasks"
  | "notes"
  | "permission"
  | "referrals"
  | "daily-summary";

export type TabItem = {
  label: string;
  value: TabValue;
};

export type InfoItem = {
  label: string;
  value: ReactNode;
};

export type ActivityItem = {
  title: ReactNode;
  time: string;
};

export type ActivitySection = {
  title: string;
  items: ActivityItem[];
};

export type TransactionItem = {
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

export type ReferralItem = {
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

export type DailySummaryItem = {
  date: string;
  betcount: string;
  betAmt: string;
  betRefundamt: string;
  winRefund: string;
  won: string;
  winPercent: string;
  winAmt: string;
  loss: string;
  ggr: string;
  bonus: string;
  ngr: string;
};

export type LastSigninIpHistoryItem = {
  date: string;
  ip: string;
};

export type DeviceHistoryItem = {
  date: string;
  device: string;
};

export type OsHistoryItem = {
  date: string;
  os: string;
};

export type ProfileHeaderData = {
  avatar: string;
  name: string;
  location: string;
  phone: string;
  email: string;
};

export type PermissionChild = {
  name: string;
  enabled: boolean;
};

export type PermissionItem = {
  name: string;
  enabled: boolean;
  children?: PermissionChild[];
};
