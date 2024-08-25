'use client';
import Image from 'next/image';
const TableSearch = () => {
    return (
        <div className=''>
            <div className='w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
                <Image
                    src={'/search.png'}
                    alt=''
                    width={14}
                    height={14}
                ></Image>
                <input
                    type='text'
                    placeholder='Search...'
                    className='w-auto p-2 bg-transparent outline-none'
                />
            </div>
        </div>
    );
};

export default TableSearch;
