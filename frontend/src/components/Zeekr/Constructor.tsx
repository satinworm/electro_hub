'use client';
import StickyBox from 'react-sticky-box';
import { CarConstructorResponse } from '@/types/zeekr-constructor';
import ConfigurationForm from '@/components/Zeekr/ConfigurationForm';
import { useForm } from 'react-hook-form';
import { ConstructorStore } from '@/stores/car-constructor.store';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import ConfigurationRender from './ConfigurationRender';

type Props = {
    defaultData: CarConstructorResponse;
};

const ZeekrConstructor = (props: Props) => {
    const { defaultData } = props;
    const constructorStore = ConstructorStore(
        (state: any) => state.constructor
    );
    console.log('INCOMING data ', defaultData);
    const FormSchema = z.object({
        configuration: z.string(),
    });
    const defaultValues = {
        configuration:
            constructorStore.configuration ||
            defaultData?.data?.[0]?.attributes?.models?.[0].name,
        color: constructorStore.color || 'black',
        wheels: constructorStore.wheels || 'default',
        interior_colors: constructorStore.interior_colors || 'black',
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
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={'hideScrollbar flex flex-col xl:flex-row'}
                style={{ alignItems: 'flex-start' }}
            >
                <StickyBox
                    className={
                        'z-[2] w-full bg-zeekr_constructor md:bg-transparent xl:w-3/4'
                    }
                >
                    <ConfigurationRender
                        defaultData={defaultData}
                        form={form}
                    />
                </StickyBox>
                <div className={'z-[1] w-full bg-white xl:w-1/4'}>
                    <ConfigurationForm defaultData={defaultData} form={form} />
                </div>
            </form>
        </Form>
    );
};
export default ZeekrConstructor;
