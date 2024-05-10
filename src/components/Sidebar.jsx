import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";
import { useEffect, useState } from "react";
import { Global } from "../helpers/Global";

const Sidebar = () => {
  const { auth } = useAuth();
  const [image, setImage] = useState("");
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6  px-5 py-10  rounded  border-x-2">
      <div className="mx-auto shadow-md rounded-md overflow-hidden bg-white flex items-center justify-center">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center">
            <img
              className="h-20 w-20 rounded-full"
              src={Global.url + "usuarios/perfil/" + auth.image}
              alt="Foto de perfil"
            />
          </div>
          <div>
            <p className="text-lg text-center text-gray-800 font-bold">
              {auth.nombre}
            </p>
            <p className="text-xs font-medium text-center text-gray-600">
              {auth.email}
            </p>
          </div>
        </div>
      </div>

      <Link
        to="perfil"
        className="bg-botoncolor w-full p-2 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-violet-700  transition-colors"
      >
        Cuenta
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
