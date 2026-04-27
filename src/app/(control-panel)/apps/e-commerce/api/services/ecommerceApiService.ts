import { api } from '@/utils/api';
import { Order, Product } from '../types';

const getJsonWithFallback = async <T>(primaryPath: string, fallbackPath: string): Promise<T> => {
	try {
		const response = await api.get(primaryPath);
		const contentType = response.headers.get('content-type') || '';

		if (!contentType.includes('application/json')) {
			throw new Error(`Expected JSON response from ${primaryPath}`);
		}

		return await response.json<T>();
	} catch {
		return await api.get(fallbackPath).json<T>();
	}
};

export const ecommerceApi = {
	// Products
	getProducts: async (): Promise<Product[]> => {
		return getJsonWithFallback<Product[]>('ecommerce/products', 'mock/ecommerce/products');
	},

	getProduct: async (productId: string): Promise<Product> => {
		return getJsonWithFallback<Product>(`ecommerce/products/${productId}`, `mock/ecommerce/products/${productId}`);
	},

	createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
		return api
			.post('ecommerce/products', {
				json: product
			})
			.json();
	},

	updateProduct: async (product: Product): Promise<Product> => {
		return api
			.put(`ecommerce/products/${product.id}`, {
				json: product
			})
			.json();
	},

	deleteProduct: async (productId: string) => {
		return api.delete(`ecommerce/products/${productId}`);
	},

	deleteProducts: async (productIds: string[]) => {
		return api.delete('ecommerce/products', {
			json: productIds
		});
	},

	// Orders
	getOrders: async (): Promise<Order[]> => {
		return getJsonWithFallback<Order[]>('ecommerce/orders', 'mock/ecommerce/orders');
	},

	getOrder: async (orderId: string): Promise<Order> => {
		return getJsonWithFallback<Order>(`ecommerce/orders/${orderId}`, `mock/ecommerce/orders/${orderId}`);
	},

	updateOrder: async (order: Order): Promise<Order> => {
		return api
			.put(`ecommerce/orders/${order.id}`, {
				json: order
			})
			.json();
	},

	deleteOrder: async (orderId: string) => {
		return api.delete(`ecommerce/orders/${orderId}`);
	},

	deleteOrders: async (orderIds: string[]) => {
		return api.delete('ecommerce/orders', {
			json: orderIds
		});
	}
};
