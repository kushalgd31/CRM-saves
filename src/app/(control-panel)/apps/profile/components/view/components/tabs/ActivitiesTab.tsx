import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import ActivityGroup from "../common/ActivityGroup";
import { activitySections } from "../../data/profileData";

export default function ActivitiesTab() {
  return (
    <Paper className="relative w-fullrounded-[12px] bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] p-6 shadow-none">
      <div className="mb-5 flex items-center justify-between">
        <Typography className="self-stretch text-[#1F232B] font-poppins text-[14px] font-semibold leading-normal">
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
  );
}
