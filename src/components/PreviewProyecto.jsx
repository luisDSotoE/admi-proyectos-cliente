import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const PreviewProyecto = ({proyecto}) => {

    const { auth } = useAuth();

    const { nombre, _id, cliente, creador} = proyecto;

    const tasks = proyecto.tareas ? proyecto.tareas : [];

    const completedTasks = tasks.filter((task) => task.estado);

    const percentage = ((completedTasks.length / tasks.length) * 100).toFixed(2);

    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>

            <div className='flex items-center gap-2'>
                <p className='flex-1'>
                    {nombre}

                    <span className='text-sm text-gray-500 uppercase'>
                        {''} {cliente}
                    </span>
                </p>
                
                {auth._id !== creador && (
                    <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>Colaborador</p>
                )}
            </div>

            <CircularProgressbar
                value={Number(percentage) || 0}
                styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathColor: "#3b82f6",
                    textColor: "#3b82f6",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                })}
                text={`${percentage}%`}
            />

            <Link
                to={`${_id}`}
                className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
            >Mostrar</Link>
        </div>
    )
}

export default PreviewProyecto