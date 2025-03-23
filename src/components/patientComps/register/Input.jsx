
const Input = ({placeholder}) => (
    <input
        placeholder={placeholder}
        className='w-full h-[20px] lg:h-[40px] rounded-[5px] bg-menavyoff px-4
        border border-menavyoff focus:ring-2 focus:ring-mepale outline-none
        placeholder-gray-500 placeholder:text-sm md:placeholder:text-md lg:placeholder:text-lg'
    />
);

export default Input

//Lighter Gray: placeholder-gray-300
// Darker Gray: placeholder-gray-500