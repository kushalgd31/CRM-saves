'use client';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import _ from 'lodash';
import { useEffect } from 'react';
import { useAccountSettings } from '../../api/hooks/account/useAccountSettings';
import { useUpdateAccountSettings } from '../../api/hooks/account/useUpdateAccountSettings';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

const defaultValues: FormType = {
	id: '',
	maxOdd: 0,
	maxCash: '',
	title: '',
	company: '',
	about: '',
	email: '',
	phone: '',
	country: '',
	language: ''
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string().min(1, 'ID is required'),
	maxOdd: z.number().min(1, 'Name is required'),
	maxCash: z.string().min(1, 'Username is required'),
	title: z.string().min(1, 'Title is required'),
	company: z.string().min(1, 'Company is required'),
	about: z.string().min(1, 'About is required'),
	email: z.string().email('Invalid email').min(1, 'Email is required'),
	phone: z.string().min(1, 'Phone is required'),
	country: z.string().min(1, 'Country is required'),
	language: z.string().min(1, 'Language is required')
});

type FormType = z.infer<typeof schema>;

function AccountTabView() {
	const { data: accountSettings } = useAccountSettings();
	const { mutate: updateAccountSettings } = useUpdateAccountSettings();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		reset(accountSettings);
	}, [accountSettings, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updateAccountSettings(formData);
	}

	return (
		<div className="w-full max-w-5xl">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-12"
			>
				<div className="flex flex-col gap-4 pl-5 pt-5">
					<div className="w-full">
						<Typography className="text-lg font-medium">General Settings</Typography>
						<Typography className='text-slate-500' text-xl>
							Configure betting limits and parameters
						</Typography>
					</div>

					<div className="grid w-full gap-4 sm:grid-cols-4">
						<div className="sm:col-span-4">
							<Controller
								control={control}
								name="maxOdd"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="name" className='text-black text-lg font-semibold' >Max Odds Allowed to Bet</FormLabel>
										<TextField
											{...field}
											value={100}
											id="name"
											required
											fullWidth
											
										/>
									<FormHelperText>Maximum odds users can place bets on</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div className="sm:col-span-4">
							<Controller
								control={control}
								name="maxCash"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="username" className='text-black text-lg font-semibold'>Max Cashout (Odds) per Bet/Match</FormLabel>
										<TextField
											{...field}
											value={50}
											id="username"
											variant="outlined"
											required
											fullWidth
											
										/>
										<FormHelperText>Maximum odds for cashout per bet or match</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div className="sm:col-span-4">
							<Controller
								control={control}
								name="maxCash"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="username" className='text-black text-lg font-semibold'>Min Bet Amount per Bet</FormLabel>
										<TextField
											{...field}
											value={10}
											id="username"
											variant="outlined"
											required
											fullWidth
											
										/>
										<FormHelperText>Minimum amount users can bet</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div className="sm:col-span-4">
							<Controller
								control={control}
								name="maxCash"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="username" className='text-black text-lg font-semibold'>Max Bet Amount per Bet</FormLabel>
										<TextField
											{...field}
											value={10000}
											id="username"
											variant="outlined"
											required
											fullWidth
											
										/>
										<FormHelperText>Maximum amount users can bet</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AccountTabView;
