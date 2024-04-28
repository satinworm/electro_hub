'use client';
import { CarConstructorResponse, Model } from '@/types/zeekr-constructor';
import Image from 'next/image';
import { getStrapiMedia } from '@/utils/api-helpers';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import {
    ConstructorStore,
    ConstructorStoreState,
} from '@/stores/car-constructor.store';
import { Checkbox } from '@/components/ui/checkbox';

export default function ConfigurationForm({
    defaultData,
    form,
}: {
    defaultData: CarConstructorResponse;
    form: any;
}) {
    const logo = defaultData?.data?.[0]?.attributes?.logo;
    const models = defaultData?.data?.[0]?.attributes?.models;
    const selectedModelObject = models?.find(
        (model: Model) => model.name === form.watch('configuration')
    );
    const [modelsListOpen, setModelsListOpen] = useState(false);

    const store = ConstructorStore((state: any) => state.constructor);
    const setConstructor = ConstructorStore(
        (state: any) => state.setConstructor
    );
    const updatePrice = ConstructorStore(
        (state: ConstructorStoreState) => state.updatePrice
    );
    const { watch } = form;

    return (
        <div className={'mt-6 px-3 md:mt-0 md:px-6 lg:p-10'}>
            {logo && (
                <Image
                    src={getStrapiMedia(logo?.data.attributes?.url)!}
                    alt={'Zeekr Logo'}
                    width={logo?.data.attributes?.width}
                    height={logo?.data.attributes?.height}
                />
            )}
            {models && (
                <div
                    className={
                        'md:gap-y-15 mt-12 flex w-full flex-col gap-y-10 font-electrohub'
                    }
                >
                    <FormField
                        control={form.control}
                        name='configuration'
                        render={({ field }) => (
                            <FormItem className='relative w-full'>
                                <FormLabel className='whitespace-nowrap font-electrohub text-sm font-bold'>
                                    Комплектация
                                </FormLabel>
                                <Popover
                                    open={modelsListOpen}
                                    onOpenChange={setModelsListOpen}
                                    modal
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'constructor'}
                                            role='combobox'
                                            className='w-full justify-between rounded-none text-sm'
                                        >
                                            {field.value
                                                ? models?.find(
                                                      (model: Model) =>
                                                          model.name ===
                                                          field.value
                                                  )?.name
                                                : 'Выберете модель'}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className='max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0'>
                                        <Command>
                                            <CommandInput
                                                className={'font-electrohub'}
                                                placeholder='Поиск...'
                                            />
                                            <CommandEmpty>
                                                не найдено
                                            </CommandEmpty>
                                            <CommandGroup className='max-h-[200px] overflow-y-auto bg-white'>
                                                {models &&
                                                    models?.map(
                                                        (model: Model) => {
                                                            return (
                                                                <CommandItem
                                                                    key={
                                                                        model.name
                                                                    }
                                                                    value={
                                                                        model.name
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            'configuration',
                                                                            model.name
                                                                        );
                                                                        setConstructor(
                                                                            {
                                                                                defaultRenderImage:
                                                                                    model
                                                                                        .default_image
                                                                                        .data
                                                                                        .attributes,
                                                                                configuration:
                                                                                    model.name,
                                                                            }
                                                                        );
                                                                        setModelsListOpen(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            field.value ===
                                                                                model.name
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
                                                                            model.name
                                                                        }
                                                                    </span>
                                                                </CommandItem>
                                                            );
                                                        }
                                                    )}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {selectedModelObject?.default_price && (
                        <div className={'flex items-baseline gap-2'}>
                            <span>Стартовая цена:</span>
                            <span className={'text-lg font-bold'}>
                                {selectedModelObject?.default_price}$
                            </span>
                        </div>
                    )}

                    {selectedModelObject?.body_colors &&
                        selectedModelObject?.body_colors?.length > 0 && (
                            <FormField
                                control={form.control}
                                name='color'
                                render={() => (
                                    <FormItem>
                                        <div className='mb-4'>
                                            <FormLabel className='text-sm font-bold'>
                                                Выбрать цвет кузова:
                                            </FormLabel>
                                        </div>
                                        <div
                                            className={
                                                'grid grid-cols-4 gap-x-5 gap-y-3'
                                            }
                                        >
                                            {selectedModelObject?.body_colors.map(
                                                (item) => {
                                                    return (
                                                        <FormField
                                                            key={
                                                                item.render_url
                                                            }
                                                            control={
                                                                form.control
                                                            }
                                                            name='color'
                                                            render={({
                                                                field,
                                                            }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className='flex'
                                                                    >
                                                                        <FormControl>
                                                                            <FormLabel
                                                                                className={cn(
                                                                                    'h-[70px] w-[70px] rounded-sm bg-white transition-all',
                                                                                    watch(
                                                                                        'color'
                                                                                    ) ===
                                                                                        item.render_url
                                                                                        ? 'border-[2px] border-black p-1.5'
                                                                                        : 'border-[1px] border-[#808080] p-1'
                                                                                )}
                                                                            >
                                                                                <div
                                                                                    style={{
                                                                                        background:
                                                                                            item.btn_bg,
                                                                                    }}
                                                                                    className={
                                                                                        'h-full w-full'
                                                                                    }
                                                                                >
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes(
                                                                                            item.render_url
                                                                                        )}
                                                                                        className={
                                                                                            'h-full w-full opacity-0'
                                                                                        }
                                                                                        onCheckedChange={(
                                                                                            checked
                                                                                        ) => {
                                                                                            setConstructor(
                                                                                                {
                                                                                                    ...store.constructor,
                                                                                                    body: item.render_url,
                                                                                                }
                                                                                            );
                                                                                            updatePrice(
                                                                                                {
                                                                                                    body: item.incremental_price,
                                                                                                }
                                                                                            );
                                                                                            return (
                                                                                                checked &&
                                                                                                field.onChange(
                                                                                                    item.render_url
                                                                                                )
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </FormLabel>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className={''}>
                                            {selectedModelObject?.body_colors &&
                                                (() => {
                                                    const selectedColor =
                                                        selectedModelObject.body_colors.find(
                                                            (item) =>
                                                                form.watch(
                                                                    'color'
                                                                ) ===
                                                                item.render_url
                                                        );

                                                    return (
                                                        <>
                                                            <div
                                                                className={cn(
                                                                    'font-electrohub text-sm transition-all',
                                                                    'mt-8 space-y-4 opacity-100'
                                                                )}
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        'gap-1.5 text-lg',
                                                                        selectedColor?.incremental_price ===
                                                                            0
                                                                            ? 'hidden'
                                                                            : 'flex'
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {selectedColor?.incremental_price ||
                                                                            0}
                                                                    </span>
                                                                    <span
                                                                        className={
                                                                            'font-bold'
                                                                        }
                                                                    >
                                                                        $
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={cn(
                                                                        'leading-tight transition-all',

                                                                        selectedColor?.additional_description ===
                                                                            null
                                                                            ? 'min-h-o h-0'
                                                                            : 'min-h-14'
                                                                    )}
                                                                >
                                                                    {
                                                                        selectedColor?.additional_description
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    {selectedModelObject?.interior_colors &&
                        selectedModelObject?.interior_colors?.length > 0 && (
                            <FormField
                                control={form.control}
                                name='interior_colors'
                                render={() => (
                                    <FormItem>
                                        <div className='mb-4'>
                                            <FormLabel className='text-sm font-bold'>
                                                Выбрать салон:
                                            </FormLabel>
                                        </div>
                                        <div
                                            className={
                                                'grid grid-cols-4 gap-x-5 gap-y-3'
                                            }
                                        >
                                            {selectedModelObject?.interior_colors?.map(
                                                (item) => {
                                                    return (
                                                        <FormField
                                                            key={
                                                                item.render_url
                                                            }
                                                            control={
                                                                form.control
                                                            }
                                                            name='interior_colors'
                                                            render={({
                                                                field,
                                                            }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className='flex'
                                                                    >
                                                                        <FormControl>
                                                                            <FormLabel
                                                                                className={cn(
                                                                                    'relative h-[70px] w-[70px] rounded-sm bg-white transition-all duration-200',
                                                                                    watch(
                                                                                        'interior_colors'
                                                                                    ) ===
                                                                                        item.render_url
                                                                                        ? 'border-[1px] border-black p-0'
                                                                                        : 'border-[1px] border-[#808080] p-1'
                                                                                )}
                                                                            >
                                                                                <Image
                                                                                    src={
                                                                                        getStrapiMedia(
                                                                                            item
                                                                                                .icon
                                                                                                .data
                                                                                                .attributes
                                                                                                .url
                                                                                        )!
                                                                                    }
                                                                                    fill
                                                                                    className={cn(
                                                                                        'h-full w-full transition-all duration-200',
                                                                                        item.render_url ===
                                                                                            watch(
                                                                                                'interior_colors'
                                                                                            )
                                                                                            ? 'scale-100'
                                                                                            : 'scale-75'
                                                                                    )}
                                                                                    alt={
                                                                                        'asd'
                                                                                    }
                                                                                />
                                                                                <Checkbox
                                                                                    checked={field.value?.includes(
                                                                                        item.render_url
                                                                                    )}
                                                                                    className={
                                                                                        'h-full w-full opacity-0'
                                                                                    }
                                                                                    onCheckedChange={(
                                                                                        checked
                                                                                    ) => {
                                                                                        setConstructor(
                                                                                            {
                                                                                                ...store.constructor,
                                                                                                interior_colors:
                                                                                                    item.render_url,
                                                                                            }
                                                                                        );
                                                                                        updatePrice(
                                                                                            {
                                                                                                interior_colors:
                                                                                                    item.incremental_price,
                                                                                            }
                                                                                        );
                                                                                        return (
                                                                                            checked &&
                                                                                            field.onChange(
                                                                                                item.render_url
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </FormLabel>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className={''}>
                                            {selectedModelObject?.interior_colors &&
                                                (() => {
                                                    const selectedWheels =
                                                        selectedModelObject.interior_colors.find(
                                                            (item) =>
                                                                form.watch(
                                                                    'interior_colors'
                                                                ) ===
                                                                item.render_url
                                                        );
                                                    if (
                                                        selectedWheels?.incremental_price ===
                                                        0
                                                    )
                                                        return null;

                                                    return (
                                                        <div
                                                            className={
                                                                'mt-8 space-y-4 font-electrohub text-sm'
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    'flex gap-1.5 text-lg'
                                                                }
                                                            >
                                                                <span>
                                                                    {selectedWheels?.incremental_price ||
                                                                        0}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        'font-bold'
                                                                    }
                                                                >
                                                                    $
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={
                                                                    'leading-tight'
                                                                }
                                                            >
                                                                {selectedWheels?.additional_description ||
                                                                    ' '}
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    {selectedModelObject?.wheels &&
                        selectedModelObject?.wheels?.length > 0 && (
                            <FormField
                                control={form.control}
                                name='wheels'
                                render={() => (
                                    <FormItem>
                                        <div className='mb-4'>
                                            <FormLabel className='text-sm font-bold'>
                                                Выбрать диски:
                                            </FormLabel>
                                        </div>
                                        <div
                                            className={
                                                'grid grid-cols-5 gap-x-5 gap-y-3'
                                            }
                                        >
                                            {selectedModelObject?.wheels?.map(
                                                (item) => {
                                                    return (
                                                        <FormField
                                                            key={
                                                                item.render_url
                                                            }
                                                            control={
                                                                form.control
                                                            }
                                                            name='wheels'
                                                            render={({
                                                                field,
                                                            }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className='flex'
                                                                    >
                                                                        <FormControl>
                                                                            <FormLabel
                                                                                className={cn(
                                                                                    'relative h-[58px] w-[58px] rounded-sm bg-white transition-all',
                                                                                    watch(
                                                                                        'wheels'
                                                                                    ) ===
                                                                                        item.render_url
                                                                                        ? 'border-[2px] border-black p-1.5'
                                                                                        : 'border-[1px] border-[#808080] p-1'
                                                                                )}
                                                                            >
                                                                                <Image
                                                                                    src={
                                                                                        getStrapiMedia(
                                                                                            item
                                                                                                .icon
                                                                                                .data
                                                                                                .attributes
                                                                                                .url
                                                                                        )!
                                                                                    }
                                                                                    fill
                                                                                    className={
                                                                                        'h-full w-full'
                                                                                    }
                                                                                    alt={
                                                                                        'asd'
                                                                                    }
                                                                                />
                                                                                <Checkbox
                                                                                    checked={field.value?.includes(
                                                                                        item.render_url
                                                                                    )}
                                                                                    className={
                                                                                        'h-full w-full opacity-0'
                                                                                    }
                                                                                    onCheckedChange={(
                                                                                        checked
                                                                                    ) => {
                                                                                        setConstructor(
                                                                                            {
                                                                                                ...store.constructor,
                                                                                                wheels: item.render_url,
                                                                                            }
                                                                                        );
                                                                                        updatePrice(
                                                                                            {
                                                                                                wheels: item.incremental_price,
                                                                                            }
                                                                                        );
                                                                                        return (
                                                                                            checked &&
                                                                                            field.onChange(
                                                                                                item.render_url
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </FormLabel>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className={''}>
                                            {selectedModelObject?.wheels &&
                                                (() => {
                                                    const selectedWheels =
                                                        selectedModelObject.wheels.find(
                                                            (item) =>
                                                                form.watch(
                                                                    'wheels'
                                                                ) ===
                                                                item.render_url
                                                        );
                                                    if (
                                                        selectedWheels?.incremental_price ===
                                                        0
                                                    )
                                                        return null;

                                                    return (
                                                        <div
                                                            className={
                                                                'mt-8 space-y-4 font-electrohub text-sm'
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    'flex gap-1.5 text-lg'
                                                                }
                                                            >
                                                                <span>
                                                                    {selectedWheels?.incremental_price ||
                                                                        0}
                                                                </span>
                                                                <span
                                                                    className={
                                                                        'font-bold'
                                                                    }
                                                                >
                                                                    $
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={
                                                                    'leading-tight'
                                                                }
                                                            >
                                                                {selectedWheels?.additional_description ||
                                                                    ' '}
                                                            </div>
                                                        </div>
                                                    );
                                                })()}
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    <div className={'flex flex-col gap-x-5 gap-y-3'}>
                        <div className={'text-lg font-bold'}>
                            Дополнительные опции:
                        </div>
                        {selectedModelObject?.additional_options?.map(
                            (item) => {
                                return (
                                    <FormField
                                        control={form.control}
                                        name={item.name}
                                        render={({ field }) => (
                                            <FormItem
                                                className={cn(
                                                    'flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow',
                                                    field.value
                                                        ? 'border-black bg-white'
                                                        : ' bg-white/20'
                                                )}
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            updatePrice({
                                                                [item.name]:
                                                                    checked
                                                                        ? item.incremental_price
                                                                        : 0,
                                                            });
                                                            field.onChange(
                                                                checked
                                                                    ? item.name
                                                                    : false
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <div className='space-y-1'>
                                                    <FormLabel
                                                        className={
                                                            'flex flex-col gap-2'
                                                        }
                                                    >
                                                        <div>{item.title}</div>
                                                        <div
                                                            className={
                                                                'font-bold'
                                                            }
                                                        >
                                                            {
                                                                item.incremental_price
                                                            }{' '}
                                                            $
                                                        </div>
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
