import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { jobsFetch } from "../../redux/reducers/productSlice";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Filters() {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const Sort = [
    { name: "En yeni", code: "createdAt" },
    { name: "En eski", code: "-createdAt" },
    { name: "Ücret: Azalan", code: "-salary" },
    { name: "Ücret: Artan", code: "salary" },
  ];
  const Category = [
    { name: "Hepsi", code: "" },
    { name: "Yazılım", code: "yazılım" },
    { name: "Muhasebe", code: "muhasebe" },
    { name: "Vasıfsız", code: "vasıfsız" },
    { name: "Doktor", code: "doktor" },
    { name: "Hemşire", code: "hemsire" },
    { name: "Mühendis", code: "muhendis" },
    { name: "Boyacı", code: "boyaci" },
  ];

  return (
    <div className="w-full overflow-hidden flex flex-row flex-wrap justify-between my-3 ">
      <div className="w-full mx-4 flex sm:flex-row flex-col justify-between items-center">
        <InputText
          className="sm:w-full w-3/4 mx-6"
          value={search}
          placeholder="Kendine göre bir iş ara"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex w-3/4 mt-2 sm:mt-0">
          <Dropdown
            className="mr-4 w-1/3"
            value={sort}
            options={Sort}
            onChange={(e) => setSort(e.target.value.code)}
            optionLabel="name"
            placeholder="Sıralama"
          />
          <Dropdown
            className="mr-4 w-1/3"
            value={sort}
            options={Category}
            onChange={(e) => setCategory(e.target.value.code)}
            optionLabel="name"
            placeholder="Kategori"
          />
          <Button
            className="w-1/3"
            onClick={() => dispatch(jobsFetch([search, sort, category]))}
            label="Ara"
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
