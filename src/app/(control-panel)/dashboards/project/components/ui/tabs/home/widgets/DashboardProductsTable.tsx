import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { Chip, ListItemIcon, MenuItem, Paper } from '@mui/material';
import DataTable from 'src/components/data-table/DataTable';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import _ from 'lodash';
import { useProducts } from '../../../../../../../apps/e-commerce/api/hooks/products/useProducts';
import { useDeleteProducts } from '../../../../../../../apps/e-commerce/api/hooks/products/useDeleteProducts';
import { Product } from '../../../../../../../apps/e-commerce/api/types';

function DashboardProductsTable() {
	const { data: products, isLoading } = useProducts();
	const { mutate: deleteProducts } = useDeleteProducts();

	const columns = useMemo<MRT_ColumnDef<Product>[]>(
		() => [
			{
				accessorFn: (row) => row.featuredImageId,
				id: 'featuredImageId',
				header: '',
				enableColumnFilter: false,
				enableColumnDragging: false,
				size: 52,
				enableSorting: false,
				muiTableHeadCellProps: {
					align: 'center',
					sx: { py: 1.75 }
				},
				muiTableBodyCellProps: {
					align: 'center',
					sx: { py: 1.75 }
				},
				Cell: ({ row }) => (
					<div className="flex items-center justify-center">
						{row.original?.images?.length > 0 && row.original.featuredImageId ? (
							<img
								className="block max-h-9 w-full max-w-9 rounded-sm"
								src={_.find(row.original.images, { id: row.original.featuredImageId })?.url}
								alt={row.original.name}
							/>
						) : (
							<img
								className="block max-h-9 w-full max-w-9 rounded-sm"
								src="/assets/images/apps/ecommerce/product-image-placeholder.png"
								alt={row.original.name}
							/>
						)}
					</div>
				)
			},
			{
				accessorKey: 'name',
				header: 'Name',
				size: 140,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				},
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/e-commerce/products/${row.original.id}/${row.original.handle}`}
						role="button"
						className="inline-flex justify-center"
					>
						<u>{row.original.name}</u>
					</Typography>
				)
			},
			{
				accessorKey: 'categories',
				header: 'Category',
				size: 170,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				},
				Cell: ({ row }) => (
					<div className="flex flex-wrap justify-center gap-1">
						{row.original.categories.map((item) => (
							<Chip
								key={item}
								label={item}
								size="small"
							/>
						))}
					</div>
				)
			},
			{
				accessorKey: 'priceTaxIncl',
				header: 'Price',
				size: 90,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				},
				accessorFn: (row) => `$${row.priceTaxIncl}`
			},
			{
				accessorKey: 'quantity',
				header: 'Quantity',
				size: 84,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				},
				Cell: ({ row }) => (
					<div className="flex items-center justify-center gap-1">
						<span>{row.original.quantity}</span>
						<i
							className={clsx(
								'inline-block h-2 w-2 rounded-sm',
								row.original.quantity <= 5 && 'bg-red-500',
								row.original.quantity > 5 && row.original.quantity <= 25 && 'bg-orange-500',
								row.original.quantity > 25 && 'bg-green-500'
							)}
						/>
					</div>
				)
			},
			{
				accessorKey: 'active',
				header: 'Active',
				size: 76,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				},
				Cell: ({ row }) => (
					<div className="flex items-center justify-center">
						{row.original.active ? (
							<FuseSvgIcon
								className="text-green-500"
								size={20}
							>
								lucide:circle-check
							</FuseSvgIcon>
						) : (
							<FuseSvgIcon
								className="text-red-500"
								size={20}
							>
								lucide:circle-minus
							</FuseSvgIcon>
						)}
					</div>
				)
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="flex h-full w-full flex-auto flex-col overflow-hidden rounded-b-none"
			elevation={2}
		>
			<div className="flex items-center justify-between border-b border-slate-100 px-4 py-2 text-xs text-slate-500">
				<span>Products overview</span>
				<span className="font-medium">Scroll horizontally to see more</span>
			</div>
			<DataTable
				data={products ?? []}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							deleteProducts([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>lucide:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>
				]}
				renderTopToolbarCustomActions={({ table }) => {
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
								deleteProducts(selectedRows.map((row) => row.original.id));
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
				initialState={{
					density: 'compact',
					showColumnFilters: false,
					showGlobalFilter: true,
					columnPinning: {
						left: [],
						right: ['mrt-row-actions']
					},
					pagination: {
						pageIndex:0,
						pageSize: 15
					}
				}}
				muiTableContainerProps={{
					className: 'flex-auto overflow-x-auto',
					sx: {
						'&::-webkit-scrollbar': {
							height: 10
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#cbd5e1',
							borderRadius: '999px'
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: '#f8fafc'
						}
					}
				}}
				muiTableHeadCellProps={{
					sx: {
						py: 1.75,
						textAlign: 'center'
					}
				}}
				muiTableBodyCellProps={{
					sx: {
						py: 1.75,
						textAlign: 'center'
					}
				}}
			/>
		</Paper>
	);
}

export default DashboardProductsTable;