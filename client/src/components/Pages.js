import React from "react";
import { Routes, Route } from "react-router-dom";
import Jobs from "./jobs/Jobs";
import DetailJob from "./jobs/DetailJob";
import Login from "./user/Login";
import Register from "./user/Register";
import NotFound from "./utils/NotFound";
import CreateJob from "./jobs/CreateJob";
import { useSelector } from "react-redux";
import ActivationEmail from "./user/ActivationEmail";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import EditUser from "./user/EditUser";
import Profile from "./profile/Profile";
import Support from "./chat/SupportScreen";
import MyJobs from "./jobs/MyJobs";
import Applications from "./applications/Applications";
import Employes from "./employes/Employes";
import Loading from "./utils/Loading";

function Pages() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin, isEmployer } = auth;

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<Jobs />}
      />
      <Route
        path="/detail/:id"
        element={<DetailJob />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/login"
        exact
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        path="/forgot_password"
        element={isLogged ? <NotFound /> : <ForgotPassword />}
        exact
      />
      <Route
        path="/user/reset/:id"
        element={isLogged ? <NotFound /> : <ResetPassword />}
        exact
      />
      <Route
        path="/register"
        exact
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route
        path="/support"
        exact
        element={isAdmin ? <Support /> : <Loading />}
      />
      <Route
        path="/my-jobs"
        exact
        element={isEmployer ? <MyJobs /> : <Loading />}
      />
      <Route
        path="/applications/:id"
        exact
        element={isEmployer ? <Applications /> : <Loading />}
      />
      <Route
        path="/create-job"
        exact
        element={isAdmin || isEmployer ? <CreateJob /> : <Loading />}
      />
      <Route
        path="/edit-job/:id"
        exact
        element={isAdmin || isEmployer ? <CreateJob /> : <Loading />}
      />
      <Route
        path="/user/activate/:activation_token"
        element={<ActivationEmail />}
        exact
      />
      <Route
        path="/edit_user/:id"
        element={isAdmin ? <EditUser /> : <Loading />}
        exact
      />
      <Route
        path="/employes"
        element={isEmployer ? <Employes /> : <Loading />}
        exact
      />
      <Route
        path="*"
        exact
        element={<NotFound />}
      />
    </Routes>
  );
}

export default Pages;
