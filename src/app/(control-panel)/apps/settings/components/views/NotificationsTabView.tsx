'use client';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
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

type Props = {
    savedValues?: Partial<FormType>;
    onRegisterForm?: (api: { submit: () => Promise<void>; getValues: () => FormType }) => void;
};

function NotificationsTabView({ savedValues, onRegisterForm }: Props) {
    const { data: notificationSettings } = useNotificationSettings();
    const { mutate: updateNotificationSettings } = useUpdateNotificationSettings();

    const { control, reset, handleSubmit, getValues } = useForm<FormType>({
        defaultValues,
        mode: 'all',
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (savedValues && Object.keys(savedValues).length > 0) {
            reset({ ...defaultValues, ...savedValues });
        } else if (notificationSettings) {
            reset({ ...defaultValues, ...notificationSettings });
        }
    }, [notificationSettings, reset, savedValues]);

    useEffect(() => {
        onRegisterForm?.({
            submit: async () => handleSubmit(onSubmit)(),
            getValues
        });
    }, [handleSubmit, getValues, onRegisterForm]);

    function onSubmit(formData: FormType) {
        updateNotificationSettings({ ...formData, id: formData.id });
    }

    return (
        <div className="w-full max-w-5xl">
            <form className="flex w-full flex-col gap-12">
                <div className='pl-4'>
                    <Typography className="w-full text-lg font-medium">
                        <FuseSvgIcon size={24}>heroicons-outline:adjustments</FuseSvgIcon> Features
                    </Typography>
                    <p className='text-slate-500 text-xl'>Enable or disable features for sports betting</p>
                    <div className="grid w-full grid-cols-1 gap-1.5 mt-2">
                        {[
                            { name: 'Scorecard', label: 'Live Score Card', helper: 'Display live scores during matches' },
                            { name: 'TV', label: 'Live TV', helper: 'Enable live streaming of matches' },
                            { name: 'odds', label: 'Live Odds', helper: 'Show real-time odds updates' },
                            { name: 'CashOut', label: 'CashOut', helper: 'Allow users to cash out bets early' },
                            { name: 'Loss', label: 'Loss Cut', helper: 'Enable automatic loss limitation' },
                            { name: 'Speed', label: 'Speed Cash', helper: 'Fast cash settlement option' }
                        ].map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <Controller
                                    name={item.name as keyof FormType}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <div className="flex w-full flex-col">
                                            <FormControlLabel
                                                classes={{ root: 'm-0', label: 'flex flex-1' }}
                                                labelPlacement="start"
                                                label={item.label}
                                                control={
                                                    <Switch
                                                        onChange={(ev) => onChange(ev.target.checked)}
                                                        checked={Boolean(value)}
                                                        name={item.name}
                                                    />
                                                }
                                            />
                                            <FormHelperText>{item.helper}</FormHelperText>
                                        </div>
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

export default NotificationsTabView;
