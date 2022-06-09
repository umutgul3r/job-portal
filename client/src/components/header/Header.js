import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";

import { Transition } from "@headlessui/react";
import amb from "../../assets/icons/favicon.png";
import axios from "axios";
import { useSelector } from "react-redux";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isEmployer } = auth;

  const showModal = () => {
    setIsOpen(!isOpen);
  };

  const ref = React.createRef();

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };
  const sellerRouter = () => {
    return (
      <>
        <NavLink to="/create-job">
          <i className="pi pi-pencil text-blue-400"></i> İlan Oluştur
        </NavLink>
        <NavLink to="/my-jobs">
          <i className="pi pi-list text-blue-500"></i> İlanlarım
        </NavLink>
        <NavLink to="/employes">
          {" "}
          <i className="pi pi-list text-blue-500"></i> Elemanlar
        </NavLink>
      </>
    );
  };

  const adminRouter = () => {
    return (
      <>
        <NavLink to="/support"> Destek</NavLink>
      </>
    );
  };

  return (
    <div>
      <nav className="bg-white text-black font-bold">
        <div className=" mx-1 px-4">
          <div className="flex items-center h-16">
            <div className="flex w-full items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-2"
              >
                <img
                  className="h-8 w-8"
                  src={amb}
                  alt="Workflow"
                />
                <span className="text-black">44 Job Find</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <div className="flex  justify-between gap-8">
                    {isLogged && isEmployer && sellerRouter()}
                  </div>
                  <div className="flex gap-8 ">{isAdmin && adminRouter()}</div>
                  <div>
                    {!isLogged ? (
                      <Link to="/login">Giriş Yap</Link>
                    ) : (
                      <>
                        <Link to="/profile">
                          <i className="pi pi-user text-blue-500"></i> Profil
                        </Link>
                        <Link
                          className="ml-4"
                          onClick={logoutUser}
                          to="/"
                        >
                          <i className="pi pi-sign-out text-blue-500"></i> Çıkış
                          Yap
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={showModal}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          onFocus={showModal}
          onBlur={showModal}
          show={isOpen}
        >
          {() => (
            <div
              onClick={showModal}
              className="md:hidden absolute bg-white shadow border border-black rounded-md sm:w-2/5 w-[70%] right-3 top-[56px] z-50"
              id="mobile-menu"
            >
              <div
                ref={ref}
                className="pt-4 pb-4 space-y-1 p-8"
              >
                <div className="flex flex-col gap-4">
                  {isLogged && isEmployer && sellerRouter()}
                </div>
                <div>
                  {!isLogged ? (
                    <Link to="/login">Giriş Yap</Link>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/profile">
                        <i className="pi pi-user text-blue-500"></i> Profil
                      </Link>
                      <Link
                        onClick={logoutUser}
                        to="/"
                      >
                        <i className="pi pi-sign-out text-blue-500"></i> Çıkış
                        Yap
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex flex-col text-white">
                  {isAdmin && adminRouter()}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
