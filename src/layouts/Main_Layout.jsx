import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "@/components/MainComps/Header";
import Footer from "@/components/MainComps/Footer";
import { loginUser } from "@/services/UsersApi";

const Main_Layout = () => {
  // Quick access buttons for development - can be removed in production
  const navigate = useNavigate();

  const handleClickLogin = async () => {
    const user = {
      email: "abdo33awd@gmail.com",
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
  const handleDoctorClickLogin = async () => {
    const doctor = {
      email: "tasneem@gmail.com",
      password: "123456789",
    };
    const response = await loginUser(doctor);
    console.log(response);
    const token = response.token;
    localStorage.setItem("token", token);

    if (token) {
      navigate(`/doctor`);
    } else {
      console.error("Login failed: No token received");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* Quick access buttons for development - can be removed in production */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md text-sm"
          onClick={handleClickLogin}
        >
          Admin Login
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md text-sm"
          onClick={handleDoctorClickLogin}
        >
          Doctor Login
        </button>
      </div>
    </div>
  );
};

export default Main_Layout;
