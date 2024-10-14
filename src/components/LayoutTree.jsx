import { Link } from 'react-router-dom'

export const LayoutTree = ({ title, containerColor, linkColor, children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-150 p-4">
      <div className="flex items-center mb-4 w-full max-w-5xl px-4">
        <button
          className={'mr-4 p-2 bg-white-500'}
          style={{ color: linkColor }}
        >
          <Link to="/">Volver al inicio</Link>
        </button>

        {/* Titulo */}
        <div className="flex-grow text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      </div>

      {/* Contenedor */}
      <div
        className={`p-4 rounded-lg flex flex-col md:flex-row gap-4 w-full max-w-5xl h-screen md:h-[80vh]`}
        style={{ backgroundColor: containerColor }}
      >
        {/* Área para el árbol */}
        <div className="flex-grow bg-white rounded-lg shadow-md h-64 md:h-full overflow-scroll">
          {children}
        </div>

        {/* Controles */}
        <div className="flex-shrink-0 w-full md:w-1/4 bg-transparent p-4 flex flex-col">
          <select className="p-2 border border-gray-300 rounded mb-4">
            <option hidden>Seleccione una operación</option>
            <option>Crear</option>
            <option>Insertar</option>
            <option>Eliminar</option>
            <option>Buscar</option>
            <option>Recorridos</option>
            <option>Limpiar</option>
          </select>
        </div>
      </div>
    </div>
  )
}
