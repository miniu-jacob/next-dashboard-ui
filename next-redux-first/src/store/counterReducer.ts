
// Action 타입 정의
// 외부에서 가져올 수 있도록 export 한다.

interface State {
    value: number;
}

export interface Action {
    type: 'INCREMENT' | 'DECREMENT';
    payload: number;
}

// 초기 상태 설정
export const initialState: State = {
    value: 0,
}

export const reducer = (state: State = initialState, action: Action): State => {
    console.log('reducer 동작합니다.', state, action)
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, value: state.value + action.payload };
        case 'DECREMENT':
            return { ...state, value: state.value - action.payload };
        default:
            return state;
    }
}
