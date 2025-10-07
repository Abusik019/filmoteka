import Image from 'next/image'

export default function SearchInput() {
    return (
        <div className='w-full border-b-2 border-[#66FCF0] p-3 box-border flex items-center justify-between'>
            <input 
                type="text"
                className='w-[calc(100%-60px)] border-none outline-none appearance-none'
                placeholder='Название фильма'
            />
            <button className='cursor-pointer'>
                <Image src="/icons/search.svg" width={24} height={24} alt='search' className='transition-all hover:drop-shadow-[0_0_6px_#66FCF0]'/>
            </button>
        </div>
    )
}
