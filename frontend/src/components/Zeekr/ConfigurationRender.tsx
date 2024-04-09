import { CarConstructorResponse } from '@/types/zeekr-constructor';
import {
    ConstructorStore,
    ConstructorStoreState,
} from '@/stores/car-constructor.store';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';

type Props = {
    defaultData: CarConstructorResponse;
    form: any;
};
export default function ZeekrConstructorPage(props: Props) {
    const { defaultData, form } = props;
    const [tab, setActiveTab] = useState('stake');
    const { watch } = form;
    const selectedModel = defaultData?.data?.[0]?.attributes?.models?.find(
        (model) => model.name === watch('configuration')
    );
    const defaultRenderImage =
        defaultData?.data?.[0]?.attributes?.models?.[0]?.default_image?.data
            ?.attributes;

    // const
    const store = ConstructorStore(
        (state: ConstructorStoreState) => state.constructor
    );
    const totalPrice = ConstructorStore(
        (state: ConstructorStoreState) => state.calculateTotalPrice
    );

    console.log('store ', store);
    const setConstructor = ConstructorStore(
        (state: any) => state.setConstructor
    );
    useEffect(() => {
        setConstructor({
            defaultRenderImage: defaultRenderImage,
            defaultPrice: selectedModel?.default_price,
        });
    }, []);
    // console.log('selectedModel ', selectedModel);

    const parseUrl = (body: string, wheels: string) => {
        const imageName = `${body}_${wheels}.png`;
        const renderImage = selectedModel?.render_images?.data?.find(
            (item) => item.attributes.name === imageName
        );

        return renderImage ? getStrapiMedia(renderImage.attributes.url) : null;
    };
    useEffect(() => {
        const url = parseUrl(store.body || 'black', store.wheels || 'default');
        if (url) {
            setConstructor({
                ...store.constructor,
                renderImage: url,
            });
        }
    }, [store.body, store.wheels]);

    return (
        <div className={'h-[calc(100vh-100px)]'}>
            <div
                className={
                    'flex h-full w-full flex-col items-center justify-center'
                }
            >
                {store.defaultRenderImage?.url !== 'undefined' &&
                store.defaultRenderImage?.width !== 'undefined' &&
                store.defaultRenderImage?.height !== 'undefined' ? (
                    <Image
                        src={
                            parseUrl(
                                store.body || 'black',
                                store.wheels || 'default'
                            )!
                        }
                        width={
                            store.defaultRenderImage?.width ||
                            selectedModel?.default_image?.data.attributes.width
                        }
                        height={
                            store.defaultRenderImage?.height ||
                            selectedModel?.default_image?.data.attributes.height
                        }
                        alt={'car'}
                    />
                ) : (
                    <Loader styles={''} />
                )}
                <div className={'absolute bottom-8 left-6'}>
                    <h1
                        className={'text-4xl font-bold uppercase text-black/60'}
                    >
                        {selectedModel?.name}
                    </h1>
                    <div className={'flex items-baseline gap-3'}>
                        <div className={'text-2xl font-bold text-black/80'}>
                            Итоговая цена:
                        </div>
                        <div className={'text-3xl font-bold'}>
                            {totalPrice(store) ? totalPrice(store) : 0}$
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
