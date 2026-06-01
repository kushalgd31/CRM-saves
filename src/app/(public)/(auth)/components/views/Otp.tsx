import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { authSelectApp, authVerify2fa, type CrmAuthApp, type CrmPreAuthSession } from '@auth/authApi';
import useJwtAuth from '@auth/services/jwt/useJwtAuth';
import { User } from '@auth/user';
import { HTTPError } from 'ky';
import { useLocation, useNavigate } from 'react-router';

type OtpLocationState = CrmPreAuthSession | undefined;

async function getErrorMessage(error: unknown, fallback: string) {
	if (error instanceof HTTPError) {
		return error.response
			.json()
			.then((data) => data?.error || data?.message || fallback)
			.catch(() => fallback);
	}

	return fallback;
}

export default function Otp() {
	const length = 6;
	const navigate = useNavigate();
	const { state } = useLocation();
	const { completeSignIn } = useJwtAuth();
	const initialSession = state as OtpLocationState;

	const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
	const [preAuthToken, setPreAuthToken] = useState(initialSession?.preAuthToken || '');
	const [apps, setApps] = useState<CrmAuthApp[]>(initialSession?.apps || []);
	const [user, setUser] = useState<User | undefined>(initialSession?.user);
	const [requires2fa, setRequires2fa] = useState(Boolean(initialSession?.requires2fa));
	const [errorMessage, setErrorMessage] = useState('');
	const [isVerifying, setIsVerifying] = useState(false);
	const [selectedAppId, setSelectedAppId] = useState('');
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		if (!initialSession?.preAuthToken) {
			navigate('/sign-in', { replace: true });
		}
	}, [initialSession?.preAuthToken, navigate]);

	const code = otp.join('');
	const isOtpComplete = code.length === length;

	const handleChange = (value: string, index: number) => {
		if (!/^\d?$/.test(value)) {
			return;
		}

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		setErrorMessage('');

		if (value && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (event.key === 'Backspace' && !otp[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	const handleVerify = async () => {
		setIsVerifying(true);
		setErrorMessage('');

		try {
			const verifiedSession = await authVerify2fa(preAuthToken, code);
			setPreAuthToken(verifiedSession.preAuthToken);
			setApps(verifiedSession.apps);
			setUser(verifiedSession.user);
			setRequires2fa(false);

			// If no apps returned, complete sign in with the pre-auth token as access token
			if (!verifiedSession.apps || verifiedSession.apps.length === 0) {
				if (!verifiedSession.user) {
					setErrorMessage('Unable to continue. The server did not return user details.');
					return;
				}

				await completeSignIn({
					user: verifiedSession.user,
					accessToken: verifiedSession.preAuthToken
				});
				navigate('/dashboards/project', { replace: true });
				return;
			}

			// If a single app is returned, auto-select it and complete sign-in
			if (verifiedSession.apps.length === 1) {
				await handleSelectApp(verifiedSession.apps[0], verifiedSession.user);
				return;
			}
		} catch (error) {
			setErrorMessage(await getErrorMessage(error, 'Invalid code. Please try again.'));
		} finally {
			setIsVerifying(false);
		}
	};

	const handleSelectApp = async (app: CrmAuthApp, userArg?: User) => {
		const currentUser = userArg || user;
		if (!currentUser) {
			setErrorMessage('Unable to continue. The server did not return user details.');
			return;
		}

		setSelectedAppId(app.app_id);
		setErrorMessage('');

		try {
			const finalSession = await authSelectApp(preAuthToken, app.app_id);
			const finalUser: User = {
				...currentUser,
				role: currentUser.crm?.isPlatformAdmin ? 'admin' : app.role_type,
				crm: {
					...currentUser.crm,
					selectedApp: finalSession.app || {
						app_id: app.app_id,
						name: app.name,
						role_type: app.role_type
					}
				}
			};

			await completeSignIn({
				user: finalUser,
				accessToken: finalSession.accessToken,
				refreshToken: finalSession.refreshToken
			});
			navigate('/dashboards/project', { replace: true });
		} catch (error) {
			setErrorMessage(await getErrorMessage(error, 'Unable to select app. Please try again.'));
		} finally {
			setSelectedAppId('');
		}
	};

	if (!initialSession?.preAuthToken) {
		return null;
	}

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4">
			<Paper className="flex w-full max-w-md flex-col gap-6 rounded-xl p-6 shadow-sm sm:p-8">
				{requires2fa ? (
					<>
						<div>
							<Typography
								variant="h5"
								className="text-center font-semibold"
							>
								Enter 6-digit code
							</Typography>
							<Typography
								color="text.secondary"
								className="mt-2 text-center"
							>
								Enter the code from your authenticator app.
							</Typography>
						</div>

						{errorMessage && <Alert severity="error">{errorMessage}</Alert>}

						<div className="flex justify-center gap-2 sm:gap-3">
							{otp.map((digit, index) => (
								<input
									key={index}
									ref={(element) => {
										inputsRef.current[index] = element;
									}}
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={digit}
									onChange={(event) => handleChange(event.target.value, index)}
									onKeyDown={(event) => handleKeyDown(event, index)}
									className="h-12 w-12 rounded-lg border border-gray-200 text-center text-lg font-semibold outline-none focus:border-blue-500 sm:h-14 sm:w-14 sm:text-xl"
								/>
							))}
						</div>

						<Button
							variant="contained"
							color="secondary"
							size="large"
							disabled={!isOtpComplete || isVerifying}
							onClick={handleVerify}
						>
							{isVerifying ? 'Verifying...' : 'Verify'}
						</Button>
					</>
				) : (
					<>
						<div>
							<Typography
								variant="h5"
								className="text-center font-semibold"
							>
								Select brand app
							</Typography>
							<Typography
								color="text.secondary"
								className="mt-2 text-center"
							>
								Choose the brand app you want to manage.
							</Typography>
						</div>

						{errorMessage && <Alert severity="error">{errorMessage}</Alert>}

						<div className="flex flex-col gap-3">
							{apps.map((app) => (
								<Button
									key={app.app_id}
									variant="outlined"
									className="justify-between rounded-lg px-4 py-3"
									disabled={Boolean(selectedAppId)}
									onClick={() => handleSelectApp(app)}
								>
									<span className="text-left">
										<span className="block font-semibold">{app.name}</span>
										<span className="block text-xs text-gray-500">{app.role_type}</span>
									</span>
									{selectedAppId === app.app_id ? <CircularProgress size={18} /> : app.app_id}
								</Button>
							))}
						</div>

						{apps.length === 0 && (
							<Alert severity="warning">No brand apps were returned for this account.</Alert>
						)}
					</>
				)}
			</Paper>
		</div>
	);
}
