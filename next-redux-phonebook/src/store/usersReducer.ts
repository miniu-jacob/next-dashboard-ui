import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Contact 인터페이스는 각 연락처의 구조를 정의한다.
export interface Contact {
    id: number;
    username: string;
    phone: string;
}

// ContactState 인터페이스는 Redux 상태에서 관리할 연락처 목록을 정의한다. 
// Contact 배열은 여러 개의 Contact 객체를 포함하게 된다.
interface ContactState {
    contactsList: Contact[];
}

// 초기 상태를 정의한다. 연락처가 없기 때문에 빈 배열로 시작한다. 
const initialState: ContactState = {
    contactsList: [],
}

// 슬라이스 이름 및 설정들 
const contactSlice = createSlice({
    // 슬라이스의 이름을 지정한다. 액션 타입을 만들 때 사용된다. 
    name: 'userInfo',
    initialState,
    reducers: {
        // 새로운 연락처를 추가하는 리듀서
        // PayloadAction은 액션의 payload 가 Contact 타입(위에서 정의한)임을 명시한다.
        addContact(state, action: PayloadAction<Contact>) {
            state.contactsList.push(action.payload)
        },
        // 특정 연락처를 삭제하는 리듀서 액션의 payload는 삭제할 연락처의 id 
        deleteContact(state, action: PayloadAction<number>) {
            // filter 함수를 사용해서 해당 id 를 가진 연락처를 배열에서 제거
            state.contactsList = state.contactsList.filter(contact => contact.id !== action.payload)
            // filter를 사용해서 action.payload 와 일치하는 contact.id 를 제외한 나머지를 state.contacts 배열에 넣는다.
        },
        // 특정 연락처를 수정하는 리듀서, 액션의 payload는 수정된 Contact 객체
        modifyContact(state, action: PayloadAction<Contact>) {
            const index = state.contactsList.findIndex(contact => contact.id === action.payload.id)
            if (index !== -1) {
                state.contactsList[index] = action.payload
            }
        },
    }
})

// 액션 생성자들을 export 한다. 
export const { addContact, deleteContact, modifyContact } = contactSlice.actions;
// contactSlice.reducer를 export 하여 Redux 스토어에 추가할 수 있게 된다.
// 이렇게 해야 contactSlice 의 상태를 스토어에서 관리할 수 있다. 
export default contactSlice.reducer;