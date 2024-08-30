'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getFilteredProducts, getProducts } from '@/store/productSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ProductsPage = () => {
    const dispatch: AppDispatch = useDispatch();

    // useSearchparams를 사용할 때 가져오는 모듈이 next/navigation 이어야 한다.
    const searchParams = useSearchParams();

    const filteredProductsItems = useSelector(
        (state: RootState) => state.onlineMall.filteredProducts,
    );

    // >> 예전 useRouter 방식: const searchQuery = router.query.q || '';
    // q 파라미터 가져오기
    const searchQuery = searchParams.get('q') || '';

    // 가져온 데이터를 저장할 상태 정의
    // const [productItems, setProductItems] = useState([]);

    const productItems = useSelector(
        (state: RootState) => state.onlineMall.products,
    );
    const status = useSelector((state: RootState) => state.onlineMall.status);
    const error = useSelector((state: RootState) => state.onlineMall.error);

    useEffect(() => {
        if (searchQuery) {
            dispatch(getFilteredProducts(searchQuery));
            // setSearchQuery(router.query.q as string);
        } else {
            dispatch(getProducts());
        }
    }, [searchQuery, dispatch]);

    //     useEffect(() => {
    //         // fetchProducts 디스패치를 가져온다.
    //
    //         // 데이터를 가져온 다음에 콘솔에 출력
    //         dispatch(getProducts()).then((result) => {
    //             console.log('결과', result);
    //             setProductItems(result.payload);
    //             console.log('상품리스트', result.payload);
    //         });
    //     }, [dispatch]);

    if (status === 'loading') {
        return <div className='m-4 text-center'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const itemsToDisplay = searchQuery ? filteredProductsItems : productItems;

    return (
        <div className='w-full min-h-screen flex justify-center'>
            {searchQuery &&
            status === 'succeeded' &&
            itemsToDisplay.length === 0 ? (
                <div className='m-4 text-center'>
                    <p>검색된 상품이 없습니다.</p>
                </div>
            ) : (
                <div className='grid m-4 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {itemsToDisplay.map((item: any, index) => (
                        <Link href={`/products/${item.id}`} key={item.id}>
                            <div
                                key={index}
                                className=' w-[320px] md:w-[250px] flex flex-col box-border
                            cursor-pointer hover:rounded-md hover:bg-[#f8f9fa] hover:border-radius-[0.25rem] hover:shadow-md hover:shadow-[rgba(0,0,0,0.3)]
                            hover:border-1 '
                            >
                                <Image
                                    src={item.img}
                                    alt='Image'
                                    className='rounded-md object-cover'
                                    width={400}
                                    height={120}
                                />
                                <div className='flex flex-col px-2'>
                                    {item.choice && (
                                        <span className='text-sm font-semibold py-1'>
                                            Concious Choice
                                        </span>
                                    )}

                                    <span className='text-md'>
                                        {item.title}
                                    </span>
                                    <span className=''>
                                        {item.price.toLocaleString()} 원
                                    </span>
                                    {item.new && (
                                        <span className='text-sm font-semibold py-1'>
                                            신제품
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
export default ProductsPage;
