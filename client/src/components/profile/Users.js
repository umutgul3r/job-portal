import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = ({ handleDelete }) => {
  const users = useSelector((state) => state.getAllUsers.user);

  return (
    <>
      <table className="w-[92%] lg:w-[80%]  text-sm text-left text-gray-500 m-10 dark:text-gray-400 mt-16">
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
              Posta
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Admin
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              İşveren
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item) => (
            <tr
              key={item.id}
              className="bg-white dark:bg-gray-800"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap uppercase"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">
                {item.role === 1 ? (
                  <i class="pi pi-check" />
                ) : (
                  <i class="pi pi-times" />
                )}
              </td>
              <td className="px-6 py-4">
                {item.role === 2 ? (
                  <i class="pi pi-check" />
                ) : (
                  <i class="pi pi-times" />
                )}
              </td>
              <td className="px-6 py-4 justify-center lg:h-40 flex flex-col gap-2 cursor-pointer">
                <Link to={`/edit_user/${item._id}`}>
                  <i class="pi pi-user-edit"> Düzenle</i>
                </Link>
                <i
                  onClick={() => handleDelete(item._id)}
                  class="pi pi-trash"
                >
                  {" "}
                  Sil
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
