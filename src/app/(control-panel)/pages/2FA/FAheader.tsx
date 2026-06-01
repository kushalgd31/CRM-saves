import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert, AlertTitle, Box, Stack, Typography } from '@mui/material';

type FAheaderProps = {
	showWarning: boolean;
};

export default function FAheader({ showWarning }: FAheaderProps) {
	return (
		<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, py: 4 }}>
			<Box sx={{ maxWidth: 980, mx: 'auto' }}>
				<Stack spacing={2}>
					<Box>
						<Typography
							variant="h4"
							fontWeight={700}
							gutterBottom
						>
							Two-Factor Authentication
						</Typography>
						<Typography color="text.secondary">Add an extra layer of security to your account.</Typography>
					</Box>

					{showWarning && (
						<Alert
							icon={<WarningAmberIcon />}
							severity="warning"
							sx={{
								borderRadius: 2,
								bgcolor: 'rgba(255, 243, 205, 0.9)',
								border: '1px solid',
								borderColor: 'warning.light',
								color: 'text.primary'
							}}
						>
							<AlertTitle sx={{ fontWeight: 700, mb: 0.5 }}>
								Two-Factor Authentication is Disabled
							</AlertTitle>
							Your account is not fully protected. Enable 2FA for enhanced security.
						</Alert>
					)}
				</Stack>
			</Box>
		</Box>
	);
}
