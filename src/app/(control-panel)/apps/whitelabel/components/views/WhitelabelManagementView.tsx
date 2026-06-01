'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { HTTPError } from 'ky';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { createAdminUser, createWhitelabel, getPermissionRoles, getWhitelabelApps } from '@auth/authApi';
import { productOptions, whitelabelMetrics } from '../data/whitelabelMockData';
import CreateAdminUserDialog from '../ui/CreateAdminUserDialog';
import CreateWhitelabelDialog from '../ui/CreateWhitelabelDialog';
import WhitelabelDetailsView from '../ui/WhitelabelDetailsView';
import WhitelabelSitesTable from '../ui/WhitelabelSitesTable';
import WhitelabelSummaryCards from '../ui/WhitelabelSummaryCards';
import { CreateAdminUserFormData, WhitelabelFormData, WhitelabelSite } from '../types';

const defaultSelectedProducts = ['casino', 'matka'];
const emptyFormData: WhitelabelFormData = {
	name: '',
	spoc: '',
	supportGroup: '',
	productionDomain: '',
	testDomain: '',
	admin_name: '',
	admin_email: '',
	admin_password: ''
};

const emptyAdminUserFormData: CreateAdminUserFormData = {
	email: '',
	name: '',
	password: '',
	confirmPassword: '',
	permissionRoleId: '',
	roleType: 'admin',
	department: '',
	status: 'active',
	google2faRequired: true,
	mpinRequired: true,
	mpinDigits: 4,
	ipWhitelist: '',
	piiMasking: true
};

const formatDate = (value?: string) => {
	if (!value) {
		return '-';
	}

	return new Intl.DateTimeFormat('en-CA').format(new Date(value));
};

const formatTime = (value?: string) => {
	if (!value) {
		return '-';
	}

	return new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(new Date(value));
};

const formatProductName = (product: string) =>
	product
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

function WhitelabelManagementView() {
	const { enqueueSnackbar } = useSnackbar();
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
	const [isCreatingUser, setIsCreatingUser] = useState(false);
	const [whitelabelRows, setWhitelabelRows] = useState<WhitelabelSite[]>([]);
	const [selectedSite, setSelectedSite] = useState<WhitelabelSite | null>(null);
	const [selectedUserSite, setSelectedUserSite] = useState<WhitelabelSite | null>(null);
	const [activeTab, setActiveTab] = useState(0);
	const [selectedProducts, setSelectedProducts] = useState<string[]>(defaultSelectedProducts);
	const [formData, setFormData] = useState<WhitelabelFormData>(emptyFormData);
	const [adminUserFormData, setAdminUserFormData] = useState<CreateAdminUserFormData>(emptyAdminUserFormData);

	const loadWhitelabels = useCallback(async () => {
		try {
			const response = await getWhitelabelApps();

			setWhitelabelRows(
				response.data.map((app) => ({
					id: app.id,
					name: app.name,
					spoc: app.spoc || '-',
					support: app.support_email || '-',
					domain: app.production_domain || app.test_domain || '-',
					productionDomain: app.production_domain,
					appId: app.app_id,
					products: app.products.map(formatProductName),
					totalPlayers: '0',
					activePlayers: '0',
					bets: '0',
					deposits: '0',
					withdrawals: '0',
					revenue: '0',
					lastDate: formatDate(app.updated_at || app.created_at),
					lastTime: formatTime(app.updated_at || app.created_at),
					created: formatDate(app.created_at),
					status: app.status?.toLowerCase() === 'active' ? 'Active' : 'Inactive'
				}))
			);
		} catch (error) {
			const message =
				error instanceof HTTPError
					? await error.response.text()
					: error instanceof Error
						? error.message
						: 'Unable to load whitelabels.';

			enqueueSnackbar(message || 'Unable to load whitelabels.', { variant: 'error' });
		}
	}, [enqueueSnackbar]);

	useEffect(() => {
		loadWhitelabels();
	}, [loadWhitelabels]);

	const handleToggleProduct = (productId: string) => {
		setSelectedProducts((prev) =>
			prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
		);
	};

	const createAppId = (name: string) => {
		const slug = name
			.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

		return `wl-${slug || 'app'}-${Date.now().toString(36)}`;
	};

	const handleCreateWhitelabel = async () => {
		const missingBasicInfo =
			!formData.name.trim() ||
			!formData.spoc.trim() ||
			!formData.supportGroup.trim() ||
			!formData.productionDomain.trim() ||
			!formData.testDomain.trim();

		if (missingBasicInfo) {
			setActiveTab(0);
			enqueueSnackbar('Please fill all required whitelabel details.', { variant: 'warning' });
			return;
		}

		if (selectedProducts.length === 0) {
			setActiveTab(1);
			enqueueSnackbar('Please select at least one product.', { variant: 'warning' });
			return;
		}

		const missingAdminInfo =
			!formData.admin_name.trim() ||
			!formData.admin_email.trim() ||
			!formData.admin_password.trim();

		if (missingAdminInfo) {
			setActiveTab(2);
			enqueueSnackbar('Please fill all required admin details.', { variant: 'warning' });
			return;
		}

		if (formData.admin_password.length < 8) {
			setActiveTab(2);
			enqueueSnackbar('Admin password must be at least 8 characters.', { variant: 'warning' });
			return;
		}

		try {
			setIsCreating(true);
			await createWhitelabel({
				app_id: createAppId(formData.name),
				name: formData.name.trim(),
				spoc: formData.spoc.trim(),
				support_email: formData.supportGroup.trim(),
				production_domain: formData.productionDomain.trim(),
				test_domain: formData.testDomain.trim(),
				products: selectedProducts,
				admin_name: formData.admin_name.trim(),
				admin_email: formData.admin_email.trim(),
				admin_password: formData.admin_password,
				registration_config: {}
			});

			enqueueSnackbar('Whitelabel created successfully.', { variant: 'success' });
			handleCloseCreate();
			await loadWhitelabels();
		} catch (error) {
			const message =
				error instanceof HTTPError
					? await error.response.text()
					: error instanceof Error
						? error.message
						: 'Unable to create whitelabel.';

			enqueueSnackbar(message || 'Unable to create whitelabel.', { variant: 'error' });
		} finally {
			setIsCreating(false);
		}
	};

	const handleCloseCreate = () => {
		setIsCreateOpen(false);
		setActiveTab(0);
		setSelectedProducts(defaultSelectedProducts);
		setFormData(emptyFormData);
	};

	const handleOpenCreateUser = (site: WhitelabelSite) => {
		setSelectedUserSite(site);
		setAdminUserFormData(emptyAdminUserFormData);
		setIsCreateUserOpen(true);
	};

	const handleCloseCreateUser = () => {
		setIsCreateUserOpen(false);
		setSelectedUserSite(null);
		setAdminUserFormData(emptyAdminUserFormData);
	};

	const handleCreateUser = async () => {
		if (!selectedUserSite) {
			enqueueSnackbar('Please select a whitelabel first.', { variant: 'warning' });
			return;
		}

		const missingRequiredInfo =
			!adminUserFormData.email.trim() || !adminUserFormData.name.trim() || !adminUserFormData.password.trim();

		if (missingRequiredInfo) {
			enqueueSnackbar('Please fill email, name, and password.', { variant: 'warning' });
			return;
		}

		if (adminUserFormData.password.length < 8) {
			enqueueSnackbar('Password must be at least 8 characters.', { variant: 'warning' });
			return;
		}

		if (adminUserFormData.password !== adminUserFormData.confirmPassword) {
			enqueueSnackbar('Passwords do not match.', { variant: 'warning' });
			return;
		}

		try {
			setIsCreatingUser(true);
			const rolesResponse = await getPermissionRoles(selectedUserSite.appId);
			const permissionRole = rolesResponse.data.find((role) => role.role_type === adminUserFormData.roleType);

			if (!permissionRole) {
				enqueueSnackbar(`No ${adminUserFormData.roleType} permission role found for this whitelabel.`, {
					variant: 'warning'
				});
				return;
			}

			const response = await createAdminUser(selectedUserSite.appId, {
				email: adminUserFormData.email.trim(),
				name: adminUserFormData.name.trim(),
				password: adminUserFormData.password,
				permission_role_id: permissionRole.id,
				role_type: adminUserFormData.roleType,
				department: adminUserFormData.department.trim() || 'Admin',
				status: 'active',
				security_settings: {
					google_2fa_required: true,
					mpin_required: true,
					mpin_digits: 4
				},
				restrictions: {
					ip_whitelist: [],
					pii_masking: true,
					time_window: null,
					geo_restriction: null
				}
			});

			if (response.success === false) {
				throw new Error(response.message || 'Unable to create user.');
			}

			enqueueSnackbar('User created successfully.', { variant: 'success' });
			handleCloseCreateUser();
		} catch (error) {
			const message =
				error instanceof HTTPError
					? await error.response.text()
					: error instanceof Error
						? error.message
						: 'Unable to create user.';

			enqueueSnackbar(message || 'Unable to create user.', { variant: 'error' });
		} finally {
			setIsCreatingUser(false);
		}
	};

	return (
		<>
			<FusePageSimple
				content={
					selectedSite ? (
						<WhitelabelDetailsView
							site={selectedSite}
							onBack={() => setSelectedSite(null)}
						/>
					) : (
						<div className="min-h-full bg-[#f8fafc] px-8 py-7 font-['Geist']">
							<div className="mb-6 flex items-start justify-between">
								<div>
									<Typography className="font-['Geist'] text-[24px] leading-8 font-bold text-[#101828]">
										Whitelabel Management
									</Typography>
									<Typography className="mt-1 font-['Geist'] text-[13px] leading-5 text-[#4A5565]">
										Create and manage whitelabel sites with custom branding
									</Typography>
								</div>
								<Button
									variant="contained"
									startIcon={<FuseSvgIcon size={15}>lucide:plus</FuseSvgIcon>}
									className="h-10 rounded-md bg-[#155dfc] px-4 font-['Geist'] text-[12px] font-semibold text-white shadow-none hover:bg-[#155dfc]"
									onClick={() => setIsCreateOpen(true)}
								>
									Create Whitelabel
								</Button>
							</div>

							<WhitelabelSummaryCards metrics={whitelabelMetrics} />
							<WhitelabelSitesTable
								rows={whitelabelRows}
								onCreateUser={handleOpenCreateUser}
								onViewSite={setSelectedSite}
							/>
						</div>
					)
				}
			/>

			<CreateWhitelabelDialog
				activeTab={activeTab}
				formData={formData}
				isCreating={isCreating}
				open={isCreateOpen}
				productOptions={productOptions}
				selectedProducts={selectedProducts}
				onClose={handleCloseCreate}
				onFormDataChange={setFormData}
				onTabChange={setActiveTab}
				onToggleProduct={handleToggleProduct}
				handleCreateWhitelabel={handleCreateWhitelabel}
			/>

			<CreateAdminUserDialog
				formData={adminUserFormData}
				isCreating={isCreatingUser}
				open={isCreateUserOpen}
				selectedSite={selectedUserSite}
				onClose={handleCloseCreateUser}
				onFormDataChange={setAdminUserFormData}
				onCreateUser={handleCreateUser}
			/>
		</>
	);
}

export default WhitelabelManagementView;
