import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { PhoneInput } from '@/components/ui/phone-input';
import { format } from 'date-fns';
import { api, bot } from '@/utils/api';
import { toast } from 'sonner';
import { AxiosResponse } from 'axios';

export default function ContactForm({
    close,
    botData,
}: {
    close: () => void;
    botData: any;
}) {
    const FormSchema = z.object({
        name: z.string().min(1, 'Обязательное поле'),
        phone: z
            .string()
            .refine(isValidPhoneNumber, { message: 'Неправильный номер' }),
    });
    const defaultValues = {
        name: '',
        phone: '',
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues,
    });
    // const { watch } = form;

    function formatDate(date: Date) {
        return format(date, 'dd.MM.yyyy в HH:mm');
    }

    async function onSubmit(data: any) {
        const dateNow = new Date();
        console.log('SUBMITTED DATA', botData);
        try {
            // const response = await api.post<AxiosResponse>('/api/feedbacks', {
            //     data: {
            //         ...data,
            //         processed: false,
            //         date: formatDate(dateNow),
            //         dateUTC: dateNow.toISOString(),
            //     },
            // });

            const botResponse = await bot.post<AxiosResponse>('/applications', {
                data: {
                    ...botData,
                    name: data.name,
                    number: data.phone,
                },
            });
            console.log('botResponse', botResponse.status);
            if (botResponse.status === 201) {
                toast.success('Данные отправлены ✅', {
                    duration: 6000,
                });
                close();
                form.reset();
            } else {
                toast.error('Ошибка отправки данных ❌');
            }
        } catch (e: any) {
            throw new Error(e);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className={cn('')}>
                            <FormControl>
                                <Input
                                    className={
                                        'rounded-0 rounded-none border-b-[2px] border-l-0 border-r-0 border-t-0 border-[#898989] font-electrohub ring-0 placeholder:text-[16px] placeholder:text-[#898989]'
                                    }
                                    placeholder={'Укажите Ваше имя'}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="mt-8 flex flex-col items-start">
                            <FormControl className="w-full">
                                <PhoneInput
                                    international
                                    className={
                                        'rounded-0 rounded-none border-b-[2px] border-l-0 border-r-0 border-t-0 border-[#898989] font-electrohub placeholder:text-[16px] placeholder:text-[#898989]'
                                    }
                                    defaultCountry={'BY'}
                                    placeholder="Введите номер телефона"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <button
                    className={
                        'mt-6 w-full border border-black py-1.5 text-center font-electrohub text-sm font-semibold capitalize sm:text-sm md:mt-8 md:py-2.5 md:text-base'
                    }
                >
                    отправить
                </button>
            </form>
        </Form>
    );
}
