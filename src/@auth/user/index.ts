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
