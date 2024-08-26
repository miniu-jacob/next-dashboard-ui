'use client';
import { initialState, reducer } from '@/store/counterReducer';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
    const [number, setNumber] = useState(0);

    // reducer 사용을 위한 state
    // const [money, dispatch] = useReducer(reducer, initialState);

    // 전역 상태를 가져오기 위해서는 useSelector 를 사용
    const money = useSelector((state: { value: number }) => state.value);
    // const stateValue = useSelector((state) => state);
    // console.log('State object: ', stateValue);

    // Redux 액션을 보내기 위해 useDispatch 사용
    const dispatch = useDispatch();

    return (
        <div className='m-4 flex flex-col gap-4'>
            <h2 className='text-lg font-semibold'>useReducer 카운터 테스트</h2>
            <p>숫자: {money}</p>
            <div className='flex gap-3 ml-0'>
                <input
                    type='number'
                    value={number}
                    step={'1000'}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                    className='border border-blue-400 p-2'
                />
                <button
                    className='bg-yellow-200 p-1 border border-blue-300'
                    onClick={() => {
                        dispatch({ type: 'INCREMENT', payload: number });
                    }}
                >
                    증가
                </button>
                <button
                    className='bg-yellow-200 p-1 border border-blue-300'
                    onClick={() => {
                        dispatch({ type: 'DECREMENT', payload: number });
                    }}
                >
                    감소
                </button>
            </div>
        </div>
    );
};

export default Counter;
