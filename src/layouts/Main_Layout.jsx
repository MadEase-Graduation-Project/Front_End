import { loginUser } from "@/services/UsersApi";
import { Outlet, useNavigate } from "react-router-dom";

const Main_Layout = () => {
  const navigate = useNavigate();
  const handleClickLogin = async () => {
    const user = {
      email: "kh@yahoo.com",
      password: "123456789",
    };
    const response = await loginUser(user);
    console.log(response);
    const token = response.token;
    localStorage.setItem("token", token);

    if (token) {
      navigate(`/admin`);
    } else {
      console.error("Login failed: No token received");
    }
  };
  return (
    <div>
      <div>ana el main layout ya wald</div>
      <Outlet />
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleClickLogin}
      >
        Login for admin
      </button>
    </div>
  );
};

export default Main_Layout;
