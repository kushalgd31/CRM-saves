import { User } from '@auth/user';
import UserModel from '@auth/user/models/UserModel';
import { PartialDeep } from 'type-fest';
import ky from 'ky';
import api, { getGlobalHeaders } from '@/utils/api';
import {
	computeRiskSignals,
	generateLoginSuccessPayload,
	getClientContext,
	getFingerprint,
	getIpGeoData,
	getTenantId
} from '@/utils/clientContext';
import WhitelabelModel, { AppRegistration } from './user/models/WhiteLable';

type AuthResponse = {
	user: User;
	access_token: string;
};

export type CrmAuthApp = {
	id?: string;
	app_id: string;
	name: string;
	role_type: string;
	membership_id?: string | null;
};

type CrmAuthAppLike = Partial<CrmAuthApp> & {
	appId?: string;
	id?: string;
	roleType?: string;
	role?: string;
	app?: CrmAuthAppLike;
	whitelabel?: CrmAuthAppLike;
	brand?: CrmAuthAppLike;
};

type CrmAuthUser = {
	id: string;
	email: string;
	name: string | null;
	is_platform_admin: boolean;
	is_active: boolean;
	apps?: CrmAuthAppLike[];
	app?: CrmAuthAppLike;
	whitelabel?: CrmAuthAppLike;
	brand?: CrmAuthAppLike;
};

type CrmLoginResponse = {
	success: true;
	data: {
		requires_2fa?: boolean;
		preAuthToken?: string;
		pre_auth_token?: string;
		accessToken?: string;
		access_token?: string;
		token?: string;
		refreshToken?: string;
		expiresIn: number;
		tokenType: string;
		user?: CrmAuthUser;
		apps?: CrmAuthAppLike[];
		app?: CrmAuthAppLike;
		whitelabel?: CrmAuthAppLike;
		brand?: CrmAuthAppLike;
	};
};

type CrmVerify2faResponse = {
	success: true;
	data: {
		requires_2fa?: boolean;
		accessToken?: string;
		access_token?: string;
		token?: string;
		refreshToken?: string;
		expiresIn?: number;
		tokenType?: string;
		user?: CrmAuthUser;
		apps?: CrmAuthAppLike[];
		app?: CrmAuthAppLike;
		whitelabel?: CrmAuthAppLike;
		brand?: CrmAuthAppLike;
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
			id?: string;
			app_id: string;
			name: string;
			role_type: string;
		};
	};
};

export type CrmAuthSession = {
	requires2fa: boolean;
	accessToken?: string;
	preAuthToken?: string;
	refreshToken?: string;
	expiresIn?: number;
	tokenType?: string;
	user?: User;
	apps: CrmAuthApp[];
	app?: CrmAuthApp;
};

export type TwoFactorSetupResponse = {
	success: true;
	data: {
		secret: string;
		otpauth_url: string;
	};
};

export type TwoFactorConfirmResponse = {
	success: true;
	data: {
		enabled: boolean;
	};
};

export type TwoFactorDisableResponse = {
	success: true;
	data: {
		enabled: boolean;
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
					// Do not send the internal `app-uuid` header to CRM API endpoints
					if (key === 'app-uuid') return;
					request.headers.set(key, value);
				});
			}
		]
	}
});

function createSessionId() {
	return globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
}

async function getClientAuditPayload() {
	const ctx = getClientContext();
	const [fingerprintId, geo] = await Promise.all([getFingerprint(), getIpGeoData()]);
	const riskSignals = computeRiskSignals(fingerprintId, geo);

	return {
		session_id: createSessionId(),
		tenant_id: getTenantId(),
		auth_method: 'password',
		fingerprint_id: fingerprintId,
		screen: ctx.screen,
		timezone: ctx.timezone,
		languages: ctx.languages,
		connection: ctx.connection,
		server: {
			ip_country: geo.ip_country,
			ip_city: geo.ip_city,
			ip_asn: geo.ip_asn
		},
		risk_signals: {
			new_device: riskSignals.new_device,
			new_country: riskSignals.new_country,
			impossible_travel: riskSignals.impossible_travel
		}
	};
}

if (typeof window !== 'undefined') {
	(window as Window & { getClientAuditPayload?: typeof getClientAuditPayload }).getClientAuditPayload =
		getClientAuditPayload;
}

function mapCrmUser(data: {
	user: CrmAuthUser;
	apps?: CrmAuthApp[];
	expiresIn?: number;
	tokenType?: string;
	requires2fa?: boolean;
	selectedApp?: CrmAuthApp;
}): User {
	const primaryApp = data.selectedApp || data.apps?.[0];

	return UserModel({
		id: data.user.id,
		email: data.user.email,
		displayName: data.user.name || data.user.email,
		role: data.user.is_platform_admin ? 'admin' : primaryApp?.role_type || 'staff',
		loginRedirectUrl: '/dashboards/project',
		settings: {},
		shortcuts: [],
		crm: {
			expiresIn: data.expiresIn,
			tokenType: data.tokenType,
			requires2fa: data.requires2fa,
			isActive: data.user.is_active,
			isPlatformAdmin: data.user.is_platform_admin,
			apps: data.apps || [],
			selectedApp: data.selectedApp
		}
	});
}

function mapCrmApp(app?: CrmAuthAppLike): CrmAuthApp | undefined {
	const appData = app?.app || app?.whitelabel || app?.brand || app;
	const appId = appData?.app_id || appData?.appId;
	const appUuid = appData?.id;

	if (!appId && !appUuid) {
		return undefined;
	}

	return {
		id: appUuid,
		app_id: appId || appUuid,
		name: appData.name || appId || appUuid,
		role_type: appData.role_type || appData.roleType || appData.role || 'admin',
		membership_id: appData.membership_id || null
	};
}

function getCrmApps(data: CrmLoginResponse['data'] | CrmVerify2faResponse['data']): CrmAuthApp[] {
	const appCandidates = [
		...(data.apps || []),
		data.app,
		data.whitelabel,
		data.brand,
		...(data.user?.apps || []),
		data.user?.app,
		data.user?.whitelabel,
		data.user?.brand
	];

	const appsById = new Map<string, CrmAuthApp>();

	appCandidates.forEach((candidate) => {
		const app = mapCrmApp(candidate);

		if (app) {
			appsById.set(app.id || app.app_id, app);
		}
	});

	return Array.from(appsById.values());
}

function getCrmAccessToken(data: CrmLoginResponse['data'] | CrmVerify2faResponse['data']) {
	return data.accessToken || data.access_token || data.token || '';
}

function getCrmPreAuthToken(data: { preAuthToken?: string; pre_auth_token?: string }) {
	return data.preAuthToken || data.pre_auth_token || '';
}

function mapCrmAuthSession(response: CrmLoginResponse | CrmVerify2faResponse, requires2faOverride?: boolean): CrmAuthSession {
	const { data } = response;
	const requires2fa = requires2faOverride ?? Boolean(data.requires_2fa);
	const apps = getCrmApps(data);
	const app =
		mapCrmApp(data.app || data.whitelabel || data.brand || data.user?.app || data.user?.whitelabel || data.user?.brand) ||
		apps[0];
	const accessToken = getCrmAccessToken(data);

	return {
		requires2fa,
		accessToken,
		preAuthToken: 'preAuthToken' in data || 'pre_auth_token' in data ? getCrmPreAuthToken(data) : undefined,
		refreshToken: data.refreshToken,
		expiresIn: data.expiresIn,
		tokenType: data.tokenType,
		user: data.user
			? mapCrmUser({
					user: data.user,
					apps,
					expiresIn: data.expiresIn,
					tokenType: data.tokenType,
					requires2fa,
					selectedApp: app
				})
			: undefined,
		apps,
		app
	};
}

async function storeLoginSuccessDetails(email: string) {
	if (typeof window === 'undefined') {
		return;
	}

	const successPayload = await generateLoginSuccessPayload(email);
	localStorage.setItem('superadmin_login_details', JSON.stringify(successPayload));
	(
		window as Window & { superadminLoginDetails?: Awaited<ReturnType<typeof generateLoginSuccessPayload>> }
	).superadminLoginDetails = successPayload;
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
export async function authSignIn(credentials: { email: string; password: string }): Promise<CrmAuthSession> {
	const clientPayload = await getClientAuditPayload();

	const response = await crmApi
		.post('v1/auth/login', {
			json: {
				...credentials,
				client: clientPayload
			}
		})
		.json<CrmLoginResponse>();

	storeLoginSuccessDetails(credentials.email).catch((error) => {
		console.error('Failed to generate success payload', error);
	});

	return mapCrmAuthSession(response);
}

/**
 * Verify 2FA code and receive the final authenticated session
 */
export async function authVerify2fa(authToken: string, code: string): Promise<CrmAuthSession> {
	const response = await crmApi
		.post('v1/auth/2fa/verify', {
			headers: {
				Authorization: `Bearer ${authToken}`
			},
			json: { code }
		})
		.json<CrmVerify2faResponse>();

	return mapCrmAuthSession(response, false);
}

/**
 * Request 2FA setup parameters
 */
export async function authSetup2fa(accessToken: string): Promise<TwoFactorSetupResponse['data']> {
	const response = await crmApi
		.post('v1/auth/2fa/setup', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
		.json<TwoFactorSetupResponse>();

	return response.data;
}

/**
 * Confirm and activate 2FA
 */
export async function authConfirm2fa(accessToken: string, code: string): Promise<TwoFactorConfirmResponse['data']> {
	const response = await crmApi
		.post('v1/auth/2fa/confirm', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			json: { code }
		})
		.json<TwoFactorConfirmResponse>();

	return response.data;
}

/**
 * Disable 2FA
 */
export async function authDisable2fa(accessToken: string, code: string): Promise<TwoFactorDisableResponse['data']> {
	const response = await crmApi
		.post('v1/auth/2fa/disable', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			json: { code }
		})
		.json<TwoFactorDisableResponse>();

	return response.data;
}

/**
 * Sign up
 */
export async function authSignUp(data: {
	displayName: string;
	email: string;
	password: string;
}): Promise<AuthResponse> {
	const clientPayload = await getClientAuditPayload();

	return api
		.post('mock/auth/sign-up', {
			json: {
				...data,
				client: clientPayload
			}
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
