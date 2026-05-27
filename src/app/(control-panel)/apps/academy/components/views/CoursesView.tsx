'use client';
import _ from 'lodash';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { motion } from 'motion/react';
import { ChangeEvent, useEffect, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import CourseCard from '../ui/CourseCard';
import { Course } from '../../api/types';
import { useAcademyCourses } from '../../api/hooks/courses/useAcademyCourses';
import { useCategories } from '../../api/hooks/categories/useCategories';
import Hierarchy from '../ui/Hierarchy';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.vars.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	}
}));

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};

const item = {
	hidden: {
		opacity: 0,
		y: 10
	},
	show: {
		opacity: 1,
		y: 0
	}
};

/**
 * The Courses page.
 */
function CoursesView() {
	const { data: courses, isLoading } = useAcademyCourses();
	const { data: categories } = useCategories();

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [filteredData, setFilteredData] = useState<Course[]>(courses || []);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [hideCompleted, setHideCompleted] = useState(false);

	useEffect(() => {
		function getFilteredArray() {
			if (courses && searchText.length === 0 && selectedCategory === 'all' && !hideCompleted) {
				return courses;
			}

			return _.filter(courses, (item) => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}

				if (hideCompleted && item.progress.completed > 0) {
					return false;
				}

				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (courses) {
			setFilteredData(getFilteredArray());
		}
	}, [courses, hideCompleted, searchText, selectedCategory]);


	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Root
			content={
				<div className='font-[Geist]'>

					<h1 className='ml-5 text-5xl font-medium'>Sales Hierarchy Configuration</h1>
					<h5 className='ml-5 mt-2 text-xl text-slate-500'>Define sales team structures with flexible 1-5 layer hierarchies and commission rates</h5>
						<Hierarchy/>
				</div>
			}
			scroll={isMobile ? 'page' : 'content'}
		/>
	);
}

export default CoursesView;
