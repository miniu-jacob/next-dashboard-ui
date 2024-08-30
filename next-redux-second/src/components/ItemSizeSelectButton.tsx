import * as React from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function ItemSizeSelectButton() {
    return (
        <Select>
            <SelectTrigger
                className='w-[180px] bg-blue-400 font-semibold text-white 
                pl-4 ring-0 focus:ring-0
                
            '
            >
                <SelectValue placeholder='사이즈를 선택하세요' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='none'>사이즈 선택 (없음)</SelectItem>
                    <SelectItem value='large'>Large [L]</SelectItem>
                    <SelectItem value='medium'>Medium [M]</SelectItem>
                    <SelectItem value='small'>Small [S]</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
