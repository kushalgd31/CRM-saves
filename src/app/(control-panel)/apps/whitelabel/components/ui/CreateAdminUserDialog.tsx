import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CreateAdminUserFormData, WhitelabelSite } from '../types';

type CreateAdminUserDialogProps = {
	formData: CreateAdminUserFormData;
	isCreating: boolean;
	open: boolean;
	selectedSite: WhitelabelSite | null;
	onClose: () => void;
	onFormDataChange: (formData: CreateAdminUserFormData) => void;
	onCreateUser: () => void | Promise<void>;
};

const inputClassName =
	'h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 text-[14px] text-[#101828] placeholder-[#98a2b3] outline-none transition-colors focus:border-[#155dfc] focus:ring-1 focus:ring-[#155dfc]';

const labelClassName = 'mb-1.5 block text-[13px] font-semibold text-[#344054]';

function CreateAdminUserDialog({
	formData,
	isCreating,
	open,
	selectedSite,
	onClose,
	onFormDataChange,
	onCreateUser
}: CreateAdminUserDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={false}
			slotProps={{
				paper: {
					className:
						'm-0 ml-auto h-full max-h-none w-full max-w-[640px] overflow-hidden rounded-l-[28px] rounded-r-none bg-white shadow-2xl'
				}
			}}
		>
			<div className="flex h-full flex-col bg-white font-['Geist']">
				<div className="border-b border-[#eaecf0] px-6 pt-5 pb-4">
					<div className="flex items-start justify-between">
						<div>
							<Typography className="font-['Geist'] text-[20px] leading-7 font-bold text-[#101828]">
								Create User
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#667085]">
								{selectedSite ? `Add user to ${selectedSite.name}` : 'Add user to whitelabel'}
							</Typography>
						</div>
						<IconButton
							onClick={onClose}
							className="text-[#98a2b3] hover:text-[#344054]"
							size="small"
							aria-label="Close create user popup"
						>
							<FuseSvgIcon size={18}>lucide:x</FuseSvgIcon>
						</IconButton>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto px-6 py-6">
					<div className="space-y-5">
						<div className="grid grid-cols-2 gap-5">
							<div>
								<label className={labelClassName}>
									Email <span className="text-[#f04438]">*</span>
								</label>
								<input
									type="email"
									placeholder="user@example.com"
									value={formData.email}
									onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
									className={inputClassName}
								/>
							</div>
							<div>
								<label className={labelClassName}>
									Name <span className="text-[#f04438]">*</span>
								</label>
								<input
									type="text"
									placeholder="Enter name"
									value={formData.name}
									onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
									className={inputClassName}
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-5">
							<div>
								<label className={labelClassName}>
									Password <span className="text-[#f04438]">*</span>
								</label>
								<input
									type="password"
									placeholder="Minimum 8 characters"
									value={formData.password}
									onChange={(e) => onFormDataChange({ ...formData, password: e.target.value })}
									className={inputClassName}
								/>
							</div>
							<div>
								<label className={labelClassName}>
									Role Type <span className="text-[#f04438]">*</span>
								</label>
								<select
									value={formData.roleType}
									onChange={(e) =>
										onFormDataChange({
											...formData,
											roleType: e.target.value as CreateAdminUserFormData['roleType']
										})
									}
									className={inputClassName}
								>
									<option value="admin">Admin</option>
									<option value="sub_admin">Sub Admin</option>
									<option value="agent">Agent</option>
								</select>
							</div>
						</div>

						<div className="rounded-xl border border-[#d0d5ff] bg-[#eff2ff] px-4 py-4">
							<Typography className="font-['Geist'] text-[14px] leading-5 font-semibold text-[#101828]">
								Admin Login Access
							</Typography>
							<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#667085]">
								The user will be able to sign in with the email and password entered here.
							</Typography>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
					<Button
						variant="outlined"
						onClick={onClose}
						className="h-10 rounded-lg border-[#d0d5dd] px-5 font-['Geist'] text-[13px] font-semibold text-[#344054] shadow-none hover:bg-[#f9fafb]"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={onCreateUser}
						disabled={isCreating}
						loading={isCreating}
						className="h-10 rounded-lg bg-[#155dfc] px-5 font-['Geist'] text-[13px] font-semibold text-white shadow-none hover:bg-[#1249d6]"
					>
						{isCreating ? 'Creating...' : 'Create User'}
					</Button>
				</div>
			</div>
		</Dialog>
	);
}

export default CreateAdminUserDialog;
