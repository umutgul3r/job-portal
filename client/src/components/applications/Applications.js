import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import fileDownload from "js-file-download";
import { Button } from "primereact/button";
import axios from "axios";
import {
  productDetailFetch,
  accepted,
} from "../../redux/reducers/productSlice";

export default function Applications() {
  const itemDetail = useSelector((state) => state.products.itemDetail);
  const application = itemDetail.applications;

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  let job_status = "red";

  const statusPost = async (job_status, job_title, userId) => {
    try {
      await axios.post(`/user/job-status/${userId}`, {
        job_status,
        job_title,
      });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const deleteComment = async (id, job_title, post_id) => {
    try {
      await axios.delete(`/api/job/application/${id}`);
    } catch (err) {
      alert(err.response.data.msg);
    }
    statusPost(job_status, job_title, post_id);
    navigate("/employes");
  };

  const deleteCommentWithout = async (id) => {
    try {
      await axios.delete(`/api/job/application/${id}`);
    } catch (err) {
      alert(err.response.data.msg);
    }
    navigate("/employes");
  };

  const handleClick = (job_id, postUser, cv, job_title, id, post_id) => {
    dispatch(accepted([job_id, postUser, cv, job_title]));
    let job_status = "kabul";

    deleteCommentWithout(id);
    statusPost(job_status, job_title, post_id);
    navigate("/");
  };

  useEffect(() => {
    dispatch(productDetailFetch(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg text-center mt-20 m-8">
      <h1 className="font-bold text-4xl">Başvurular</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3"
            >
              İsim
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Cv
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody>
          {application?.map((item) => (
            <tr
              key={item.id}
              className="bg-white dark:bg-gray-800"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap uppercase"
              >
                {item.postUser}
              </th>
              <td className="px-6 py-4">
                <Button
                  className="w-10 sm:w-1/5 h-10 text-sm"
                  onClick={() => {
                    handleDownload(item.cv, `${item.postUser}-cv.pdf`);
                  }}
                  label="Cv'yi indir"
                />

                <a
                  className="w-8 sm:w-1/4 h-10 p-button text-sm ml-2"
                  href={item.cv}
                >
                  Cv'yi Görüntüle
                </a>
              </td>
              <td className="px-6 py-4">
                <Button
                  className="mr-1 p-button-success"
                  label="Kabul Et"
                  onClick={() =>
                    handleClick(
                      item.job_id,
                      item.postUser,
                      item.cv,
                      item.job_title,
                      item.id,
                      item.post_id
                    )
                  }
                />

                <Button
                  className="p-button-danger"
                  onClick={() =>
                    deleteComment(item.id, item.job_title, item.post_id)
                  }
                  label="Reddet"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
