import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('Index');

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='mx-auto h-10 w-full'>
                <Button className='dark:text-black'>{t('title')}</Button>
                <div className='border-4 border-black text-primary dark:border-[#fff]'>
                    o kurwa
                </div>
            </div>
        </main>
    );
}
