/* * src/store/store.ts
    * store를 불러온다. configureStore 
    * 필요하면 연락처 관리 리듀서를 불러 온다.
    import contactReducer from './contactReducer';
            */
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactReducer';

// 여러 리듀서를 결합하고 전역 상태 관리 
export const store = configureStore({
    reducer: {
        // 여러 리듀서를 결합할 수 있는 부분
        contact: contactReducer,
        // 추가 리듀서들도 이 객체에 추가할 수 있다. 
    },
});

// * AppDispatch 타입을 정의한다. 이 타입은 store.dispatch 의 타입을 가져와서
// * 'Appdispatch'라는 이름으로 지정한다.
// * 이유: 컴포넌트에서 dispatch 함수를 사용할 때 타입 안정성을 유지할 수 있다. 
// ! 비동기 액션에서 유용하다. 
export type AppDispatch = typeof store.dispatch;

// * RootState 타입을 정의한다. 이 타입은 Redux 스토어의 전체 상태 구조를 나타낸다. 
// state의 타입을 명시적으로 정의하여, 상태에 접근할 때 타입 검사와 자동 완성 기능을 활용할 수 있다. 
export type RootState = ReturnType<typeof store.getState>;