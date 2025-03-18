import TextTitle from '../TextTitle';
import Input from './Input';
import HalfBodyLogin from './HalfBodyLogin';
import HalfBodySign from './HalfBodySign';

const Body = ({ state }) => (
    <div className="flex flex-col w-full gap-[5px]">
        {state === "Sign Up" ?
            <div className='flex gap-[12px] '>
                <div className='flex flex-col w-1/2 gap-[5px]'>
                    <TextTitle text="First name" />
                    <Input />
                </div>
                <div className='flex flex-col w-1/2 gap-[5px]'>
                    <TextTitle text="Second name" />
                    <Input />
                </div>
            </div>
            : <div></div>
        }
        <TextTitle text="E-mail" />
        <Input placeholder="mail@address.com" />
        <TextTitle text="Password" />
        <Input placeholder="enter your password" />
        {state === "Sign Up" ? <HalfBodySign /> : <HalfBodyLogin />}
    </div>
);
export default Body