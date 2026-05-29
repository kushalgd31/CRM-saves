import { Drawer } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { DeviceHistoryItem } from "../../types";

export default function DeviceHistoryDrawer({
  open,
  onClose,
  history,
}: {
  open: boolean;
  onClose: () => void;
  history: DeviceHistoryItem[];
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        className:
          "w-full max-w-[300px] sm:max-w-[400px] bg-white shadow-[-8px_0_24px_rgba(15,23,42,0.12)]",
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[#CBD0D8] bg-white px-4 py-3">
          <Typography className="w-[221px] flex-shrink-0 text-[#1F232B] font-poppins text-[14px] font-semibold not-italic leading-normal">
            Devices
          </Typography>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close device history"
            className="flex h-5 w-5 items-center justify-center"
          >
            <img
              src="/assets/images/apps/profile/vector.svg"
              alt="close"
              className="w-[14px] h-[14px]"
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          

          {history.map((item, index) => (
            <div
              key={`${item.date}-${item.device}-${index}`}
              className="grid grid-cols-[1fr_auto] border-b border-[#EEE]  mx-5 py-3"
            >
              <Typography className="text-[#1F232B] font-poppins text-[12px] font-semibold not-italic leading-normal">
                {item.date}
              </Typography>
              <Typography className="text-[#4B5563] font-poppins text-[12px] font-medium not-italic leading-normal">
                {item.device}
              </Typography>
            </div>
          ))}
        </div>

        <div className=" px-4 py-4">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-[181.5px] px-[10px] py-[11px] justify-center items-center gap-[10px] rounded-[8px] border border-[#1566C0] bg-white text-[#2D3E55] font-poppins text-[13px]"
            >
              Cancel
            </button>

            <button
              type="button"
              className="flex w-[181.5px] px-[10px] py-[11px] justify-center items-center gap-[10px] rounded-[8px] bg-[#1566C0] text-white font-poppins text-[13px] font-medium not-italic leading-normal"
            >
              + Create Task
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
