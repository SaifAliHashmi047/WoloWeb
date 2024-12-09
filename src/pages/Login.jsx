import React, { useEffect, useState } from "react";
import colors from "../colors";
import { callApi } from "../Api/CallAPI";
import { api } from "../Api/Enviornment";
import { store } from "../redux/store";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setUserLogin } from "../redux/userDataSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import the eye icons
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import LoadingModal from "../components/LoadingModal";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const socialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (localStorage.getItem("userLoggedIN")) {
      navigate("/");
    }
  }, []);
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const postLogin = async (email, password, userType) => {
    const timeStamp1 = Date.now();
    const timeStamp2 = Date.now();
    localStorage.setItem("timeStamp1", timeStamp1);
    localStorage.setItem("timeStamp2", timeStamp2);
    const loginData = {
      email: String(email).trim().toLowerCase(),
      role: "Tutor",
      password: password,
      device: {
        id: timeStamp1,
        deviceToken: timeStamp2,
      },
    };
    const response = await callApi(
      api?.login,
      "POST",
      loginData,
      store?.getState()?.userDataSlice?.accessToken
    );
    return response;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Basic validation
    if (!form.email) {
      return alert("Email is required!");
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return alert("Please enter a valid email address!");
    }
    if (!form.password) {
      return alert("Password is required!");
    }

    try {
      setLoadingLocal(true);
      const response = await postLogin(form.email, form.password, "Tutor");

      if (response !== undefined) {
        if (response?.status === 201 || response?.status === 200) {
          dispatch(setUserData(response?.data?.user));
          dispatch(setUserLogin(true));

          console?.log(
            "-------_-__-_--_---------->",
            JSON?.stringify(response?.data?.refreshToken, null, 2)
          );
          localStorage.setItem("userLoggedIN", true);
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.data?.user)
          );
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response?.data?.token)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response?.data?.refreshToken)
          );

          navigate("/");
        } else {
          if (response?.errorType == "wrong-password") {
            alert("Incorrect email or password");
          }
        }
      }
    } catch (error) {
      console.log("Login Error:", error);
      setLoadingLocal(false);
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const callSocialLoginAPI = async (data) => {
    setIsLoading(true);
    const timeStamp1 = Date.now();
    const timeStamp2 = Date.now();
    localStorage.setItem("timeStamp1", timeStamp1);
    localStorage.setItem("timeStamp2", timeStamp2);
    const socailLoginData = {
      email: data?.email,
      role: "Tutor",
      isWeb: true,
      name: data?.name,
      device: {
        id: timeStamp1,
        deviceToken: timeStamp2,
      },
    };
    try {
      console.log("socailLoginData => ", socailLoginData);
      const response = await callApi(api?.socialLogin, "POST", socailLoginData);
      if (response !== undefined) {
        if (response?.status === 201 || response?.status === 200) {
          dispatch(setUserData(response?.data?.user));
          dispatch(setUserLogin(true));

          console?.log(
            "-------_-__-_--_---------->",
            JSON?.stringify(response?.data?.refreshToken, null, 2)
          );
          localStorage.setItem("userLoggedIN", true);
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.data?.user)
          );
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response?.data?.token)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(response?.data?.refreshToken)
          );
          setIsLoading(false);
          navigate("/");
        } else {
          if (response?.errorType == "wrong-password") {
            alert("Incorrect email");
            setIsLoading(false);
          } else if (response?.errorType == "user-not-found") {
            alert(response?.message);
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console?.log("-----_-__-------_>", error);
      setIsLoading(false);
    } finally {
      setLoadingLocal(false);
      setIsLoading(false);
      console?.log("-----_-__-------_>");
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console?.log("-------->>>", res?.data);
          setProfile(res.data);
          callSocialLoginAPI(res?.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4 w-full min-h-fit flex flex-col items-center pb-24">
      <div
        className="p-10  mt-20 rounded-xl shadow-xl w-full max-w-md "
        style={{
          backgroundColor: colors.white,
        }}
      >
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: colors.primary }}
        >
          Welcome Back
        </h2>
        <form className="space-y-6 z-20" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full p-3 border rounded-full focus:outline-none"
            style={{
              borderColor: colors.lightGrey,
              color: colors.darkBlack,
            }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="w-full p-3 border rounded-full focus:outline-none"
              style={{
                borderColor: colors.lightGrey,
                color: colors.darkBlack,
              }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-3 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </button>
          </div>
          {!loadingLocal && (
            <button
              type="submit"
              className="w-full p-3 rounded-full font-semibold transition duration-200"
              style={{
                backgroundColor: colors.secondary,
                color: colors.white,
              }}
            >
              Login
            </button>
          )}
          {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
          <div className="w-full flex justify-center">
            <TailSpin
              visible={loadingLocal}
              height="30"
              width="30"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </form>
        <button
          className="w-full p-3 rounded-full font-semibold transition duration-200 flex flex-row justify-center items-center border-grey border-2"
          onClick={socialLogin}
        >
          {" "}
          <img
            style={{
              backgroundSize: "cover", // Or "contain" based on your preference
              backgroundPosition: "center",
            }}
            src={"/img/GooglePay.png"}
            className="h-6 w-6 mx-4"
          />
          Sign in with Google{" "}
        </button>
      </div>
      <LoadingModal isLoading={isLoading} />
    </div>
  );
};

export default Login;
