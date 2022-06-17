import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utils/Notification";
import { isEmpty, isEmail, isLenght, isMatch } from "../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";

const initialState = {
  name: "",
  email: " ",
  password: "",
  re_password: "",
  err: "",
  success: "",
};

export default function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, password, re_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Lütfen Tüm Alanları Doldurun",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLenght(password))
      return setUser({ ...user, err: "Şifre En Az 6 Karakter Olmalıdır" });

    if (!isMatch(password, re_password))
      return setUser({ ...user, err: "Şifreler Eşleşmiyor" });

    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const header = <h6>Şifrenizi girin</h6>;
  const footer = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul
        className="pl-2 ml-2 mt-0"
        style={{ lineHeight: "1.5" }}
      >
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <>
      <div className="flex flex-col h-screen mt-12">
        <div className=" mb-4 bg-green-400 mx-auto sm:w-1/4 w-4/5 p-4 text-center text-white uppercase">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>

        <form
          className="h-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="div flex flex-col ">
            <label htmlFor="name">Ad-Soyad</label>
            <InputText
              className="mt-2"
              value={name}
              type="text"
              name="name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="div flex flex-col mt-4">
            <label htmlFor="email">E-Posta</label>
            <InputText
              className="mt-2"
              value={email}
              name="email"
              onChange={handleChangeInput}
            />
          </div>
          <div className="div flex flex-col mt-4">
            <label htmlFor="password">Şifre</label>
            <Password
              name="password"
              className="mt-2"
              inputClassName="w-full"
              onChange={handleChangeInput}
              header={header}
              footer={footer}
            />
          </div>
          <div className="div flex flex-col mt-4">
            <label htmlFor="re_password">Tekrar Şifre</label>

            <Password
              name="re_password"
              inputClassName="w-full"
              className="mt-2 w-full !important"
              onChange={handleChangeInput}
            />
          </div>

          <div className="flex flex-col div">
            <Button
              className="mt-4 mb-2 w-full bg-blue-500"
              label="Kayıt Ol"
              icon="pi pi-user"
              type="submit"
            />
            <span className="font-medium">Zaten hesabın var mı?</span>
            <Link
              to="/login"
              className="font-medium no-underline text-blue-500 cursor-pointer"
            >
              Giriş yap
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
