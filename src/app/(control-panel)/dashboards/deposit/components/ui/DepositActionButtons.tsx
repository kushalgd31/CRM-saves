import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

type DepositActionButtonsProps = {
	name: string;
	onApprove?: () => void;
	onReject?: () => void;
};

function DepositActionButtons({ name, onApprove, onReject }: DepositActionButtonsProps) {
	return (
		<div className="flex items-center justify-center gap-2">
			<button
				type="button"
				className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm"
				aria-label={`Approve ${name}`}
				onClick={onApprove}
			>
				<FuseSvgIcon size={12}>lucide:check</FuseSvgIcon>
			</button>
			<button
				type="button"
				className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-white shadow-sm"
				aria-label={`Reject ${name}`}
				onClick={onReject}
			>
				<FuseSvgIcon size={12}>lucide:x</FuseSvgIcon>
			</button>
		</div>
	);
}

export default DepositActionButtons;
