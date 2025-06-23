
const ServicesCard = ({pic,title,desc,className=""}) => {
    return (
        <div className={`flex w-full p-4 md:p-10 md:px-20 gap-4 sm:gap-16 lg:gap-24 xl:gap-32 ${className}`}>
            <img className='w-[120px] sm:[200px] md:w-[300px] lg:w-[400px] xl:w-[400px] h-auto rounded-[10px]'
                src={pic}
            />
            <div className='flex flex-col gap-0 xs:gap-2 md:gap-5 items-start justify-center '>
                <p className='font-jost font-bold text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-menavy'>
                    {title}
                </p>
                <p className='font font-jost text-[8px] xs:text-base md:text-xl lg:text-2xl xl:text-3xl text-menavy break-words'>
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default ServicesCard