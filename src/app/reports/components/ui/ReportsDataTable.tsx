import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { type MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import DataTable from 'src/components/data-table/DataTable';
import { ReportRow } from '../../config/reportConfig';

type ReportsDataTableProps = {
	columns: MRT_ColumnDef<ReportRow>[];
	data: ReportRow[];
	isLoading: boolean;
	onDelete?: (ids: string[]) => void;
};

function ReportsDataTable({ columns, data, isLoading, onDelete }: ReportsDataTableProps) {
	const memoColumns = useMemo(() => columns, [columns]);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
			elevation={2}
		>
			<DataTable
				data={data}
				columns={memoColumns}
				enableRowActions={false}
				renderTopToolbarCustomActions={({ table }) => {
					if (!onDelete) {
						return null;
					}

					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								onDelete(selectedRows.map((row) => String(row.original.id)));
								table.resetRowSelection();
							}}
							className="flex min-w-9 shrink ltr:mr-2 rtl:ml-2"
							color="secondary"
						>
							<FuseSvgIcon>lucide:trash</FuseSvgIcon>
							<span className="mx-2 hidden sm:flex">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default ReportsDataTable;
