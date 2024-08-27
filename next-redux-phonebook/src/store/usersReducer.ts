import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Contact 인터페이스 정의
interface Contact {
    id: number;
    username: string;
    phone: string;
}

// 연락처 목록 정의
interface ContactState {
    contactsList: Contact[];
}

// 초기 상태 정의
const initialState: ContactState = {
    contactsList: [],
}

// 슬라이스 이름 및 설정들 
const contactSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        addContact(state, action: PayloadAction<Contact>) {
            state.contactsList.push(action.payload)
        },
        deleteContact(state, action: PayloadAction<number>) {
            state.contactsList = state.contactsList.filter(contact => contact.id !== action.payload)
        },
        modifyContact(state, action: PayloadAction<Contact>) {
            const index = state.contactsList.findIndex(contact => contact.id === action.payload.id)
            if (index !== -1) {
                state.contactsList[index] = action.payload
            }
        },
    }
})

export const { addContact, deleteContact, modifyContact } = contactSlice.actions;
export default contactSlice.reducer;