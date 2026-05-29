type ScheduleItem = {
	title: string;
	type: string;
	GGR: string;
};

/**
 * The type definition for the data used to populate the schedule.
 */
type ScheduleDataType = {
	ranges: Record<string, string>;
	series: Record<string, ScheduleItem[]>;
};

export default ScheduleDataType;
