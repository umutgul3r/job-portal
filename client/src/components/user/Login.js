import "react-toastify/dist/ReactToastify.css";

import { showErrMsg, showSuccessMsg } from "../utils/Notification";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { GoogleLogin } from "react-google-login";
import { InputText } from "primereact/inputtext";
import JobImg from "../../assets/job.jpg";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import { login } from "../../redux/reducers/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialState = {
  email: " ",
  password: "",
  err: "",
  success: "",
};

export default function Login() {
  const [checked, setChecked] = useState("");
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const notify = () => {
    toast.success("Giriş Başarılı", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      notify();
      dispatch(login(user));
      navigate("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      console.log("çalıştı");
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      notify();
      dispatch(login());
      navigate("/");
    } catch (err) {
      console.log("hata oluştu");
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="flex justify-center h-screen mx-1 lg:mx-8 ">
      <div className="w-[50%] h-screen hidden lg:flex">
        <img
          src={JobImg}
          className="w-full h-full "
          alt="jobImg"
        />
      </div>

      <div className="lg:w-[50%] md:w-full w-full">
        <form
          className="flex flex-col w-full justify-center lg:px-2 lg:mx-5 h-full"
          onSubmit={handleSubmit}
        >
          <div className="flex align-center justify-center">
            <div className="h-full p-4 w-full ">
              <div className="text-center mb-7">
                <div className="text-3xl font-medium mb-3">Hoşgeldiniz</div>

                <span className="font-medium line-height-3">
                  Henüz hesabın yok mu?
                </span>
                <Link
                  to="/register"
                  className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                >
                  Bugün oluştur!
                </Link>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block  font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  id="email"
                  name="email"
                  type="text"
                  className="w-full mb-3"
                  onChange={(e) => handleChangeInput(e)}
                />
                <div
                  className={
                    err
                      ? "bg-red-400 text-center font-medium text-xl"
                      : "bg-green-500  text-center font-medium text-xl"
                  }
                >
                  {err && showErrMsg(err)}
                  {success && showSuccessMsg(success)}
                </div>
                <label
                  htmlFor="password"
                  className="block text-900 font-medium mb-2"
                >
                  Password
                </label>
                <InputText
                  name="password"
                  id="password"
                  type="password"
                  className="w-full mb-3"
                  onChange={(e) => handleChangeInput(e)}
                />

                <div className="flex align-center justify-between mb-6">
                  <div className="flex align-center">
                    <Checkbox
                      id="rememberme"
                      onChange={(e) => setChecked(e.checked)}
                      checked={checked}
                      binary
                      className="mr-2"
                    />
                    <label htmlFor="rememberme">Beni Hatırla</label>
                  </div>
                  <Link
                    to="/forgot_password"
                    className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                  >
                    Şifremi Unuttum ?
                  </Link>
                </div>

                <Button
                  label="Giriş Yap"
                  icon="pi pi-user"
                  className="w-full bg-blue-400"
                  type="submit"
                />
                <div className="social">
                  <GoogleLogin
                    className="w-full mt-3 text-center"
                    clientId="431083699368-bba3lva5o2dl6mf4aikuk778lrk9h8fj.apps.googleusercontent.com"
                    buttonText="Giriş Yap"
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
