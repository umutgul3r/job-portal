import React, { useEffect, useState } from "react";
import { showErrMsg, showSuccessMsg } from "../utils/Notification";

import axios from "axios";
import { useParams } from "react-router-dom";

export default function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState();
  const [success, setSucces] = useState();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSucces(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="mb-2 bg-green-600 sm:w-1/2 p-4 text-center text-white uppercase mx-auto">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
}
