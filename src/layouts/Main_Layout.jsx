import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";
import { loginUser } from "@/services/usersApi";

const Main_Layout = () => {
  // Quick access buttons for development - can be removed in production
  const navigate = useNavigate();

  // function setTokenCookie(token) {
  //   const maxAge = 60 * 15; // 15 minutes
  //   document.cookie = `accessToken=${token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
  // }

  const handleClickLogin = async () => {
    const user = {
      email: "abdo33awd@gmail.com",
      password: "123456789",
    };
    try {
      const data = await loginUser(user);
      console.log(data);

      // setTokenCookie(data.accessToken);

      navigate("/admin/setting");
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleDoctorClickLogin = async () => {};

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

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
