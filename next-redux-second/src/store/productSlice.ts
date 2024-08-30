import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Product 라는 이름의 인터페이스를 정의한다. 
// TypeScript 에서 이런 타입들을 정의해 줘야 한다. 
interface Product {
    id: number;
    img: string;
    title: string;
    price: number;
    choice: boolean;
    new: boolean;
    size: string[];
}

// initialState를 만들기 전에 이런 타입들을 인터페이스로 정의한다.
// 여러 개의 useState 를 합쳐 놓는 것이라고 생각할 수도 있다.
// 정의해 놓은 타입들 중 필요한 것들만 사용할 수 있지만 각각의 초기값들은 설정해 주어야 한다.
// 인터페이스 객체는 각 속성 사이에 ' ; ' 를 쓰고, 그냥 객체는 ' , ' 를 쓴다.
interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    selectedProduct: Product | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    filteredProducts: [], // 필터링된 결과를 저장할 배열
    selectedProduct: null,
    status: 'idle',
    error: null,
};

// 비동기 액션: 전체 상품을 API 에서 가져온다.
// redux toolkit 을 사용하면서 action과 reducer 를 분리할 필요 없이 하나에서 처리할 수 있다.
//

// 공통 핸들러 함수를 정의한다. 
const handlePending = (state: ProductState) => {
    state.status = '불러오고 있습니다.';
}

const handleRejected = (state: ProductState, action: AnyAction) => {
    state.status = 'failed';
    state.error = action.error.message || '데이터 가져오기에 실패했습니다. ';
}

// action이름인 string > 임의로 정한다.
const getProducts = createAsyncThunk('product/fetchAll', async () => {
    const response = await fetch('https://my-json-server.typicode.com/miniu-jacob/json-jacob-shopping/products');
    if (!response.ok) {
        throw new Error('응답이 오지 않음.')
    }
    const data = await response.json();
    return data;


});

// 하나의 상품을 가져오는 api 
const getSingleProduct = createAsyncThunk(
    'product/getSingleItem',
    async (itemId: number) => {
        const response = await fetch(`https://my-json-server.typicode.com/miniu-jacob/json-jacob-shopping/products/${itemId}`);
        if (!response.ok) {
            throw new Error('상품을 가져오지 못했습니다.')
        }
        const data: Product = await response.json();
        return data;
    }
)

const getFilteredProducts = createAsyncThunk('product/fetchFiltered',
    async (query: string) => {
        const response = await fetch(`https://my-json-server.typicode.com/miniu-jacob/json-jacob-shopping/products?q=${query}`);
        if (!response.ok) {
            throw new Error('필터링 된 상품을 가져오지 못했습니다.')
        }
        const data: Product[] = await response.json();
        return data;
    }
)

const productSlice = createSlice({
    name: 'onlineMall',
    initialState,
    reducers: {
        // 필터링 리듀서: 조건에 따라 상품 목록을 필터링

    },

    // extraReducers 를 정리
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, handlePending)
            .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.filteredProducts = action.payload
            })
            .addCase(getProducts.rejected, handleRejected)
            .addCase(getSingleProduct.pending, handlePending)
            .addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.status = 'succeeded';
                state.selectedProduct = action.payload;
            })
            .addCase(getSingleProduct.rejected, handleRejected)
            .addCase(getFilteredProducts.pending, handlePending)
            .addCase(getFilteredProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.filteredProducts = action.payload; // 필터링된 결과를 저장
            })
            .addCase(getFilteredProducts.rejected, handleRejected);

    },
})


export const productActions = productSlice.actions;
export { getProducts, getSingleProduct, getFilteredProducts };
export default productSlice.reducer;