import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Pages from "./components/Pages";
import axios from "axios";
import { getToken } from "./redux/reducers/tokenReducer";
import { ToastContainer } from "react-toastify";
import { fetchUser, getUserAuth, login } from "./redux/reducers/authSlice";
import { jobsFetch } from "./redux/reducers/productSlice";
import { useSelector, useDispatch } from "react-redux";
import ChatBox from "./components/chat/ChatBox";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const auth = useSelector((state) => state.auth);
  const { isAdmin, isLogged } = auth;
  const token = useSelector((state) => state.getToken.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken1 = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch(getToken(res.data.access_token));
      };
      getToken1();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(login());
        return fetchUser(token)
          .then((res) => {
            dispatch(getUserAuth(res));
          })
          .catch((err) => {
            console.error(err);
          });
      };
      getUser();
    }
    dispatch(jobsFetch(["", "", ""]));
  }, [token, dispatch]);

  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <Header />
        {!isAdmin && isLogged ? <ChatBox /> : ""}
        <Pages />
      </div>
    </Router>
  );
}

export default App;
