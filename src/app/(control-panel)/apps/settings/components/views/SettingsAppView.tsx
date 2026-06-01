'use client';

import FusePageSimple from '@fuse/core/FusePageSimple';
import { ReactNode } from 'react';
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
	children?: ReactNode;
};

function SettingsAppView({children}:SettingsAppProps){
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
