export type ProductOption = {
	id: string;
	name: string;
	icon: string;
};

export type WhitelabelMetric = {
	title: string;
	value: number | string;
	label: string;
	color: string;
};

export type WhitelabelSite = {
	id: string;
	name: string;
	spoc: string;
	support: string;
	domain: string;
	productionDomain?: string;
	appId: string;
	products: string[];
	totalPlayers: string;
	activePlayers: string;
	bets: string;
	deposits: string;
	withdrawals: string;
	revenue: string;
	lastDate: string;
	lastTime: string;
	created: string;
	status: 'Active' | 'Inactive';
};

export type WhitelabelFormData = {
	name: string;
	spoc: string;
	supportGroup: string;
	productionDomain: string;
	testDomain: string;
};

export type CreateAdminUserFormData = {
	email: string;
	name: string;
	password: string;
	permissionRoleId: string;
	roleType: 'admin' | 'sub_admin' | 'agent';
	department: string;
	status: 'active' | 'inactive';
	google2faRequired: boolean;
	mpinRequired: boolean;
	mpinDigits: 4 | 6;
	ipWhitelist: string;
	piiMasking: boolean;
};
