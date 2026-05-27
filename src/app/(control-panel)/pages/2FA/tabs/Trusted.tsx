import { useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { alpha } from '@mui/material/styles';
import { Box, Button, Chip, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import mockApi from 'src/@mock-utils/mockApi';

type TrustedDevice = {
  id: string;
  title: string;
  deviceType: 'desktop' | 'mobile';
  browserVersion: string;
  osVersion: string;
  location: string;
  ip: string;
  trustedAt: string;
  expiresAt: string;
  status: 'Active' | 'Expired';
  current: boolean;
};

const statusChipStyles: Record<TrustedDevice['status'], { color: 'success' | 'error'; text: string; bg: string; border: string }> = {
  Active: {
    color: 'success',
    text: 'rgb(144, 243, 99)',
    bg: 'rgba(34, 197, 94, 0.12)',
    border: 'rgba(34, 197, 94, 0.28)'
  },
  Expired: {
    color: 'error',
    text: 'rgb(255,0,0)',
    bg: 'rgba(239, 68, 68, 0.10)',
    border: 'rgba(239, 68, 68, 0.24)'
  }
};

export default function Trusted() {
  const theme = useTheme();
  const [devices, setDevices] = useState<TrustedDevice[]>([]);

  useEffect(() => {
    mockApi('trusted_devices')
      .findAll<TrustedDevice>()
      .then((result) => {
        setDevices(result ?? []);
      });
  }, []);

  const handleRemove = async (id: string) => {
    await mockApi('trusted_devices').delete([id]);
    setDevices((currentDevices) => currentDevices.filter((device) => device.id !== id));
  };

  const handleRevokeAll = async () => {
    const ids = devices.map((device) => device.id);

    if (!ids.length) {
      return;
    }

    await mockApi('trusted_devices').delete(ids);
    setDevices([]);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        mb={3}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Trusted Devices
          </Typography>
          <Typography color="text.secondary">
            Devices where you've verified 2FA
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<FuseSvgIcon size={16}>lucide:trash-2</FuseSvgIcon>}
          onClick={handleRevokeAll}
          disabled={!devices.length}
          sx={{
            borderColor: alpha(theme.palette.error.main, 0.2),
            bgcolor: alpha(theme.palette.error.main, 0.02)
          }}
        >
          Revoke All
        </Button>
      </Stack>

      <Stack spacing={1.5}>
        {devices.map((device) => {
          const isExpired = device.status === 'Expired';
          const statusChip = statusChipStyles[device.status];

          return (
            <Paper
              key={device.id}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: isExpired ? alpha(theme.palette.error.main, 0.25) : 'divider',
                bgcolor: isExpired ? alpha(theme.palette.error.main, 0.03) : 'background.paper'
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
              >
                <Stack direction="row" spacing={1.5} sx={{ minWidth: 0, flex: 1 }}>
                  <Box
                    sx={{
                      mt: '2px',
                      color: isExpired ? 'error.main' : 'primary.main',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <FuseSvgIcon size={18}>
                      {device.deviceType === 'mobile' ? 'lucide:smartphone' : 'lucide:monitor'}
                    </FuseSvgIcon>
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={1}
                      alignItems={{ xs: 'flex-start', md: 'center' }}
                      mb={0.5}
                    >
                      <Typography fontWeight={700} className='text-xl'>{device.title}</Typography>

                      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                        {device.current && (
                          <Chip
                            label="This device"
                            size="small"
                            sx={{
                              height: 22,
                              bgcolor: alpha(theme.palette.primary.main, 0.10),
                              color: 'primary.main',
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                              '& .MuiChip-label': { px: 1, fontWeight: 600 }
                            }}
                          />
                        )}
                        <Chip
                          label={device.status}
                          size="small"
                          color={statusChip.color}
                          sx={{
                            height: 22,
                            color: statusChip.text,
                            bgcolor: statusChip.bg,
                            border: `1px solid ${statusChip.border}`,
                            '& .MuiChip-label': { px: 1, fontWeight: 600 }
                          }}
                        />
                      </Stack>
                    </Stack>

                    <Typography variant="body2" color="#4A5565" mb={0.75}>
                      {device.browserVersion} | {device.osVersion}
                    </Typography>

                    <Stack direction="row" spacing={0.75} alignItems="center" mb={0.5}>
                      <FuseSvgIcon size={14} sx={{ color: isExpired ? 'error.main' : 'text.secondary' }}>
                        lucide:map-pin
                      </FuseSvgIcon>
                      <Typography
                        variant="caption"
                        sx={{ color: isExpired ? 'error.main' : '#4A5565' }}
                      >
                        {device.location} | {device.ip}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.75} alignItems="center">
                      <FuseSvgIcon size={14}>
                        lucide:clock
                      </FuseSvgIcon>
                      <Typography variant="caption" color="#4A5565">
                        Trusted: {device.trustedAt} | Expires: {device.expiresAt}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>

                {!device.current && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemove(device.id)}
                    sx={{ alignSelf: { xs: 'flex-end', sm: 'flex-start' } }}
                  >
                    <FuseSvgIcon size={16}>lucide:trash-2</FuseSvgIcon>
                  </IconButton>
                )}
              </Stack>
            </Paper>
          );
        })}

        {!devices.length && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              border: '1px dashed',
              borderColor: 'divider',
              textAlign: 'center'
            }}
          >
            <Typography fontWeight={700} mb={0.5}>
              No trusted devices
            </Typography>
            <Typography color="text.secondary">
              Trusted devices will appear here after a successful 2FA verification.
            </Typography>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
