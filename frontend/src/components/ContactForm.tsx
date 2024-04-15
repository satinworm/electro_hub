import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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

export default function ContactForm() {
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
    const { watch } = form;
    useEffect(() => {
        const subscription = form.watch((value) => {
            console.log('watch ', value);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    async function onSubmit(data: any) {
        console.log('SUBMITED DATA', data);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='name'
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
                    name='phone'
                    render={({ field }) => (
                        <FormItem className='mt-8 flex flex-col items-start'>
                            <FormControl className='w-full'>
                                <PhoneInput
                                    international
                                    className={
                                        'rounded-0 rounded-none border-b-[2px] border-l-0 border-r-0 border-t-0 border-[#898989] font-electrohub placeholder:text-[16px] placeholder:text-[#898989]'
                                    }
                                    defaultCountry={'BY'}
                                    placeholder='Введите номер телефона'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <button
                    className={
                        'mt-8 w-full border border-black py-2.5 text-center font-electrohub font-semibold capitalize'
                    }
                >
                    отправить
                </button>
            </form>
        </Form>
    );
}
