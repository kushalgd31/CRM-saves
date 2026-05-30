import _ from 'lodash';
import { PartialDeep } from 'type-fest';

export interface AppRegistration {
	app_id: string;
	name: string;
	spoc: string;
	support_email: string;
	production_domain: string;
	test_domain: string;
	products: string[];
	registration_config: Record<string, unknown>;
}

/**
 * Creates a new app registration object with the specified data.
 */
function WhitelabelModel(data?: PartialDeep<AppRegistration>): AppRegistration {
	data = data || {};

	return _.defaults(data, {
		app_id: '',
		name: '',
		spoc: '',
		support_email: '',
		production_domain: '',
		test_domain: '',
		products: [],
		registration_config: {}
	}) as AppRegistration;
}

export default WhitelabelModel;
