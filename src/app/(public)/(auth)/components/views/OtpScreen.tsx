import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { authVerify2fa, type CrmAuthSession } from '@auth/authApi';
import useJwtAuth from '@auth/services/jwt/useJwtAuth';
import { HTTPError } from 'ky';
import { useLocation, useNavigate } from 'react-router';

type OtpLocationState = CrmAuthSession | undefined;

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
	const authToken = initialSession?.preAuthToken || initialSession?.accessToken || '';

	const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
	const [errorMessage, setErrorMessage] = useState('');
	const [isVerifying, setIsVerifying] = useState(false);
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		if (!authToken) {
			navigate('/sign-in', { replace: true });
		}
	}, [authToken, navigate]);

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
			const verifiedSession = await authVerify2fa(authToken, code);
			const verifiedToken = verifiedSession.accessToken || verifiedSession.preAuthToken;

			if (!verifiedToken) {
				setErrorMessage('Unable to continue. The server did not return an authorization token.');
				return;
			}

			if (!verifiedSession.user) {
				setErrorMessage('Unable to continue. The server did not return user details.');
				return;
			}

			await completeSignIn({
				user: verifiedSession.user,
				accessToken: verifiedToken,
				refreshToken: verifiedSession.refreshToken
			});
			navigate('/dashboards/project', { replace: true });
		} catch (error) {
			setErrorMessage(await getErrorMessage(error, 'Invalid code. Please try again.'));
		} finally {
			setIsVerifying(false);
		}
	};

	if (!authToken) {
		return null;
	}

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4">
			<Paper className="flex w-full max-w-md flex-col gap-6 rounded-xl p-6 shadow-sm sm:p-8">
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
			</Paper>
		</div>
	);
}
