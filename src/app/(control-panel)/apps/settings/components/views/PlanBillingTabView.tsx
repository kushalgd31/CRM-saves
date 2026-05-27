'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { Controller, useForm, type Control, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { usePlanBillingSettings } from '../../api/hooks/billing/usePlanBillingSettings';
import { useUpdatePlanBillingSettings } from '../../api/hooks/billing/useUpdatePlanBillingSettings';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

const schema = z.object({
    id: z.string().optional().default(''),
    margin: z.coerce.number().min(0),
    cooldown: z.coerce.number().min(0),
    minOddsMovement: z.coerce.number().min(0),
    maxCashoutsPerDay: z.coerce.number().min(0),
    minStake: z.coerce.number().min(0),
    earlyCut: z.coerce.number().min(0),
    midCut: z.coerce.number().min(0),
    lateCut: z.coerce.number().min(0),
    endgameCut: z.coerce.number().min(0)
});

type FormType = z.infer<typeof schema>;

const defaultValues: FormType = {
    id: '',
    margin: 5,
    cooldown: 15,
    minOddsMovement: 0.1,
    maxCashoutsPerDay: 10,
    minStake: 500,
    earlyCut: 3,
    midCut: 5,
    lateCut: 10,
    endgameCut: 15
};

type FieldConfig = {
    name: keyof FormType;
    label: string;
    helperText?: string;
    inputProps: {
        min: number;
        step: number;
    };
};

const fieldConfigs: FieldConfig[] = [
    {
        name: 'margin',
        label: 'Default Margin (%)',
        helperText: 'Standard cashout margin',
        inputProps: { min: 0, step: 0.1 }
    },
    {
        name: 'cooldown',
        label: 'Cooldown (Minutes)',
        helperText: 'Time between cashout requests',
        inputProps: { min: 0, step: 1 }
    },
    {
        name: 'minOddsMovement',
        label: 'Min Odds Movement',
        helperText: 'Minimum odds change to activate cashout',
        inputProps: { min: 0, step: 0.1 }
    },
    {
        name: 'maxCashoutsPerDay',
        label: 'Max cashout per day',
        helperText: 'Maximum cashouts allowed per user per day',
        inputProps: { min: 0, step: 1 }
    },
    {
        name: 'minStake',
        label: 'Min Stake for Cashout',
        helperText: 'Minimum bet amount required for cashout',
        inputProps: { min: 0, step: 1 }
    }
];

const marginCutConfigs: FieldConfig[] = [
    {
        name: 'earlyCut',
        label: 'Early Match (<30%) - Margin Cut (%)',
        helperText: 'Generous early game margin',
        inputProps: { min: 0, step: 1 }
    },
    {
        name: 'midCut',
        label: 'Mid Match (30-60%) - Margin Cut (%)',
        helperText: 'Standard mid-match margin',
        inputProps: { min: 0, step: 1 }
    },
    {
        name: 'lateCut',
        label: 'Late Match (60-80%) - Margin Cut (%)',
        helperText: 'Expensive late game margin',
        inputProps: { min: 0, step: 1 }
    },
    {
        name: 'endgameCut',
        label: 'Endgame (>80%) - Margin Cut (%)',
        helperText: 'Very expensive endgame margin',
        inputProps: { min: 0, step: 1 }
    }
];

type Props = {
    savedValues?: Partial<FormType>;
    onRegisterForm?: (api: { submit: () => Promise<void>; getValues: () => FormType }) => void;
};

type SettingFieldProps = {
    control: Control<FormType>;
    config: FieldConfig;
    compact?: boolean;
};

function SettingField({ control, config, compact = false }: SettingFieldProps) {
    return (
        <Controller
            control={control}
            name={config.name}
            render={({ field }) => (
                <FormControl className={compact ? 'w-full h-full flex flex-col' : 'w-full'}>
                    <FormLabel
                        className={
                            compact
                                ? 'text-black text-lg font-semibold min-h-[3rem] leading-tight'
                                : 'text-black text-lg font-semibold'
                        }
                    >
                        {config.label}
                    </FormLabel>
                    <TextField
                        {...field}
                        id={String(config.name)}
                        type="number"
                        inputProps={config.inputProps}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f3f4f6',
                                borderRadius: '0.75rem',
                                padding: compact ? '2px 12px' : undefined
                            }
                        }}
                    />
                    {config.helperText ? (
                        <FormHelperText className={compact ? 'min-h-[1.25rem]' : undefined}>
                            {config.helperText}
                        </FormHelperText>
                    ) : null}
                </FormControl>
            )}
        />
    );
}

function PlanBillingTabView({ savedValues, onRegisterForm }: Props) {
    const { data: planBillingSettings } = usePlanBillingSettings();
    const { mutate: updatePlanBillingSettings } = useUpdatePlanBillingSettings();

    const { control, reset, handleSubmit, getValues, watch } = useForm<FormType>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(schema) as Resolver<FormType>
    });

    const earlyCut = watch('earlyCut');
    const midCut = watch('midCut');
    const lateCut = watch('lateCut');
    const endgameCut = watch('endgameCut');

    useEffect(() => {
        if (savedValues && Object.keys(savedValues).length > 0) {
            reset({ ...defaultValues, ...savedValues });
        } else if (planBillingSettings) {
            reset({ ...defaultValues, ...planBillingSettings });
        }
    }, [planBillingSettings, reset, savedValues]);

    useEffect(() => {
        onRegisterForm?.({
            submit: async () => handleSubmit(onSubmit)(),
            getValues
        });
    }, [handleSubmit, getValues, onRegisterForm]);

    function onSubmit(formData: FormType) {
        updatePlanBillingSettings({ ...formData, id: formData.id });
    }

    const formatCashoutMargin = (cutValue: number | undefined) => Math.max(0, 100 - (cutValue ?? 0)).toFixed(0);

    return (
        <div className="w-full max-w-5xl pt-3 pl-5">
            <form className="flex w-full flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                        <Typography className="text-xl">Cashout Settings</Typography>
                        <Typography className="text-xl text-slate-500">Configure cashout parameters and margins</Typography>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {fieldConfigs.map((fieldConfig) => (
                            <div key={fieldConfig.name}>
                                <SettingField control={control} config={fieldConfig} />
                            </div>
                        ))}
                    </div>
                    <Typography className="text-xl font-semibold">Declining Cashout Margin Over Time</Typography>
                    <Typography className="text-xl text-slate-500">Configure margin based on match progress percentage</Typography>
                    <div className="grid gap-4 sm:grid-cols-4">
                        {marginCutConfigs.map((fieldConfig) => (
                            <div key={fieldConfig.name} className="h-full">
                                <SettingField control={control} config={fieldConfig} compact />
                            </div>
                        ))}
                    </div>
                    <div className="bg-blue-200/50 p-3 rounded-lg">
                        <h4 className="font-semibold text-indigo-900 mb-2">Margin Calculation</h4>
                        <ul className="list-disc text-blue-500 list-inside text-md flex flex-col gap-2">
                            <li>
                                Match progress &lt; 30%: Cashout margin = {formatCashoutMargin(earlyCut)}% ({earlyCut ?? 0}% cut generous early)
                            </li>
                            <li>
                                Match progress 30-60%: Cashout margin = {formatCashoutMargin(midCut)}% ({midCut ?? 0}% cut standard mid-match)
                            </li>
                            <li>
                                Match progress 60-80%: Cashout margin = {formatCashoutMargin(lateCut)}% ({lateCut ?? 0}% cut expensive late game)
                            </li>
                            <li>
                                Match progress &gt; 80%: Cashout margin = {formatCashoutMargin(endgameCut)}% ({endgameCut ?? 0}% cut very expensive endgame)
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PlanBillingTabView;
