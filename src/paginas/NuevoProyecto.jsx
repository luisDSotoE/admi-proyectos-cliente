import FormularioProyecto from "../components/FormularioProyecto"

const NuevoProyecto = () => {
    return (
      <>
          <h1 className="text-4xl font-black text-center">CREAR PROYECTO</h1>
  
          <div className="mt-10 flex justify-center">
              <FormularioProyecto />
          </div>
      </>
    )
  }
  
  export default NuevoProyecto