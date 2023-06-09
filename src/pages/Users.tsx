import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDownZA,
  faArrowRightToBracket,
  faArrowUpAZ,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import usersData from "../data/user.json";
import { User } from "../models/user";

type UsersProps = {
  userData: User;
  logOff: () => void;
};

function Users(props: UsersProps) {
  const { userData, logOff } = props;
  const [users, setUsers] = useState<Array<User>>([]);
  const [currentUsers, setCurrentUsers] = useState<Array<User>>([]);
  const [orderDirection, setOrderDirection] = useState(true);

  useEffect(() => {
    setUsers(usersData.users);
    setCurrentUsers(usersData.users);
  }, []);

  const stringNormalize = (value: string) => {
    const specialCharacterRegex = /[\u0300-\u036f]/g;
    return value
      .normalize("NFD")
      .replace(specialCharacterRegex, "")
      .toLowerCase();
  };

  const handleOnChange = (e: any) => {
    const search = e.target.value;
    if (!search) {
      setCurrentUsers(users);
      return;
    }
    const filter = users.filter(
      (user) =>
        stringNormalize(user.Nome!).includes(stringNormalize(search)) ||
        stringNormalize(user.Email!).includes(stringNormalize(search))
    );
    setCurrentUsers(filter);
  };

  const OrderByName = () => {
    setOrderDirection(!orderDirection);

    const orderParam = orderDirection ? [-1, 1] : [1, -1];
    const orderedUsers = currentUsers.sort(function (a, b) {
      if (a.Nome?.toLowerCase()! < b.Nome?.toLowerCase()!) {
        return orderParam[0];
      }
      if (a.Nome?.toLowerCase()! > b.Nome?.toLowerCase()!) {
        return orderParam[1];
      }
      return 0;
    });
    setCurrentUsers(orderedUsers);
  };

  return (
    <main className="h-full w-full">
      <div className="flex-row  h-24 w-screen bg-green-300 flex justify-between items-center text-xl italic text-white font-semibold p-4">
        <Logo width={118} height={34} />
        <div className="flex flex-col mr-6 text-slate-600">
          {userData.Nome ? <h2>Seja bem vindo(a) {userData.Nome}!</h2> : null}

          <h2
            className="text-sm font-bold self-end text-slate-600 cursor-pointer"
            onClick={logOff}
          >
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              color="Tomato"
              className="cursor-pointer mr-2"
            />
            Sair
          </h2>
        </div>
      </div>
      <div className="h-full bg-white shadow-2xl rounded-2xl m-16 py-8 px-16">
        <div className="mb-8 w-full">
          <input
            type="text"
            placeholder="Pesquisar"
            className="rounded-2xl px-2 py-1 border border-green-400"
            onChange={handleOnChange}
          />
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-start">Id</th>
              <th
                className="text-start cursor-pointer"
                onClick={() => OrderByName()}
              >
                Nome
                {orderDirection ? (
                  <FontAwesomeIcon className="ml-2" icon={faArrowDownZA} />
                ) : (
                  <FontAwesomeIcon className="ml-2" icon={faArrowUpAZ} />
                )}
              </th>
              <th className="text-start">Email</th>
              <th className="text-start">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length ? (
              currentUsers.map((data) => (
                <tr key={data.id} className="h-12">
                  <td>{data.id}</td>
                  <td>{data.Nome}</td>
                  <td>{data.Email}</td>
                  <td>
                    <div className="flex flex-row items-center gap-4">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="cursor-pointer"
                        color="Dodgerblue"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        color="Tomato"
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-8">
                <td className="text-center" colSpan={4}>
                  Sem dados para exibir
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Users;
