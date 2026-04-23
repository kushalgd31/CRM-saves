import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

type HeirCardProps = {
    top: string;
    bottom: string;
    value: number|string;
    color: string;
}

function HeirCard({top, bottom, value, color}: HeirCardProps) {
    return (
        <div className="p-4 bg-white shadow rounded border-grey-200 border">
            <div className="flex justify-between mb-2">
          <p className="">{top}</p>
          <FuseSvgIcon className={`text-${color}-500`}>lucide:settings</FuseSvgIcon>
            </div>
          <p className="text-2xl mb-2">{value}</p>
          <p className="text-sm text-gray-500">{bottom}</p>
        </div>
    )
}

export default HeirCard;