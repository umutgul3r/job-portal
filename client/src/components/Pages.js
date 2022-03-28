import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Jobs from './jobs/Jobs'
import DetailJob from './jobs/DetailJob'
import Login from './user/Login'
import Register from './user/Register'
import NotFound from './utils/NotFound'
import CreateJob from './jobs/CreateJob'
import { useSelector } from 'react-redux'
import ActivationEmail from './user/ActivationEmail'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import EditUser from './user/EditUser'
import Profile from './profile/Profile'
import Support from './chat/SupportScreen'
import MyJobs from './jobs/MyJobs'
import Applications from './applications/Applications'
import Employes from './employes/Employes'

function Pages() {
  const auth = useSelector((state) => state.auth)
  const { isLogged, isAdmin, isSeller } = auth

  return (
    <Routes>
      <Route path="/" exact element={<Jobs />} />
      <Route path="/detail/:id" element={<DetailJob />} />
      <Route path="/profile" element={isLogged ? <Profile /> : <NotFound />} />
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
        element={isAdmin ? <Support /> : <NotFound />}
      />
      <Route
        path="/my-jobs"
        exact
        element={isSeller ? <MyJobs /> : <NotFound />}
      />
      <Route
        path="/applications/:id"
        exact
        element={isSeller ? <Applications /> : <NotFound />}
      />
      <Route
        path="/create-job"
        exact
        element={isAdmin || isSeller ? <CreateJob /> : <NotFound />}
      />
      <Route
        path="/edit-job/:id"
        exact
        element={isAdmin || isSeller ? <CreateJob /> : <NotFound />}
      />
      <Route
        path="/user/activate/:activation_token"
        element={<ActivationEmail />}
        exact
      />
      <Route
        path="/edit_user/:id"
        element={isAdmin ? <EditUser /> : <NotFound />}
        exact
      />
      <Route
        path="/employes"
        element={isSeller ? <Employes /> : <NotFound />}
        exact
      />
      <Route path="*" exact element={<NotFound />} />
    </Routes>
  )
}

export default Pages
