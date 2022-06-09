import React from "react";

function EmployesItem({ product }) {
  const accept = product.accepted;

  return (
    <div className="text-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 m-12 w-3/4 sm:w-[200px] h-[300px]">
      <div>
        <div className="mb-8 h-8 uppercase">{product.title}</div>
        <div className="w-full">İşe Kabul Edilenler</div>
        {accept?.map((accept) => (
          <div
            className="overflow-y-auto h-44"
            key={accept._id}
          >
            <div className="mt-2">{accept.postUser}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployesItem;
