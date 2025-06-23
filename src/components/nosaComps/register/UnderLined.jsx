
const UnderLined = ({ text, onClick }) => (
    <span
        className='text-mepale font-jost font-light text-base decoration-auto cursor-pointer 
        hover:underline hover:decoration-[1px] hover:underline-offset-4 whitespace-nowrap'
        onClick={onClick}
    >
        {text}
    </span>
);
export default UnderLined