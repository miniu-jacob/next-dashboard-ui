'use client';
import { RootState } from '@/store/store';
import { Contact, deleteContact, modifyContact } from '@/store/usersReducer';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import EditContactModal from './EditContactModal';
import { useEffect, useState } from 'react';
import { isContext } from 'vm';

const ContactList = () => {
    const dispatch = useDispatch();
    const userList = useSelector(
        (state: RootState) => state.userInfo.contactsList,
    );

    useEffect(() => {
        console.log('aaa', userList);
        const filtered = userList.filter((contact) =>
            contact.username
                .toLowerCase()
                .includes(searchContact.toLowerCase()),
        );
        setFilteredContacts(filtered);
    }, [userList]);

    // 모달 상태 관리를 위한 contact 및 모달의 열림/닫힘 제어
    const [selectedContact, setSelectedContact] = useState<Contact | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 검색어를 관리할 상태 추가
    const [searchContact, setSearchContact] = useState('');

    // 필터링된 연락처 상태
    const [filteredContacts, setFilteredContacts] =
        useState<Contact[]>(userList);

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

    // 찾기 버튼 눌렀을 때 처리
    // 기존에는 filteredContacts 를 만들어 처리했다면 이제는 이를 통째로 handleSearch 함수에 넣었다.
    // 다음으로 filteredContact 정보를 저장할 filteredContacts 에 넣는다. > setFilteredContacts
    const handleSearch = () => {
        const filtered = userList.filter((contact) =>
            contact.username
                .toLowerCase()
                .includes(searchContact.toLowerCase()),
        );
        setFilteredContacts(filtered);
    };

    // 검색어에 따라 연락처 목록 필터링
    // 위에서 userList 콘솔로 확인

    return (
        <div className='flex flex-col gap-2 '>
            <div
                className='w-full max-w-md flex bg-white h-full justify-between items-center 
                gap-4 rounded-sm 
            px-2 py-2 '
            >
                <Search className='w-8 h-8' />
                <input
                    type='text'
                    className='w-full h-8 border-b border-gray-300 focus:bg-slate-100
                    focus:border-gray-100 focus:outline-gray-200'
                    onChange={(e) => setSearchContact(e.target.value)}
                    value={searchContact}
                    placeholder='검색어를 입력하세요'
                />

                <div>
                    <button
                        className='bg-blue-400 w-12 h-8 rounded-md text-white'
                        onClick={handleSearch}
                    >
                        찾기
                    </button>
                </div>
            </div>
            <div className='w-full max-w-md flex bg-orange-100 h-12 justify-between items-center px-4 '>
                <h2 className='text-lg font-semibold'>이름</h2>
                <span className='text-md'>연락처 (모바일)</span>
            </div>
            {filteredContacts.map((contact) => (
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
