import { Rating } from 'primereact/rating'

const DocInfo = ({ name, prof, desc }) => {
    return (
        <div className='flex flex-col h-full gap-2 justify-center items-center xl:items-start p-2'>
            <div className={'flex flex-col gap-0 justify-center items-center sm:items-start'}>
                <p className='font-jost font-bold w-2/3 xs:w-full text-menavy text-xs sm:text-sm lg:text-lg xl:text-xl'>
                    {name}
                </p>
                <p className='font-jost font-light text-[8px] sm:text-xs xl:text-sm text-mepale'>
                    {prof}
                </p>
                <Rating value={5} readOnly cancel={false} className='text-meyellow py-2 sm:py-0' />
            </div>
            <p className='hidden xl:block font-jost font-light xl:text-xs text-menavy  '>
                {desc}
            </p>
        </div>
    );
}

export default DocInfo