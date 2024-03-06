import { useState, useEffect } from "react";
import { Global } from "../helpers/Global";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
export const EditarPerfil = () => {
  const { auth, actualizarPerfil, setAuth } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email, image } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });
      return;
    }
    const resultado = await actualizarPerfil(perfil);

    setAlerta(resultado);
    setTimeout(() => {
      setAlerta({});
    }, 2000);
  };

  const handleFileselected = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImage = async () => {
    const token = localStorage.getItem("token");
    try {
      const fileInput = document.querySelector("#file");
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      const { data } = await clienteAxios.post("/usuarios/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === "success") {
        console.log(data.user);
        const user = {
          email: data.user.email,
          image: data.user.image,
          nombre: data.user.nombre,
          _id: data.user._id,
        };
        setAuth(user);
        // setPerfil(user);
        setAlerta({
          msg: "Foto Actualizada correctamente",
          error: false,
        });
        setTimeout(() => {
          setAlerta({});
          setSelectedFile(null);
        }, 2000);
      } else {
        setAlerta({
          msg: data.msg,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-black text-3xl text-center">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tus Datos</p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-indigo-600 shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}

          <div className="px-6 py-4">
            <div className="flex items-center justify-center">
              <img
                className="h-32 w-32   rounded-full mr-4"
                src={Global.url + "usuarios/perfil/" + perfil.image}
                alt="Foto de perfil"
              />
            </div>

            <div className="my-3 justify-center">
              <input
                className="bg-sky-500"
                type="file"
                name="file0"
                id="file"
                onChange={handleFileselected}
              />
            </div>
          </div>
          {selectedFile && (
            <button
              className="bg-indigo-700 hover:bg-indigo-800 transition-colors px-10 py-3 text-center cursor-pointer font-bold text-white rounded-lg uppercase w-full mt-5 "
              onClick={handleImage}
            >
              Editar Foto
            </button>
          )}

          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-white">Nombre</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-white">Email</label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 hover:bg-indigo-800 transition-colors px-10 py-3 text-center cursor-pointer font-bold text-white rounded-lg uppercase w-full mt-5 "
            />
          </form>
        </div>
      </div>
    </>
  );
};
