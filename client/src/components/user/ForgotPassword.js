import { React, useState } from "react";
import { isEmail } from "../utils/Validation";
import { showErrMsg, showSuccessMsg } from "../utils/Notification";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const initialState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);
  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPass = async () => {
    if (!isEmail(email)) {
      return setData({ ...data, err: "Geçersiz Mail Adresi", success: "" });
    }
    try {
      const res = await axios.post("/user/forgot", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="flex flex-col align-center mt-8">
      <div className="mt-8 flex items-center flex-col m-4">
        <div
          className={
            err
              ? "bg-red-400 text-center font-medium text-xl"
              : "bg-green-500 w-1/2 text-center font-medium text-lg"
          }
        >
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>

        <label
          className="mt-4 text-xl"
          htmlFor="email"
        >
          E-Posta
        </label>
        <InputText
          id="email"
          name="email"
          value={email}
          type="email"
          className="md:w-1/2 mb-3 mt-2"
          placeholder="****@email.com"
          onChange={handleChangeInput}
        />
        <Button
          label="Şifre Sıfırlama Bağlantısını Gönder"
          icon="pi pi-user"
          className="md:w-1/2"
          onClick={forgotPass}
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
