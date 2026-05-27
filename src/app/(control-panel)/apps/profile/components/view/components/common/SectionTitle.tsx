import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";

export default function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography className="mb-1 ml-1 text-[#4B5563] font-poppins text-[11px] font-semibold uppercase leading-normal">
      {children}
    </Typography>
  );
}
