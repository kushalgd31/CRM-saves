// ---------------------------------------------------------------------------
// FingerprintJS – stable browser fingerprint
// ---------------------------------------------------------------------------

type FingerprintAgent = {
	get: () => Promise<{ visitorId: string }>;
};

type FingerprintModule = {
	default?: {
		load: () => Promise<FingerprintAgent>;
	};
	load?: () => Promise<FingerprintAgent>;
};

type ConnectionInfo = {
	type?: string;
	effectiveType?: string;
	downlink?: number;
	rtt?: number;
};

const allowedConnectionTypes = new Set([
	'bluetooth',
	'cellular',
	'ethernet',
	'none',
	'wifi',
	'wimax',
	'other',
	'unknown',
	'2g',
	'3g',
	'4g',
	'5g'
]);

function normalizeEffectiveConnectionType(effectiveType?: string): string | null {
	if (!effectiveType) {
		return null;
	}

	if (effectiveType === 'slow-2g') {
		return '2g';
	}

	return allowedConnectionTypes.has(effectiveType) ? effectiveType : null;
}

function getConnectionType(connection: ConnectionInfo | null): string {
	if (connection?.type && allowedConnectionTypes.has(connection.type)) {
		return connection.type;
	}

	return normalizeEffectiveConnectionType(connection?.effectiveType) || 'unknown';
}

let fpPromise: Promise<FingerprintAgent> | null = null;

async function loadFingerprintModule() {
	const moduleName = '@fingerprintjs/fingerprintjs';
	return import(/* @vite-ignore */ moduleName) as Promise<FingerprintModule>;
}

function getFpAgent() {
	if (!fpPromise) {
		fpPromise = loadFingerprintModule().then((module) => {
			const fingerprint = module.default || module;

			if (!fingerprint.load) {
				throw new Error('FingerprintJS load method is unavailable');
			}

			return fingerprint.load();
		});
	}

	return fpPromise;
}

/**
 * Returns a stable browser fingerprint (visitor ID).
 */
export async function getFingerprint(): Promise<string> {
	try {
		const agent = await getFpAgent();
		const result = await agent.get();
		return result.visitorId;
	} catch {
		return globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
	}
}

// ---------------------------------------------------------------------------
// IP geolocation (cached per page-load)
// ---------------------------------------------------------------------------

type GeoData = {
	ip: string;
	ip_country: string;
	ip_city: string;
	ip_asn: string;
	country_code: string;
	lat: number;
	lon: number;
};

let geoCache: GeoData | null = null;

/**
 * Fetches the user's IP geolocation from ipapi.co (free, secure HTTPS).
 * Results are cached for the lifetime of the page.
 */
export async function getIpGeoData(): Promise<GeoData> {
	if (geoCache) {
		return geoCache;
	}

	try {
		const res = await fetch('https://ipapi.co/json/');
		const json = await res.json();

		if (!json.error) {
			geoCache = {
				ip: json.ip || '127.0.0.1',
				ip_country: json.country_code || json.country_name || 'unknown',
				ip_city: json.city || 'unknown',
				ip_asn: normalizeAsn(json.asn || json.org),
				country_code: json.country_code || 'unknown',
				lat: json.latitude ?? 0,
				lon: json.longitude ?? 0
			};
		} else {
			geoCache = fallbackGeo();
		}
	} catch {
		geoCache = fallbackGeo();
	}

	return geoCache;
}

function fallbackGeo(): GeoData {
	return {
		ip: '127.0.0.1',
		ip_country: 'unknown',
		ip_city: 'unknown',
		ip_asn: 'AS0',
		country_code: 'unknown',
		lat: 0,
		lon: 0
	};
}

function normalizeAsn(value: unknown): string {
	if (typeof value !== 'string') {
		return 'AS0';
	}

	const match = value.toUpperCase().match(/^(?:[A-Z]{2})?([0-9]{1,10})$/);
	if (match) {
		const prefix = value.toUpperCase().startsWith('AS') ? 'AS' : '';
		return `${prefix}${match[1]}`;
	}

	const digits = value.replace(/\D/g, '');
	return digits ? `AS${digits}` : 'AS0';
}

// ---------------------------------------------------------------------------
// Risk signals – compare with previous session stored in localStorage
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'crm_client_audit_history';

type AuditHistory = {
	fingerprint: string;
	country: string;
	timestamp: number; // epoch ms
	lat: number;
	lon: number;
};

function loadHistory(): AuditHistory | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);

		if (!raw) {
			return null;
		}

		return JSON.parse(raw) as AuditHistory;
	} catch {
		return null;
	}
}

function saveHistory(entry: AuditHistory) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
	} catch {
		// localStorage might be unavailable
	}
}

/**
 * Computes risk signals by comparing the current session with the last known session.
 */
export function computeRiskSignals(
	fingerprint: string,
	geo: GeoData
): { new_device: boolean; new_country: boolean; impossible_travel: boolean } {
	const prev = loadHistory();
	const now = Date.now();

	if (!prev) {
		saveHistory({ fingerprint, country: geo.country_code, timestamp: now, lat: geo.lat, lon: geo.lon });
		return { new_device: true, new_country: false, impossible_travel: false };
	}

	const newDevice = prev.fingerprint !== fingerprint;
	const newCountry = prev.country !== geo.country_code;

	let impossibleTravel = false;

	if (prev.lat !== 0 && prev.lon !== 0 && geo.lat !== 0 && geo.lon !== 0) {
		const elapsedHours = (now - prev.timestamp) / (1000 * 60 * 60);
		const distKm = haversineKm(prev.lat, prev.lon, geo.lat, geo.lon);
		impossibleTravel = elapsedHours < 1 && distKm > 500;
	}

	saveHistory({ fingerprint, country: geo.country_code, timestamp: now, lat: geo.lat, lon: geo.lon });

	return { new_device: newDevice, new_country: newCountry, impossible_travel: impossibleTravel };
}

/**
 * Haversine formula – returns distance in km between two lat/lon pairs.
 */
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371;
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---------------------------------------------------------------------------
// Client context – screen, timezone, languages, connection
// ---------------------------------------------------------------------------

/**
 * Collects client-side context signals for the audit payload.
 */
export function getClientContext() {
	const nav = typeof navigator !== 'undefined' ? navigator : null;
	const connection =
		nav && 'connection' in nav
			? (nav.connection as ConnectionInfo)
			: null;

	return {
		screen: {
			w: typeof window !== 'undefined' ? window.screen?.width || 0 : 0,
			h: typeof window !== 'undefined' ? window.screen?.height || 0 : 0,
			dpr: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 0
		},
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		languages: nav?.languages?.length ? [...nav.languages] : ['en'],
		connection: {
			type: getConnectionType(connection),
			effective_type: connection?.effectiveType || 'unknown',
			downlink: typeof connection?.downlink === 'number' ? connection.downlink : 0,
			rtt: typeof connection?.rtt === 'number' ? connection.rtt : 0
		}
	};
}

// ---------------------------------------------------------------------------
// Tenant ID – derived from current app origin
// ---------------------------------------------------------------------------

/**
 * Derives a tenant identifier from the app's origin.
 */
export function getTenantId(): string {
	if (typeof window !== 'undefined' && window.location?.hostname) {
		return window.location.hostname;
	}

	return 'default';
}

// ---------------------------------------------------------------------------
// User Agent Parsing
// ---------------------------------------------------------------------------

function parseUserAgent() {
	if (typeof navigator === 'undefined') {
		return { browser: 'Unknown', os: 'Unknown', device_type: 'desktop' };
	}

	const ua = navigator.userAgent;
	let browser = 'Unknown';
	let os = 'Unknown';
	let device_type = 'desktop';

	// Browser detection
	if (ua.indexOf('Firefox') > -1) {
		const match = ua.match(/Firefox\/(\d+)/);
		browser = `Firefox ${match ? match[1] : ''}`;
	} else if (ua.indexOf('Chrome') > -1) {
		const match = ua.match(/Chrome\/(\d+)/);
		browser = `Chrome ${match ? match[1] : ''}`;
	} else if (ua.indexOf('Safari') > -1) {
		const match = ua.match(/Version\/(\d+)/);
		browser = `Safari ${match ? match[1] : ''}`;
	} else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
		browser = 'IE';
	}

	// OS detection
	if (ua.indexOf('Windows') > -1) {
		os = 'Windows';
	} else if (ua.indexOf('Macintosh') > -1) {
		os = 'macOS';
	} else if (ua.indexOf('Linux') > -1) {
		os = 'Linux';
	} else if (ua.indexOf('Android') > -1) {
		os = 'Android';
		device_type = 'mobile';
	} else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
		os = 'iOS';
		device_type = 'mobile';
	}

	return { browser, os, device_type };
}

// ---------------------------------------------------------------------------
// Complete Audit Payload Generator
// ---------------------------------------------------------------------------

export async function generateLoginSuccessPayload(email: string) {
	const isSuperAdmin = email === 'superadmin@crm.local';
	const [fingerprint, geo] = await Promise.all([getFingerprint(), getIpGeoData()]);
	const ctx = getClientContext();
	const riskSignals = computeRiskSignals(fingerprint, geo);
	const uaInfo = parseUserAgent();

	return {
		event: 'login.success',
		timestamp: new Date().toISOString(),
		user_id: isSuperAdmin ? 'usr_abc123' : `usr_${Math.random().toString(36).slice(2, 8)}`,
		session_id: isSuperAdmin ? 'ses_xyz789' : `ses_${Math.random().toString(36).slice(2, 8)}`,
		tenant_id: isSuperAdmin ? 'studio_42' : getTenantId(),
		auth_method: isSuperAdmin ? 'password+totp' : 'password',
		server: {
			ip: geo.ip,
			ip_country: geo.ip_country,
			ip_city: geo.ip_city,
			ip_asn: geo.ip_asn,
			user_agent_raw: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
			browser: uaInfo.browser,
			os: uaInfo.os,
			device_type: uaInfo.device_type
		},
		client: {
			fingerprint_id: fingerprint,
			screen: ctx.screen,
			timezone: ctx.timezone,
			languages: ctx.languages,
			connection: ctx.connection
		},
		risk_signals: {
			new_device: riskSignals.new_device,
			new_country: riskSignals.new_country,
			impossible_travel: riskSignals.impossible_travel
		}
	};
}
