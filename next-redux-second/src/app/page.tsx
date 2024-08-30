import MenuArea from '@/components/MenuArea';
import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <div className='flex justify-center w-full'>
                <MenuArea></MenuArea>
            </div>
            Main Content
        </main>
    );
}
