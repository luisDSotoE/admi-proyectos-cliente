import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import {useEffect, useState} from "react";
import clienteAxios from "../config/clienteAxios";

const Tarea = ({tarea}) => {

    const [porcentaje, setPorcentaje] = useState(0);

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
    const admin = useAdmin()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id , estadotask } = tarea

    useEffect(() => {
        setPorcentaje(estadotask === 'por-hacer' ? 0 : estadotask === 'en-progreso' ? 50 : 100);
        modifyStateTask(estado ? 'por-hacer' : 'completada');
    }, [estado]);

    useEffect(() => {
        setPorcentaje(estadotask === 'por-hacer' ? 0 : estadotask === 'en-progreso' ? 50 : 100);
    }, []);

    useEffect(() => {
        if ( estadotask === 'completada' && !estado ) {
            completarTarea(_id);
        }
        if ( estadotask === 'por-hacer' && estado ) {
            completarTarea(_id);
        }
        if ( estadotask === 'en-progreso' && estado ){
            completarTarea(_id);
        }
        setPorcentaje(estadotask === 'por-hacer' ? 0 : estadotask === 'en-progreso' ? 50 : 100);
    }, [estadotask]);

    const modifyStateTask = async (stateTask) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            await clienteAxios.put(
                `/tareas/actualizarestado/${_id}`,
                { estadoTask: stateTask },
                config
            );
        } catch (error) {
            console.error("Error al actualizar el estado en el backend:", error);
        }
    }

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start w-80">
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm">{ formatearFecha(fechaEntrega) }</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                { estado ? <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p> : <p className="text-xs bg-red-600 uppercase p-1 rounded-lg text-white">No Completada</p>}
            </div>

            <div className='w-20 h-20 flex items-center justify-center'>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathTransitionDuration: 1,
                        pathColor: "#3b82f6",
                        textColor: "#3b82f6",
                        transition: "stroke-dashoffset 0.5s ease 0s"
                    })}
                    text={`${porcentaje}%`}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-2 w-80 justify-between">
                {admin && (
                    <button
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEditarTarea(tarea)}
                    >Editar</button>

                )}

                <button
                    className={`${estado ? 'bg-gray-600' : 'bg-sky-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => {
                        completarTarea(_id);
                    }}
                >{!estado ? 'Completa' : 'Incompleta' }</button>
                
                {admin && ( 
                    <button
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => handleModalEliminarTarea(tarea)}
                    >Eliminar</button>
                )}
            </div>
        </div>
    )
}

export default Tarea