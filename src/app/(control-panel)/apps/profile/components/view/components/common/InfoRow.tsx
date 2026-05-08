import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { type ReactNode } from "react";

export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <Typography className="text-[#1F232B] font-poppins text-[11px] font-medium">
        {label}
      </Typography>

      <Box className="text-right text-[#1F232B] font-poppins text-[11px] font-normal">
        {value}
      </Box>
    </div>
  );
}
