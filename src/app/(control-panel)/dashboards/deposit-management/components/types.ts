export type DepositMethodType = 'Gateway' | 'Manual' | 'Auto';
export type DepositMethodStatus = 'Active' | 'Inactive';

export type DepositSummaryCard = {
	id: string;
	label: string;
	value: string;
	color: string;
};

export type DepositMethod = {
	id: string;
	name: string;
	provider: string;
	type: DepositMethodType;
	icon: string;
	iconClass: string;
	success: number;
	failure: number;
	pending?: number;
	successRate: string;
	totalAmount: string;
	fee: string;
	lastActiveDate: string;
	lastActiveTime: string;
	availability: string[];
	status: DepositMethodStatus;
	enabled: boolean;
	minAmount: string;
	maxAmount: string;
	feeValue: string;
	feeType: string;
	currency: string;
	processingTime: string;
	userAvailability: string;
	apiKey: string;
	secretKey: string;
	displayPriority: string;
	typeLabel?: string;
	iconLabel?: string;
};
