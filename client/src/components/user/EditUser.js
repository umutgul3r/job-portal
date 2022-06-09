import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import change from "../../assets/icons/changes.png";
import { showErrMsg } from "../utils/Notification";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState([]);

  const users = useSelector((state) => state.getAllUsers.user);
  const token = useSelector((state) => state.getToken.token);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [err, setErr] = useState(false);
  const [num, setNum] = useState(0);

  const notify = () => {
    toast.success("Güncelleme Başarılı", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 2 ? true : false);
        }
      });
    } else {
      navigate("/profile");
    }
  }, [users, id, navigate]);

  const handleUpdate = async () => {
    try {
      if (num % 2 !== 1) {
        await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 2 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );
        notify();
        navigate(-1);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const handleCheck = () => {
    setErr("");
    setCheckAdmin(!checkAdmin);
  };

  return (
    <div className="flex justify-center mt-8">
      <div>
        <div>
          <label htmlFor="name">Ad-Soyad</label>
          <InputText
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
            className="w-full mb-3 mt-2"
          />
        </div>

        <div>
          <label htmlFor="email">E-Posta</label>
          <InputText
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
            className="w-full mb-3 mt-2"
          />
        </div>
        <div>
          <p>{editUser.role === 2 ? "Rol : Satıcı" : "Rol : Müşteri"}</p>
          <img
            className="h-10 w-10 cursor-pointer relative"
            onClick={handleCheck}
            src={change}
            alt=""
          />
          <span className="ml-2">Değiştir</span>
        </div>
        <Button
          label="Kaydet"
          className="w-full mt-4"
          onClick={handleUpdate}
        />
        {err && showErrMsg(err)}
      </div>
    </div>
  );
}

export default EditUser;
