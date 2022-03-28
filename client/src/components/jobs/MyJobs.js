import React, { useEffect } from "react";
import Filters from "../search/Search";
import { useSelector, useDispatch } from "react-redux";
import { jobsFetch, deleteProducts } from "../../redux/reducers/productSlice";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

function MyProducts() {
  const auth = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.products);
  const token = useSelector((state) => state.getToken.token);
  const { user } = auth;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobsFetch(""));
  }, [dispatch]);

  const handleUpdate = (id) => {
    navigate(`/edit-job/${id}`);
  };
  const handleApp = (id) => {
    navigate(`/applications/${id}`);
  };

  const findMyJobs = items?.filter((item) => item.employer_id === user._id);

  return (
    <>
      <Filters />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10 mt-12">
        {findMyJobs?.map((com, key) => (
          <div className="h-[300px]" key={com._id}>
            <div class="p-6 h-[250px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="myJobsDiv">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {com.title}
                </h5>
              </div>
              <p className="myJobsDiv mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden h-8 whitespace-nowrap text-ellipsis">
                {com.description}
              </p>
              <div className="flex gap-4">
                <Button
                  className="myJobsButton w-full bg-red-400"
                  onClick={() => dispatch(deleteProducts([com._id, token]))}
                  icon="pi pi-times"
                />
                <Button
                  icon="pi pi-pencil"
                  className="myJobsButton w-full bg-green-400"
                  onClick={() => handleUpdate(com._id)}
                />

                <Button
                  className="myJobsButton w-full"
                  icon="pi pi-list"
                  onClick={() => handleApp(com._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      )}
    </>
  );
}

export default MyProducts;
