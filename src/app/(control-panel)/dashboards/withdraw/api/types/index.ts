export type WithdrawRowType = {
	id: string;
	username: string;
	amount: string;
	method: 'IMPS' | 'UPI';
	status: string;
	age: string;
	kyc: string;
	flags: string;
	phoneNo: string;
	ip: string;
	os: string;
	device: string;
	agentName: string;
	accName: string;
	accNumber: string;
	ifsc: string;
	upiId: string;
	qr: string;
	riskPercentage: string;
	lastDeposit: string;
	totalDeposit: string;
	totalWithdraw: string;
	ggr: string;
	betsCountSinceLastDeposit: string;
	betsValueSinceLastDeposit: string;
	coverImageUrl: string;
	screenshotUrl: string;
};
<<<<<<< HEAD
=======

export type WithdrawSummaryCardType = {
	id: string;
	title: string;
	value: string;
	footnotes: {
		label: string;
		color: 'green' | 'red' | 'amber';
	}[];
};

export type WithdrawHealthMetricType = {
	id: string;
	label: string;
	value: number;
	color: 'green' | 'red' | 'amber';
};

export type WithdrawHealthType = {
	title: string;
	badgeLabel: string;
	metrics: WithdrawHealthMetricType[];
	note: string;
};
>>>>>>> b38b221830ba5bff29df10281ef1a567ea61cc2c
