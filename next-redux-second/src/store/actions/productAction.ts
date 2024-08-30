// 미들웨어 함수는 함수를 리턴한다. 

import { AppDispatch } from '../store';
import { productActions } from '../productSlice';

// 두개의 파라미터를 받는다. dispatch, getState
function getProducts(searchQuery: string) {
    return async (dispatch: AppDispatch, getState: any) => {
        let url = `https://my-json-server.typicode.com/miniu-jacob/json-jacob-shopping/products?q=${searchQuery}`;

        let response = await fetch(url);
        // const url = 'http://localhost:5050/products';
        let data = await response.json();
        console.log('check: ', data)

        // 리듀서로 데이터 보내기
        // 액션은 리듀서에서 정의해 준다. 
        // dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: { data } });

        // src/store/productSlice.ts 에 정의되어 있고 export 된 
        // productActions 를 불러와서 productActions 액션 안에 있는 getAllProducts 를 넣어준다. 
        // dispatch(productActions.getAllProducts({ data }))
        // payload 값은 getAllProducts의 매개변수로 넘겨준다. 
    }
}

export const productAction = { getProducts };