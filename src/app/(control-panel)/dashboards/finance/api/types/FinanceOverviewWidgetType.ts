type FinanceOverviewMetricCard = {
	title: string;
	value: string;
	note?: string;
	noteTone?: 'default' | 'success';
};

type FinanceOverviewCompactCard = {
	title: string;
	value: string;
};

/**
 * The type definition for the finance overview widget.
 */
type FinanceOverviewWidgetType = {
	title: string;
	subtitle: string;
	liveBalance: string;
	primaryCards: FinanceOverviewMetricCard[];
	secondaryCards: FinanceOverviewCompactCard[];
};

export default FinanceOverviewWidgetType;
