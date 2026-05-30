import { User } from '@auth/user';
import UserModel from '@auth/user/models/UserModel';
import { PartialDeep } from 'type-fest';
import ky from 'ky';
import api, { getGlobalHeaders } from '@/utils/api';
import WhitelabelModel, { AppRegistration } from './user/models/WhiteLable';

type AuthResponse = {
	user: User;
	access_token: string;
};

type CrmLoginResponse = {
	success: true;
	data: {
		preAuthToken: string;
		expiresIn: number;
		tokenType: string;
		user: {
			id: string;
			email: string;
			name: string | null;
			is_platform_admin: boolean;
			is_active: boolean;
		};
		apps?: {
			app_id: string;
			name: string;
			role_type: string;
			membership_id: string | null;
		}[];
	};
};

type CrmAppSessionResponse = {
	success: true;
	data: {
		accessToken: string;
		refreshToken?: string;
		expiresIn?: number;
		tokenType?: string;
		app?: {
			app_id: string;
			name: string;
			role_type: string;
		};
	};
};

const crmFetch = typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : undefined;

const crmApi = ky.create({
	prefixUrl: `${(import.meta.env.VITE_CRM_API_BASE_URL as string) || 'https://crm-api.inversatechnosoft.com'}/api`,
	...(crmFetch ? { fetch: crmFetch } : {}),
	headers: {
		accept: 'application/json'
	},
	hooks: {
		beforeRequest: [
			(request) => {
				Object.entries(getGlobalHeaders()).forEach(([key, value]) => {
					request.headers.set(key, value);
				});
			}
		]
	}
});

function createClientId() {
	return globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
}

function getClientAuditPayload() {
	const screenInfo =
		typeof window !== 'undefined'
			? {
					w: window.screen?.width || 0,
					h: window.screen?.height || 0,
					dpr: window.devicePixelRatio || 1
				}
			: { w: 0, h: 0, dpr: 0 };

	const nav = typeof navigator !== 'undefined' ? navigator : null;
	const connection = nav && 'connection' in nav ? (nav.connection as { effectiveType?: string }) : null;

	return {
		session_id: createClientId(),
		tenant_id: 'string',
		auth_method: 'password',
		fingerprint_id: createClientId(),
		screen: screenInfo,
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		languages: nav?.languages?.length ? [...nav.languages] : ['en'],
		connection: connection?.effectiveType || 'unknown',
		server: {
			ip_country: 'st',
			ip_city: 'string',
			ip_asn: 'string'
		},
		risk_signals: {
			new_device: true,
			new_country: true,
			impossible_travel: true
		}
	};
}

function mapCrmLoginResponse(response: CrmLoginResponse): AuthResponse {
	const { data } = response;
	const primaryApp = data.apps?.[0];

	return {
		access_token: data.preAuthToken,
		user: UserModel({
			id: data.user.id,
			email: data.user.email,
			displayName: data.user.name || data.user.email,
			role: data.user.is_platform_admin ? 'admin' : primaryApp?.role_type || 'staff',
			loginRedirectUrl: '/otp',
			settings: {},
			shortcuts: [],
			crm: {
				expiresIn: data.expiresIn,
				tokenType: data.tokenType,
				isActive: data.user.is_active,
				isPlatformAdmin: data.user.is_platform_admin,
				apps: data.apps || []
			}
		})
	};
}

/**
 * Refreshes the access token
 */
export async function authRefreshToken(): Promise<Response> {
	return api.post('mock/auth/refresh', {
		retry: 0 // Don't retry refresh token requests
	});
}

/**
 * Sign in with token
 */
export async function authSignInWithToken(accessToken: string): Promise<Response> {
	return api.get('mock/auth/sign-in-with-token', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
}

/**
 * Sign in
 */
export async function authSignIn(credentials: { email: string; password: string }): Promise<AuthResponse> {
	const response = await crmApi
		.post('v1/auth/login', {
			json: {
				...credentials,
				client: getClientAuditPayload()
			}
		})
		.json<CrmLoginResponse>();

	return mapCrmLoginResponse(response);
}

/**
 * Sign up
 */
export async function authSignUp(data: {
	displayName: string;
	email: string;
	password: string;
}): Promise<AuthResponse> {
	return api
		.post('mock/auth/sign-up', {
			json: data
		})
		.json();
}

/**
 * Get user by id
 */
export async function authGetDbUser(userId: string): Promise<User> {
	return api.get(`mock/auth/user/${userId}`).json();
}

/**
 * Get user by email
 */
export async function authGetDbUserByEmail(email: string): Promise<User> {
	return api.get(`mock/auth/user-by-email/${email}`).json();
}

/**
 * Update user
 */
export function authUpdateDbUser(user: PartialDeep<User>): Promise<Response> {
	return api.put(`mock/auth/user/${user.id}`, {
		json: UserModel(user)
	});
}

/**
 * Create user
 */
export async function authCreateDbUser(user: PartialDeep<User>): Promise<User> {
	return api
		.post('mock/users', {
			json: UserModel(user)
		})
		.json();
}

type CreateWhitelabelResponse = {
	success?: boolean;
	data?: AppRegistration;
	message?: string;
};

type WhitelabelApp = AppRegistration & {
	id: string;
	status?: string;
	created_at?: string;
	updated_at?: string;
};

type WhitelabelAppsResponse = {
	success: boolean;
	data: WhitelabelApp[];
	message?: string;
};

export type CreateAdminUserPayload = {
	email: string;
	name: string;
	password: string;
	permission_role_id: string;
	role_type: 'admin' | 'sub_admin' | 'agent';
	department: string;
	status: 'active' | 'inactive';
	security_settings: {
		google_2fa_required: boolean;
		mpin_required: boolean;
		mpin_digits: 4 | 6;
	};
	restrictions: {
		ip_whitelist: string[];
		pii_masking: boolean;
		time_window: Record<string, unknown> | null;
		geo_restriction: Record<string, unknown> | null;
	};
};

type CreateAdminUserResponse = {
	success?: boolean;
	data?: unknown;
	message?: string;
};

export type PermissionRole = {
	id: string;
	name: string;
	role_type: 'admin' | 'sub_admin' | 'agent';
	description?: string;
};

type PermissionRolesResponse = {
	success?: boolean;
	data: PermissionRole[];
	message?: string;
};

async function getAppScopedAccessToken(appId: string) {
	const response = await crmApi
		.post('v1/auth/switch-app', {
			json: {
				app_id: appId
			}
		})
		.json<CrmAppSessionResponse>();

	return response.data.accessToken;
}

/**
 * Create whitelabel
 */
export async function createWhitelabel(data: PartialDeep<AppRegistration>): Promise<CreateWhitelabelResponse> {
	return crmApi
		.post('v1/platform/apps', {
			json: WhitelabelModel(data)
		})
		.json<CreateWhitelabelResponse>();
}

/**
 * Get whitelabel apps
 */
export async function getWhitelabelApps(): Promise<WhitelabelAppsResponse> {
	return crmApi.get('v1/platform/apps').json<WhitelabelAppsResponse>();
}

/**
 * Get permission roles for a whitelabel app
 */
export async function getPermissionRoles(appId: string): Promise<PermissionRolesResponse> {
	const accessToken = await getAppScopedAccessToken(appId);

	return crmApi
		.get('v1/permission-roles/', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'X-App-Id': appId
			}
		})
		.json<PermissionRolesResponse>();
}

/**
 * Create admin user for a whitelabel app
 */
export async function createAdminUser(appId: string, data: CreateAdminUserPayload): Promise<CreateAdminUserResponse> {
	const accessToken = await getAppScopedAccessToken(appId);

	return crmApi
		.post('v1/admin-users/', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'X-App-Id': appId
			},
			json: data
		})
		.json<CreateAdminUserResponse>();
}
