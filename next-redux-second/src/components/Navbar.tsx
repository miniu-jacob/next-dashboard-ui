'use client';
import Image from 'next/image';
import SearchBox from './SearchBox';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { login, logout } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    // 리듀서에 있는 로그인 정보를 가져오고 접근하기 위해 dispatch 와 useSelector 설정
    const dispatch = useDispatch();
    const router = useRouter();
    const isLogIn = useSelector(
        (state: RootState) => state.authControl.isLogin,
    );

    const handleLogout = () => {
        dispatch(logout());
        router.push('/products');
    };

    const handleLogin = () => {
        dispatch(login());
        router.push('/login');
    };

    return (
        <div className='flex flex-col '>
            <div className='flex  items-center justify-between p-4 mx-2'>
                {/* SearchBar */}
                <div className='block md:hidden '>
                    <SearchBox />
                </div>
                <div className='hidden md:block'></div>

                {/* 로그인 영역 */}
                <div className='flex justify-end'>
                    {isLogIn ? (
                        //  로그인상태일 때
                        <div
                            className='flex items-center justify-center gap-2 ml-auto cursor-pointer p-2 '
                            onClick={handleLogout}
                        >
                            <Image
                                src={'/user.png'}
                                alt={'userIcon'}
                                width={16}
                                height={16}
                            ></Image>
                            <span className='text-sm '>로그아웃</span>
                        </div>
                    ) : (
                        // 로그아웃 상태일 때
                        <div
                            className='flex items-center justify-center gap-2 ml-auto cursor-pointer p-2 '
                            onClick={handleLogin}
                        >
                            <Image
                                src={'/user.png'}
                                alt={'userIcon'}
                                width={16}
                                height={16}
                            ></Image>
                            <span className='text-sm '>로그인</span>
                        </div>
                    )}
                </div>
            </div>
            {/* 로고 */}
            <div className='flex justify-center text-center '>
                <Link href={'/products'}>
                    <Image
                        src={'/handm-logo.svg'}
                        alt={'logo'}
                        width={80}
                        height={64}
                        priority
                        style={{
                            objectFit: 'contain',
                        }}
                    ></Image>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
