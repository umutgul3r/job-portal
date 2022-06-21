import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { jobsFetch } from "../../redux/reducers/productSlice";
import { productDetailFetch } from "../../redux/reducers/productSlice";
import { toast } from "react-toastify";

function CreateProduct() {
  const auth = useSelector((state) => state.auth);
  const itemDetail = useSelector((state) => state.products.itemDetail);
  console.log(itemDetail);
  const { isAdmin, user, isEmployer } = auth;
  const initialState = {
    job_id: "",
    employer_id: user._id,
    employerName: user.name,
    title: "",
    description: "",
    category: "",
    maxApplicants: 10,
    skillsets: ["c#", "java"],
    salary: 5000,
  };
  const [product, setProduct] = useState(initialState);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.getToken.token);
  const navigate = useNavigate();
  const params = useParams();

  const [onEdit, setOnEdit] = useState(false);

  const onUpdateMessage = (message) => {
    toast.success(message, {
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
    if (params.id) {
      dispatch(productDetailFetch(params.id));
      setOnEdit(true);
    }
  }, [dispatch, params.id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin && !isEmployer) return alert("Yetkiniz yok");

      if (onEdit) {
        await axios.put(
          `/api/job/${itemDetail._id}`,
          { ...product },
          {
            headers: { Authorization: token },
          }
        );
        onUpdateMessage("İlan Başarı İle Güncellendi");
      } else {
        await axios.post(
          "/api/create-jobs",
          { ...product },
          {
            headers: { Authorization: token },
          }
        );
        onUpdateMessage("İlan Başarı İle Oluşturuldu");
      }
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
    dispatch(jobsFetch(""));
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-center">
      <form
        className="max-w-[500px] min-w-[290px] w-full my-4 mx-8"
        onSubmit={handleSubmit}
      >
        <div className="w-full my-4">
          <label htmlFor="job_id">Ürün ID</label>
          <InputText
            type="text"
            name="job_id"
            id="job_id"
            value={itemDetail.job_id}
            disabled={onEdit}
            className="w-full mb-3"
            onChange={handleChangeInput}
          />
        </div>
        <div className="">
          <input
            type="hidden"
            name="employerName"
            id="employerName"
            required
            value={user.name}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Başlık</label>
          <InputText
            type="text"
            name="title"
            id="title"
            required
            defaultValue={itemDetail.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Maaş</label>
        </div>
        <InputText
          className="w-full"
          type="number"
          name="salary"
          id="salary"
          defaultValue={itemDetail.salary}
          required
          onChange={handleChangeInput}
        />
        <div className="row">
          <label htmlFor="description">Açıklama</label>
          <InputTextarea
            type="text"
            name="description"
            className="w-full"
            id="description"
            defaultValue={itemDetail.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-2 mt-2">
          <label
            className="mr-4"
            htmlFor="description"
          >
            Kategori
          </label>
          <select
            name="category"
            defaultValue={itemDetail.category}
            onChange={handleChangeInput}
          >
            <option value="yazılım">Yazılım</option>
            <option value="genel">Genel</option>
            <option value="doktor">Doktor</option>
            <option value="hemsire">Hemsire</option>
            <option value="muhasebeci">Muhasebeci</option>
            <option value="boyaci">Boyacı</option>
            <option value="muhendis">Mühendis</option>
          </select>
        </div>

        <Button
          className="bg-blue-300"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          type="submit"
        >
          {onEdit ? "Güncelle" : "Ekle"}
        </Button>
      </form>
    </div>
  );
}

export default CreateProduct;
