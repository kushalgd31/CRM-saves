import { useState, type ReactNode } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

type SecurityPreferences = {
  primaryEmail: string;
  recoveryEmail: string;
  require2faEveryLogin: boolean;
  trustedDeviceDuration: string;
  emailLoginAlerts: boolean;
  accountLockoutOnFailedAttempts: boolean;
  maxFailedAttempts: string;
  allowBackupCodes: boolean;
};

const trustedDeviceOptions = ['7 days', '14 days', '30 days', '60 days'];
const failedAttemptOptions = ['3 attempts', '5 attempts', '10 attempts'];
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#F3F3F5'
  }
};

function SecurityField({
  label,
  helperText,
  children
}: {
  label: string;
  helperText?: string;
  children: ReactNode;
}) {
  return (
    <FormControl fullWidth>
      <FormLabel
        sx={{
          mb: 1,
          color: 'text.primary',
          fontSize: '0.95rem',
          fontWeight: 600,
          '&.Mui-focused': {
            color: 'text.primary'
          }
        }}
      >
        {label}
      </FormLabel>

      {children}

      {helperText ? <FormHelperText sx={{ mt: 0.75 }}>{helperText}</FormHelperText> : null}
    </FormControl>
  );
}

function SecuritySettingRow({
  title,
  description,
  checked,
  onChange
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography fontWeight={600}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Switch checked={checked} onChange={(_event, value) => onChange(value)} />
    </Stack>
  );
}

export default function Security() {
  const theme = useTheme();
  const [saveLabel, setSaveLabel] = useState('Save Email Settings');
  const [settings, setSettings] = useState<SecurityPreferences>({
    primaryEmail: 'admin@example.com',
    recoveryEmail: 'recovery@example.com',
    require2faEveryLogin: false,
    trustedDeviceDuration: '30 days',
    emailLoginAlerts: true,
    accountLockoutOnFailedAttempts: true,
    maxFailedAttempts: '3 attempts',
    allowBackupCodes: true
  });

  function updateSetting<K extends keyof SecurityPreferences>(key: K, value: SecurityPreferences[K]) {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [key]: value
    }));
  }

  const handleSaveEmails = () => {
    setSaveLabel('Saved');
    window.setTimeout(() => {
      setSaveLabel('Save Email Settings');
    }, 1500);
  };

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Email Management
            </Typography>
            <Typography color="#717182">
              Manage primary and recovery email addresses
            </Typography>
          </Box>

          <SecurityField
            label="Primary Email"
            helperText="Used for sign-in and account security notifications."
          >
            <TextField
              fullWidth
              size="small"
              value={settings.primaryEmail}
              onChange={(event) => updateSetting('primaryEmail', event.target.value)}
              sx={fieldSx}
            />
          </SecurityField>

          <SecurityField
            label="Recovery Email"
            helperText="Used to help recover access if the primary email becomes unavailable."
          >
            <TextField
              fullWidth
              size="small"
              value={settings.recoveryEmail}
              onChange={(event) => updateSetting('recoveryEmail', event.target.value)}
              sx={fieldSx}
            />
          </SecurityField>

          <Box>
            <Button variant="contained" onClick={handleSaveEmails}>
              {saveLabel}
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Security Preferences
            </Typography>
            <Typography color="#717182">
              Configure authentication behavior
            </Typography>
          </Box>

          <SecuritySettingRow
            title="Require 2FA on Every Login"
            description="Do not trust devices, always ask for 2FA code"
            checked={settings.require2faEveryLogin}
            onChange={(value) => updateSetting('require2faEveryLogin', value)}
          />

          {!settings.require2faEveryLogin && (
            <Box
              sx={{
                ml: { xs: 0, sm: 1 },
                pl: 2,
                borderLeft: `2px solid ${alpha(theme.palette.primary.main, 0.18)}`
              }}
            >
              <SecurityField
                label="Trust Device Duration"
                helperText="Choose how long verified devices stay trusted before requesting 2FA again."
              >
                <TextField
                  select
                  size="small"
                  value={settings.trustedDeviceDuration}
                  onChange={(event) => updateSetting('trustedDeviceDuration', event.target.value)}
                  sx={{
                    ...fieldSx,
                    width: '10rem'
                  }}
                >
                  {trustedDeviceOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </SecurityField>
            </Box>
          )}

          <Divider />

          <SecuritySettingRow
            title="Email Login Alerts"
            description="Send email when login from new device"
            checked={settings.emailLoginAlerts}
            onChange={(value) => updateSetting('emailLoginAlerts', value)}
          />

          <Divider />

          <SecuritySettingRow
            title="Account Lockout on Failed Attempts"
            description="Temporarily lock account after failed logins"
            checked={settings.accountLockoutOnFailedAttempts}
            onChange={(value) => updateSetting('accountLockoutOnFailedAttempts', value)}
          />

          {settings.accountLockoutOnFailedAttempts && (
            <Box
              sx={{
                ml: { xs: 0, sm: 1 },
                pl: 2,
                borderLeft: `2px solid ${alpha(theme.palette.error.main, 0.18)}`
              }}
            >
              <SecurityField
                label="Max Failed Attempts"
                helperText="Lock the account temporarily after this many unsuccessful login attempts."
              >
                <TextField
                  select
                  size="small"
                  value={settings.maxFailedAttempts}
                  onChange={(event) => updateSetting('maxFailedAttempts', event.target.value)}
                  sx={{
                    ...fieldSx,
                    width: '10rem'
                  }}
                >
                  {failedAttemptOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </SecurityField>
            </Box>
          )}

          <Divider />

          <SecuritySettingRow
            title="Allow Backup Codes"
            description="Enable one-time backup codes for recovery"
            checked={settings.allowBackupCodes}
            onChange={(value) => updateSetting('allowBackupCodes', value)}
          />
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.error.main, 0.18)
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" fontWeight={700} color="error.main">
              Danger Zone
            </Typography>
            <Typography color="text.secondary">
              Irreversible actions that affect your account security
            </Typography>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: alpha(theme.palette.error.main, 0.14)
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Box>
                <Typography fontWeight={600}>Regenerate Backup Codes</Typography>
                <Typography variant="body2" color="text.secondary">
                  Invalidate all existing backup codes and generate new ones
                </Typography>
              </Box>

              <Button variant="outlined" color="error" size="small">
                Regenerate
              </Button>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: alpha(theme.palette.error.main, 0.14)
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <Box>
                <Typography fontWeight={600}>Disable Two-Factor Authentication</Typography>
                <Typography variant="body2" color="text.secondary">
                  Remove 2FA protection from your account
                </Typography>
              </Box>

              <Button variant="outlined" color="error" size="small">
                Disable 2FA
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Stack>
  );
}
