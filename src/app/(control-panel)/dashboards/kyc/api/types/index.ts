export type KycStatusType = 'pending' | 'approved' | 'rejected' | 'partial';

export type KycSummaryCardType = {
	id: string;
	title: string;
	value: number;
	icon: string;
	status: KycStatusType | 'total';
};

export type KycUserRowType = {
	id: string;
	name: string;
	email: string;
	phone: string;
	panCard: KycStatusType;
	idProof: KycStatusType;
	selfie: KycStatusType;
	bankAccount: KycStatusType;
	overallStatus: KycStatusType;
};
