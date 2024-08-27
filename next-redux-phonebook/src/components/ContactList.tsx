'use client';
import { RootState } from '@/store/store';
import { Contact, deleteContact, modifyContact } from '@/store/usersReducer';
import { Pencil, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import EditContactModal from './EditContactModal';
import { useState } from 'react';
import { isContext } from 'vm';

const ContactList = () => {
    const dispatch = useDispatch();
    const userList = useSelector(
        (state: RootState) => state.userInfo.contactsList,
    );
    // console.log('aaa', userList);

    // 모달 상태 관리를 위한 contact 및 모달의 열림/닫힘 제어
    const [selectedContact, setSelectedContact] = useState<Contact | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 삭제할 handleDelete 함수 실행
    const handleDelete = (id: number) => {
        // dispatch를 사용할 것이기 때문에 useDispatch를 불러온다.
        // dispatch 를 사용하기 전에 컴포넌트 내부에 상단에 dispatch를 설정해 준다.
        dispatch(deleteContact(id));
    };

    // Edit 버튼을 눌렀을 때 처리
    const handleEdit = (contact: Contact) => {
        console.log('수정 버튼 눌림: ', contact);
        setSelectedContact(contact);
        setIsModalOpen(true);
        console.log('isModalOpen 상태: ', isModalOpen);
    };

    return (
        <div className='flex flex-col gap-2 '>
            <div className='w-full max-w-md flex bg-orange-100 h-12 justify-between items-center px-4 '>
                <h2 className='text-lg font-semibold'>이름</h2>
                <span className='text-md'>연락처 (모바일)</span>
            </div>
            {userList.map((contact) => (
                <div
                    key={contact.id}
                    className='w-full max-w-md flex bg-gray-100 h-12 rounded-xl justify-between items-center px-2 '
                >
                    <h2 className='text-md'>{contact.username}</h2>
                    <span className='text-md'>{contact.phone}</span>
                    <div className='flex gap-2'>
                        <div
                            className='bg-blue-300 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
                            onClick={() => handleEdit(contact)}
                        >
                            <Pencil className='size-4' />
                        </div>
                        <div className='bg-red-300 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'>
                            <Trash2
                                className='size-4'
                                onClick={() => handleDelete(contact.id)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            {isModalOpen && selectedContact && (
                <EditContactModal
                    contact={selectedContact}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ContactList;
