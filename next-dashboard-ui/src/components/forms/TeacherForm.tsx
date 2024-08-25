'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from './InputField';
import Image from 'next/image';

const schema = z.object({
    username: z
        .string()
        .min(3, { message: '3글자 이상을 입력해 주세요.' })
        .max(20, { message: '20자 이상은 사용할 수 없습니다.' }),
    email: z.string().email({ message: '잘못된 형식입니다.' }),
    password: z.string().min(6, { message: '6글자 이상을 입력해 주세요.' }),
    firstName: z.string().min(1, { message: '이름은 필수입니다.' }),
    lastName: z.string().min(1, { message: '성은 필수입니다.' }),
    phone: z.string().min(1, { message: '연락처는 필수 항목입니다.' }),
    address: z.string().min(1, { message: '주소는 필수 항목입니다.' }),
    bloodType: z.string().min(1, { message: '혈액형은 필수 항목입니다.' }),
    birthday: z.date({ message: '생년월일은 선택 항목입니다.' }).optional(),
    sex: z.enum(['male', 'female'], { message: '성별은 필수입니다.!' }),
    img: z.instanceof(File, { message: '이미지를 등록해야 합니다.' }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
    type,
    data,
}: {
    type: 'create' | 'update';
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className='flex flex-col gap-8' onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>Create a new Teacher</h1>
            <span className='text-xs text-gray-400 font-medium'>
                Authentication Information
            </span>
            <div className='flex flex-wrap gap-4 justify-between'>
                <InputField
                    label={'Username'}
                    name={'username'}
                    register={register}
                    defaultValue={data?.username}
                    error={errors?.username}
                />
                <InputField
                    label={'Email'}
                    name={'email'}
                    type='email'
                    register={register}
                    defaultValue={data?.email}
                    error={errors?.email}
                />
                <InputField
                    label={'Password'}
                    name={'password'}
                    type='password'
                    register={register}
                    defaultValue={data?.password}
                    error={errors?.password}
                />
            </div>
            <span className='text-xs text-gray-400 font-medium'>
                Personal Information
            </span>
            <div className='flex flex-wrap gap-4 justify-between'>
                <InputField
                    label={'Phone'}
                    name={'phone'}
                    register={register}
                    defaultValue={data?.phone}
                    error={errors?.phone}
                />
                <InputField
                    label={'Address'}
                    name={'address'}
                    register={register}
                    defaultValue={data?.address}
                    error={errors?.address}
                />
                <InputField
                    label={'Blood Type'}
                    name={'bloodType'}
                    register={register}
                    defaultValue={data?.bloodType}
                    error={errors?.bloodType}
                />
                <InputField
                    label={'Birthday'}
                    name={'birthday'}
                    register={register}
                    defaultValue={data?.birthday}
                    error={errors?.birthday}
                    type='date'
                />
                {/* </div> */}
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label className='text-xs text-gray-500'>Sex</label>
                    <select
                        className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                        {...register('sex')}
                        defaultValue={data?.sex}
                    >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>

                    {errors.sex?.message && (
                        <p className='text-red-400 text-xs'>
                            {errors.sex.message.toString()}
                        </p>
                    )}
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
                    <label
                        className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
                        htmlFor='img'
                    >
                        <Image
                            src={'/upload.png'}
                            alt={''}
                            width={28}
                            height={28}
                        />
                        <span>파일을 올려주세요.</span>
                    </label>
                    <input
                        type='file'
                        id='img'
                        {...register('img')}
                        className='hidden'
                    />

                    {errors.img?.message && (
                        <p className='text-red-400 text-xs'>
                            {errors.img.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            <button className='bg-blue-400 text-white p-2 rounded-md'>
                {type === 'create' ? 'Create' : 'Update'}
            </button>
        </form>
    );
};

export default TeacherForm;
