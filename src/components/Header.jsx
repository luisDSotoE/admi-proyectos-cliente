import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";
import img from "../img/logoheader.jpg";

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos();
  const { cerrarSesionAuth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();
    localStorage.removeItem("token");
  };

  return (
    <header className="px-4 py-5 bg-azulper border-b">
      <div className="md:flex md:justify-between">
        {/* <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          Administrador de Proyectos
        </h2> */}
        <h2 className="text-center mb-5 md:mb-0 flex justify-center">
          <img src={img} alt="" className="w-40 h-16" />
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">

          <Link to="/proyectos" className="font-bold uppercase  text-letras">
            Proyectos
          </Link>

          <button
            type="button"
            className="font-bold uppercase text-letras"
            onClick={handleBuscador}
          >
            Buscar
          </button>

          <button
            type="button"
            className="text-white text-sm bg-botoncolor p-3 rounded-md uppercase font-bold"
            onClick={handleCerrarSesion}
          >
            Cerrar Sesión
          </button>

          <Busqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
