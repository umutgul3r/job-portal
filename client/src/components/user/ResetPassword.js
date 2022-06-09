import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../utils/Notification";
import { isLenght, isMatch } from "../utils/Validation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const initialState = {
  password: "",
  re_password: "",
  err: "",
  success: "",
};

function ResetPassword() {
  const [data, setData] = useState(initialState);
  const { id } = useParams();

  const { password, re_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async () => {
    if (isLenght(password))
      return setData({
        ...data,
        err: "Şifre en az 6 karakter olmalı.",
        success: "",
      });

    if (!isMatch(password, re_password))
      return setData({ ...data, err: "Şifreler eşleşmedi.", success: "" });

    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: id },
        }
      );

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-12">
      <h2>ŞİFRENİ SIFIRLA</h2>

      <div className="flex flex-col w-full sm:w-1/2 gap-4">
        <div className="mb-2 bg-green-600 p-4 text-center text-white uppercase">
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>

        <label htmlFor="password">Şifre</label>
        <InputText
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />

        <label htmlFor="re_password">Tekrar Şifre</label>
        <InputText
          type="password"
          name="re_password"
          id="re_password"
          value={re_password}
          onChange={handleChangeInput}
        />

        <Button className="w-32" onClick={handleResetPass}>
          Şifreni Sıfırla
        </Button>
      </div>
    </div>
  );
}

export default ResetPassword;
