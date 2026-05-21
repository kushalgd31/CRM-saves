'use client';

import Typography from '@mui/material/Typography';
import { z } from 'zod';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect } from 'react';
import { useAccountSettings } from '../../api/hooks/account/useAccountSettings';
import { useUpdateAccountSettings } from '../../api/hooks/account/useUpdateAccountSettings';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

const defaultValues: FormType = {
    id: '',
    maxOdd: 100,
    maxCash: 50,
    minBet: 10,
    maxBet: 10000,
    title: '',
    company: '',
    about: '',
    email: '',
    phone: '',
    country: '',
    language: ''
};

const schema = z.object({
    id: z.string().min(1, 'ID is required'),
    maxOdd: z.coerce.number().min(0, 'Max odds is required'),
    maxCash: z.coerce.number().min(0, 'Max cash is required'),
    minBet: z.coerce.number().min(0, 'Min bet is required'),
    maxBet: z.coerce.number().min(0, 'Max bet is required'),
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    about: z.string().min(1, 'About is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone is required'),
    country: z.string().min(1, 'Country is required'),
    language: z.string().min(1, 'Language is required')
});

type FormType = z.infer<typeof schema>;

type Props = {
    savedValues?: Partial<FormType>;
    onRegisterForm?: (api: { submit: () => Promise<void>; getValues: () => FormType }) => void;
};

type FieldConfig = {
    name: keyof FormType;
    id: string;
    label: string;
    helperText: string;
    type?: 'text' | 'number';
    inputProps?: {
        min?: number;
        className?: string;
    };
};

const settingsFields: FieldConfig[] = [
    {
        name: 'maxOdd',
        id: 'max-odd',
        label: 'Max Odds Allowed to Bet',
        helperText: 'Maximum odds users can place bets on',
        type: 'number',
        inputProps: { min: 0, className: 'bg-gray-100 border-gray-100 rounded-lg' }
    },
    {
        name: 'maxCash',
        id: 'max-cash',
        label: 'Max Cashout (Odds) per Bet/Match',
        helperText: 'Maximum odds for cashout per bet or match',
        type: 'number',
        inputProps: { min: 0, className: 'bg-gray-100 border-gray-100 rounded-lg' }
    },
    {
        name: 'minBet',
        id: 'min-bet',
        label: 'Min Bet Amount per Bet',
        helperText: 'Minimum amount users can bet',
        type: 'number',
        inputProps: { min: 0, className: 'bg-gray-100 border-gray-100 rounded-lg' }
    },
    {
        name: 'maxBet',
        id: 'max-bet',
        label: 'Max Bet Amount per Bet',
        helperText: 'Maximum amount users can bet',
        type: 'number',
        inputProps: { min: 0, className: 'bg-gray-100 border-gray-100 rounded-lg' }
    }
];

function AccountTabView({ savedValues, onRegisterForm }: Props) {
    const { data: accountSettings } = useAccountSettings();
    const { mutate: updateAccountSettings } = useUpdateAccountSettings();

    const { control, reset, handleSubmit, getValues } = useForm<FormType>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(schema) as Resolver<FormType>
    });

    useEffect(() => {
        if (savedValues && Object.keys(savedValues).length > 0) {
            reset({ ...defaultValues, ...savedValues });
        } else if (accountSettings) {
            reset({ ...defaultValues, ...accountSettings });
        }
    }, [accountSettings, reset, savedValues]);

    useEffect(() => {
        onRegisterForm?.({
            submit: async () => handleSubmit(onSubmit)(),
            getValues
        });
    }, [handleSubmit, getValues, onRegisterForm]);

    function onSubmit(formData: FormType) {
        updateAccountSettings(formData);
    }

    return (
        <div className="w-full max-w-5xl">
            <form className="flex w-full flex-col gap-12">
                <div className="flex flex-col gap-4 pl-5 pt-5">
                    <div className="w-full">
                        <Typography className="text-lg font-medium">General Settings</Typography>
                        <Typography className="text-slate-500 text-xl">Configure betting limits and parameters</Typography>
                    </div>
                    <div className="grid w-full gap-4 sm:grid-cols-2">
                        {settingsFields.map((fieldConfig) => (
                            <div key={fieldConfig.name} className="sm:col-span-2">
                                <Controller
                                    control={control}
                                    name={fieldConfig.name}
                                    render={({ field }) => (
                                        <FormControl className="w-full">
                                            <FormLabel className='text-black text-lg font-semibold'>
                                                {fieldConfig.label}
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                id={fieldConfig.id}
                                                type={fieldConfig.type ?? 'text'}
                                                inputProps={fieldConfig.inputProps}
                                                required
                                                fullWidth
                                            />
                                            <FormHelperText>{fieldConfig.helperText}</FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AccountTabView;
