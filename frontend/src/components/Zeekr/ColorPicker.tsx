'use client';
import { ColorOption } from '@/components/ZeekrExterior';
import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getStrapiMedia } from '@/utils/api-helpers';

interface ColorPickerProps {
    options: ColorOption[];
}
export const ColorPicker: FC<ColorPickerProps> = ({ options }) => {
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
        options?.[0]
    );
    return (
        <div>
            <div className='relative mt-4 min-h-[200px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[420px]'>
                {options?.map((option) => (
                    <motion.img
                        key={option.id}
                        src={getStrapiMedia(option.image.data.attributes.url)!}
                        alt={`Color ${option.id}`}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: selectedColor?.id === option.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`absolute left-0 top-0 h-${option?.image?.data?.attributes?.height} w-h-${option?.image?.data?.attributes?.width}`}
                    />
                ))}
            </div>
            <div className='flex w-full justify-center space-x-2 md:space-x-4'>
                {options?.map((option) => {
                    const isSelected = option == selectedColor;
                    return (
                        <motion.div
                            key={option.id}
                            className={`h-14 w-14 rounded-[4px] border-[2px] p-1 md:h-16 md:w-16 md:p-2 lg:h-24 lg:w-24`}
                            onClick={() => setSelectedColor(option)}
                            style={{
                                borderColor: isSelected
                                    ? '#1e1e1e'
                                    : 'transparent',
                            }}
                        >
                            <motion.div
                                className='h-full w-full cursor-pointer rounded-[4px]'
                                style={{ background: option.color }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
