export type KycStatusType = 'pending' | 'approved' | 'rejected' ;

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
	date: string;
	time: string;
	panCardImages: string[];
	idProofImages: string[];
	selfieImages: string[];
	bankAccountImages: string[];
};
