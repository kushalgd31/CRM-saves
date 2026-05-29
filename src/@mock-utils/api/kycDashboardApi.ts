import { http, HttpResponse } from 'msw';

const kycSummary = [
	{
		id: 'pending KYCs',
		title: 'Pending KYCs',
		value: 43,
		icon: 'lucide:file-text',
		status: 'total'
	},
	{
		id: 'pending',
		title: 'Pending Bank Accounts',
		value: 12,
		icon: 'lucide:clock-3',
		status: 'pending'
	},
	{
		id: 'approved',
		title: 'Approved KYCs today',
		value: 12,
		icon: 'lucide:circle-check',
		status: 'approved'
	},
	{
		id: 'approve bank',
		title: 'Approved Bank Accounts today',
		value: 12,
		icon: 'lucide:circle-check',
		status: 'approved'
	},
	{
		id: 'rejected',
		title: 'Rejected',
		value: 0,
		icon: 'lucide:circle-x',
		status: 'rejected'
	}
] as const;

const kycRows = [
	{
		id: 'kyc-1',
		name: 'Rahul Sharma',
		email: 'rahul.sharma@example.com',
		phone: '+91 98765 43210',
		panCard: 'pending',
		idProof: 'pending',
		selfie: 'pending',
		bankAccount: 'pending',
		overallStatus: 'pending',
		date: '2024-06-01',
		time: '10:30:00',
		panCardImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		idProofImages: [
			'./public/assets/images/demo-content/Frame 454.svg',
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		selfieImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		bankAccountImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		]
	},
	{
		id: 'kyc-2',
		name: 'Priya Patel',
		email: 'priya.patel@example.com',
		phone: '+91 98765 43211',
		panCard: 'approved',
		idProof: 'approved',
		selfie: 'approved',
		bankAccount: 'approved',
		overallStatus: 'approved',
		date: '2024-06-02',
		time: '14:45:00',
		panno: 'ABCDE1234F',
		panCardImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		idProofImages: [
			'./public/assets/images/demo-content/Frame 454.svg',
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		selfieImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		bankAccountImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		]
	},
	{
		id: 'kyc-3',
		name: 'Amit Kumar',
		email: 'amit.kumar@example.com',
		phone: '+91 98765 43212',
		panCard: 'pending',
		idProof: 'rejected',
		selfie: 'pending',
		bankAccount: 'pending',
		overallStatus: 'pending',
		date: '2024-06-03',
		time: '09:15:00',
		panCardImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		idProofImages: [
			'./public/assets/images/demo-content/Frame 454.svg',
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		selfieImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		],
		bankAccountImages: [
			'./public/assets/images/demo-content/Frame 454.svg'
		]
	}
] as const;

const kycDashboardApi = [
	http.get('/api/mock/kyc-dashboard/summary', async () => {
		return HttpResponse.json(kycSummary);
	}),
	http.get('/api/mock/kyc-dashboard/rows', async () => {
		return HttpResponse.json(kycRows);
	})
];

export default kycDashboardApi;
