import { useEffect, useState } from 'react';
import { ReportConfig, ReportRow } from '../config/reportConfig';

export type ReportFilters = {
	agent: string;
	actionCategory: string;
	date: string;
	provider: string;
};

type UseReportDataResult = {
	data: ReportRow[];
	error: string | null;
	isFallbackData: boolean;
	isLoading: boolean;
};

function normalizeFilterValue(value: string) {
	return value.trim().toLowerCase();
}

function buildRequestUrl(api: string, filters: ReportFilters) {
	const searchParams = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value.trim()) {
			searchParams.set(key, value.trim());
		}
	});

	const query = searchParams.toString();

	return query ? `${api}?${query}` : api;
}

function matchesFilter(source: unknown, expected: string) {
	if (!expected) {
		return true;
	}

	return String(source ?? '')
		.toLowerCase()
		.includes(expected);
}

function filterMockRows(rows: ReportRow[], filters: ReportFilters) {
	const normalizedCategory = normalizeFilterValue(filters.actionCategory);
	const normalizedDate = normalizeFilterValue(filters.date);
	const normalizedAgent = normalizeFilterValue(filters.agent);
	const normalizedProvider = normalizeFilterValue(filters.provider);

	return rows.filter((row) => {
		const matchesCategoryFilter =
			!normalizedCategory ||
			[
				row.category,
				row.product,
				row.transactionType,
				row.bonusType,
				row.market,
				row.game,
				row.gameName,
				row.walletType
			].some((value) => matchesFilter(value, normalizedCategory));
		const matchesDateFilter =
			!normalizedDate ||
			[
				row.settlementDate,
				row.lastBetAt,
				row.createdAt,
				row.lastLogin,
				row.updatedAt,
				row.expiresAt,
				row.settledAt
			].some((value) =>
				String(value ?? '')
					.toLowerCase()
					.startsWith(normalizedDate)
			);
		const matchesAgentFilter = !normalizedAgent || matchesFilter(row.agentName, normalizedAgent);
		const matchesProviderFilter =
			!normalizedProvider ||
			[row.provider, row.product].some((value) => matchesFilter(value, normalizedProvider));

		return matchesCategoryFilter && matchesDateFilter && matchesAgentFilter && matchesProviderFilter;
	});
}

function normalizeReportResponse(payload: unknown): ReportRow[] {
	if (Array.isArray(payload)) {
		return payload as ReportRow[];
	}

	if (payload && typeof payload === 'object') {
		const record = payload as { data?: unknown; rows?: unknown };

		if (Array.isArray(record.data)) {
			return record.data as ReportRow[];
		}

		if (Array.isArray(record.rows)) {
			return record.rows as ReportRow[];
		}
	}

	throw new Error('Unexpected report response shape.');
}

function useReportData(config: ReportConfig, filters: ReportFilters): UseReportDataResult {
	const [data, setData] = useState<ReportRow[]>(config.mockData);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isFallbackData, setIsFallbackData] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		let isActive = true;

		async function fetchReportData() {
			setData(filterMockRows(config.mockData, filters));
			setIsLoading(true);
			setError(null);
			setIsFallbackData(false);

			try {
				const response = await fetch(buildRequestUrl(config.api, filters), {
					signal: controller.signal
				});

				if (!response.ok) {
					throw new Error(`Request failed with status ${response.status}`);
				}

				const payload = await response.json();
				const rows = normalizeReportResponse(payload);

				if (isActive) {
					setData(rows);
				}
			} catch (caughtError) {
				if (controller.signal.aborted || !isActive) {
					return;
				}

				setData(filterMockRows(config.mockData, filters));
				setIsFallbackData(true);
				setError(caughtError instanceof Error ? caughtError.message : 'Unable to load report data.');
			} finally {
				if (isActive) {
					setIsLoading(false);
				}
			}
		}

		void fetchReportData();

		return () => {
			isActive = false;
			controller.abort();
		};
	}, [config.api, config.mockData, filters]);

	return {
		data,
		error,
		isFallbackData,
		isLoading
	};
}

export default useReportData;
