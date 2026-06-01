import { SyntheticEvent, useState } from 'react';
import { Box, Card, Tab, Tabs } from '@mui/material';
import useUser from '@auth/useUser';
import FAheader from './FAheader';
import Setup from './tabs/Setup';
import LoginHistory from './tabs/LoginHistory';
import Trusted from './tabs/Trusted';
import Security from './tabs/Security';

const tabLabels = ['2FA Setup', 'Trusted Devices', 'Login History', 'Security Settings'];

export default function FAview() {
	const [activeTab, setActiveTab] = useState(0);
	const { data: user } = useUser();
	const showWarning = user?.crm?.requires2fa !== true;

	const handleTabChange = (_event: SyntheticEvent, value: number) => {
		setActiveTab(value);
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case 0:
				return <Setup />;
			case 1:
				return <Trusted />;
			case 2:
				return <LoginHistory />;
			case 3:
				return <Security />;
			default:
				return null;
		}
	};

	return (
		<Box sx={{ width: '100%', px: { xs: 2, md: 4 }, py: 0 }}>
			<FAheader showWarning={showWarning} />

			<Box sx={{ maxWidth: 980, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3, pb: 4 }}>
				<Card
					elevation={0}
					sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
				>
					<Tabs
						value={activeTab}
						onChange={handleTabChange}
						variant="fullWidth"
						sx={{
							minHeight: 10,
							width: '100%',
							display: 'flex',
							'& .MuiTab-root': {
								flex: 1,
								minHeight: 10,
								textTransform: 'none',
								fontWeight: 700
							},
							'& .Mui-selected': {
								color: 'primary.main'
							}
						}}
						TabIndicatorProps={{
							sx: {
								height: 3,
								borderRadius: 3
							}
						}}
					>
						{tabLabels.map((label) => (
							<Tab
								key={label}
								label={label}
							/>
						))}
					</Tabs>
				</Card>

				<Card
					elevation={1}
					sx={{ borderRadius: 3, p: 3 }}
				>
					{renderTabContent()}
				</Card>
			</Box>
		</Box>
	);
}
