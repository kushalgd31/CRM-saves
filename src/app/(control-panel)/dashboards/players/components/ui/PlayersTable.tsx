import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';

type PlayerRowType = {
	id: string;
	name: string;
	username: string;
	stage: string;
	leadOwner: string;
	agentName: string;
	location: string;
	lastLocation: string;
	lastDeposit: string;
	lastWithdrawal: string;
	profitPercentage: string;
};

const playersRows: PlayerRowType[] = [
	{
		id: 'PL-1001',
		name: 'Aiden Cole',
		username: 'aiden.cole',
		stage: 'Active',
		leadOwner: 'Priya Sharma',
		agentName: 'Rohan Malhotra',
		location: 'Mumbai, India',
		lastLocation: 'Pune, India',
		lastDeposit: 'USD 1,200',
		lastWithdrawal: 'USD 450',
		profitPercentage: '18%'
	},
	{
		id: 'PL-1002',
		name: 'Mia Sanders',
		username: 'mia.sanders',
		stage: 'Warm Lead',
		leadOwner: 'Kabir Mehta',
		agentName: 'Nina Patel',
		location: 'Delhi, India',
		lastLocation: 'Gurugram, India',
		lastDeposit: 'USD 780',
		lastWithdrawal: 'USD 220',
		profitPercentage: '11%'
	},
	{
		id: 'PL-1003',
		name: 'Victor Han',
		username: 'victor.han',
		stage: 'VIP',
		leadOwner: 'Anaya Rao',
		agentName: 'Yusuf Khan',
		location: 'Bengaluru, India',
		lastLocation: 'Hyderabad, India',
		lastDeposit: 'USD 4,200',
		lastWithdrawal: 'USD 1,580',
		profitPercentage: '24%'
	},
	{
		id: 'PL-1004',
		name: 'Sara Wilson',
		username: 'sara.wilson',
		stage: 'New',
		leadOwner: 'Dev Arora',
		agentName: 'Aman Gupta',
		location: 'Jaipur, India',
		lastLocation: 'Ahmedabad, India',
		lastDeposit: 'USD 350',
		lastWithdrawal: 'USD 0',
		profitPercentage: '7%'
	}
];

function PlayersTable() {
	const columns = useMemo<MRT_ColumnDef<PlayerRowType>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
				Cell: ({ row }) => <span className="font-semibold text-slate-800">{row.original.name}</span>
			},
			{
				accessorKey: 'username',
				header: 'Username',
				Cell: ({ row }) => <span className="font-medium text-slate-600">{row.original.username}</span>
			},
			{
				accessorKey: 'stage',
				header: 'Stage',
				Cell: ({ row }) => (
					<span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700">
						{row.original.stage}
					</span>
				)
			},
			{
				accessorKey: 'leadOwner',
				header: 'Lead Owner'
			},
			{
				accessorKey: 'agentName',
				header: 'Agent Name'
			},
			{
				accessorKey: 'location',
				header: 'Location'
			},
			{
				accessorKey: 'lastLocation',
				header: 'Last Location'
			},
			{
				accessorKey: 'lastDeposit',
				header: 'Last Deposit',
				Cell: ({ row }) => <span className="font-bold text-emerald-500">{row.original.lastDeposit}</span>
			},
			{
				accessorKey: 'lastWithdrawal',
				header: 'Last Withdrawal',
				Cell: ({ row }) => <span className="font-bold text-red-500">{row.original.lastWithdrawal}</span>
			},
			{
				accessorKey: 'profitPercentage',
				header: 'Profit%',
				Cell: ({ row }) => <span className="font-bold text-slate-900">{row.original.profitPercentage}</span>
			}
		],
		[]
	);

	return (
		<Paper
			className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
			elevation={0}
		>
			<DataTable
				data={playersRows}
				columns={columns}
				muiSearchTextFieldProps={{
					placeholder: 'Search...',
					sx: {
						minWidth: '300px'
					}
				}}
				enableRowSelection={false}
				enableExpanding={false}
				enableRowNumbers={false}
				renderRowActionMenuItems={() => []}
				renderRowActions={({ row }) => (
					<div className="flex items-center justify-center gap-1 cursor-pointer text-slate-600 hover:text-slate-900 font-semibold">
						<button
							type="button"
							className="flex items-center gap-1"
							aria-label={`View ${row.original.name}`}
						>
							<FuseSvgIcon size={14}>lucide:eye</FuseSvgIcon>
							<span className="text-[11px]">View</span>
						</button>
					</div>
				)}
			/>
		</Paper>
	);
}

export default PlayersTable;
