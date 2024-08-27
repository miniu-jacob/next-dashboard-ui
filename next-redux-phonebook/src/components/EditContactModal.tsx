'use client';
import { ContactFormInputs } from '@/schemas/contactSchema';
import { Contact, modifyContact } from '@/store/usersReducer';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ContactForm from './ContactForm';
import { useDispatch } from 'react-redux';

interface EditContactModalProps {
    contact: Contact;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Contact) => void;
}

// 컴포넌트가 추가 Props 를 받을 수 있도록 () 부분에 정의
const EditContactModal = ({
    contact,
    isOpen,
    onClose,
}: EditContactModalProps) => {
    // 컴포넌트가 클라이언트 사이드에서만 document 객체에 접근하도록 해야 한다.
    // 따라서 useEffect 와 useState를 사용하여 컴포넌트가 마운트 된 후에만
    // ReactDOM.createPortal 을 호출하도록 만든다.

    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch();

    // 컴포넌트가 마운트 된 이후에 true 로 설정
    useEffect(() => {
        setIsMounted(true);
        console.log('isMounted 상태', isMounted);
    }, []);

    const handleSave = (data: ContactFormInputs) => {
        const updateContact = { ...contact, ...data };
        // Redux 상태 업데이트
        dispatch(modifyContact(updateContact));
        onClose();
    };

    // 마운트 전에는 아무것도 랜더링하지 않음
    if (!isMounted) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className='fixed bg-black bg-opacity-50 flex justify-center items-center inset-0 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg size-lg w-[300px] justify-center items-center'>
                <h2 className='text-center text-xl'>연락처 수정</h2>
                <ContactForm
                    defaultValues={contact}
                    onSubmit={handleSave}
                    submitLabel={'변경'}
                />
                <button
                    onClick={onClose}
                    className='bg-red-500 text-white px-4 py-2 rounded-md mt-4 w-full'
                >
                    취소
                </button>
            </div>
        </div>,
        document.body,
    );
};

export default EditContactModal;
