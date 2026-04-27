import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { KycStatusType } from '../../api/types';

const statusClassMap: Record<KycStatusType, string> = {
pending: 'bg-amber-200 text-amber-700',
approved: 'bg-emerald-200 text-emerald-700',
rejected: 'bg-linear-to-b from-ffffff to-rose-300 text-rose-700',
};

type VerifyCardProps = {
title: string;
status: KycStatusType;
images: string[];
onApprove?: () => void;
onReject?: () => void;
onVerify?: () => void;
};

export default function VerifyCard({
title,
status,
images,
onApprove,
onReject,
onVerify
}: VerifyCardProps) {
return (
<div className="border rounded-lg p-3">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2">
<img src="./public/assets/images/demo-content/fi_16194786.svg"/>
<p className="font-semibold mt-1">{title}</p>
</div>
<FuseSvgIcon className='text-orange-400'>lucide:clock-4</FuseSvgIcon>
</div>

<div className="flex gap-2 mb-2">
{images.map((src, index) => (
<div key={index} className="flex-1 overflow-hidden rounded bg-slate-100">
<img
className="h-[140px] w-full object-cover"
src={src}
alt={`${title} ${index + 1}`}
/>
</div>
))}
</div>

<div className="flex gap-2 justify-center mb-2">
<Button size="small" variant="contained" fullWidth color="success" onClick={onApprove}>
Approve
</Button>
<Button size="small" variant="contained" fullWidth color="error" onClick={onReject}>
Reject
</Button>
</div>

<Button
size="small"
variant="contained"
fullWidth
onClick={onVerify}
>
Verify with 3rd Party
</Button>
</div>
);
}
