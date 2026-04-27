import { http, HttpResponse } from 'msw';

const depositSummary = [
	{
		id: 'total-deposits',
		title: 'Total Deposits',
		value: '2,23,388',
		footnotes: [
			{ label: '240 Requests', color: 'green' },
			{ label: '22 FTD Today', color: 'green' }
		]
	},
	{
		id: 'pending-approval',
		title: 'Pending Approval',
		value: '40,218',
		footnotes: [
			{ label: '12 Pending', color: 'green' },
			{ label: '42 Rejected', color: 'red' }
		]
	}
];

const depositHealth = {
	title: 'Payment Gateway Health',
	badgeLabel: 'R',
	metrics: [
		{ id: 'upi', label: 'UPI', value: 94.2, color: 'green' },
		{ id: 'imps', label: 'IMPS', value: 91.8, color: 'green' },
		{ id: 'net-banking', label: 'Net Banking', value: 87.2, color: 'amber' },
		{ id: 'cards', label: 'Cards', value: 72.2, color: 'red' }
	],
	note: 'Cards gateway degraded since 11:40 AM - 23 failed transactions, INR1.2L stuck, Provider: PayU.'
};

const depositRows = [
	{
		id: '5454-1',
		username: 'rahulsharma',
		amount: 'INR 54,000',
		method: 'UPI',
		status: 'Pending',
		age: '12m',
		kyc: 'Approved',
		flags: 'Low Risk',
		phoneNo: '+91 98765 43210',
		ip: '123.77.998.101',
		os: 'Windows',
		device: 'Desktop',
		agentName: 'Pankaj Solanki',
		utr: 'UTR-5454-1',
		riskPercentage: '4%',
		time: '12/Mar/2026 10:20 AM',
		remark: 'Pending verification',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg'
	},
	{
		id: '5454-2',
		username: 'priyapatel',
		amount: 'INR 78,500',
		method: 'IMPS',
		status: 'Approved',
		age: '8m',
		kyc: 'Approved',
		flags: 'Verified',
		phoneNo: '+91 98765 43211',
		ip: '123.77.998.102',
		os: 'Android',
		device: 'Mobile',
		agentName: 'Vikas Mehra',
		utr: 'UTR-5454-2',
		riskPercentage: '2%',
		time: '12/Mar/2026 11:05 AM',
		remark: 'Processed successfully',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg'
	},
	{
		id: '5454-3',
		username: 'amitkumar',
		amount: 'INR 31,250',
		method: 'Net Banking',
		status: 'Review',
		age: '4m',
		kyc: 'Partial',
		flags: 'Doc Mismatch',
		phoneNo: '+91 98765 43212',
		ip: '123.77.998.103',
		os: 'iOS',
		device: 'Mobile',
		agentName: 'Nitin Arora',
		utr: 'UTR-5454-3',
		riskPercentage: '9%',
		time: '12/Mar/2026 12:42 PM',
		remark: 'Manual review required',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg'
	},
	{
		id: '5454-4',
		username: 'nehasingh',
		amount: 'INR 95,000',
		method: 'UPI',
		status: 'Pending',
		age: '15m',
		kyc: 'Approved',
		flags: 'High Value',
		phoneNo: '+91 98765 43213',
		ip: '123.77.998.104',
		os: 'Windows',
		device: 'Laptop',
		agentName: 'Pankaj Solanki',
		utr: 'UTR-5454-4',
		riskPercentage: '6%',
		time: '12/Mar/2026 01:10 PM',
		remark: 'Awaiting bank callback',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg'
	},
	{
		id: '5454-5',
		username: 'deepakroy',
		amount: 'INR 22,400',
		method: 'Cards',
		status: 'Rejected',
		age: '2m',
		kyc: 'Pending',
		flags: 'Card Decline',
		phoneNo: '+91 98765 43214',
		ip: '123.77.998.105',
		os: 'MacOS',
		device: 'Desktop',
		agentName: 'Rohit Jain',
		utr: 'UTR-5454-5',
		riskPercentage: '11%',
		time: '12/Mar/2026 02:18 PM',
		remark: 'Gateway rejected transaction',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg'
	},
	{
		id: '5454-6',
		username: 'simranbedi',
		amount: 'INR 64,900',
		method: 'UPI',
		status: 'Approved',
		age: '9m',
		kyc: 'Approved',
		flags: 'Clean',
		phoneNo: '+91 98765 43215',
		ip: '123.77.998.106',
		os: 'Android',
		device: 'Mobile',
		agentName: 'Amit Suri',
		utr: 'UTR-5454-6',
		riskPercentage: '3%',
		time: '12/Mar/2026 03:02 PM',
		remark: 'Credited instantly',
		screenshotUrl: 'https://fuse-react-nextjs-demo.fusetheme.com/assets/images/cards/16-640x480.jpg',
		coverImageUrl: '/assets/images/cards/14-640x480.jpg'
	}
];

const depositDashboardApi = [
	http.get('/api/mock/deposit-dashboard/summary', async () => {
		return HttpResponse.json(depositSummary);
	}),

	http.get('/api/mock/deposit-dashboard/health', async () => {
		return HttpResponse.json(depositHealth);
	}),

	http.get('/api/mock/deposit-dashboard/rows', async () => {
		return HttpResponse.json(depositRows);
	})
];

export default depositDashboardApi;
