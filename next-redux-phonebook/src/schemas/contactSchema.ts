import * as z from 'zod';

export const ContactSchema = z.object({
    username: z
        .string()
        .min(3, { message: '3글자 이상을 입력해 주세요' })
        .max(20, { message: '20글자 이상은 사용할 수 없습니다.' }),
    phone: z
        .string()
        .min(1, { message: '연락처 정보는 필수 항목입니다.' })
        .max(20, { message: '올바른 형식이 아닙니다.' }),
});

export type ContactFormInputs = z.infer<typeof ContactSchema>;