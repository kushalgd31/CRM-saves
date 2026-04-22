import { http, HttpResponse } from 'msw';

const kycSummary = [
	{
		id: 'total-submissions',
		title: 'Total Submissions',
		value: 3,
		icon: 'lucide:file-text',
		status: 'total'
	},
	{
		id: 'pending',
		title: 'Pending',
		value: 1,
		icon: 'lucide:clock-3',
		status: 'pending'
	},
	{
		id: 'approved',
		title: 'Approved',
		value: 1,
		icon: 'lucide:circle-check',
		status: 'approved'
	},
	{
		id: 'rejected',
		title: 'Rejected',
		value: 0,
		icon: 'lucide:circle-x',
		status: 'rejected'
	},
	{
		id: 'partial',
		title: 'Partial',
		value: 1,
		icon: 'lucide:triangle-alert',
		status: 'partial'
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
		overallStatus: 'pending'
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
		overallStatus: 'approved'
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
		overallStatus: 'partial'
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
