import { CarConstructorResponse } from '@/types/zeekr-constructor';
import { ConstructorStore } from '@/stores/car-constructor.store';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';
import { useEffect } from 'react';
import { Loader } from '@/components/Loader';

type Props = {
    defaultData: CarConstructorResponse;
    form: any;
};
export default function ZeekrConstructorPage(props: Props) {
    const { defaultData, form } = props;
    const { watch } = form;
    const selectedModel = defaultData?.data?.[0]?.attributes?.models?.find(
        (model) => model.name === watch('configuration')
    );
    const defaultRenderImage =
        defaultData?.data?.[0]?.attributes?.models?.[0]?.default_image;

    // const
    const store = ConstructorStore((state: any) => state.constructor);
    console.log('store ', store);
    const setConstructor = ConstructorStore(
        (state: any) => state.setConstructor
    );
    useEffect(() => {
        setConstructor({
            defaultRenderImage: defaultRenderImage,
        });
    }, []);
    console.log('selectedModel ', selectedModel);

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
            <div className={'flex h-full w-full items-center justify-center'}>
                {store.defaultRenderImage?.url &&
                store.defaultRenderImage?.width &&
                store.defaultRenderImage?.height ? (
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
                    // <video autoPlay loop muted>
                    //     <source src='/Zeekr.mp4' type='video/mp4' />
                    // </video>
                )}
            </div>
        </div>
    );
}
