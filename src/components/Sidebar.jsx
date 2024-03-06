import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import { useEffect, useState } from "react";
import { Global } from "../helpers/Global";

const Sidebar = () => {
  const { auth } = useAuth();
  const [image, setImage] = useState("");
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      {/* <p className="text-xl font-bold">Hola: {auth.nombre}</p> */}

      <div className="mx-auto bgs-white shadow-md rounded-md overflow-hidden bg-white flex items-center justify-center">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center">
            <img
              className="h-20 w-20   rounded-full mr-4"
              src={Global.url + "usuarios/perfil/" + auth.image}
              alt="Foto de perfil"
            />
          </div>
          <div>
            <p className="text-lg  text-gray-800 font-bold">{auth.nombre}</p>
            <p className="text-sm font-medium text-gray-600">{auth.email}</p>
          </div>
        </div>
      </div>

      <Link
        to="perfil"
        className="bg-violet-600 w-full p-2 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-violet-700  transition-colors"
      >
        Perfil
      </Link>
      <Link
        to="crear-proyecto"
        className="bg-blue-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg transition-colors hover:bg-blue-700"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
