import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Link from '@fuse/core/Link';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { setSessionRedirectUrl } from '@fuse/core/FuseAuthorization/sessionRedirectUrl';
import useJwtAuth from '../useJwtAuth';
import { HTTPError } from 'ky';
import { authSelectApp, type CrmAuthApp, type CrmPreAuthSession } from '@auth/authApi';
import { User } from '@auth/user';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
	password: z
		.string()
		.min(4, 'Password is too short - must be at least 4 chars.')
		.nonempty('Please enter your password.'),
	remember: z.boolean().optional()
});

type FormType = z.infer<typeof schema>;

const defaultValues: FormType = {
	email: '',
	password: '',
	remember: true
};

function JwtSignInForm() {
	const { completeSignIn, signIn } = useJwtAuth();
	const navigate = useNavigate();

	const { control, formState, handleSubmit, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors, isSubmitting } = formState;

	async function completePreAuthSession(preAuthSession: CrmPreAuthSession) {
		if (!preAuthSession.user) {
			setError('root', {
				type: 'manual',
				message: 'Unable to sign in. The server did not return user details.'
			});
			return;
		}

		const primaryApp = preAuthSession.apps[0];

		if (primaryApp) {
			const finalSession = await authSelectApp(preAuthSession.preAuthToken, primaryApp.app_id);
			const finalUser = createFinalUser(preAuthSession.user, primaryApp, finalSession.app);

			await completeSignIn({
				user: finalUser,
				accessToken: finalSession.accessToken,
				refreshToken: finalSession.refreshToken
			});
		} else {
			await completeSignIn({
				user: preAuthSession.user,
				accessToken: preAuthSession.preAuthToken
			});
		}

		navigate('/dashboards/project', { replace: true });
	}

	async function onSubmit(formData: FormType) {
		const { email, password } = formData;

		setSessionRedirectUrl('/dashboards/project');

		try {
			const preAuthSession = await signIn({
				email,
				password
			});

			if (!preAuthSession?.preAuthToken) {
				setError('root', {
					type: 'manual',
					message: 'Unable to sign in. The server did not return an authorization token.'
				});
				return;
			}

			// Redirect to OTP screen always; OTP component will verify and complete sign-in
			navigate('/otp', {
				state: preAuthSession
			});
		} catch (error) {
			if (error instanceof HTTPError) {
				const errorData = await error.response.json().catch(() => null);

				setError('root', {
					type: 'manual',
					message: errorData?.error || 'Unable to sign in. Please check your credentials and try again.'
				});
				return;
			}

			setError('root', {
				type: 'manual',
				message: 'Unable to sign in. Please try again.'
			});
		}
	}

	return (
		<form
			name="loginForm"
			noValidate
			className="flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			{errors.root?.message && (
				<Alert
					severity="error"
					className="mb-6"
				>
					{errors.root.message}
				</Alert>
			)}

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-6"
						label="Email"
						autoFocus
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-6"
						label="Password"
						type="password"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
				<Controller
					name="remember"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Remember me"
								control={
									<Checkbox
										size="small"
										{...field}
									/>
								}
							/>
						</FormControl>
					)}
				/>

				<Link
					className="text-md font-medium"
					to="/#"
				>
					Forgot password?
				</Link>
			</div>

			<Button
				variant="contained"
				color="secondary"
				className="mt-4 w-full"
				aria-label="Sign in"
				disabled={_.isEmpty(dirtyFields) || !isValid || isSubmitting}
				type="submit"
				size="large"
			>
				{isSubmitting ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>
	);
}

function createFinalUser(user: User, app: CrmAuthApp, selectedApp?: User['crm']['selectedApp']): User {
	return {
		...user,
		role: user.crm?.isPlatformAdmin ? 'admin' : app.role_type,
		crm: {
			...user.crm,
			selectedApp: selectedApp || {
				app_id: app.app_id,
				name: app.name,
				role_type: app.role_type
			}
		}
	};
}

export default JwtSignInForm;
