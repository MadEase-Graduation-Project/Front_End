import TextTitle from '../TextTitle';
import Input from './Input';
import HalfBodyLogin from './HalfBodyLogin';
import HalfBodySign from './HalfBodySign';

const Body = () => (
    <div className="flex flex-col w-full gap-[5px]">
        <TextTitle text="E-mail" />
        <Input placeholder="mail@address.com" />
        <TextTitle text="Password" />
        <Input placeholder="enter your password" />
    </div>
);
export default Body