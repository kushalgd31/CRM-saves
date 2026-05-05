import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography className="mb-3 text-[#4B5563] font-poppins text-[14px] font-semibold uppercase leading-normal">
      {children}
    </Typography>
  );
}
