import { Button } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { PlayerCommissionStatusType } from '../../api/types';

type VerifyCardProps = {
	title: string;
	status: PlayerCommissionStatusType;
	images: string[];
	onApprove?: () => void;
	onReject?: () => void;
	onVerify?: () => void;
};

export default function VerifyCard({ title, images, onApprove, onReject, onVerify }: VerifyCardProps) {
	return (
		<div className="rounded-lg border p-3">
			<div className="mb-2 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<img
						src="./assets/images/demo-content/fi_16194786.svg"
						alt=""
					/>
					<p className="mt-1 font-semibold">{title}</p>
				</div>
				<FuseSvgIcon className="text-orange-400">lucide:clock-4</FuseSvgIcon>
			</div>

			<div className="mb-2 flex gap-2">
				{images.map((src, index) => (
					<div
						key={index}
						className="flex-1 overflow-hidden rounded bg-slate-100"
					>
						<img
							className="h-[140px] w-full object-cover"
							src={src}
							alt={`${title} ${index + 1}`}
						/>
					</div>
				))}
			</div>

			<div className="mb-2 flex justify-center gap-2">
				<Button
					size="small"
					variant="contained"
					fullWidth
					color="success"
					onClick={onApprove}
				>
					Approve
				</Button>
				<Button
					size="small"
					variant="contained"
					fullWidth
					color="error"
					onClick={onReject}
				>
					Reject
				</Button>
			</div>

			<Button
				size="small"
				variant="contained"
				fullWidth
				onClick={onVerify}
			>
				Mark Pending
			</Button>
		</div>
	);
}
