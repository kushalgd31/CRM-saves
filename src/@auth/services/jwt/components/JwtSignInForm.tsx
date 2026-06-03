import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Link from '@fuse/core/Link';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { setSessionRedirectUrl } from '@fuse/core/FuseAuthorization/sessionRedirectUrl';
import useJwtAuth from '../useJwtAuth';
import { HTTPError } from 'ky';
import { type CrmAuthSession } from '@auth/authApi';

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

	async function completeAuthSession(authSession: CrmAuthSession) {
	const authToken = authSession.accessToken || authSession.preAuthToken;

	if (!authToken) {
		setError('root', {
			type: 'manual',
			message: 'Unable to sign in. The server did not return an authorization token.'
		});
		return;
	}

	if (!authSession.user) {
		setError('root', {
			type: 'manual',
			message: 'Unable to sign in. The server did not return user details.'
		});
		return;
	}

	await completeSignIn({
		user: authSession.user,
		accessToken: authToken,
		});

		navigate('/dashboards/project', { replace: true });
	}

	async function onSubmit(formData: FormType) {
		const { email, password } = formData;

		setSessionRedirectUrl('/dashboards/project');

		try {
			const authSession = await signIn({
				email,
				password
			});
			const authToken = authSession?.accessToken || authSession?.preAuthToken;

			if (!authToken) {
				setError('root', {
					type: 'manual',
					message: 'Unable to sign in. The server did not return an authorization token.'
				});
				return;
			}

			if (authSession.requires2fa) {
				navigate('/otp', {
					state: authSession
				});
				return;
			}

			await completeAuthSession(authSession);
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
			className="flex w-full flex-col justify-center gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{errors.root?.message && (
				<Alert
					severity="error"
					className="mb-2"
				>
					{errors.root.message}
				</Alert>
			)}

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="email">Email address</FormLabel>
						<TextField
							{...field}
							id="email"
							autoFocus
							type="email"
							error={!!errors.email}
							helperText={errors?.email?.message}
							required
							fullWidth
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							{...field}
							id="password"
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							required
							fullWidth
						/>
					</FormControl>
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
				className="w-full"
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

export default JwtSignInForm;
