import { useState } from "react";
import { Link } from "react-router-dom";

export const LayoutTree = ({ title, containerColor, linkColor }) => {
  const [selectedAction, setSelectedAction] = useState('');

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
        className={`p-4 rounded-lg flex flex-col md:flex-row gap-4 w-full max-w-5xl h-auto md:h-[80vh]`}
        style={{ backgroundColor: containerColor }}
      >
        {/* Área para el árbol */}
        <div
          className={`flex-grow bg-white rounded-lg shadow-md ${
            selectedAction === 'Crear' ? 'h-64' : 'h-full'
          } flex items-center justify-center`}
        ></div>

        {/* Controles y Área para el código */}
        <div className="flex-shrink-0 w-full md:w-1/4 bg-transparent p-4 flex flex-col gap-4">
          {/* Controles */}
          <select
            className="p-2 border border-gray-300 rounded mb-4"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option hidden>Seleccione una operación</option>
            <option>Crear</option>
            <option>Insertar</option>
            <option>Eliminar</option>
            <option>Buscar</option>
            <option>Recorridos</option>
            <option>Limpiar</option>
          </select>

          {/* Controles para Crear */}
          {selectedAction === 'Crear' && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Digite la cantidad de nodos a crear"
                className="p-2 border border-gray-300 rounded"
              />
              <button className="bg-white p-2 rounded">Crear</button>
            </div>
          )}

          {/* Área de Código */}
          <div className="bg-white p-4 rounded-lg shadow-md flex-grow overflow-auto">
            <h2 className="text-lg font-bold mb-2">Código</h2>
            <pre className="whitespace-pre-wrap break-words">
              <code>
                insert v check balance factor of this and its children case1:
                this.rotateRight case2: this.left.rotateLeft, this.rotateRight
                case3: this.rotateLeft case4: this.right.rotateRight,
                this.rotateLeft this is balanced
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
