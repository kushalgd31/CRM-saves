'use client';

import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FusePageSimple from '@fuse/core/FusePageSimple';
import usePathname from '@fuse/hooks/usePathname';
import SettingsAppSidebarContent from '../ui/SettingsAppSidebarContent';
import SettingsAppHeader from '../ui/SettingsAppHeader';
import { styled } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Notification from './NotificationsTabView'
import General from './AccountTabView'
import Cashout from './PlanBillingTabView'

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-contentWrapper': {
		paddingTop: 2,
		paddingLeft: 2
	},
	'& .FusePageSimple-content': {
		boxShadow: theme.vars.shadows[2],
		borderRadius: '12px 0 0 0',
		[theme.breakpoints.down('md')]: {
			borderRadius: '12px 12px 0 0'
		},
		backgroundColor: theme.vars.palette.background.paper
	},
	'& .FusePageSimple-sidebarWrapper': {
		border: 'none'
	},
	'& .FusePageSimple-sidebarContent': {
		backgroundColor: theme.vars.palette.background.default
	}
}));

type SettingsAppProps = {
	children?: React.ReactNode;
};

/**
 * The notes app.
 */
// function SettingsAppView(props: SettingsAppProps) {
	// const { children } = props;
	// const pathname = usePathname();
	// const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	// const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
// 
	// useEffect(() => {
		// setLeftSidebarOpen(!isMobile);
	// }, [isMobile]);
// 
	// useEffect(() => {
		// if (isMobile) {
			// setLeftSidebarOpen(false);
		// }
	// }, [pathname, isMobile]);
// 
	// return (
		// <Root
			// content={
				// <div className="max-w-2xl flex-auto p-4 md:p-6">
					{/* <SettingsAppHeader */}
						// className="mb-4"
						// onSetSidebarOpen={setLeftSidebarOpen}
					// />
					{/* {children} */}
				{/* </div> */}
			// }
			// leftSidebarProps={{
				// open: leftSidebarOpen,
				// onClose: () => {
					// setLeftSidebarOpen(false);
				// },
				// content: <SettingsAppSidebarContent onSetSidebarOpen={setLeftSidebarOpen} />,
				// width: 320
			// }}
			// scroll={isMobile ? 'page' : 'content'}
		// />
	// );
// }

function SettingsAppView(){
	return(
		<div className="p-4 font-[Geist]">
			<div className='flex justify-between items-center mb-4 mx-2'>
				<div>
			<h1 className='text-3xl font-semibold'>Sports Settings</h1>
			<p className='text-slate-500 mt-2'>Configure features and betting parameters for sports management</p>
			</div>
			<button className=' text-white text-xl px-1.5 py-1.5 bg-green-500 rounded-lg hover:cursor-pointer'><FuseSvgIcon className='inline mr-5 mb-1'>lucide:save</FuseSvgIcon>Save Changes</button>
		</div>
		<div className='grid grid-cols-2 gap-4 m-2'>
			<div className='bg-white rounded-xl p-2'>
			<Notification />
			</div>
			<div className='bg-white rounded-xl p-2'>
			<General/>	
				</div>
			<div className='bg-white rounded-xl p-2 col-span-2'>
			<Cashout />
			</div>
			</div>
		</div>
	)
}

export default SettingsAppView;
