import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import decorImage from "../../assets/Decor.png";  // Adjust the path based on your folder structure


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true } // enable sending/receiving cookies
      );
      console.log("From Login: ", response.data);
      navigate("/main");
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegister = async ({ email, username, password }) => {
    if (email.length < 1 || username.length < 1 || password.length < 1) {
      alert("Invalid info");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        {
          email,
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log("From Register: ", response.data);
      if (response.status !== 201) {
        console.log("Register failed");
        return;
      }
      navigate("/main");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center min-h-screen p-5">
      <div className="flex w-full max-w-4xl h-[600px] border-3 border-lime rounded-[30px] backdrop-blur-lg overflow-hidden">
        <div className="flex items-center justify-center flex-col w-[51%] bg-lime-400 backdrop-blur-lg rounded-r-[30%] transition-all duration-150">
          <div className="relative">
            <img src={decorImage} className="w-[400px]" alt="Decor" />
          </div>
        </div>

        <div className="relative w-[49%] p-5 overflow-hidden">
          <div className="flex justify-center gap-3 mt-8">
            <button
              className={`font-medium py-2 px-6 rounded-full ${
                isLogin ? "bg-lime-400 text-white" : "bg-black text-white"
              } shadow-md hover:opacity-85 transition duration-200`}
              onClick={toggleForm}
            >
              Login
            </button>
            <button
              className={`font-medium py-2 px-6 rounded-full ${
                !isLogin ? "bg-lime-400 text-white" : "bg-black text-white"
              } shadow-md hover:opacity-85 transition duration-200`}
              onClick={toggleForm}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Register onRegister={handleRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
