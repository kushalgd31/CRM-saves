import { http, HttpResponse } from 'msw';

const withdrawRows = [
	{
		id: 'wd-1001',
		username: 'rahulsharma',
		amount: 'INR 25,000',
		method: 'IMPS',
		status: 'Pending',
		age: '12m',
		kyc: 'Approved',
		flags: 'Low Risk',
		phoneNo: '+91 98765 43210',
		ip: '123.77.998.101',
		os: 'Windows',
		device: 'Desktop',
		agentName: 'Pankaj Solanki',
		accName: 'Rahul Sharma',
		accNumber: 'XXXXXX4521',
		ifsc: 'HDFC0002451',
		upiId: 'rahul@okhdfcbank',
		qr: 'Available',
		riskPercentage: '4%',
		lastDeposit: 'INR 54,000',
		totalDeposit: 'INR 3,40,000',
		totalWithdraw: 'INR 1,10,000',
		ggr: 'INR 22,400',
		betsCountSinceLastDeposit: 'Sports: 18 | Casino: 7',
		betsValueSinceLastDeposit: 'Sports: INR 45,000 | Casino: INR 18,000',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg'
	},
	{
		id: 'wd-1002',
		username: 'priyapatel',
		amount: 'INR 18,500',
		method: 'UPI',
		status: 'Approved',
		age: '8m',
		kyc: 'Approved',
		flags: 'Verified',
		phoneNo: '+91 98765 43211',
		ip: '123.77.998.102',
		os: 'Android',
		device: 'Mobile',
		agentName: 'Vikas Mehra',
		accName: 'Priya Patel',
		accNumber: 'XXXXXX7712',
		ifsc: 'ICIC0009811',
		upiId: 'priya@okicici',
		qr: 'Uploaded',
		riskPercentage: '2%',
		lastDeposit: 'INR 78,500',
		totalDeposit: 'INR 5,12,000',
		totalWithdraw: 'INR 1,88,500',
		ggr: 'INR 41,300',
		betsCountSinceLastDeposit: 'Sports: 9 | Casino: 13',
		betsValueSinceLastDeposit: 'Sports: INR 21,000 | Casino: INR 36,000',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg'
	},
	{
		id: 'wd-1003',
		username: 'amitkumar',
		amount: 'INR 42,250',
		method: 'IMPS',
		status: 'Review',
		age: '4m',
		kyc: 'Partial',
		flags: 'Doc Mismatch',
		phoneNo: '+91 98765 43212',
		ip: '123.77.998.103',
		os: 'iOS',
		device: 'Mobile',
		agentName: 'Nitin Arora',
		accName: 'Amit Kumar',
		accNumber: 'XXXXXX9904',
		ifsc: 'SBIN0007788',
		upiId: 'amit@oksbi',
		qr: 'Pending',
		riskPercentage: '9%',
		lastDeposit: 'INR 31,250',
		totalDeposit: 'INR 2,76,000',
		totalWithdraw: 'INR 82,000',
		ggr: 'INR 9,200',
		betsCountSinceLastDeposit: 'Sports: 4 | Casino: 15',
		betsValueSinceLastDeposit: 'Sports: INR 8,000 | Casino: INR 28,000',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg'
	},
	{
		id: 'wd-1004',
		username: 'simranbedi',
		amount: 'INR 12,900',
		method: 'UPI',
		status: 'Pending',
		age: '9m',
		kyc: 'Approved',
		flags: 'Clean',
		phoneNo: '+91 98765 43215',
		ip: '123.77.998.106',
		os: 'Android',
		device: 'Mobile',
		agentName: 'Amit Suri',
		accName: 'Simran Bedi',
		accNumber: 'XXXXXX1126',
		ifsc: 'AXIS0001031',
		upiId: 'simran@okaxis',
		qr: 'Available',
		riskPercentage: '3%',
		lastDeposit: 'INR 64,900',
		totalDeposit: 'INR 4,18,000',
		totalWithdraw: 'INR 96,000',
		ggr: 'INR 33,500',
		betsCountSinceLastDeposit: 'Sports: 11 | Casino: 6',
		betsValueSinceLastDeposit: 'Sports: INR 19,500 | Casino: INR 12,000',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg'
	}
];

<<<<<<< HEAD
const withdrawDashboardApi = [
	http.get('/api/mock/withdraw-dashboard/rows', async () => {
		return HttpResponse.json(withdrawRows);
=======
const withdrawSummary = [
	{
		id: '1',
		title: 'Total Withdrawals',
		value: '2,23,388',
		footnotes: [
			{ label: '240 Requests', color: 'green' },
			{ label: '22 FTW Today', color: 'green' }
		]
	},
	{
		id: '2',
		title: 'Pending Approval',
		value: '40,218',
		footnotes: [
			{ label: '12 Pending', color: 'green' },
			{ label: '42 Rejected', color: 'red' }
		]
	}
];

const withdrawHealth = {
	title: 'Payment Gateway Health',
	badgeLabel: 'Stable',
	metrics: [
		{ id: 'upi', label: 'UPI', value: 94.2, color: 'green' },
		{ id: 'imps', label: 'IMPS', value: 91.8, color: 'green' },
		{ id: 'netbanking', label: 'Net Banking', value: 87.2, color: 'amber' },
		{ id: 'cards', label: 'Cards', value: 72.2, color: 'red' }
	],
	note: 'Cards gateway degraded since 11:40 AM - 23 failed transactions, ₹1.2L stuck. Provider: PayU.'
};

const withdrawDashboardApi = [
	http.get('/api/mock/withdraw-dashboard/rows', async () => {
		return HttpResponse.json(withdrawRows);
	}),
	http.get('/api/mock/withdraw-dashboard/summary', async () => {
		return HttpResponse.json(withdrawSummary);
	}),
	http.get('/api/mock/withdraw-dashboard/health', async () => {
		return HttpResponse.json(withdrawHealth);
>>>>>>> b38b221830ba5bff29df10281ef1a567ea61cc2c
	})
];

export default withdrawDashboardApi;
