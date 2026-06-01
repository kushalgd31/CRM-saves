import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { FuseAuthUser } from '@fuse/core/FuseAuthProvider/types/FuseAuthUser';
import { PartialDeep } from 'type-fest';

/**
 * The type definition for a user object.
 */
export type User = FuseAuthUser & {
	id: string;
	role: string[] | string | null;
	displayName: string;
	photoURL?: string;
	email?: string;
	shortcuts?: string[];
	settings?: PartialDeep<FuseSettingsConfigType>;
	loginRedirectUrl?: string; // The URL to redirect to after login.
	crm?: {
		expiresIn?: number;
		tokenType?: string;
		requires2fa?: boolean;
		isActive?: boolean;
		isPlatformAdmin?: boolean;
		apps?: {
			app_id: string;
			name: string;
			role_type: string;
			membership_id?: string | null;
		}[];
		selectedApp?: {
			app_id: string;
			name: string;
			role_type: string;
		};
	};
};

export type AppRegistration = {
	app_id: string;
	name: string;
	spoc: string;
	support_email: string;
	production_domain: string;
	test_domain: string;
	products: string[];
	registration_config: Record<string, unknown>;
};
