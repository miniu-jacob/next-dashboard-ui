'use client';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { addContact } from '@/store/contactReducer';

const TodoApp = () => {
    // 이름을 적어주기 위한 state 생성
    const [name, setName] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [phone, setPhone] = useState<string>('');
    // const nameRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    // Redux 스토어에서 연락처 목록을 가져온다.
    const contacts = useSelector((state: RootState) => state.contact.contacts);
    console.log('contacts', contacts);

    // handleAddContact 함수 추가
    const handleAddContact = () => {
        // 이름이 비어 있다면 아무 작업 안함
        if (name?.trim() === '' || phone?.trim() === '') return;

        // 새로운 연락처 객체를 생성
        const newContact = {
            // 현재 시간을 id 로 사용
            id: Date.now(),
            name: name,
            phone: phone,
        };

        // addContact 액션을 디스패치하여 새로운 연락처를 추가한다.
        dispatch(addContact(newContact));

        // 입력 필드 초기화
        setName('');
        // 연락처 수를 증가
        setCount((count) => count + 1);
        setPhone('');
    };

    return (
        <div className='m-2 flex gap-2 '>
            <div>
                <h1 className='text-xl font-semibold'>연락처 앱</h1>
                <p className='text-xl font-semibold ml-10 mb-6'>
                    총 연락처 수: {count}
                </p>

                <label htmlFor='name'>이름을 입력하세요</label>
                <div className='flex gap-2'>
                    <Input
                        type='text'
                        placeholder='이름'
                        className='w-40'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    ></Input>
                    <Input
                        type='text'
                        placeholder='연락처'
                        className='w-40'
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    ></Input>
                    <Button
                        className='primary bg-blue-400 text-sm 
                    font-semibold hover:bg-blue-500'
                        onClick={(e) => handleAddContact(e)}
                    >
                        추가
                    </Button>
                </div>
            </div>
            <div className='border border-red-300 w-[400px] m-4 h-[500px]'>
                <div className='flex gap-2 m-2'>
                    <h1>Name</h1>
                    <span>Email</span>
                    <span>Phone</span>
                </div>
                <div className=''>
                    {contacts.map((contact) => (
                        <div key={contact.id} className='flex gap-2 m-2'>
                            <span>{contact.name}</span>
                            <span>{contact.phone}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
