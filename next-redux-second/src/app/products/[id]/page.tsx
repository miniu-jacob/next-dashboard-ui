'use client';
import Image from 'next/image';
import { ItemSizeSelectButton } from '@/components/ItemSizeSelectButton';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getSingleProduct } from '@/store/productSlice';

const ProductDetailPage = () => {
    const isLogIn = useSelector(
        (state: RootState) => state.authControl.isLogin,
    );
    const router = useRouter();

    // 리듀서에서 정의한 내용들을 가져오기
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();
    const { id } = useParams();
    const pathname = usePathname();

    const product = useSelector(
        (state: RootState) => state.onlineMall.selectedProduct,
    );
    const status = useSelector((state: RootState) => state.onlineMall.status);

    // 로그인 useEffect
    useEffect(() => {
        if (!isLogIn) {
            const redirectToLogin = pathname !== '/products';
            if (redirectToLogin) {
                router.push('/login');
            }
        }
    }, [isLogIn, pathname]);

    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct(Number(id)));
        }
    }, [id, dispatch]);

    console.log('product: ', product);

    if (!isLogIn) {
        return null;
    }

    return (
        <div className='w-full min-h-full flex justify-center'>
            {product ? (
                <div className='flex flex-col md:flex-row h-[450px]'>
                    <div className='w-[300px] h-[450px] md:w-[300px] flex box-border mx-4 mt-4'>
                        <Image
                            src={product.img}
                            alt='Image'
                            className='rounded-md object-cover'
                            width={300}
                            height={450}
                        />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className='w-[350px] md:w-[350px] flex flex-col box-border gap-2 md:gap-6 mx-4 mt-4  '>
                            {/* {item.choice && (
                            <span className='text-sm font-semibold py-1'>
                                Concious Choice
                            </span>
                        )} */}

                            <span className='text-md'>{product.title}</span>
                            <span className=''>
                                {product.price.toLocaleString()} 원
                            </span>
                            {product.choice && (
                                <span className='text-sm font-semibold'>
                                    Concious Choice
                                </span>
                            )}
                            <ItemSizeSelectButton />

                            {/* <span className=''>
                            {item.price.toLocaleString()} 원
                        </span> */}
                            {/* {item.new && (
                            <span className='text-sm font-semibold py-1'>
                                신제품
                            </span>
                        )} */}
                        </div>
                        <div className='bg-blue-400 text-white py-2 px-4 flex items-center justify-center text-md font-semibold rounded-md max-w-[300px] mx-4 md:mx-2 mt-6 cursor-pointer'>
                            <button className=''>추가</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-center m-4'>Loading...</div>
            )}
        </div>
    );
};

export default ProductDetailPage;
