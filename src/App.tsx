import React, { useEffect, useState } from "react";
import dataBase from "./data/user.json";
import { User } from "./models/user";
import Login from "./pages/Login";
import Users from "./pages/Users";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [dataUsers, setDataUsers] = useState<Array<User>>();
  const [success, setSuccsess] = useState(false);
  const [infoUser, setInfoUser] = useState<User>();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    setDataUsers(dataBase.users);
  }, []);

  useEffect(() => {
    try {
      if (dataUsers && userData) {
        const response = dataUsers.find(
          (user) =>
            user.Email === userData.Email && user.Password === userData.Password
        );

        if (!response) throw Error();

        setIsLogged(true);
        setInfoUser(response);
      }
    } catch (error) {
      toast.error("Usuário ou senha inválidos");
    }
  }, [userData]);

  const setIsLogged = (isLogged: boolean) => {
    setSuccsess(isLogged);
  };

  return (
    <>
      {!success ? (
        <div className="h-full min-h-screen w-screen bg-slate-200 flex justify-center items-center">
          <ToastContainer />
          <Login onSuccess={setUserData} />
        </div>
      ) : infoUser ? (
        <div className="h-full min-h-screen w-screen bg-slate-200 flex justify-center">
          <Users logOff={() => setIsLogged(false)} userData={infoUser} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
