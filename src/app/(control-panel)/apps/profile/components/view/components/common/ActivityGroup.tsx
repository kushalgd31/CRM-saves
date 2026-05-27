import Typography from "@mui/material/Typography";
import type { ActivityItem } from "../../types";

export default function ActivityGroup({
  title,
  items,
}: {
  title: string;
  items: ActivityItem[];
}) {
  return (
    <div className="mb-4">
      <Typography className="mb-3 mt-3 text-[#4B5563] font-poppins text-[11px] font-semibold leading-normal uppercase ml-1">
        {title}
      </Typography>

      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-2">
          <Typography className="text-[#1F232B] font-poppins text-[10px] font-semibold leading-normal ml-1">
            {item.title}
          </Typography>
          <Typography className="mt-1 text-[#4B5563] font-poppins text-[10px] font-medium leading-normal ml-1">
            {item.time}
          </Typography>
        </div>
      ))}
    </div>
  );
}
