import { FieldError } from 'react-hook-form';

type InputFieldProps = {
    label: string; // 필드의 라벨 (이름, 연락처 등)
    type?: string; // 입력 타입(ex: text, email, password)
    register: any; // react-hook-form의 register 함수
    name: string; // 필드의 이름(ex: username, phone..)
    defaultValue: string; // 필드의 기본값
    error?: FieldError; // 필드에 발생한 에러 메시지

    // placeholder 등 추가적인 속성을 전달할 수 있는 Props
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
    label,
    type = 'text',
    name,
    register,
    defaultValue,
    error,
    inputProps,
}: InputFieldProps) => {
    return (
        <div className='flex flex-col gap-2 w-full '>
            <label className='text-md text-gray-500'>{label}</label>
            <input
                type={type}
                // 스프레드 연산자를 사용하였다.
                // 'register' 함수가 반환하는 모든 속성을 input 요소에 적용한다.
                {...register(name)}
                className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                // inputProps를 통해 placeholder 등 속성을 전달할 수 있다.
                // 사용법: inputProps={{ placeholder: '내용 입력' }}
                {...inputProps}
                defaultValue={defaultValue}
            />
            {error?.message && (
                <p className='text-red-400 text-sm'>
                    {error.message.toString()}
                </p>
            )}
        </div>
    );
};

export default InputField;
