import { useEffect, useMemo, useState } from 'react';
import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'src/components/data-table/DataTable';
import mockApi from 'src/@mock-utils/mockApi';

type LoginHistoryRow = {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  ip: string;
  twoFaMethod: string;
  status: 'Success' | 'Trusted' | 'Blocked' | 'Failed';
  risk: 'Low' | 'Medium' | 'High';
};

const statusStyles: Record<
  LoginHistoryRow['status'],
  { text: string; bg: string; border: string }
> = {
  Success: {
    text: '#166534',
    bg: '#DCFCE7',
    border: '#BBF7D0'
  },
  Trusted: {
    text: '#166534',
    bg: '#DCFCE7',
    border: '#BBF7D0'
  },
  Blocked: {
    text: '#B91C1C',
    bg: '#FEE2E2',
    border: '#FECACA'
  },
  Failed: {
    text: '#C2410C',
    bg: '#FFEDD5',
    border: '#FED7AA'
  }
};

const riskPalette: Record<LoginHistoryRow['risk'], 'success' | 'warning' | 'error'> = {
  Low: 'success',
  Medium: 'warning',
  High: 'error'
};

const methodStyles: Record<string, { text: string; bg: string }> = {
  TOTP: {
    text: '#1D4ED8',
    bg: '#DBEAFE'
  },
  Trusted: {
    text: '#166534',
    bg: '#DCFCE7'
  },
  'Backup code': {
    text: '#C2410C',
    bg: '#FFEDD5'
  }
};

export default function LoginHistory() {
  const [rows, setRows] = useState<LoginHistoryRow[]>([]);

  useEffect(() => {
    mockApi('login_history')
      .findAll<LoginHistoryRow>()
      .then((result) => {
        setRows(result ?? []);
      });
  }, []);

  const columns = useMemo<MRT_ColumnDef<LoginHistoryRow>[]>(
    () => [
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        enableColumnOrdering: false,
        enableEditing: false,
        enableHiding: false,
        size: 180
      },
      {
        accessorKey: 'device',
        header: 'Device',
        enableColumnOrdering: false,
        enableEditing: false,
        size: 220
      },
      {
        accessorKey: 'location',
        header: 'Location',
        enableColumnOrdering: false,
        enableEditing: false,
        size: 240,
        Cell: ({ row }) => (
          <Box>
            <Typography
              variant="body2"
              fontWeight={700}
              noWrap
              sx={{
                color:
                  row.original.status === 'Failed' || row.original.status === 'Blocked'
                    ? '#DC2626'
                    : 'text.primary'
              }}
            >
              {row.original.location}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {row.original.ip}
            </Typography>
          </Box>
        )
      },
      {
        accessorKey: 'twoFaMethod',
        header: '2FA Method',
        enableColumnOrdering: false,
        enableEditing: false,
        size: 150,
        Cell: ({ row }) => {
          const methodStyle = methodStyles[row.original.twoFaMethod] ?? {
            text: '#374151',
            bg: '#E5E7EB'
          };

          return (
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1.25,
                py: 0.5,
                borderRadius: 999,
                fontSize: '0.75rem',
                fontWeight: 600,
                lineHeight: 1.2,
                color: methodStyle.text,
                bgcolor: methodStyle.bg
              }}
            >
              {row.original.twoFaMethod}
            </Box>
          );
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableColumnOrdering: false,
        enableEditing: false,
        size: 140,
        Cell: ({ row }) => {
          const statusStyle = statusStyles[row.original.status];

          return (
            <Chip
              label={row.original.status}
              size="small"
              sx={{
                color: statusStyle.text,
                bgcolor: statusStyle.bg,
                border: `1px solid ${statusStyle.border}`,
                '& .MuiChip-label': {
                  px: 1,
                  fontWeight: 600
                }
              }}
            />
          );
        }
      },
      {
        accessorKey: 'risk',
        header: 'Risk',
        enableColumnOrdering: false,
        enableEditing: false,
        size: 80,
        muiTableHeadCellProps: {
          align: 'center'
        },
        muiTableBodyCellProps: {
          align: 'center'
        },
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: `${riskPalette[row.original.risk]}.main`,
                flexShrink: 0
              }}
            />
          </Box>
        )
      }
    ],
    []
  );

  return (
    <Box>
      <Stack spacing={2} mb={3}>
        <Typography variant="h6" fontWeight={700}>
          Login History
        </Typography>
        <Typography color="text.secondary">
          View recent login activity across devices and locations.
        </Typography>
      </Stack>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 2 }}>
        <DataTable
          columns={columns}
          data={rows}
          enableRowActions={false}
          enableRowSelection={false}
          enableColumnFilters={false}
          enableRowNumbers={false}
          initialState={{ density: 'comfortable', sorting: [{ id: 'timestamp', desc: true }] }}
          muiSearchTextFieldProps={{
            placeholder: 'Search login activity...',
            sx: { minWidth: '250px' }
          }}
        />
      </Paper>
    </Box>
  );
}
