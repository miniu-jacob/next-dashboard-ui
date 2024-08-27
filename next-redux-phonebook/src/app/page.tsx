import ContactInput from '@/components/ContactInput';
import ContactList from '@/components/ContactList';
import Image from 'next/image';

// border-[15px] border-blue-200
export default function Home() {
    return (
        <div className='flex justify-center bg-gray-200 min-h-screen'>
            <div
                className='flex flex-col m-8 outline-border items-center rounded-xl
                w-[80%] md:w-[70%] min-h-[80%] max-w-[600px] max-h-[800px]
                bg-white p-3  overflow-auto shadow-lg shadow-gray-300'
            >
                <div className='w-full bg-white h-full p-4  '>
                    <h1 className='text-2xl font-semibold text-center'>
                        연락처 앱
                    </h1>
                    {/* LEFT */}
                    <div className='flex flex-col md:flex-row w-full mt-4 gap-2'>
                        <div className='flex-1  bg-white'>
                            <ContactInput />
                        </div>

                        {/* RIGHT */}
                        <div className='flex-1 border border-gray-100 max-w-sm mt-2 md:mt-0'>
                            <ContactList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
