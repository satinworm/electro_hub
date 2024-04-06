import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFound() {
    const locale = useLocale();
    const t = useTranslations('NotFound');
    return (
        <div
            className={cn(
                `mx-auto w-full bg-[url("/not_found_bg.png")] bg-center bg-no-repeat md:bg-cover`
            )}
        >
            <div className='item-center relative flex min-h-[98vh] w-full overflow-hidden'>
                {/*<div*/}
                {/*    className={*/}
                {/*        'absolute left-1/2 h-[98vh] w-1/4 -translate-x-1/2 overflow-hidden shadow-[0_0_25px_35px_rgba(0,0,0,0.4)]'*/}
                {/*    }*/}
                {/*/>*/}
                <div
                    className={
                        'absolute left-1/3 top-1/2 flex -translate-x-full -translate-y-1/2 flex-col justify-center'
                    }
                >
                    <div
                        className={'font-terminatorgen text-[160px] text-white'}
                    >
                        404
                    </div>
                    <div
                        className={
                            'mt-10 font-electrohub text-[20px] font-bold text-[#7E7F7F]'
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
