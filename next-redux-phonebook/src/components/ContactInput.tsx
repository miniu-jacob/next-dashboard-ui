'use client';
import { useDispatch } from 'react-redux';
import InputField from './forms/InputField';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { addContact } from '@/store/usersReducer';

const ContactSchema = z.object({
    username: z
        .string()
        .min(3, { message: '3글자 이상을 입력해 주세요' })
        .max(20, { message: '20글자 이상은 사용할 수 없습니다.' }),
    phone: z
        .string()
        .min(1, { message: '연락처 정보는 필수 항목입니다.' })
        .max(20, { message: '올바른 형식이 아닙니다.' }),
});

type ContactFormInputs = z.infer<typeof ContactSchema>;

const ContactInput = () => {
    // dispatch 훅을 가져온다.
    const dispatch = useDispatch();

    // react-hook-form 의 useForm 훅을 사용하여 폼 상태를 관리한다.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormInputs>({
        // zodResolver를 사용하여 zod 스키마를 통합
        resolver: zodResolver(ContactSchema),
    });

    const onSubmit = (data: ContactFormInputs) => {
        // 폼이 제출될 때, username 과 phone 연락처를 받아 id를 생성해서 전달
        // 따라서 새로운 newContact 라는 객체를 만든다.
        const newContact = {
            id: Date.now(),
            username: data.username,
            phone: data.phone,
        };
        console.log('data', data);

        // 수정된 데이터 구조로 Redux에 추가
        dispatch(addContact(newContact));

        // 폼 초기화
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid space-y-4 max-w-sm'
        >
            <InputField
                label={'이름'}
                type='text'
                name={'username'}
                register={register}
                defaultValue={''}
                error={errors.username}
                inputProps={{
                    placeholder: '이름을 입력하세요',
                }}
            />
            <InputField
                label={'연락처'}
                type='text'
                name={'phone'}
                register={register}
                defaultValue={''}
                error={errors.phone}
                inputProps={{
                    placeholder: '연락처를 입력하세요',
                }}
            />
            <div className='grid w-full max-w-sm items-center gap-1.5 mt-2'>
                <Button
                    variant='secondary'
                    className='md:max-w-[230px] bg-blue-400 text-white 
                        font-semibold text-lg  hover:bg-blue-500'
                >
                    추가
                </Button>
            </div>
        </form>
    );
};

export default ContactInput;
