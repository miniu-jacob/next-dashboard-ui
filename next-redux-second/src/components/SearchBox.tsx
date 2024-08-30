'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBox = () => {
    const router = useRouter();

    // 검색 함수
    const searchProduct = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('입력값: ', event.currentTarget.value);
            const query = event.currentTarget.value.trim();
            if (query) {
                router.push(`/products/?q=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <div
            className='flex items-center justify-center gap-2 border-b border-gray-300
                mr-4 md:justify-start
            '
        >
            <Image
                src={'/searchIcon.png'}
                alt={'searchIcon'}
                width={20}
                height={20}
            ></Image>
            <input
                type='text'
                placeholder='검색어 입력'
                className='w-32 text-sm max-w-[200px] p-2 ring-0 focus:ring-0'
                // 이벤트를 매개변수로 주지 않는 이유는 자동으로 이벤트가 전달된다.
                onKeyDown={searchProduct}
            />
        </div>
    );
};

export default SearchBox;
