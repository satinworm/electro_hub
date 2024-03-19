import { useTranslations } from 'next-intl';
import Logo from '../ui/Logo';
import { Button } from '../ui/button';

export default function Navbar() {
    const t = useTranslations('Navbar');
    return (
        <nav>
            <div className='4xl:max-w-[1840px] container flex w-full justify-between gap-2 px-10 py-5'>
                <div className='flex gap-20'>
                    <Logo />
                    <Button
                        variant='link'
                        className='group flex items-center gap-3 transition-all duration-200 ease-in-out hover:scale-95 active:translate-y-1'
                    >
                        <span className='text-base'>{t('menu')}</span>
                    </Button>
                </div>
                <div className='flex h-fit gap-4'>
                    {/* <DarkModeToogle /> */}
                    {/* <LocaleToogle /> */}
                    {/* <Consultation label={t('consultation')} /> */}
                    {/* <LoginBtn label={t('login')} /> */}
                    <div className='font-terminatorgen'>o kurwa</div>
                </div>
            </div>
        </nav>
    );
}
