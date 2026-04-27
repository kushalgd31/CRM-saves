'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import _ from 'lodash';
import { useEffect } from 'react';
import { useNotificationSettings } from '../../api/hooks/notifications/useNotificationSettings';
import { useUpdateNotificationSettings } from '../../api/hooks/notifications/useUpdateNotificationSettings';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const defaultValues: FormType = {
	id: '',
	Scorecard: true,
	TV: false,
	odds: true,
	CashOut: true,
	Loss: false,
	Speed: true
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string(),
	Scorecard: z.boolean(),
	TV: z.boolean(),
	odds: z.boolean(),
	CashOut: z.boolean(),
	Loss: z.boolean(),
	Speed: z.boolean()
});

type FormType = z.infer<typeof schema>;

function NotificationsTabView() {
	const { data: notificationSettings } = useNotificationSettings();
	const { mutate: updateNotificationSettings } = useUpdateNotificationSettings();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields } = formState;

	useEffect(() => {
		reset(notificationSettings);
	}, [notificationSettings, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updateNotificationSettings({ ...formData, id: formData.id });
	}

	return (
		<div className="w-full max-w-5xl">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-12"
			>
				<div className='pl-4'>
					<Typography className="w-full text-lg font-medium"><FuseSvgIcon size={24}>heroicons-outline:adjustments</FuseSvgIcon> Features</Typography>
					<p className='text-slate-500 text-xl'>Enable or disable features for sports betting</p>
					<div className="grid w-full grid-cols-1 gap-1.5 mt-2">
						<div className="flex items-center justify-between divide-y">
							<Controller
								name="Scorecard"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex w-full flex-col">
										<FormControlLabel
											classes={{
												root: 'm-0',
												label: 'flex flex-1'
											}}
											labelPlacement="start"
											label="Live Score Card"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="askPasswordChange"
												/>
											}
										/>
										<FormHelperText>Display live scores during matches</FormHelperText>
									</div>
								)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Controller
								name="TV"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex w-full flex-col">
										<FormControlLabel
											classes={{
												root: 'm-0',
												label: 'flex flex-1'
											}}
											labelPlacement="start"
											label="Live TV"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="security"
												/>
											}
										/>
										<FormHelperText>
											Enable live streaming of matches
										</FormHelperText>
									</div>
								)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Controller
								name="odds"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex w-full flex-col">
										<FormControlLabel
											classes={{
												root: 'm-0',
												label: 'flex flex-1'
											}}
											labelPlacement="start"
											label="Live Odds"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="meetups"
												/>
											}
										/>
										<FormHelperText>
											Show real-time odds updates
										</FormHelperText>
									</div>
								)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Controller
								name="CashOut"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex w-full flex-col">
										<FormControlLabel
											classes={{
												root: 'm-0',
												label: 'flex flex-1'
											}}
											labelPlacement="start"
											label="CashOut"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="meetups"
												/>
											}
										/>
										<FormHelperText>
											Allow users to cash out bets early
										</FormHelperText>
									</div>
								)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Controller
								name="Loss"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex w-full flex-col">
										<FormControlLabel
											classes={{
												root: 'm-0',
												label: 'flex flex-1'
											}}
											labelPlacement="start"
											label="Loss Cut"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="meetups"
												/>
											}
										/>
										<FormHelperText>
											Enable automatic loss limitation
										</FormHelperText>
									</div>
								)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Controller
								name="Speed"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex w-full flex-col">
										<FormControlLabel
											classes={{
												root: 'm-0',
												label: 'flex flex-1'
											}}
											labelPlacement="start"
											label="Speed Cash"
											control={
												<Switch
													onChange={(ev) => {
														onChange(ev.target.checked);
													}}
													checked={value}
													name="meetups"
												/>
											}
										/>
										<FormHelperText>
											Fast cash settlement option
										</FormHelperText>
									</div>
								)}
							/>
						</div>
					
						
					</div>
				</div>
			
			</form>
		</div>
	);
}

export default NotificationsTabView;
