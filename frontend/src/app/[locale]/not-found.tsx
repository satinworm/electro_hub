import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFound() {
    const locale = useLocale();
    const t = useTranslations('NotFound');
    return (
        <div
            className={cn(
                `mx-auto w-full bg-[url("/not_found_bg.avif")] bg-center bg-no-repeat md:bg-cover`
            )}
        >
            <div className='item-center relative flex min-h-[70vh] w-full overflow-hidden md:min-h-[98vh]'>
                <div
                    className={
                        'mx-auto flex flex-col justify-center p-4 md:absolute md:left-1/3 md:top-1/2 md:mx-0 md:-translate-y-1/2 md:p-0 xl:-translate-x-full'
                    }
                >
                    <div
                        className={
                            'font-terminatorgen text-[120px] text-white md:text-[160px]'
                        }
                    >
                        404
                    </div>
                    <div
                        className={
                            'mt-10 font-electrohub text-xl font-bold text-[#7E7F7F] md:text-[20px]'
                        }
                    >
                        {t('heading')}
                    </div>
                    <div
                        className={
                            'mt-5 max-w-[370px] text-left text-[16px] text-[#7E7F7F]'
                        }
                    >
                        {t('description')}
                    </div>
                    <Link
                        href={'/'}
                        className={
                            'mt-8 rounded-[5px] bg-white py-4 text-center font-electrohub text-lg font-bold text-black'
                        }
                        type={'button'}
                    >
                        {t('btn')}
                    </Link>
                </div>
                {/*<div className={'relative h-[250px] w-[31%]'}>*/}

                {/*</div>*/}
            </div>
        </div>
    );
}
