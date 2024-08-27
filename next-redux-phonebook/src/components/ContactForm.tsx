'use client';

import { ContactFormInputs, ContactSchema } from '@/schemas/contactSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from './forms/InputField';

// 기본값과, onSubmit, 라벨의 이름 등을 인터페이스로 정의
interface ContactFormProps {
    defaultValues?: Partial<ContactFormInputs>;
    onSubmit: SubmitHandler<ContactFormInputs>;
    submitLabel: string;
}

const ContactForm = ({
    defaultValues,
    onSubmit,
    submitLabel,
}: ContactFormProps) => {
    // useForm 사용
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(ContactSchema),
        defaultValues,
    });

    const onSubmitHandler = (data: ContactFormInputs) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='grid space-y-4 '>
            <InputField
                label={'이름'}
                type='text'
                name='username'
                register={register}
                defaultValue={defaultValues?.username || ''}
                error={errors.username}
                inputProps={{
                    placeholder: '이름을 입력하세요',
                }}
            />
            <InputField
                label={'연락처'}
                type='text'
                name='phone'
                register={register}
                defaultValue={defaultValues?.phone || ''}
                error={errors.phone}
                inputProps={{
                    placeholder: '연락처를 입력하세요',
                }}
            />
            <div className='grid w-full max-w-md items-center gap-1.5 mt-2'>
                <button
                    type='submit'
                    className=' bg-blue-400 text-white text-lg hover:bg-blue-500 rounded-md p-2
                    '
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
