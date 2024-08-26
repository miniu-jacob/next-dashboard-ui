import { createStore } from 'redux';
import { reducer } from './counterReducer';

// redux 스토어 생성
const store = createStore(reducer);

export default store;