import { useState } from "react";
import Swal from "sweetalert2";
import { useStore } from "../modules/store";
import { login } from "../fetching/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((state) => state.setUser);

  async function handleLogin() {
    try {
      const { id, access_token, role } = await login({ email, password });
      Swal.fire({
        title: "Login Success",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setUser({ id, email, password, access_token, role });
      location.href = "/";
    } catch (error) {
      Swal.fire({
        title: "Login Fail",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen h-14 bg-gradient-to-r from-black to-navy">
      <div className="flex items-center justify-center w-full h-full">
        <div className="relative bg-white rounded-lg w-[90%] max-w-[500px] p-8">
          {/* left side */}
          <div className="flex flex-col justify-center mb-8">
            <span className="mx-auto py-2 text-4xl font-bold text-black">
              Login
            </span>
            <div className="py-4">
              <span className="mb-2 text-lg">Email</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500 focus:outline-none focus:border-navy"
                name="email"
                id="email"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-lg">Password</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder-font-light placeholder-text-gray-500 focus:outline-none focus:border-navy"
              />
            </div>
            <button
              onClick={() => handleLogin()}
              className="w-full bg-navy text-white p-3 rounded-lg mb-6 hover:bg-black hover:text-white hover:border hover:border-gray-300 transition duration-300 ease-in-out"
            >
              Sign in
            </button>
            <div className="text-center text-gray-400">
              Dont have an account?
              
              <a href="api/auth/register"><span className="font-semibold text-navy"> Sign up here</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
