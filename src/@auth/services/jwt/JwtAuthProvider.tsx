import { useState, useEffect, useCallback, useMemo, useImperativeHandle } from 'react';
import { FuseAuthProviderComponentProps, FuseAuthProviderState } from '@fuse/core/FuseAuthProvider/types/FuseAuthTypes';
import useLocalStorage from '@fuse/hooks/useLocalStorage';
import { authRefreshToken, authSignIn, authSignInWithToken, authSignUp, authUpdateDbUser } from '@auth/authApi';
import { User } from '../../user';
import { removeGlobalHeaders, setGlobalHeaders } from '@/utils/api';
import { isTokenValid } from './utils/jwtUtils';
import JwtAuthContext from '@auth/services/jwt/JwtAuthContext';
import { JwtAuthContextType } from '@auth/services/jwt/JwtAuthContext';
import { HTTPError } from 'ky';

export type JwtSignInPayload = {
	email: string;
	password: string;
};

export type JwtSignUpPayload = {
	displayName: string;
	email: string;
	password: string;
};

export type JwtCompleteSignInPayload = {
	user: User;
	accessToken: string;
	refreshToken?: string;
};

type JwtAppContext = NonNullable<User['crm']>['selectedApp'];

const appContextStorageKey = 'jwt_app_context';

function getAppContextHeaders(app?: JwtAppContext) {
	const headers: Record<string, string> = {};

	if (app?.app_id) {
		headers['X-App-Id'] = app.app_id;
	}

	if (app?.id) {
		headers['app-uuid'] = app.id;
	}

	return headers;
}

function persistAppContext(app?: JwtAppContext) {
	if (typeof window === 'undefined') {
		return;
	}

	if (app?.app_id || app?.id) {
		localStorage.setItem(
			appContextStorageKey,
			JSON.stringify({
				app_id: app.app_id,
				id: app.id
			})
		);
		return;
	}

	localStorage.removeItem(appContextStorageKey);
}

function getStoredAppContextHeaders() {
	if (typeof window === 'undefined') {
		return {};
	}

	const storedContext = localStorage.getItem(appContextStorageKey);

	if (!storedContext) {
		return {};
	}

	try {
		const app = JSON.parse(storedContext) as JwtAppContext;
		return getAppContextHeaders(app);
	} catch {
		localStorage.removeItem(appContextStorageKey);
		return {};
	}
}

function JwtAuthProvider(props: FuseAuthProviderComponentProps) {
	const { ref, children, onAuthStateChanged } = props;

	const {
		value: tokenStorageValue,
		setValue: setTokenStorageValue,
		removeValue: removeTokenStorageValue
	} = useLocalStorage<string>('jwt_access_token');

	/**
	 * Fuse Auth Provider State
	 */
	const [authState, setAuthState] = useState<FuseAuthProviderState<User>>({
		authStatus: 'configuring',
		isAuthenticated: false,
		user: null
	});

	/**
	 * Watch for changes in the auth state
	 * and pass them to the FuseAuthProvider
	 */
	useEffect(() => {
		if (onAuthStateChanged) {
			onAuthStateChanged(authState);
		}
	}, [authState, onAuthStateChanged]);

	/**
	 * Attempt to auto login with the stored token
	 */
	useEffect(() => {
		const attemptAutoLogin = async () => {
			const accessToken = tokenStorageValue;

			if (isTokenValid(accessToken)) {
				try {
					const response = await authSignInWithToken(accessToken);
					const userData = (await response.json()) as User;
					setGlobalHeaders({
						Authorization: `Bearer ${accessToken}`,
						...getStoredAppContextHeaders(),
						...getAppContextHeaders(userData.crm?.selectedApp)
					});
					persistAppContext(userData.crm?.selectedApp);
					return userData;
				} catch (error) {
					if (error instanceof HTTPError) {
						console.error('Auto login failed:', error.response.status);
					}

					return false;
				}
			}

			return false;
		};

		if (!authState.isAuthenticated) {
			attemptAutoLogin().then((userData) => {
				if (userData) {
					setAuthState({
						authStatus: 'authenticated',
						isAuthenticated: true,
						user: userData
					});
				} else {
					removeTokenStorageValue();
					localStorage.removeItem(appContextStorageKey);
					removeGlobalHeaders(['Authorization', 'X-App-Id', 'app-uuid']);
					setAuthState({
						authStatus: 'unauthenticated',
						isAuthenticated: false,
						user: null
					});
				}
			});
		}
		// eslint-disable-next-line
	}, [authState.isAuthenticated]);

	/**
	 * Sign in
	 */
	const signIn: JwtAuthContextType['signIn'] = useCallback(async (credentials) => {
		try {
			return await authSignIn(credentials);
		} catch (error) {
			if (error instanceof HTTPError) {
				console.error('Sign in failed:', error.response.status);
			}

			throw error;
		}
	}, []);

	const completeSignIn: JwtAuthContextType['completeSignIn'] = useCallback(
		async ({ user, accessToken, refreshToken }) => {
			setAuthState({
				authStatus: 'authenticated',
				isAuthenticated: true,
				user
			});
			setTokenStorageValue(accessToken);
			persistAppContext(user.crm?.selectedApp);
			setGlobalHeaders({
				Authorization: `Bearer ${accessToken}`,
				...getAppContextHeaders(user.crm?.selectedApp)
			});

			if (refreshToken) {
				localStorage.setItem('jwt_refresh_token', refreshToken);
			} else {
				localStorage.removeItem('jwt_refresh_token');
			}

			return { user, access_token: accessToken };
		},
		[setTokenStorageValue]
	);

	/**
	 * Sign up
	 */
	const signUp: JwtAuthContextType['signUp'] = useCallback(
		async (data) => {
			try {
				const session = await authSignUp(data);
				setAuthState({
					authStatus: 'authenticated',
					isAuthenticated: true,
					user: session.user
				});
				setTokenStorageValue(session.access_token);
				setGlobalHeaders({ Authorization: `Bearer ${session.access_token}` });
				return session;
			} catch (error) {
				if (error instanceof HTTPError) {
					console.error('Sign up failed:', error.response.status);
				}

				throw error;
			}
		},
		[setTokenStorageValue]
	);

	/**
	 * Sign out
	 */
	const signOut: JwtAuthContextType['signOut'] = useCallback(() => {
		removeTokenStorageValue();
		localStorage.removeItem('jwt_refresh_token');
		localStorage.removeItem(appContextStorageKey);
		removeGlobalHeaders(['Authorization', 'X-App-Id', 'app-uuid']);
		setAuthState({
			authStatus: 'unauthenticated',
			isAuthenticated: false,
			user: null
		});
	}, [removeTokenStorageValue]);

	/**
	 * Update user
	 */
	const updateUser: JwtAuthContextType['updateUser'] = useCallback(async (_user) => {
		try {
			const response = await authUpdateDbUser(_user);
			return response;
		} catch (error) {
			if (error instanceof HTTPError) {
				console.error('Update user failed:', error.response.status);
			}

			throw error;
		}
	}, []);

	/**
	 * Refresh access token
	 */
	const refreshToken: JwtAuthContextType['refreshToken'] = useCallback(async () => {
		try {
			const response = await authRefreshToken();
			return response;
		} catch (error) {
			if (error instanceof HTTPError) {
				console.error('Token refresh failed:', error.response.status);
			}

			throw error;
		}
	}, []);

	/**
	 * Auth Context Value
	 */
	const authContextValue = useMemo(
		() =>
			({
				...authState,
				signIn,
				completeSignIn,
				signUp,
				signOut,
				updateUser,
				refreshToken
			}) as JwtAuthContextType,
		[authState, signIn, completeSignIn, signUp, signOut, updateUser, refreshToken]
	);

	/**
	 * Expose methods to the FuseAuthProvider
	 */
	useImperativeHandle(ref, () => ({
		signOut,
		updateUser
	}));

	/**
	 * Intercept fetch requests to refresh the access token
	 */
	const interceptFetch = useCallback(() => {
		const { fetch: originalFetch } = window;

		window.fetch = async (...args) => {
			const [resource, config] = args;
			try {
				const response = await originalFetch(resource, config);
				const newAccessToken = response.headers.get('New-Access-Token');

				if (newAccessToken) {
					setGlobalHeaders({ Authorization: `Bearer ${newAccessToken}` });
					setTokenStorageValue(newAccessToken);
				}

				if (response.status === 401) {
					signOut();
					console.error('Unauthorized request. User was signed out.');
				}

				return response;
			} catch (error) {
				if (error instanceof HTTPError && error.response.status === 401) {
					signOut();
					console.error('Unauthorized request. User was signed out.');
				}

				throw error;
			}
		};
	}, [setTokenStorageValue, signOut]);

	useEffect(() => {
		if (authState.isAuthenticated) {
			interceptFetch();
		}
	}, [authState.isAuthenticated, interceptFetch]);

	return <JwtAuthContext value={authContextValue}>{children}</JwtAuthContext>;
}

export default JwtAuthProvider;
