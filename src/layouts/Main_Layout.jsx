import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { loginUser } from "@/services/signUserApi";
import { useDispatch } from "react-redux";
import { fetchAllPatients } from "@/store/slices/patientSlice";

const Main_Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLogin = async () => {
    const user = {
      email: "abdo33awd@gmail.com",
      password: "1234567",
    };
    try {
      const data = await loginUser(user);
      // For testing only: fetch patients after login and log them
      dispatch(fetchAllPatients()).then((res) => {
        console.log(res?.payload);
      });
      // navigate("/admin/setting");
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleDoctorClickLogin = async () => {};

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
