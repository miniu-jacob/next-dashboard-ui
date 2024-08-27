'use client';
import { useDispatch } from 'react-redux';
import { addContact } from '@/store/usersReducer';
import { ContactFormInputs, ContactSchema } from '@/schemas/contactSchema';
import ContactForm from './ContactForm';

const ContactInput = () => {
    // dispatch 훅을 가져온다.
    const dispatch = useDispatch();

    const handleSubmit = (data: ContactFormInputs) => {
        const newContact = {
            id: Date.now(),
            username: data.username,
            phone: data.phone,
        };

        console.log('data', data);

        // 수정된 데이터 구조로 Redux에 추가
        dispatch(addContact(newContact));
    };

    return <ContactForm onSubmit={handleSubmit} submitLabel='추가' />;
};

export default ContactInput;
