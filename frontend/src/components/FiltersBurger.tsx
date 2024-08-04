'use client';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import useCatalogFilter from '@/stores/catalog.store';
import type { BrandsResponse } from '@/types/brands.types';
import type { Link as LinkType } from '@/types/navbar.types';
import { getDataFromAPI } from '@/utils/fetch-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, XIcon } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
});
const defaultValues = {
    brand: '',
    model: '',
    generation: '',
    body: '',
    price_start: '',
    price_end: '',
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
        (item) => item.attributes.generation
    );

    // const handleSearch = debounce((value) => {
    //     // Perform your search logic here with the value
    //     setFilter('name', '$containsi', value);
    //     console.log('Search term:', value);
    // }, 500);
    //
    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setSearchTerm(value);
    //     handleSearch(value);
    // };
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

    return (
        <Sheet>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={'mt-6 flex gap-3 pl-4'}>
                        <div className={'relative'}>
                            <Input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-96 rounded-md border border-black py-2 pr-10 pl-4 text-sm"
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
                        <SheetTrigger
                            className={
                                'w-36 cursor-pointer rounded-md border border-black bg-white px-4 py-2 text-center font-electrohub font-medium text-black text-sm transition hover:bg-[#1e1e1e] hover:text-white'
                            }
                        >
                            Фильтры
                        </SheetTrigger>
                        {Object.keys(filters).length > 1 && (
                            <Button
                                type={'button'}
                                className={'mt-auto'}
                                onClick={() => {
                                    resetFilter();
                                    form.reset(defaultValues);
                                }}
                            >
                                Сбросить фильтры
                            </Button>
                        )}
                    </div>

                    <SheetContent
                        side={'bottom'}
                        className={
                            'min-w-[50vw] rounded-t-xl px-8 py-6 font-electrohub sm:px-10 sm:px-8 md:min-w-[25vw] md:px-12 md:py-10 lg:px-10'
                        }
                    >
                        <SheetHeader>
                            <SheetTitle className={'text-left text-[#808080]'}>
                                Настройка фильтров
                            </SheetTitle>
                        </SheetHeader>

                        <div
                            className={
                                'hideScrollbar top-10 z-10 mt-2 flex flex-col items-baseline gap-3 bg-[#FFFFFF] py-4'
                            }
                        >
                            <div className={'flex gap-2'}>
                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem className="relative flex min-w-[300px] flex-col gap-3">
                                            <FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
                                                Марка
                                            </FormLabel>
                                            <Popover
                                                open={brandListOpen}
                                                onOpenChange={setBrandListOpen}
                                                modal
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        role="combobox"
                                                        className="w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
                                                    >
                                                        {field.value
                                                            ? brands.find(
                                                                  (brand) =>
                                                                      brand
                                                                          .attributes
                                                                          .name ===
                                                                      field.value
                                                              )?.attributes.name
                                                            : 'Выберите марку автомобиля'}

                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            className={
                                                                'font-electrohub'
                                                            }
                                                            placeholder="Поиск..."
                                                        />
                                                        <CommandEmpty>
                                                            не найдено
                                                        </CommandEmpty>
                                                        <CommandGroup className="max-h-[200px] overflow-y-auto bg-white">
                                                            {brands?.map(
                                                                (brand) => (
                                                                    <CommandItem
                                                                        key={
                                                                            brand.id
                                                                        }
                                                                        value={
                                                                            brand
                                                                                .attributes
                                                                                .name
                                                                        }
                                                                        onSelect={async () => {
                                                                            await handleBrandSelect(
                                                                                brand
                                                                                    .attributes
                                                                                    .name
                                                                            );
                                                                            setValue(
                                                                                'generation',
                                                                                ''
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                field.value ===
                                                                                    brand
                                                                                        .attributes
                                                                                        .name
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0'
                                                                            )}
                                                                        />
                                                                        <span
                                                                            className={
                                                                                'test-sm font-electrohub font-normal'
                                                                            }
                                                                        >
                                                                            {
                                                                                brand
                                                                                    .attributes
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="generation"
                                    render={({ field }) => (
                                        <FormItem className="relative flex min-w-[300px] flex-col gap-3">
                                            <FormLabel className="whitespace-nowrap font-electrohub font-medium text-sm">
                                                Модель
                                            </FormLabel>
                                            <Popover
                                                open={generationListOpen}
                                                onOpenChange={
                                                    setGenerationListOpen
                                                }
                                                modal
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        role="combobox"
                                                        className="w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
                                                    >
                                                        {field.value
                                                            ? field.value
                                                            : 'Выберите модель'}

                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            className={
                                                                'font-electrohub'
                                                            }
                                                            placeholder="Поиск..."
                                                        />
                                                        <CommandEmpty>
                                                            не найдено
                                                        </CommandEmpty>
                                                        <CommandGroup className="max-h-[200px] overflow-y-auto bg-white">
                                                            {generations?.map(
                                                                (
                                                                    generation
                                                                ) => (
                                                                    <CommandItem
                                                                        key={
                                                                            generation
                                                                        }
                                                                        value={
                                                                            generation
                                                                        }
                                                                        onSelect={() => {
                                                                            handleGenerationSelect(
                                                                                generation
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                field.value ===
                                                                                    generation
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0'
                                                                            )}
                                                                        />
                                                                        <span
                                                                            className={
                                                                                'test-sm font-electrohub font-normal'
                                                                            }
                                                                        >
                                                                            {
                                                                                generation
                                                                            }
                                                                        </span>
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="body"
                                    render={({ field }) => (
                                        <FormItem className="relative flex min-w-[300px] flex-col gap-3">
                                            <FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
                                                Кузов
                                            </FormLabel>
                                            <Popover
                                                open={bodyListOpen}
                                                onOpenChange={setBodyListOpen}
                                                modal
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        role="combobox"
                                                        className="w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
                                                    >
                                                        {field.value
                                                            ? bodyOption.find(
                                                                  (brand) =>
                                                                      brand.id ===
                                                                      field.value
                                                              )?.name
                                                            : 'Выберите кузов'}

                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            className={
                                                                'font-electrohub'
                                                            }
                                                            placeholder="Поиск..."
                                                        />
                                                        <CommandEmpty>
                                                            не найдено
                                                        </CommandEmpty>
                                                        <CommandGroup className="max-h-[200px] overflow-y-auto bg-white">
                                                            {bodyOption?.map(
                                                                (brand) => (
                                                                    <CommandItem
                                                                        key={
                                                                            brand.id
                                                                        }
                                                                        value={
                                                                            brand.id
                                                                        }
                                                                        onSelect={async () => {
                                                                            setFilter(
                                                                                'body',
                                                                                '$eq',
                                                                                brand.id
                                                                            );
                                                                            setBodyListOpen(
                                                                                false
                                                                            );
                                                                            setValue(
                                                                                'body',
                                                                                brand.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                field.value ===
                                                                                    brand.id
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0'
                                                                            )}
                                                                        />
                                                                        <span
                                                                            className={
                                                                                'test-sm font-electrohub font-normal'
                                                                            }
                                                                        >
                                                                            {
                                                                                brand.name
                                                                            }
                                                                        </span>
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="privod"
                                    render={({ field }) => (
                                        <FormItem className="relative flex min-w-[300px] flex-col gap-3">
                                            <FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
                                                Привод
                                            </FormLabel>
                                            <Popover
                                                open={privodListOpen}
                                                onOpenChange={setPrivodListOpen}
                                                modal
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        role="combobox"
                                                        className="w-[300px] w-full justify-between rounded-md border border-[#1E1E1E] text-sm"
                                                    >
                                                        {field.value
                                                            ? privodOption.find(
                                                                  (brand) =>
                                                                      brand.id ===
                                                                      field.value
                                                              )?.name
                                                            : 'Выберите привод'}

                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            className={
                                                                'font-electrohub'
                                                            }
                                                            placeholder="Поиск..."
                                                        />
                                                        <CommandEmpty>
                                                            не найдено
                                                        </CommandEmpty>
                                                        <CommandGroup className="max-h-[200px] overflow-y-auto bg-white">
                                                            {privodOption?.map(
                                                                (brand) => (
                                                                    <CommandItem
                                                                        key={
                                                                            brand.id
                                                                        }
                                                                        value={
                                                                            brand.id
                                                                        }
                                                                        onSelect={async () => {
                                                                            setFilter(
                                                                                'privod',
                                                                                '$eq',
                                                                                brand.id
                                                                            );
                                                                            setPrivodListOpen(
                                                                                false
                                                                            );
                                                                            setValue(
                                                                                'privod',
                                                                                brand.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                'mr-2 h-4 w-4',
                                                                                field.value ===
                                                                                    brand.id
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0'
                                                                            )}
                                                                        />
                                                                        <span
                                                                            className={
                                                                                'test-sm font-electrohub font-normal'
                                                                            }
                                                                        >
                                                                            {
                                                                                brand.name
                                                                            }
                                                                        </span>
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div
                                className={'flex flex-col items-baseline gap-2'}
                            >
                                <FormLabel className=" whitespace-nowrap font-electrohub font-medium text-sm">
                                    Цена
                                </FormLabel>
                                <div className={'flex gap-1'}>
                                    <FormField
                                        control={form.control}
                                        name="price_start"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/*<FormControl>*/}
                                                <Input
                                                    className={
                                                        'w-32 rounded-l-md border border-[#1E1E1E] text-sm'
                                                    }
                                                    placeholder={'от'}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handlePriceChange(
                                                            e,
                                                            'start'
                                                        );
                                                    }}
                                                />
                                                {/*</FormControl>*/}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price_end"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/*<FormControl>*/}
                                                <Input
                                                    className={
                                                        'w-32 rounded-r-md border border-[#1E1E1E] text-sm'
                                                    }
                                                    placeholder={'до'}
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handlePriceChange(
                                                            e,
                                                            'end'
                                                        );
                                                    }}
                                                />
                                                {/*</FormControl>*/}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <Button
                                type={'button'}
                                className={'mt-auto'}
                                onClick={() => {
                                    resetFilter();
                                    form.reset(defaultValues);
                                }}
                            >
                                Сбросить фильтры
                            </Button>
                        </div>
                    </SheetContent>
                </form>
            </Form>
        </Sheet>
    );
}
