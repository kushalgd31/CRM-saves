'use client';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import _ from 'lodash';
import clsx from 'clsx';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';
import { usePlanBillingSettings } from '../../api/hooks/billing/usePlanBillingSettings';
import { useUpdatePlanBillingSettings } from '../../api/hooks/billing/useUpdatePlanBillingSettings';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

const plans = [
	{
		value: 'basic',
		label: 'Basic',
		details: 'Starter plan for individuals.',
		price: 9
	},
	{
		value: 'team',
		label: 'Team',
		details: 'Collaborate up to 10 people.',
		price: 29
	},
	{
		value: 'enterprise',
		label: 'Enterprise',
		details: 'For bigger businesses.',
		price: 99
	}
];

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string(),
	margin: z.string(),
	cooldown: z.string(),
	cardNumber: z.string(),
	cardExpiration: z.string(),
	cardCVC: z.string(),
	country: z.string(),
	zip: z.string()
});

type FormType = z.infer<typeof schema>;

const defaultValues: FormType = {
	id: '',
	margin:'',
	cooldown: '',
	cardNumber: '',
	cardExpiration: '',
	cardCVC: '',
	country: '',
	zip: ''
};

function PlanBillingTabView() {
	const { data: planBillingSettings } = usePlanBillingSettings();
	const { mutate: updatePlanBillingSettings } = useUpdatePlanBillingSettings();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		reset(planBillingSettings);
	}, [planBillingSettings, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updatePlanBillingSettings({ ...formData, id: formData.id });
	}

	return (
		<div className="w-full max-w-5xl pt-3 pl-5">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-12"
			>
				<div className="flex flex-col gap-4">
					<div className="w-full">
						<Typography className="text-xl">Cashout Settings</Typography>
						<Typography className='text-xl text-slate-500'>Configure cashout parameters and margins</Typography>
					</div>
					<div className="grid grid-cols-3 grid-rows-2 gap-4 sm:grid-cols-3">
						<div>
							<Controller
								control={control}
								name="margin"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="name" className='text-black text-lg font-semibold' >Default Margin (%)</FormLabel>
										<TextField
											{...field}
											value={5}
											id="name"
											className='w-60 bg-slate-300/40'
											required
											sx={{"& .MuiOutlinedInput-root": {
												      backgroundColor: "#f3f4f6",
												    }
												  }}
											
										/>
									<FormHelperText>Standard cashout margin</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div>
							<Controller
								control={control}
								name="cooldown"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="name" className='text-black text-lg font-semibold' >Cooldown (Minutes)</FormLabel>
										<TextField
											{...field}
											value={15}
											id="name"
											required
											className='w-60 bg-slate-300/40'
											sx={{ "& .MuiOutlinedInput-root": {
											      backgroundColor: "#f3f4f6",
											    }
											  }}
										/>
									<FormHelperText>Time between cashout requests</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div>
							<Controller
								control={control}
								name="cooldown"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="name" className='text-black text-lg font-semibold' >Min Odds Movement</FormLabel>
										<TextField
											{...field}
											value={0.1}
											id="name"
											required
											className='w-60 bg-slate-300/40'
											sx={{"& .MuiOutlinedInput-root": {
												      backgroundColor: "#f3f4f6", // same as Tailwind bg-gray-100
												    }
												  }}
										/>
									<FormHelperText>Minimum odds change to activate cashout</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div>
							<Controller
								control={control}
								name="cooldown"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="name" className='text-black text-lg font-semibold' >Max cashout per day</FormLabel>
										<TextField
											{...field}
											value={10}
											id="name"
											required
											className='w-60 bg-slate-300/40'
											sx={{ "& .MuiOutlinedInput-root": {
											      backgroundColor: "#f3f4f6", 
											    }
											  }}
										/>
									<FormHelperText>Maximum cashouts allowed per use per day</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						<div>
							<Controller
								control={control}
								name="cooldown"
								render={({ field }) => (
									<FormControl className="w-full">
										<FormLabel htmlFor="name" className='text-black text-lg font-semibold' >Min Stake for Cashout</FormLabel>
										<TextField
											{...field}
											value={500}
											id="name"
											required
											className='w-60 bg-slate-300/40'
											sx={{ "& .MuiOutlinedInput-root": {
											      backgroundColor: "#f3f4f6",
											    }
											  }}
										/>
									<FormHelperText>Minimum bet amount required for cashout</FormHelperText>
									</FormControl>
								)}
							/>
						</div>
						
				</div>
				<Typography className="text-xl font-semibold">Declining Cashout Margin Over Time</Typography>
				<Typography className='text-xl text-slate-500'>Configure margin based on match progress percentage</Typography>
				<div className='flex justify-evenly items-start w-full gap-5'>
					<label className='font-semibold text-lg text-wrap'>Early Match (&lt;30%) - Margin Cut (%) </label>
					<label className='font-semibold text-lg text-wrap'>Mid Match (30-60%) - Margin Cut(%)</label>
					<label className='font-semibold text-lg text-wrap'>Late Match(60-80%) - Margin Cut(%)</label>
					<label className='font-semibold text-lg text-wrap'>Endgame(&gt;80%) - Margin Cut(%)</label>
				</div>
				<div className='flex justify-items-start w-full gap-17' style={{}}>
					<input type="text" value={3}  className='bg-slate-300/40 py-2 pl-2 rounded-lg'/>
					<input type="text" value={5}  className='bg-slate-300/40 py-2 pl-2 rounded-lg'/>
					<input type="text" value={10} className='bg-slate-300/40 py-2 pl-2 rounded-lg' />
					<input type="text" value={15} className='bg-slate-300/40 py-2 pl-2 rounded-lg' />
				</div>
				<div className='flex text-slate-400 justify-items-start gap-18'>
					<p>Generous early game margin</p>
					<p>Standard mid-match margin</p>
					<p>Expensive late game margin</p>
					<p>Very expensive endgame margin</p>
				</div>
				<div className='bg-blue-200/50 p-3 rounded-lg'>
					<h4 className='font-semibold text-indigo-900 mb-2'>Margin Calculation</h4>
					<ul className='list-disc text-blue-500 list-inside text-md flex flex-col gap-2'>
						<li>Match progress &lt; 30%: Cashout margin = 97%(3%cut-generous early)</li>
						<li>Match progress 30-60%: Cashout margin = 95%(5%cut-generous early)</li>
						<li>Match progress 60-80%; Cashout margin = 90%(10%cut-generous early)</li>
						<li>Match progress &gt; 80%; Cashout margin = 85%(15%cut-generous early)</li>
					</ul>
				</div>
				</div>
				
			</form>
		</div>
	);
}

export default PlanBillingTabView;
