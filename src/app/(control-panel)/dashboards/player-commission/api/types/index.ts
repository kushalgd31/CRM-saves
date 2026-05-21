export type PlayerCommissionStatusType = 'pending' | 'approved' | 'rejected';

export type PlayerCommissionSummaryCardType = {
	id: string;
	title: string;
	value: number | string;
	time: string;
	rate: string | null;
	status: PlayerCommissionStatusType | 'total';
};

export type PlayerCommissionMetricKey = 'sportsbook' | 'casino' | 'slots' | 'liveCasino';

export type PlayerCommissionRowType = {
	id: string;
	name: string;
	email: string;
	phone: string;
	sportsbook: PlayerCommissionStatusType;
	casino: PlayerCommissionStatusType;
	slots: PlayerCommissionStatusType;
	liveCasino: PlayerCommissionStatusType;
	overallStatus: PlayerCommissionStatusType;
	date: string;
	time: string;
	sportsbookImages: string[];
	casinoImages: string[];
	slotsImages: string[];
	liveCasinoImages: string[];
};
