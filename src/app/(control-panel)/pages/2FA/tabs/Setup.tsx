import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Task from '@mui/icons-material/TaskAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, Button, Divider, Stack, TextField, Typography, useTheme } from '@mui/material';

const authenticatorOptions = [
  {
    id: 'google',
    title: 'Google Authenticator',
    subtitle: 'Recommended',
  },
  {
    id: 'authy',
    title: 'Authy',
    subtitle: '',
  },
  {
    id: 'microsoft',
    title: 'Microsoft Authenticator',
    subtitle: '',
  },
];

const randomAlphanumeric = (length: number) =>
  Array.from({ length }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.charAt(Math.floor(Math.random() * 32))
  ).join('');

const generateManualCode = () => randomAlphanumeric(16);

const generateBackupCodes = () =>
  Array.from({ length: 8 }, () =>
    `${randomAlphanumeric(4)}-${randomAlphanumeric(4)}`
  );

export default function Setup() {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [selectedAuthenticator, setSelectedAuthenticator] = useState('google');
  const [manualCode, setManualCode] = useState(generateManualCode());
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [backupCodes, setBackupCodes] = useState<string[]>(generateBackupCodes());
  const [copyMessage, setCopyMessage] = useState('Copy All');
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (step === 2) {
      setManualCode(generateManualCode());
    }
    if (step === 4) {
      setBackupCodes(generateBackupCodes());
    }
  }, [step]);

  const isOtpComplete = otpValues.every((value) => value.length === 1);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    const nextOtpValues = [...otpValues];
    nextOtpValues[index] = digit;
    setOtpValues(nextOtpValues);

    if (digit && index < otpValues.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Backspace') {
      return;
    }

    event.preventDefault();
    const nextOtpValues = [...otpValues];
    const isCurrentEmpty = nextOtpValues[index] === '';
    const startIndex = isCurrentEmpty && index > 0 ? index - 1 : index;

    nextOtpValues.fill('', startIndex);
    setOtpValues(nextOtpValues);

    const focusIndex = isCurrentEmpty && index > 0 ? index - 1 : index;
    otpRefs.current[focusIndex]?.focus();
  };

  const handleCopyAll = async () => {
    const text = backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage('Copied!');
      window.setTimeout(() => setCopyMessage('Copy All'), 1500);
    } catch {
      setCopyMessage('Failed');
    }
  };

  const handleDownload = () => {
    const content = backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '2fa-backup-codes.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderProgress = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {[1, 2, 3, 4].map((stepNumber, index) => {
        const completed = step > stepNumber;
        const active = step === stepNumber;

        return (
          <Box key={stepNumber} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                bgcolor: completed || active ? 'primary.main' : 'background.paper',
                color: completed || active ? 'common.white' : 'text.secondary',
                border: `1px solid ${
                  completed || active ? theme.palette.primary.main : theme.palette.divider
                }`,
              }}
            >
              {completed ? <Task sx={{ fontSize: 18 }} /> : stepNumber}
            </Box>

            {index < 3 && (
              <Box
                sx={{
                  flex: 1,
                  height: 4,
                  bgcolor: step > stepNumber ? 'primary.main' : 'divider',
                  borderRadius: 2,
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={700}>
              Step 1: Choose Your Authenticator App
            </Typography>
            <Typography color="#717182">
              Select an authenticator app to generate verification codes.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {authenticatorOptions.map((option) => {
                const selected = selectedAuthenticator === option.id;
                return (
                  <Box
                    key={option.id}
                    sx={{
                      flex: '1 1 calc(33.333% - 16px)',
                      minWidth: 240,
                    }}
                  >
                    <Box
                      onClick={() => setSelectedAuthenticator(option.id)}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 2,
                        border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
                        bgcolor: selected ? 'rgba(13, 110, 253, 0.08)' : 'background.paper',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        minHeight: 140,
                        textAlign: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          display: 'grid',
                          placeItems: 'center',
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <SmartphoneIcon fontSize="small" />
                      </Box>
                      <Typography fontWeight={700}>{option.title}</Typography>
                      {option.subtitle ? (
                        <Typography
                          variant="caption"
                          sx={{ color: 'success.main', fontWeight: 700 }}
                        >
                          {option.subtitle}
                        </Typography>
                      ) : (
                        <Box sx={{ height: 18 }} />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Button variant="contained" size="large" disableElevation sx={{ border: 'none' }} onClick={() => setStep(2)}>
              Continue
            </Button>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={700}>
              Step 2: Scan QR Code
            </Typography>
            <Typography color="#717182">
              Open your authenticator app and scan this QR code.
            </Typography>

            <Box
              sx={{
                borderRadius: 3,
                p: 4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: 220,
                  height: 220,
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'text.disabled',
                }}
              >
                <Stack spacing={1} alignItems="center">
                  <QrCodeIcon sx={{ fontSize: 40 }} />
                  <Typography>QR Code Here</Typography>
                </Stack>
              </Box>
            </Box>

            <Box sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}`, p: 3, backgroundColor: 'rgb(248, 246, 246)' }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Can’t scan the QR code?
              </Typography>
              <Typography variant="body2" color="#717182" paragraph>
                Enter this code manually:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box
                  sx={{
                    flex: 1,
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    p: 1.5,
                    fontFamily: 'monospace',
                    letterSpacing: 1,
                    bgcolor: 'background.paper',
                    overflowX: 'auto',
                  }}
                >
                  {manualCode}
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigator.clipboard.writeText(manualCode)}
                >
                  Copy
                </Button>
              </Box>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                fullWidth
                disableElevation
                sx={{ border: 'none' }}
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </Stack>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={700}>
              Step 3: Enter Verification Code
            </Typography>
            <Typography color="#717182">
              Enter the 6-digit code from your authenticator app.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              {otpValues.map((value, index) => (
                <TextField
                  key={index}
                  inputRef={(element) => (otpRefs.current[index] = element)}
                  value={value}
                  onChange={(event) => handleOtpChange(index, event.target.value)}
                  onKeyDown={(event) => handleOtpKeyDown(index, event)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: 22,
                      padding: '15px 8px',
                      width: 52,
                      backgroundColor: 'rgb(240, 240, 240)',
                      borderRadius: '6px'
                    },
                  }}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
              ))}
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="outlined" fullWidth onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="contained"
                fullWidth
                disableElevation
                sx={{ border: 'none' }}
                disabled={!isOtpComplete}
                onClick={() => setStep(4)}
              >
                Verify
              </Button>
            </Stack>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" fontWeight={700}>
              Step 4: Save Backup Codes
            </Typography>
            <Typography color="#717182">
              Store these codes in a safe place. Each code can only be used once if you lose access to your authenticator app.
            </Typography>

            <Box sx={{ borderRadius: 3, border: `1px solid #D1D5DC`, p: 3, backgroundColor: "#F9FAFB" }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gridTemplateRows: 'repeat(4, auto)',
                  gap: 2,
                }}
              >
                {backupCodes.map((code, index) => (
                  <Box
                    key={code}
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      p: 2,
                      fontFamily: 'monospace',
                      color: 'text.primary',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                        {index + 1}.
                      </Typography>
                      <Typography sx={{ letterSpacing: 1, fontWeight: 600 }}>{code}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyAll}
                >
                  {copyMessage}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                borderRadius: 2,
                bgcolor: 'rgba(255, 243, 205, 0.8)',
                border: `1px solid ${theme.palette.warning.light}`,
                p: 2,
              }}
            >
              <Stack direction="row" alignItems="flex-start" spacing={1}>
                <WarningAmberIcon sx={{ color: theme.palette.warning.dark, mt: '2px' }} />
                <Typography variant="body2" color="text.primary">
                  <strong>Important:</strong> Save these backup codes now. You won’t be able to see them again after completing setup.
                </Typography>
              </Stack>
            </Box>

            <Button variant="contained" color="success" size="large">
              Done - Enable 2FA
            </Button>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6" fontWeight={400}>
          Setup Two-Factor Authentication
        </Typography>
        <Typography color="#717182">
          Follow these steps to secure your account.
        </Typography>
      </Box>

      {renderProgress()}
      <Divider />
      {renderStepContent()}
    </Stack>
  );
}
