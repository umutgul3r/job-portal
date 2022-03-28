import React, { useEffect } from "react";
import Filters from "../search/Search";
import { useSelector, useDispatch } from "react-redux";
import { jobsFetch } from "../../redux/reducers/productSlice";
import EmployesItem from "./EmployesItem";

function Employes() {
  const auth = useSelector((state) => state.auth);

  const { items } = useSelector((state) => state.products);
  const { isAdmin, user } = auth;
  const dispatch = useDispatch();

  const employes = items.filter((item) => item.employer_id === user._id);

  console.log(employes);

  useEffect(() => {
    dispatch(jobsFetch(""));
  }, [dispatch]);

  return (
    <>
      <Filters />
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
        {employes.map((com) => (
          <EmployesItem key={com._id} product={com} isAdmin={isAdmin} />
        ))}
      </div>
    </>
  );
}

export default Employes;
