'use client';

import { login } from '@/store/authSlice';
import router, { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const LoginUserPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login());
        console.log('login done');
        router.push('/products');
    };
    return (
        <div className='flex  w-full justify-center'>
            <div className='flex justify-center items-center mt-20'>
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <input
                        type='text'
                        placeholder='아이디를 입력하세요'
                        className='border p-2 rounded-md'
                        required
                    />
                    <input
                        type='password'
                        placeholder='암호를 입력하세요'
                        className='border p-2 rounded-md'
                        required
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 text-white p-2 rounded'
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginUserPage;
