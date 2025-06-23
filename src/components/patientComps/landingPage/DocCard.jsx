import DocInfo from "./DocInfo";
const DocCard = ({ pic, name_, prof_, desc_ }) => {
    return (
        <div className='flex flex-col sm:flex-row w-full bg-white h-32 sm:h-28 md:h-40 lg:h-52 xl:h-64 col-span-4 
                        items-center sm:items-end gap-0 sm:gap-2 justify-center  rounded-[10px]'>
            <img src={pic} className='h-[calc(100%+5px)] md:h-[calc(100%+10px)] xl:h-[calc(100%+40px)]' />
            <DocInfo
                name={name_}
                prof={prof_}
                desc={desc_}
            />
        </div>

    );
}
export default DocCard