import { CarConstructorResponse } from '@/types/zeekr-constructor';
import {
    ConstructorStore,
    ConstructorStoreState,
} from '@/stores/car-constructor.store';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Props = {
    defaultData: CarConstructorResponse;
    form: any;
};
export default function ZeekrConstructorPage(props: Props) {
    const { defaultData, form } = props;
    const { watch } = form;
    const [selectedView, setSelectedView] = useState<'body' | 'interior'>(
        'body'
    );
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

    // @ts-ignore
    return (
        <div className={'h-[calc(100vh-100px)]'}>
            <div className={'relative h-full w-full'}>
                {store.defaultRenderImage?.url !== undefined &&
                store.defaultRenderImage?.width !== undefined &&
                store.defaultRenderImage?.height !== undefined ? (
                    <>
                        {selectedView === 'body' &&
                            selectedModel?.render_images?.data?.map(
                                (renderImageItem) => {
                                    const currentItemUrl = getStrapiMedia(
                                        renderImageItem.attributes.url
                                    );

                                    const isSelected =
                                        currentItemUrl === store.renderImage;

                                    return (
                                        <motion.div
                                            key={renderImageItem.id}
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: isSelected ? 1 : 0,
                                            }} // Анимация прозрачности для выбранного элемента
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                            }} // Продолжительность анимации
                                        >
                                            <Image
                                                src={currentItemUrl!}
                                                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                                                width={
                                                    renderImageItem.attributes
                                                        .width
                                                }
                                                height={
                                                    renderImageItem.attributes
                                                        .height
                                                }
                                                alt={'car interior'}
                                            />
                                        </motion.div>
                                    );
                                }
                            )}
                        <div className={'relative h-full w-full'}>
                            {selectedView === 'interior' &&
                                selectedModel?.interior_colors?.map((item) => {
                                    const isSelected =
                                        item.render_url ===
                                        store.interior_colors;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: isSelected ? 1 : 0,
                                            }}
                                            transition={{ duration: 1 }} // Продолжительность анимации
                                        >
                                            <Image
                                                src={
                                                    getStrapiMedia(
                                                        item.render_image.data
                                                            .attributes.url
                                                    )!
                                                }
                                                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:scale-125'
                                                width={
                                                    item.render_image.data
                                                        .attributes.width
                                                }
                                                height={
                                                    item.render_image.data
                                                        .attributes.height
                                                }
                                                alt={'car'}
                                            />
                                        </motion.div>
                                    );
                                })}
                        </div>
                    </>
                ) : (
                    <Loader
                        styles={
                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                        }
                    />
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
                <div
                    className={
                        'absolute left-1/2 top-8 flex -translate-x-1/2 gap-5'
                    }
                >
                    <button
                        onClick={() => setSelectedView('body')}
                        className={cn(
                            'flex w-full items-center justify-center gap-5 whitespace-nowrap rounded-none border border-white py-2 font-electrohub text-lg font-bold text-black transition-all lg:min-w-52 lg:px-8',
                            'flex w-full items-center justify-center gap-5 whitespace-nowrap rounded-none border py-2 font-electrohub text-lg font-bold text-black transition-all lg:min-w-52 lg:px-8',
                            selectedView === 'body'
                                ? 'bg-white'
                                : 'border-black bg-white/20 backdrop-blur-md'
                        )}
                    >
                        внешний вид
                    </button>
                    <button
                        onClick={() => setSelectedView('interior')}
                        className={cn(
                            'flex w-full items-center justify-center gap-5 whitespace-nowrap rounded-none border py-2 font-electrohub text-lg font-bold text-black transition-all lg:min-w-52 lg:px-8',
                            selectedView === 'interior'
                                ? 'bg-white'
                                : 'border-black bg-white/20 backdrop-blur-md'
                        )}
                    >
                        внутренний вид
                    </button>
                </div>
            </div>
        </div>
    );
}
