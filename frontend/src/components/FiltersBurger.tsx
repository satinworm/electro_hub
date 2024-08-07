'use client';
import DesktopFiltersBurger from '@/components/DesktopFiltersBurger';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import useCatalogFilter from '@/stores/catalog.store';
import type { BrandsResponse } from '@/types/brands.types';
import type { Link as LinkType } from '@/types/navbar.types';
import { getDataFromAPI } from '@/utils/fetch-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon, XIcon } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MobileFiltersBurger from './MobileFiltersBurger';

type Props = {
    main_links: LinkType[];
    social_links: LinkType[];
    sub_links: LinkType[];
    brands: BrandsResponse;
};
const FormSchema = z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    generation: z.string().optional(),
    body: z.string().optional(),
    price_start: z.string().optional(),
    price_end: z.string().optional(),
    privod: z.string().optional(),
    engine_type: z.string().optional(),
});
const defaultValues = {
    brand: '',
    model: '',
    generation: '',
    body: '',
    price_start: '',
    price_end: '',
    privod: '',
    engine_type: '',
};

const bodyOption = [
    {
        id: 'лифтбек',
        name: 'Лифтбек',
    },
    {
        id: 'кроссовер',
        name: 'Кроссовер',
    },
    {
        id: 'седан',
        name: 'Седан',
    },
    {
        id: 'минивэн',
        name: 'Минивэн',
    },
];
const privodOption = [
    {
        id: 'передний',
        name: 'передний',
    },
    {
        id: 'задний',
        name: 'задний',
    },
    {
        id: 'полный',
        name: 'полный',
    },
];
const engine_type = [
    {
        id: 'Электро',
        name: 'Электро',
    },
    {
        id: 'Гибрид(последовательный)',
        name: 'Гибрид(последовательный)',
    },
    {
        id: 'Гибрид(параллельный)',
        name: 'Гибрид(параллельный)',
    },
    {
        id: 'Бензин',
        name: 'Бензин',
    },
];
export default function FiltersBurger(props: any) {
    const { initialData, setInitialData, locale, brands } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState({ start: '', end: '' });
    const [debouncedPriceRange, setDebouncedPriceRange] = useState({
        start: '',
        end: '',
    });

    const [brandListOpen, setBrandListOpen] = useState(false);
    const [generationListOpen, setGenerationListOpen] = useState(false);
    const [bodyListOpen, setBodyListOpen] = useState(false);
    const [privodListOpen, setPrivodListOpen] = useState(false);
    const [engineListOpen, setEngineListOpen] = useState(false);
    const filters = useCatalogFilter((state) => state.filters);
    const setFilter = useCatalogFilter((state) => state.setFilter);
    const resetFilter = useCatalogFilter((state) => state.resetFilter);
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues,
    });
    const { watch, setValue } = form;
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('data', data);
    }

    console.log('FILTERS ', filters);
    const fetchCarsInStockData = async (filters: any, locale: string) => {
        const carsInStockData = await getDataFromAPI(
            'cars-in-stocks',
            {
                filters: filters,
                populate: {
                    preview_image: {
                        populate: '*',
                        fields: ['url', 'width', 'height'],
                    },
                    specification: {
                        fields: ['*'],
                        populate: '*',
                    },
                    brand: {
                        populate: '*',
                        fields: ['name', 'slug'],
                    },
                },
                locale: locale,
            },
            locale
        );

        return carsInStockData;
    };

    const handleBrandSelect = async (selectedBrand: string) => {
        setValue('brand', selectedBrand);

        setFilter('brand.name', '$eq', selectedBrand);
        setFilter('generation', '$ne', '');
        setFilter('engine_type', '$ne', '');
        setBrandListOpen(false);
    };
    const handleGenerationSelect = async (selectedGeneration: string) => {
        setValue('generation', selectedGeneration);
        setFilter('generation', '$eq', selectedGeneration);
        setGenerationListOpen(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            const updatedData = await fetchCarsInStockData(filters, locale);
            setInitialData(updatedData);
        };
        fetchData();
    }, [filters, locale]);
    const generations = initialData?.data?.map(
        (item: any) => item.attributes.generation
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setFilter('name', '$containsi', debouncedSearchTerm);
        } else {
            setFilter('name', '$containsi', '');
        }
    }, [debouncedSearchTerm, setFilter]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedPriceRange(priceRange);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [priceRange]);

    useEffect(() => {
        if (debouncedPriceRange.start || debouncedPriceRange.end) {
            if (debouncedPriceRange.start) {
                setFilter('price', '$gte', +debouncedPriceRange.start);
            }
            if (debouncedPriceRange.end) {
                setFilter('price', '$lte', +debouncedPriceRange.end);
            }
        } else {
            setFilter('price', '$gte', 0);
            setFilter('price', '$lte', 100000000);
        }
    }, [debouncedPriceRange, setFilter]);
    const handlePriceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: 'start' | 'end'
    ) => {
        setPriceRange((prev) => ({
            ...prev,
            [type]: event.target.value,
        }));
    };

    // @ts-ignore
    return (
        // <Sheet>
        <Form {...form}>
            <form className={''} onSubmit={form.handleSubmit(onSubmit)}>
                <div className={'mt-6 flex flex-wrap gap-3'}>
                    <div className={'relative w-full md:w-fit'}>
                        <Input
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full rounded-md border border-black py-2 pr-10 pl-4 text-sm md:w-96 lg:w-96"
                            placeholder="Введите название для поиска..."
                        />
                        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                        <div
                            className={cn(
                                '-translate-y-1/2 absolute top-1/2 right-3 flex cursor-pointer transition duration-300',
                                searchTerm ? 'opacity-100' : 'opacity-0'
                            )}
                            onClick={async () => {
                                setSearchTerm('');
                                setFilter('name', '$containsi', '');
                            }}
                        >
                            <XIcon
                                className={
                                    'rounded-full transition hover:bg-slate-50'
                                }
                            />
                        </div>
                    </div>
                    {Object.keys(filters).length > 1 && (
                        <Button
                            type={'button'}
                            className={'mt-auto hidden md:flex'}
                            onClick={() => {
                                resetFilter();
                                form.reset(defaultValues);
                            }}
                        >
                            <span className={'hidden md:block'}>
                                Сбросить фильтры
                            </span>
                            <Trash2Icon className={'block md:hidden'} />
                        </Button>
                    )}
                    <MobileFiltersBurger
                        setFilter={setFilter}
                        filters={filters}
                        form={form}
                        defaultValues={defaultValues}
                        setValue={setValue}
                        brands={brands}
                        generations={generations}
                        bodyOption={bodyOption}
                        privodOption={privodOption}
                        handleBrandSelect={handleBrandSelect}
                        handleGenerationSelect={handleGenerationSelect}
                        handlePriceChange={handlePriceChange}
                        resetFilter={resetFilter}
                        brandListOpen={brandListOpen}
                        setBrandListOpen={setBrandListOpen}
                        generationListOpen={generationListOpen}
                        setGenerationListOpen={setGenerationListOpen}
                        bodyListOpen={bodyListOpen}
                        setBodyListOpen={setBodyListOpen}
                        privodListOpen={privodListOpen}
                        setPrivodListOpen={setPrivodListOpen}
                        engineListOpen={engineListOpen}
                        setEngineListOpen={setEngineListOpen}
                        engine_type={engine_type}
                    />
                    <DesktopFiltersBurger
                        setFilter={setFilter}
                        filters={filters}
                        form={form}
                        defaultValues={defaultValues}
                        setValue={setValue}
                        brands={brands}
                        generations={generations}
                        bodyOption={bodyOption}
                        privodOption={privodOption}
                        handleBrandSelect={handleBrandSelect}
                        handleGenerationSelect={handleGenerationSelect}
                        handlePriceChange={handlePriceChange}
                        resetFilter={resetFilter}
                        brandListOpen={brandListOpen}
                        setBrandListOpen={setBrandListOpen}
                        generationListOpen={generationListOpen}
                        setGenerationListOpen={setGenerationListOpen}
                        bodyListOpen={bodyListOpen}
                        setBodyListOpen={setBodyListOpen}
                        privodListOpen={privodListOpen}
                        setPrivodListOpen={setPrivodListOpen}
                        engineListOpen={engineListOpen}
                        setEngineListOpen={setEngineListOpen}
                        engine_type={engine_type}
                    />
                </div>
            </form>
        </Form>
        // </Sheet>
    );
}
