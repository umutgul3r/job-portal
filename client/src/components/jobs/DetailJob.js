import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import moment from "moment";
import { productDetailFetch } from "../../redux/reducers/productSlice";

function DetailJob() {
  const itemDetail = useSelector((state) => state.products.itemDetail);
  const token = useSelector((state) => state.getToken.token);
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogged, isEmployee } = auth;

  const is = (element) => element.postUser === user.name;

  const isApply = itemDetail.applications?.some(is);
  const isAccept = itemDetail.accepted?.some(is);

  const postUser = user.name;
  const post_id = user._id;
  const cv = user.cv;
  const job_id = itemDetail._id;
  const job_title = itemDetail.title;
  const { items } = useSelector((state) => state.products);
  const similarJobs = items.filter(
    (item) => item?.category === itemDetail?.category
  );

  const similarJobsSlice = similarJobs.slice(0, 6);

  useEffect(() => {
    dispatch(productDetailFetch(params.id));
  }, [dispatch, params.id]);

  const handleSubmit = async () => {
    if (!isLogged) {
      alert("Lütfen giriş yapınız");
    } else {
      try {
        await axios.post(
          `/api/job-apply/${itemDetail._id}`,
          { job_id, postUser, cv, job_title, post_id },
          {
            headers: { Authorization: token },
          }
        );
        setTimeout(() => {
          navigate("/profile");
        }, 2200);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
    showSuccess();
  };
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Başvuru Başarılı , Yönlendiriliyorsunuz",
      life: 2000,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col  gap-4 p-12 text-[20px]">
        <Toast ref={toast} />
        <div className="md:w-2/5 my-1  p-8 mb-16 bg-white text-gray-300 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h2 className="font-bold">{itemDetail?.title}</h2>
          </div>
          <p className="elisp">{itemDetail?.description}</p>
          <p className="font-bold">İşveren: {itemDetail?.employerName}</p>
          <p>Ücret : {itemDetail?.salary}</p>
          <div className="mt-1">
            İlan Tarihi {moment(itemDetail?.createdAt).format("YYYY-MM-DD")}
          </div>
          {isEmployee && (
            <div className="">
              {!isApply && !isAccept && (
                <Button
                  className="w-[100px]"
                  onClick={() => handleSubmit()}
                >
                  Başvur
                </Button>
              )}
            </div>
          )}
        </div>

        <div>
          <h5 className="text-center mb-10 uppercase">
            İlgini Çekebilecek Benzer İşler
          </h5>
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-4">
            {similarJobsSlice?.map((item) => (
              <div
                key={item._id}
                className="flex flex-col p-8 text-[20px] h-[200px] bg-white text-gray-300 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <h2 className="mb-4 font-bold">{item?.title}</h2>
                <p className="elisp w-[140px]">{item?.description}</p>
                <div className="font-bold">İşveren: {item?.employerName}</div>
                <p>{item?.salary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailJob;
