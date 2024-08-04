import GalleryComponent from '@/components/GalleryComponent';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ScrollLink from '@/components/ScrollLink';

type Item = {
    id: number;
    name: string;
};
type Specification = {
    id: number;
    name: string;
    items: Item[];
};
type Props = {
    data: Specification[];
};
export default function TechnicalSpecifications({ data }: Props) {
    return (
        <section
            id={'specification'}
            className={'bg-[#F0F0F0] font-electrohub'}
        >
            <div className={'container py-10'}>
                <h3 className={'text-[32px] font-bold text-[#1e1e1e]'}>
                    {`Технические характеристики`}
                </h3>
                <div
                    className={
                        'mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-x-5 lg:gap-y-8 '
                    }
                >
                    {data.map((specification) => (
                        <div key={specification.id} className={'mb-5'}>
                            <h4
                                className={
                                    'text-lg lg:text-[24px] font-bold text-[#3E4247]'
                                }
                            >
                                {specification.name}
                            </h4>
                            <ul className={'mt-3 flex flex-col gap-2'}>
                                {specification.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className={
                                            'my-1.5 text-sm lg:text-[18px] font-normal text-[#1e1e1e]'
                                        }
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
