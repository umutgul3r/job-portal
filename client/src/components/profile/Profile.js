import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showErrMsg, showSuccessMsg } from ".././utils/Notification";
import { isLenght, isMatch } from ".././utils/Validation";
import { fetchAllUser, getUsers } from "../../redux/reducers/getAllUsers";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import Users from "./Users";
import ApplicationStatus from "./ApplicationStatus";
import Cv from "./Cv";

const initialState = {
  name: "",
  password: "",
  re_password: "",
  err: "",
  success: "",
};

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.getToken.token);
  const { user, isAdmin, isSeller } = auth;
  const [data, setData] = useState(initialState);
  const [profile, setProfile] = useState(false);
  const [cv, setCv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const { name, password, re_password, err, success } = data;
  const dispatch = useDispatch();
  const toast = useRef(null);

  const onUpload = () => {
    toast.current.show({
      severity: "success",
      detail: "Dosya Yüklendi",
    });
  };

  useEffect(() => {
    if (isAdmin) {
      return fetchAllUser(token).then((res) => {
        dispatch(getUsers(res));
      });
    }
  }, [token, isAdmin, callback, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeProfil = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)
        return setData({
          ...data,
          err: "Yüklenecek dosya bulunamadı",
          success: "",
        });
      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: "Dosya boyutu çok fazla", success: "" });
      }
      if (file.type !== "application/pdf" && file.type !== "image/jpeg") {
        return setData({ ...data, err: "Dosya Formatı Yanlış", success: "" });
      }

      let formData = new FormData();

      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload_profil", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      onUpload();
      setLoading(false);
      setProfile(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const changeCv = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)
        return setData({
          ...data,
          err: "Yüklenecek dosya bulunamadı",
          success: "",
        });
      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: "Dosya boyutu çok fazla", success: "" });
      }
      if (file.type !== "application/pdf" && file.type !== "image/jpeg") {
        return setData({ ...data, err: "Dosya Formatı Yanlış", success: "" });
      }

      let formData = new FormData();

      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload_profil", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setCv(res.data.url);
      onUpload();
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfo = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          profile: profile ? profile : user.profile,
          cv: cv ? cv : user.cv,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({
        ...data,
        err: "",
        success: "Güncellendi",
      });
      setInterval(() => {
        window.location.reload(true);
      }, 1000);
    } catch (err) {
      setData({
        ...data,
        err: err.response.data.msg,
        success: "",
      });
    }
  };

  const updatePassword = () => {
    if (isLenght(password)) {
      return setData({
        ...data,
        err: "Şifre en az 6 karakter olmalıdır",
        success: "",
      });
    }
    if (!isMatch(password, re_password)) {
      return setData({ ...data, err: "Şifreler eşleşmedi", success: "" });
    }
    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({
        ...data,
        err: err.response.data.msg,
        success: "",
      });
    }
  };

  const handleUpdate = () => {
    if (name || profile) updateInfo();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm("Silmek istediğinizden emin misiniz ?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <Toast ref={toast}></Toast>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && (
          <ProgressSpinner
            className="absolute left-[50%] top-[50%]"
            style={{ width: "100px", height: "100px" }}
            strokeWidth="8"
            animationDuration=".5s"
          />
        )}
      </div>
      <div className="lg:flex">
        <div className="p-2 ml-5 lg:w-1/3 md:1/4">
          <div className="flex">
            <div className="relative max-w-[250px]">
              <div className="absolute right-3 z-10 top-3">
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  name="file"
                  className="hidden"
                  onChange={changeProfil}
                />
                <label
                  className="inline-block w-[34px] pt-1 h-[34px] border border-sky-600 rounded-full bg-white cursor-pointer font-normal after:content-['\270E'] text-gray-500 absolute top-[-10px] right-[0] text-center m-auto"
                  htmlFor="imageUpload"
                />
              </div>
              <div className="w-[192px] h-[192px] relative rounded-full">
                <img
                  className="w-full h-full rounded-full bg-cover bg-no-repeat bg-center"
                  src={profile ? profile : user.profile}
                  id="imagePreview"
                  alt="Profil"
                ></img>
              </div>
            </div>
            <div>{!isAdmin && !isSeller && <Cv changeCv={changeCv} />}</div>
          </div>

          <div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="name">İsim Soyisim</label>
              <InputText
                type="text"
                className="lg:w-full w-3/4"
                name="name"
                id="name"
                defaultValue={user.name}
                placeholder="İsim"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">E-posta</label>
              <InputText
                type="email"
                name="email"
                id="email"
                placeholder="Mail Adresi"
                value={user.email}
                disabled
                className="lg:w-full w-3/4 mb-3 mt-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Şifre</label>
              <InputText
                type="password"
                name="password"
                className="lg:w-full w-3/4"
                id="password"
                placeholder="Şifren"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="re_password">Şifre</label>
              <InputText
                type="password"
                className="lg:w-full w-3/4"
                name="re_password"
                id="re_password"
                placeholder="Tekrar şifre"
                value={re_password}
                onChange={handleChange}
              />
            </div>
            <Button
              label="Kaydet"
              className="ml-1 mt-4"
              disabled={loading}
              onClick={handleUpdate}
            />
          </div>
        </div>
        {!isSeller && isAdmin ? (
          <Users handleDelete={handleDelete} />
        ) : (
          <div className=" ml-2 mt-8 flex">
            <ApplicationStatus />
          </div>
        )}
      </div>
    </>
  );
}
