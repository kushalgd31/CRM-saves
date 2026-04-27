export type DepositSummaryCardType = {
	id: string;
	title: string;
	value: string;
	footnotes: {
		label: string;
		color: 'green' | 'red' | 'amber';
	}[];
};

export type DepositHealthMetricType = {
	id: string;
	label: string;
	value: number;
	color: 'green' | 'red' | 'amber';
};

export type DepositHealthType = {
	title: string;
	badgeLabel: string;
	metrics: DepositHealthMetricType[];
	note: string;
};

export type DepositRowType = {
	id: string;
	username: string;
	amount: string;
	method: string;
	status: string;
	age: string;
	kyc: string;
	flags: string;
	phoneNo: string;
	ip: string;
	os: string;
	device: string;
	agentName: string;
	utr: string;
	riskPercentage: string;
	time: string;
	remark: string;
	screenshotUrl: string;
	coverImageUrl: string;
};
