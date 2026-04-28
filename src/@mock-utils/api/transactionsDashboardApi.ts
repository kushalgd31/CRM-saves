import { http, HttpResponse } from 'msw';

const transactionsRows = [
	{
		id: '5454',
		username: 'amansingh',
		type: 'amansingh',
		subType: '+91 2345 0987 65',
		stake: '123456789090',
		amount: 'SBIN0000343N',
		result: '3%',
		winLoose: '₹200',
		runningBalance: '₹100000',
		createdAt: '10 Apr 2026',
		phoneNo: '+91 2345 0987 65',
		ip: '555.333.22.01',
		os: 'Windows 11',
		device: 'Desktop',
		beforeBalanceBonus: '₹50',
		beforeBalanceWallet: '₹1000',
		afterBalanceBonus: '₹50',
		afterBalanceWallet: '₹1500',
		currency: 'INR',
		betOn: 'Aman Singh',
		timestamp: 'Aman Singh',
		debitedFromBonus: '1232443434@ybl',
		debitedFromWallet: 'View QR',
		creditedToBonus: '3%',
		creditedToWallet: '3%'
	},
	{
		id: '5455',
		username: 'vihaansharma',
		type: 'casino',
		subType: 'Lightening Roulette',
		stake: '500',
		amount: '500',
		result: 'Loss',
		winLoose: '₹0',
		runningBalance: '₹9500',
		createdAt: '11 Apr 2026',
		phoneNo: '+91 9876 5432 10',
		ip: '192.168.1.1',
		os: 'macOS 12',
		device: 'Laptop',
		beforeBalanceBonus: '₹100',
		beforeBalanceWallet: '₹10000',
		afterBalanceBonus: '₹100',
		afterBalanceWallet: '₹9500',
		currency: 'INR',
		betOn: 'Red',
		timestamp: '11 Apr 2026 14:00',
		debitedFromBonus: '₹0',
		debitedFromWallet: '₹500',
		creditedToBonus: '₹0',
		creditedToWallet: '₹0'
	}
];

// Replicate it to have a few more rows for the table display
for (let i = 2; i < 8; i++) {
	transactionsRows.push({
		...transactionsRows[0],
		id: `545${4 + i}`
	});
}

const transactionsDashboardApi = [
	http.get('/api/mock/transactions-dashboard/rows', async () => {
		return HttpResponse.json(transactionsRows);
	})
];

export default transactionsDashboardApi;
