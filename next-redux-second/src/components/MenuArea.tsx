import Image from 'next/image';
import SearchBox from './SearchBox';

const menuList = [
    '여성',
    'Divided',
    '남성',
    '신생아/유아',
    '아동',
    'H&M HOME',
    'Sales',
    '지속가능성',
];

const MenuArea = () => {
    return (
        <div className='mt-4 w-full  flex justify-between items-center '>
            <div className='w-1/5 block md:hidden'></div>
            <div className='w-1/5 hidden md:block'></div>
            <div
                className='hidden sm:flex w-3/5 justify-center flex-wrap  md:w-auto cursor-pointer
            '
            >
                {menuList.map((item, index) => (
                    <div className='flex items-center gap-2 p-2' key={index}>
                        <div>{item}</div>
                    </div>
                ))}
            </div>
            <div className='hidden md:flex w-1/5 justify-end  px-2 '>
                <SearchBox />
            </div>
            <div className='w-1/5 block md:hidden'></div>
        </div>
    );
};

export default MenuArea;
