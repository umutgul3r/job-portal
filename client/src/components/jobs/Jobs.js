import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../utils/Pagination";
import Search from "../search/Search";
import { jobsFetch } from "./../../redux/reducers/productSlice";
import moment from "moment";

function Products() {
  const { items } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const dispatch = useDispatch();

  const paginate = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(jobsFetch(["", "", ""]));
  }, [dispatch]);

  return (
    <div>
      <Search />
      <div className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10 mt-12">
        {currentPosts?.map((com) => (
          <Link
            className="w-full sm:w-full"
            key={com._id}
            to={`/detail/${com._id}`}
          >
            <div className="p-6 h-[300px] bg-white text-gray-300 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="myJobsDiv">
                <h5 className="elisp capitalize mb-2 text-2xl font-bold tracking-tight  dark:text-white">
                  {com.title}
                </h5>
              </div>
              <div className="jobDiv">İşveren:{com.employerName}</div>
              <div className="jobDiv mt-1 elisp">
                Açıklama:{com.description}
              </div>
              <div className="jobDiv">{com.category}</div>

              <div>Maaş:{com.salary}</div>
              <div className="jobDiv mt-1">
                İlan Tarihi {moment(com.createdAt).format("YYYY-MM-DD")}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination paginate={paginate} />
    </div>
  );
}

export default Products;
