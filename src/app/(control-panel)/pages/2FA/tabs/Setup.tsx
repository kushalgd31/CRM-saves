import { useRef, useState, type KeyboardEvent } from 'react';
import Alert from '@mui/material/Alert';
import Task from '@mui/icons-material/TaskAlt';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Box, Button, CircularProgress, Divider, Stack, TextField, Typography, useTheme } from '@mui/material';
import { authConfirm2fa, authSetup2fa } from '@auth/authApi';
import { HTTPError } from 'ky';
import { QRCodeSVG } from 'qrcode.react';

const authenticatorOptions = [
	{
		id: 'google',
		title: 'Google Authenticator',
		subtitle: 'Recommended'
	},
	{
		id: 'authy',
		title: 'Authy',
		subtitle: ''
	},
	{
		id: 'microsoft',
		title: 'Microsoft Authenticator',
		subtitle: ''
	}
];

async function getErrorMessage(error: unknown, fallback: string) {
	if (error instanceof HTTPError) {
		return error.response
			.json()
			.then((data) => data?.error || data?.message || fallback)
			.catch(() => fallback);
	}

	return fallback;
}

export default function Setup() {
	const theme = useTheme();
	const [step, setStep] = useState(1);
	const [selectedAuthenticator, setSelectedAuthenticator] = useState('google');
	const [secret, setSecret] = useState('');
	const [otpAuthUrl, setOtpAuthUrl] = useState('');
	const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
	const [copyMessage, setCopyMessage] = useState('Copy');
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [isSettingUp, setIsSettingUp] = useState(false);
	const [isConfirming, setIsConfirming] = useState(false);
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

	const isOtpComplete = otpValues.every((value) => value.length === 1);
	const otpCode = otpValues.join('');

	const getAccessToken = () => localStorage.getItem('jwt_access_token') || localStorage.getItem('token') || '';

	const handleOtpChange = (index: number, value: string) => {
		const digit = value.replace(/\D/g, '').slice(0, 1);
		const nextOtpValues = [...otpValues];
		nextOtpValues[index] = digit;
		setOtpValues(nextOtpValues);
		setErrorMessage('');

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

	const handleRequestSetup = async () => {
		const accessToken = getAccessToken();

		if (!accessToken) {
			setErrorMessage('Unable to start 2FA setup. Please sign in again.');
			return;
		}

		setIsSettingUp(true);
		setErrorMessage('');
		setSuccessMessage('');

		try {
			const setupData = await authSetup2fa(accessToken);
			setSecret(setupData.secret);
			setOtpAuthUrl(setupData.otpauth_url);
			setOtpValues(Array(6).fill(''));
			setStep(2);
		} catch (error) {
			setErrorMessage(await getErrorMessage(error, 'Unable to start 2FA setup. Please try again.'));
		} finally {
			setIsSettingUp(false);
		}
	};

	const handleConfirmSetup = async () => {
		const accessToken = getAccessToken();

		if (!accessToken) {
			setErrorMessage('Unable to confirm 2FA setup. Please sign in again.');
			return;
		}

		setIsConfirming(true);
		setErrorMessage('');

		try {
			const confirmData = await authConfirm2fa(accessToken, otpCode);

			if (confirmData.enabled) {
				setSuccessMessage('Two-Factor Authentication is now enabled!');
				setStep(4);
			}
		} catch (error) {
			setErrorMessage(await getErrorMessage(error, 'Invalid code. Check your phone app and try again.'));
		} finally {
			setIsConfirming(false);
		}
	};

	const handleCopySecret = async () => {
		try {
			await navigator.clipboard.writeText(secret);
			setCopyMessage('Copied');
			window.setTimeout(() => setCopyMessage('Copy'), 1500);
		} catch {
			setCopyMessage('Failed');
		}
	};

	const renderProgress = () => (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
			{[1, 2, 3, 4].map((stepNumber, index) => {
				const completed = step > stepNumber;
				const active = step === stepNumber;

				return (
					<Box
						key={stepNumber}
						sx={{ display: 'flex', alignItems: 'center', flex: 1 }}
					>
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
								}`
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
									borderRadius: 2
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
						<Typography
							variant="h6"
							fontWeight={700}
						>
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
											minWidth: 240
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
												textAlign: 'center'
											}}
										>
											<Box
												sx={{
													width: 40,
													height: 40,
													borderRadius: 1,
													display: 'grid',
													placeItems: 'center',
													border: `1px solid ${theme.palette.divider}`
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

						{errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

						<Button
							variant="contained"
							size="large"
							disableElevation
							sx={{ border: 'none' }}
							disabled={isSettingUp}
							onClick={handleRequestSetup}
						>
							{isSettingUp ? 'Preparing...' : 'Enable 2FA'}
						</Button>
					</Stack>
				);

			case 2:
				return (
					<Stack spacing={3}>
						<Typography
							variant="h6"
							fontWeight={700}
						>
							Step 2: Scan QR Code
						</Typography>
						<Typography color="#717182">Open your authenticator app and scan this QR code.</Typography>

						<Box
							sx={{
								borderRadius: 3,
								p: 4,
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<Box
								sx={{
									width: 220,
									height: 220,
									borderRadius: 3,
									bgcolor: 'background.paper',
									display: 'grid',
									placeItems: 'center',
									border: `1px solid ${theme.palette.divider}`
								}}
							>
								<QRCodeSVG
									value={otpAuthUrl}
									size={190}
								/>
							</Box>
						</Box>

						<Box
							sx={{
								borderRadius: 2,
								border: `1px solid ${theme.palette.divider}`,
								p: 3,
								backgroundColor: 'rgb(248, 246, 246)'
							}}
						>
							<Typography
								variant="subtitle2"
								fontWeight={700}
								gutterBottom
							>
								Can't scan the QR code?
							</Typography>
							<Typography
								variant="body2"
								color="#717182"
								paragraph
							>
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
										overflowX: 'auto'
									}}
								>
									{secret}
								</Box>
								<Button
									variant="outlined"
									size="small"
									onClick={handleCopySecret}
								>
									{copyMessage}
								</Button>
							</Box>
						</Box>

						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							spacing={2}
						>
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
						<Typography
							variant="h6"
							fontWeight={700}
						>
							Step 3: Enter Verification Code
						</Typography>
						<Typography color="#717182">
							Scan the QR code and enter the 6-digit confirmation code shown on your phone.
						</Typography>

						{errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

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
										}
									}}
									variant="standard"
									InputProps={{ disableUnderline: true }}
								/>
							))}
						</Box>

						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							spacing={2}
						>
							<Button
								variant="outlined"
								fullWidth
								onClick={() => setStep(2)}
							>
								Back
							</Button>
							<Button
								variant="contained"
								fullWidth
								disableElevation
								sx={{ border: 'none' }}
								disabled={!isOtpComplete || isConfirming}
								onClick={handleConfirmSetup}
							>
								{isConfirming ? 'Confirming...' : 'Confirm Setup'}
							</Button>
						</Stack>
					</Stack>
				);

			case 4:
				return (
					<Stack spacing={3}>
						<Alert severity="success">
							{successMessage || 'Two-Factor Authentication is now enabled!'}
						</Alert>
						<Button
							variant="contained"
							color="success"
							size="large"
							onClick={() => setStep(1)}
						>
							Done
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
				<Typography
					variant="h6"
					fontWeight={400}
				>
					Setup Two-Factor Authentication
				</Typography>
				<Typography color="#717182">Follow these steps to secure your account.</Typography>
			</Box>

			{renderProgress()}
			<Divider />
			{isSettingUp || isConfirming ? (
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
				>
					<CircularProgress size={18} />
					<Typography color="text.secondary">Processing request...</Typography>
				</Stack>
			) : null}
			{renderStepContent()}
		</Stack>
	);
}
