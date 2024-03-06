import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card } from "./CardIndex.jsx";
import useProyectos from "../hooks/useProyectos.jsx";
import clienteAxios from "../config/clienteAxios.jsx";

export function Kanban() {
  const { proyecto } = useProyectos();
  const [porHacer, setPorHacer] = useState([]);
  const [enProgreso, setEnProgreso] = useState([]);
  const [completadas, setCompletadas] = useState([]);

  useEffect(() => {
    if (proyecto && proyecto.tareas) {
      const tareasPorHacer = proyecto.tareas.filter(
        (tarea) => tarea.estadotask === "por-hacer"
      );
      const tareasEnProgreso = proyecto.tareas.filter(
        (tarea) => tarea.estadotask === "en-progreso"
      );
      const tareasCompletadas = proyecto.tareas.filter(
        (tarea) => tarea.estadotask === "completada"
      );
      setPorHacer(tareasPorHacer);
      setEnProgreso(tareasEnProgreso);
      setCompletadas(tareasCompletadas);
    }
  }, [proyecto]);

  const token = localStorage.getItem("token");
  if (!token) return;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceArray = getColumnArray(source.droppableId);
    const destinationArray = getColumnArray(destination.droppableId);
    const [removed] = sourceArray.splice(source.index, 1);
    destinationArray.splice(destination.index, 0, removed);

    updateColumnState(source.droppableId, sourceArray);
    updateColumnState(destination.droppableId, destinationArray);

    try {
      await clienteAxios.put(
        `/tareas/actualizarestado/${removed._id}`,
        { estadoTask: destination.droppableId },
        config
      );
    } catch (error) {
      console.error("Error al actualizar el estado en el backend:", error);
    }
  };

  const getColumnArray = (columnId) => {
    switch (columnId) {
      case "por-hacer":
        return porHacer;
      case "en-progreso":
        return enProgreso;
      case "completada":
        return completadas;
      default:
        return [];
    }
  };

  const updateColumnState = (columnId, tasks) => {
    switch (columnId) {
      case "por-hacer":
        setPorHacer(tasks);
        break;
      case "en-progreso":
        setEnProgreso(tasks);
        break;
      case "completada":
        setCompletadas(tasks);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-violet-700 ">
          <Column id="por-hacer" tasks={porHacer} title="Por hacer" />
          <Column id="en-progreso" tasks={enProgreso} title="En progreso" />
          <Column id="completada" tasks={completadas} title="Completadas" />
        </div>
      </DragDropContext>
    </div>
  );
}

const Column = ({ id, tasks, title }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          className="flex-1 bg-gray-200 rounded-lg p-4"
          ref={provided.innerRef}
        >
          <div className="text-xl font-bold mb-4">{title}</div>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white shadow-md rounded-md p-2 ${
                      snapshot.isDragging ? "opacity-50" : ""
                    }`}
                  >
                    <Card>{task.nombre}</Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
