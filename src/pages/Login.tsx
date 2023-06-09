
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "../index.css";
import { User } from "../models/user";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../components/Logo";

const LoginFormSchema = z.object({
  password: z.string().nonempty("A senha é obrigatória").trim(),
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido")
    .toLowerCase(),
});

type LoginFormProps = z.infer<typeof LoginFormSchema>;

type LoginProps = {
  onSuccess: (user: User) => any;
};

function Login(props: LoginProps) {
  const { onSuccess } = props;
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const setLogin = (data: LoginFormProps) => {
    try {
      const response: User = {
        Email: data.email,
        Password: data.password,
      };
      onSuccess(response);
    } catch (error) {
      toast.error("Falha, não foi possível logar");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({ resolver: zodResolver(LoginFormSchema) });

  return (
    <>
      <div className=" h-full flex flex-col items-center justify-center">
        <Logo />
        <div
          className="container 
            p-5 m-5 w-96 bg-white 
            rounded-2xl
            min-h-80 flex flex-col 
            items-center 
            justify-between 
            shadow-slate-600 shadow-md"
        >
          <div className="wellcome text-green-500 text-xl font-sans p-5">
            Vamos começar com seu login!
          </div>

          <form onSubmit={handleSubmit(setLogin)} className="w-full px-6">
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="w-full">
                <input
                  className=" bg-slate-200 border border-green-400 rounded-xl p-1 w-full"
                  placeholder="exemple@email.com"
                  type="text"
                  {...register("email")}
                />
                <h2 className="text-red-400 m-0 p-0 text-sm italic">
                  {errors.email?.message}
                </h2>
              </div>

              <div className="w-full">
                <input
                  className=" bg-slate-200 border border-green-400 rounded-xl p-1 w-full"
                  placeholder="Senha"
                  type={show ? "text" : "password"}
                  {...register("password")}
                />
                <div className=" flex w-full justify-between items-center">
                  <h2 className="text-red-400 m-0 p-0 text-sm italic">
                    {errors.password?.message}
                  </h2>
                  <div>
                    {show ? (
                      <FontAwesomeIcon
                        onClick={() => setShow(!show)}
                        className="p-2 cursor-pointer"
                        icon={faEye}
                        color="green"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => setShow(!show)}
                        className="p-2 cursor-pointer"
                        icon={faEyeSlash}
                        color="grey"
                      />
                    )}
                  </div>
                </div>
              </div>

              <button
                className="
                w-full
                mt-4
                    bg-green-600 p-1 rounded-xl
                    text-white text-lg 
                    hover:transition ease-in-out delay-100 
                    hover:-trangreen-y-1 
                    hover:scale-100
                    hover:bg-green-800
                    "
                type="submit"
              >
                Entrar
              </button>
            </div>
          </form>
          <div className="create">
            <p>
              Não possui cadastro?{" "}
              <a className="text-green-400 p-2 font-bold" href="#">
                Criar conta
              </a>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
