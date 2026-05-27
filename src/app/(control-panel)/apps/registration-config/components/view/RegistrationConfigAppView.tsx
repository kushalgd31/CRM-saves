"use client";

import { useCallback, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { type MRT_ColumnDef } from "material-react-table";
import DataTable from "src/components/data-table/DataTable";

const mpinRules = [
  "Users can log in using MPIN instead of password on the same device",
  "Password is only required for the first login on a new device",
  "When device changes, MPIN registration will happen automatically",
  "MPIN is device-specific and only available on mobile devices",
  "Provides quick and secure authentication for returning users",
];

const stats = [
  { value: "11", label: "Total Fields", color: "#111827" },
  { value: "11", label: "Visible Fields", color: "#2563EB" },
  { value: "8", label: "Required Fields", color: "#F97316" },
  { value: "3", label: "Login Fields", color: "#16A34A" },
];

type PreviewField = {
  label: string;
  placeholder: string;
  required: boolean;
  type?: "text" | "checkbox" | "select";
};

const previewFields: PreviewField[] = [
  { label: "First Name", placeholder: "Enter first name", required: true },
  { label: "Last Name", placeholder: "Enter last name", required: true },
  { label: "Username", placeholder: "Enter username", required: true },
  { label: "Phone", placeholder: "Enter phone", required: true },
  { label: "Email", placeholder: "Enter email", required: true },
  { label: "Password", placeholder: "Enter password", required: true },
  {
    label: "Accept Terms & Conditions",
    placeholder: "Accept Terms & Conditions",
    required: true,
    type: "checkbox",
  },
  { label: "Referral Code", placeholder: "Enter referral code", required: true },
  { label: "Date of Birth", placeholder: "mm/dd/yyyy", required: true },
  {
    label: "Gender",
    placeholder: "Select Gender",
    required: false,
    type: "select",
  },
  {
    label: "Country",
    placeholder: "Select Country",
    required: true,
    type: "select",
  },
];

type RegistrationFieldRow = {
  id: number;
  field: string;
  slug: string;
  type: string;
  visible: boolean;
  required: boolean;
  loginEnabled: boolean | null;
  actionLabel: string;
};

const initialRegistrationFieldsData: RegistrationFieldRow[] = [
  {
    id: 1,
    field: "First Name",
    slug: "firstName",
    type: "Text",
    visible: true,
    required: true,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 2,
    field: "Last Name",
    slug: "lastName",
    type: "Text",
    visible: true,
    required: true,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 3,
    field: "Username",
    slug: "username",
    type: "Text",
    visible: true,
    required: true,
    loginEnabled: true,
    actionLabel: "System",
  },
  {
    id: 4,
    field: "Phone",
    slug: "phone",
    type: "Tel",
    visible: true,
    required: true,
    loginEnabled: true,
    actionLabel: "System",
  },
  {
    id: 5,
    field: "Email",
    slug: "email",
    type: "Email",
    visible: true,
    required: true,
    loginEnabled: true,
    actionLabel: "System",
  },
  {
    id: 6,
    field: "Password",
    slug: "password",
    type: "Password",
    visible: true,
    required: true,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 7,
    field: "Accept Terms & Conditions",
    slug: "terms",
    type: "Checkbox",
    visible: true,
    required: true,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 8,
    field: "Referral Code",
    slug: "referralCode",
    type: "Text",
    visible: true,
    required: false,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 9,
    field: "Date of Birth",
    slug: "dob",
    type: "Date",
    visible: true,
    required: false,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 10,
    field: "Gender",
    slug: "gender",
    type: "Select",
    visible: true,
    required: false,
    loginEnabled: null,
    actionLabel: "System",
  },
  {
    id: 11,
    field: "Country",
    slug: "country",
    type: "Select",
    visible: true,
    required: true,
    loginEnabled: null,
    actionLabel: "System",
  },
];

function TogglePill({ checked, onClick }: { checked: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className={`relative inline-flex h-[14px] w-[26px] items-center rounded-full transition duration-75 ${
        checked ? "bg-[#111827]" : "bg-[#D1D5DB]"
      } ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      <span
        className={`inline-block h-[10px] w-[10px] transform rounded-full bg-white transition duration-75 ${
          checked ? "translate-x-[14px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

function getTypeBadgeClass(type: string) {
  if (type === "Email") {
    return "border-[#D1D5DB] text-[#374151]";
  }

  if (type === "Checkbox" || type === "Password") {
    return "border-[#D1D5DB] text-[#374151]";
  }

  return "border-[#D1D5DB] text-[#374151]";
}

function getStatusBadgeClass(tag: string) {
  if (tag === "Visible") {
    return "bg-[#DCFCE7] text-[#16A34A]";
  }

  if (tag === "Hidden") {
    return "bg-[#F3F4F6] text-[#6B7280]";
  }

  if (tag === "Required") {
    return "bg-[#FFEDD5] text-[#F97316]";
  }

  if (tag === "Login") {
    return "bg-[#DBEAFE] text-[#2563EB]";
  }

  return "border border-[#D1D5DB] bg-white text-[#6B7280]";
}

function getStatusBadgeIcon(tag: string) {
  if (tag === "Visible") {
    return <VisibilityOutlinedIcon sx={{ fontSize: 12 }} />;
  }

  if (tag === "Hidden") {
    return <VisibilityOffOutlinedIcon sx={{ fontSize: 12 }} />;
  }

  if (tag === "Login") {
    return <LockOpenOutlinedIcon sx={{ fontSize: 12 }} />;
  }

  return null;
}

function RegistrationConfigAppView() {
  const [registrationFieldsData, setRegistrationFieldsData] = useState(
    initialRegistrationFieldsData
  );
  const [isMpinEnabled, setIsMpinEnabled] = useState(true);

  const loginFieldsSummary = useMemo(() => {
    const loginFields = registrationFieldsData
      .filter((row) => row.visible && row.loginEnabled)
      .map((row) => row.field);

    return loginFields.length > 0 ? loginFields.join(", ") : "None";
  }, [registrationFieldsData]);

  const handleVisibleToggle = useCallback((id: number) => {
    setRegistrationFieldsData((currentRows) =>
      currentRows.map((row) =>
        row.id === id ? { ...row, visible: !row.visible } : row
      )
    );
  }, []);

  const handleRequiredToggle = useCallback((id: number) => {
    setRegistrationFieldsData((currentRows) =>
      currentRows.map((row) =>
        row.id === id ? { ...row, required: !row.required } : row
      )
    );
  }, []);

  const handleLoginEnabledToggle = useCallback((id: number) => {
    setRegistrationFieldsData((currentRows) =>
      currentRows.map((row) =>
        row.id === id && row.loginEnabled !== null
          ? { ...row, loginEnabled: !row.loginEnabled }
          : row
      )
    );
  }, []);

  function handleMpinToggle() {
    setIsMpinEnabled((currentValue) => !currentValue);
  }

  const columns = useMemo<MRT_ColumnDef<RegistrationFieldRow>[]>(
    () => [
      {
        accessorKey: "field",
        header: "Field",
        size: 220,
        Cell: ({ row }) => (
          <div className="flex items-start gap-2">
            <span className="mt-[6px] text-[#9CA3AF]">≡</span>
            <div>
              <p className="text-[#101828] font-poppins text-[12px] font-medium leading-[18px]">
                {row.original.field}
              </p>
              <p className="text-[#9CA3AF] font-poppins text-[9px] font-normal leading-[14px]">
                {row.original.slug}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 110,
        Cell: ({ row }) => (
          <span
            className={`inline-flex rounded-[6px] border px-2 py-[1px] font-poppins text-[9px] font-medium leading-[14px] ${getTypeBadgeClass(
              row.original.type
            )}`}
          >
            {row.original.type}
          </span>
        ),
      },
      {
        accessorKey: "visible",
        header: "Visible",
        size: 90,
        Cell: ({ row }) => (
          <TogglePill
            checked={row.original.visible}
            onClick={() => handleVisibleToggle(row.original.id)}
          />
        ),
      },
      {
        accessorKey: "required",
        header: "Required",
        size: 100,
        Cell: ({ row }) =>
          row.original.visible ? (
            <TogglePill
              checked={row.original.required}
              onClick={() => handleRequiredToggle(row.original.id)}
            />
          ) : (
            <TogglePill checked={false} />
          ),
      },
      {
        accessorKey: "loginEnabled",
        header: "Login Enabled",
        size: 120,
        Cell: ({ row }) =>
          !row.original.visible ? (
            row.original.loginEnabled === null ? (
              <span className="text-[#9CA3AF] font-poppins text-[10px] font-medium leading-[16px]">
                N/A
              </span>
            ) : (
              <TogglePill checked={false} />
            )
          ) : row.original.loginEnabled === null ? (
            <span className="text-[#9CA3AF] font-poppins text-[10px] font-medium leading-[16px]">
              N/A
            </span>
          ) : (
            <TogglePill
              checked={row.original.loginEnabled}
              onClick={() => handleLoginEnabledToggle(row.original.id)}
            />
          ),
      },
      {
        id: "status",
        header: "Status",
        size: 210,
        Cell: ({ row }) => {
          const statusTags = row.original.visible
            ? [
                "Visible",
                row.original.required ? "Required" : "Optional",
                ...(row.original.loginEnabled ? ["Login"] : []),
              ]
            : ["Hidden"];

          return (
            <div className="flex flex-wrap items-center gap-1">
              {statusTags.map((tag) => (
              <span
                key={`${row.original.id}-${tag}`}
                className={`inline-flex items-center gap-[3px] rounded-[999px] px-2 py-[3px] font-poppins text-[9px] font-medium leading-[12px] ${getStatusBadgeClass(
                  tag
                )}`}
              >
                {getStatusBadgeIcon(tag)}
                {tag}
              </span>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "actionLabel",
        header: "Actions",
        size: 90,
        enableSorting: false,
        enableColumnActions: false,
        Cell: ({ row }) => (
          <span className="inline-flex rounded-[6px] bg-[#F3F4F6] px-2 py-[1px] text-[#374151] font-poppins text-[9px] font-semibold leading-[14px]">
            {row.original.actionLabel}
          </span>
        ),
      },
    ],
    [handleLoginEnabledToggle, handleRequiredToggle, handleVisibleToggle]
  );

  return (
    <FusePageSimple
      content={
        <div className="w-full bg-white px-6 py-6">
          <div className="mx-auto w-full max-w-[1120px]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-[19px] font-semibold leading-[28px] text-[#101828] font-geist">
                  Registration Configuration
                </h1>
                <p className="text-[#4A5565] font-poppins text-[11px] font-normal leading-[20px] tracking-[-0.15px]">
                  Configure fields for user registration form
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-[28px] items-center gap-3 rounded-[8px] border border-[#155DFC] bg-white px-[12.617px] pt-[8.248px] pb-[7.748px] text-[12px] font-medium leading-[20px] tracking-[-0.15px] text-[#155DFC] font-poppins"
                >
                  <AddIcon
                    className="-ml-1 w-[13.996px] h-[13.996px]"
                    sx={{ fontSize: 16 }}
                  />
                  Add Custom Field
                </button>

                <button
                  type="button"
                  className="inline-flex h-[28px] items-center gap-3 rounded-[8px] bg-[#155DFC] px-[11.992px] pt-[8.248px] pb-[7.748px] text-[11px] text-white font-poppins text-[12px] font-medium leading-[20px] tracking-[-0.15px]"
                >
                  <img
                    src="/assets/images/apps/profile/Icon.svg"
                    alt="save"
                    className="-ml-1 w-[13.996px] h-[13.996px]"
                  />
                  Save Configuration
                </button>
              </div>
            </div>

            <section
              className={`mt-4 rounded-[14px] border p-4 ${
                isMpinEnabled
                  ? "border-[1.875px] border-[#2B7FFF] bg-[#EFF6FF]"
                  : "border-[#D7DDEA] bg-white"
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 gap-4">
                  <div
                    className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] text-white ${
                      isMpinEnabled ? "bg-[#155DFC]" : "bg-[#98A2B3]"
                    }`}
                  >
                    <ShieldOutlinedIcon sx={{ fontSize: 24 }} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-[15px] font-semibold leading-[24px] text-[#1F2937] font-geist">
                        MPIN Authentication
                      </h2>
                      <span
                        className={`flex h-[17px] items-center justify-center rounded-[8px] border border-transparent px-2 py-[3px] font-poppins text-[10px] font-medium leading-[16px] ${
                          isMpinEnabled
                            ? "bg-[#00C950] text-white"
                            : "bg-[#98A2B3] text-white"
                        }`}
                      >
                        {isMpinEnabled ? "Enabled" : "Disabled"}
                      </span>
                      <span className="flex h-[17px] items-center justify-center rounded-[8px] border border-[#DAB2FF] bg-[#FAF5FF] px-2 text-[#8200DB] font-poppins text-[10px] font-medium leading-none">
                        Mobile Only
                      </span>
                    </div>

                    <p className="mt-1 text-[#4A5565] font-poppins text-[12px] font-normal leading-[20px] tracking-[-0.15px]">
                      Require users to set up a Mobile PIN during registration
                      for enhanced security on mobile devices.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleMpinToggle}
                  className={`inline-flex h-[30px] items-center gap-3 self-start rounded-[8px] px-4 text-[11px] font-medium text-white font-poppins ${
                    isMpinEnabled ? "bg-[#E7000B]" : "bg-[#155DFC]"
                  }`}
                >
                  <LockOutlinedIcon className="-ml-1 w-[15px] h-[15px] " sx={{ fontSize: 15 }} />
                  {isMpinEnabled ? "Disable MPIN" : "Enable MPIN"}
                </button>
              </div>

              {isMpinEnabled ? (
                <>
                  <div className="mt-2 h-[125px] w-[794px] rounded-[10px] border border-[#BEDBFF] bg-[#EFF6FF] p-4 lg:ml-[54px]">
                    <div className=" -mt-2 flex items-center gap-2">
                      <ShieldOutlinedIcon className="stroke-[#1C398E] stroke-[1.333px]" sx={{ fontSize: 14, color: "#1C398E" }} />
                      <h3 className="text-[12px] text-[#1C398E] font-poppins font-semibold leading-[20px] tracking-[-0.15px]">
                        How MPIN Works
                      </h3>
                    </div>

                    <div className="mt-1 space-y-0 -ml-2">
                      {mpinRules.map((rule) => (
                        <p
                          key={rule}
                          className="pl-6 text-[10px] text-[#193CB8] font-poppins font-normal leading-[16px]"
                        >
                          {rule}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3  w-[794px] rounded-[10px] border border-[#BEDBFF] bg-white p-3 lg:ml-[54px]">
                    <label className="block text-[10px] text-[#364153] font-poppins font-semibold leading-[16px]">
                      PIN Length
                    </label>

                    <div className="relative mt-2 max-w-[240px]">
                      <select className="h-[35px] w-full appearance-none rounded-[8px] border border-transparent bg-[#F3F3F5] px-4 pr-9 text-[12px] font-medium text-[#374151] outline-none font-poppins">
                        <option>4 digits</option>
                        <option>6 digits</option>
                      </select>

                      <KeyboardArrowDownIcon
                        sx={{ fontSize: 18 }}
                        className="pointer-events-none absolute right-3 top-[7px] text-[#9CA3AF]"
                      />
                    </div>

                    <p className="mt-2 text-[10px] text-[#6A7282] font-poppins font-normal leading-[16px]">
                      Choose the length of the numeric PIN
                    </p>
                  </div>
                </>
              ) : null}
            </section>

            <div className="mt-5 grid grid-cols-4 gap-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className=" rounded-[14px] border border-[rgba(0,0,0,0.10)] bg-white px-4 py-2 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
                >
                  <p
                    className="text-[#101828] font-geist text-[24px] font-semibold leading-[32px] tracking-[0.07px]"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </p>

                  <p className="-mt-1 text-[#6A7282] font-poppins text-[10px] font-normal leading-[16px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <Paper
              className="mt-5 flex w-full flex-auto flex-col overflow-hidden rounded-[12px]"
              elevation={2}
            >
              <div className="px-4 pt-5 sm:px-6 sm:pt-6">
                <Typography className="text-[#111827] font-geist text-[15px] font-semibold leading-[24px] tracking-[-0.2px]">
                  Registration Fields
                </Typography>
                <Typography className="mt-1 text-[#667085] font-poppins text-[11px] font-normal leading-[18px]">
                  Configure which fields appear on the registration form,
                  whether they are required, and which fields can be used for
                  login
                </Typography>
                <Typography className="mt-3 text-[#16A34A] font-poppins text-[11px] font-semibold leading-[18px]">
                  Users can log in with: {loginFieldsSummary}
                </Typography>
              </div>

              <DataTable
                data={registrationFieldsData}
                columns={columns}
                enableRowActions={false}
                muiTableContainerProps={{
                  className: "flex-auto overflow-x-auto",
                  sx: {
                    "& table": {
                      minWidth: "1080px",
                    },
                  },
                }}
              />
            </Paper>

            <Paper
              className="mt-5 flex w-full flex-auto flex-col overflow-hidden rounded-[12px]"
              elevation={2}
            >
              <div className="px-4 pt-4 sm:px-5 sm:pt-5">
                <Typography className="text-[#111827] font-geist text-[14px] font-semibold leading-[20px]">
                  Form Preview
                </Typography>
                <Typography className="mt-1 text-[#6B7280] font-poppins text-[11px] font-normal leading-[18px]">
                  Preview how the registration form will appear to users
                </Typography>
              </div>

              <div className="flex min-h-[760px] items-start justify-center px-4 py-6 sm:px-5">
                <div className="w-full max-w-[404px] rounded-[12px] border border-[#D8DEE8] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                  <h3 className="text-[#101828] font-geist text-[18px] font-semibold leading-[28px] tracking-[-0.2px]">
                    Create Account
                  </h3>

                  <div className="mt-4 space-y-3.5">
                    {previewFields.map((field) => (
                      <div key={field.label}>
                        {field.type === "checkbox" ? (
                          <label className="flex items-center gap-2 text-[#475467] font-poppins text-[11px] font-normal leading-[18px]">
                            <input
                              type="checkbox"
                              className="h-[14px] w-[14px] rounded-[3px] border border-[#D0D5DD]"
                            />
                            {field.placeholder}
                          </label>
                        ) : (
                          <>
                            <label className="block text-[#101828] font-poppins text-[11px] font-medium leading-[18px]">
                              {field.label}
                              {field.required ? (
                                <span className="ml-1.5 text-[#F04438]">*</span>
                              ) : null}
                            </label>

                            {field.type === "select" ? (
                              <div className="relative mt-1.5">
                                <select className="h-[32px] w-full appearance-none rounded-[8px] border border-transparent bg-[#F5F7FA] px-3 pr-9 text-[11px] font-normal text-[#98A2B3] outline-none font-poppins">
                                  <option>{field.placeholder}</option>
                                </select>

                                <KeyboardArrowDownIcon
                                  sx={{ fontSize: 16 }}
                                  className="pointer-events-none absolute right-3 top-[8px] text-[#D0D5DD]"
                                />
                              </div>
                            ) : (
                              <input
                                type="text"
                                placeholder={field.placeholder}
                                className="mt-1.5 h-[32px] w-full rounded-[8px] border border-transparent bg-[#F5F7FA] px-3 text-[11px] font-normal text-[#98A2B3] outline-none font-poppins placeholder:text-[#B8BFCC]"
                              />
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {isMpinEnabled ? (
                    <div className="mt-4 border-t border-[#B8D1FF] pt-3">
                      <label className="flex items-center gap-1.5 text-[#101828] font-poppins text-[11px] font-medium leading-[18px]">
                        <ShieldOutlinedIcon sx={{ fontSize: 14, color: "#155DFC" }} />
                        MPIN (4 digits - Mobile Only)
                      </label>

                      <input
                        type="text"
                        placeholder="Enter 4-digit MPIN"
                        className="mt-2 h-[32px] w-full rounded-[8px] border border-[#B8D1FF] bg-white px-3 text-[11px] font-normal text-[#98A2B3] outline-none font-poppins placeholder:text-[#B8BFCC]"
                      />

                      <p className="mt-2 flex items-center gap-1.5 text-[#155DFC] font-poppins text-[10px] font-normal leading-[16px]">
                        <span className="h-[8px] w-[8px] rounded-full border border-[#3B82F6]" />
                        Device-specific authentication for mobile users
                      </p>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    className="mt-4 h-[34px] w-full rounded-[8px] bg-[#86A8F7] text-center text-[12px] font-semibold leading-[18px] text-white font-poppins"
                  >
                    Register
                  </button>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      }
    />
  );
}

export default RegistrationConfigAppView;
