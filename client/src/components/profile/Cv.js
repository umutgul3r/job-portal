import React from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

export default function Cv({ changeCv }) {
  const user = useSelector((state) => state.auth.user);

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const umut = () => {
    console.log("onlur");
  };

  return (
    <div>
      <div className="relative overflow-hidden inline-block cursor-pointer ml-12 mt-12">
        <Button
          className="cursor-pointer w-28"
          label="Dosya Seç"
        >
          <i className="upload pi pi-upload"></i>
        </Button>
        <input
          type="file"
          name="file"
          className="w-32 absolute left-0 top-0 opacity-0"
          accept=".pdf"
          onChange={changeCv}
        />
      </div>
      <Button
        className="ml-12 w-28 cursor-pointer"
        onClick={() => {
          handleDownload(user.cv, `${user.name}-cv.pdf`);
        }}
        label="Cv'yi indir"
      />

      <a
        className="h-[50px] w-4 text-sm p-2 text-center bg-primary"
        href={user.cv}
      />
    </div>
  );
}
