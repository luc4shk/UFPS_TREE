import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { StepsContext } from '../context/StepsContext'

export const LayoutTree = ({
  values,
  title,
  containerColor,
  linkColor,
  children,
  treeFunctions,
}) => {
  const [selectedAction, setSelectedAction] = useState('')
  const { steps, setSteps } = useContext(StepsContext)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-150 p-4">
      <div className="flex items-center mb-4 w-full max-w-5xl px-4">
        <button
          className={'mr-4 p-2 bg-white-500'}
          style={{ color: linkColor }}
        >
          <Link to="/">Volver al inicio</Link>
        </button>

        {/* Título */}
        <div className="flex-grow text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div
        className={`p-4 rounded-lg flex flex-col md:flex-row gap-4 w-full max-w-5xl h-full md:h-[80vh]`}
        style={{ backgroundColor: containerColor }}
      >
        <div className="flex flex-col gap-4 w-full md:w-3/4 h-full">
          {/* Controles de Crear Nodos */}
          {selectedAction === 'Crear' && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                //Obtenemos el formulario
                const form = e.target
                //Obtenemos el valor del input
                const nodesToAdd = Number(form.inputNodesToAdd.value)

                if (nodesToAdd <= 0 || nodesToAdd > 30) return

                treeFunctions.createTreeByNodes(nodesToAdd)
              }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4"
            >
              <h1 className="text-white text-lg md:text-xl">
                Digite la cantidad de nodos a crear:
              </h1>
              <input
                type="number"
                name="inputNodesToAdd"
                className="p-2 border border-gray-300 rounded w-full md:w-auto"
              />
              <button className="bg-white p-2 rounded w-full md:w-auto">
                Crear
              </button>
            </form>
          )}

          {/* Controles de insertar nodos */}
          {selectedAction === 'Insertar' && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                //Obtenemos el form
                const form = e.target
                //Obtenemos el valor del input
                const valueToAdd = Number(form.inputToAdd.value)
                if (valueToAdd <= 0 || valueToAdd > 99) return
                treeFunctions.addNode(valueToAdd)
              }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4"
            >
              <h1 className="text-white text-lg md:text-xl">
                Digite el nodo a insertar:
              </h1>
              <input
                type="number"
                name="inputToAdd"
                className="p-2 border border-gray-300 rounded w-full md:w-auto"
              />
              <button className="bg-white p-2 rounded w-full md:w-auto">
                Insertar
              </button>
            </form>
          )}

          {/* Controles para eliminar nodo */}
          {selectedAction === 'Eliminar' && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                //Obtenemos el form
                const form = e.target
                //Obtenemos el valor del input
                const valueToDelete = Number(form.inputToDelete.value)

                treeFunctions.deleteNode(valueToDelete)
              }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4"
            >
              <h1 className="text-white text-lg md:text-xl">
                Digite el nodo a eliminar:
              </h1>
              <input
                type="number"
                name="inputToDelete"
                className="p-2 border border-gray-300 rounded w-full md:w-auto"
              />
              <button className="bg-white p-2 rounded w-full md:w-auto">
                Eliminar
              </button>
            </form>
          )}

          {/* Controles de búsqueda */}
          {selectedAction === 'Buscar' && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target

                  const valueToSearch = Number(form.inputToSearch.value)
                  treeFunctions.searchNode(valueToSearch)
                }}
                className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full"
              >
                <h1 className="text-white text-lg md:text-xl">Buscar nodo:</h1>
                <input
                  type="number"
                  name="inputToSearch"
                  className="p-2 border border-gray-300 rounded w-full md:w-auto"
                />
                <button className="bg-white p-2 rounded w-full md:w-auto">
                  Exacta
                </button>
              </form>
              <button
                onClick={() => treeFunctions.searchMinimiumNode()}
                className="bg-white p-2 rounded w-full md:w-auto"
              >
                Mínimo
              </button>
              <button
                onClick={() => treeFunctions.searchMaximiumNode()}
                className="bg-white p-2 rounded w-full md:w-auto"
              >
                Máximo
              </button>
            </div>
          )}

          {/* Recorridos */}
          {selectedAction === 'Recorridos' && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              <button
                onClick={() => treeFunctions.getInOrden()}
                className="bg-white p-2 rounded w-full md:w-auto"
              >
                Inorden
              </button>
              <button
                onClick={() => treeFunctions.getPreOrden()}
                className="bg-white p-2 rounded w-full md:w-auto"
              >
                Preorden
              </button>
              <button
                onClick={() => treeFunctions.getPostOrden()}
                className="bg-white p-2 rounded w-full md:w-auto"
              >
                Postorden
              </button>
            </div>
          )}

          {/* Controles de limpieza */}
          {selectedAction === 'Limpiar' && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                treeFunctions.deleteTree()
              }}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4"
            >
              <button className="bg-white p-2 rounded w-full md:w-auto">
                Limpiar
              </button>
            </form>
          )}

          {/* Área para el árbol */}
          <div
            className={`flex-grow bg-white rounded-lg shadow-md flex items-center justify-center overflow-auto`}
            style={{
              padding: '1rem',
              height: '100%',
              width: '100%',
              aspectRatio: '16 / 9',
            }}
          >
            <div style={{ width: '100%', height: '100%', maxWidth: '100%' }}>
              {children}
            </div>
          </div>

          {/* Área de resultado del recorrido */}
          {selectedAction === 'Recorridos' && (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-lg font-bold mb-2">
                Resultado del Recorrido
              </h2>
              {/**Validación para mostrar el recorrido correcto**/}
              <p>
                {values.preorden
                  ? values.preorden
                  : values.postorden
                    ? values.postorden
                    : values.inorden
                      ? values.inorden
                      : null}
              </p>
            </div>
          )}
        </div>

        {/* Controles y Área para el código */}
        <div className="flex-shrink-0 w-full md:w-1/4 bg-transparent p-4 flex flex-col gap-4 h-full">
          {/* Controles de Selección */}
          <select
            className="p-2 border border-gray-300 rounded mb-4"
            value={selectedAction}
            onChange={(e) => {
              treeFunctions.resetValues()
              setSteps([])
              setSelectedAction(e.target.value)
            }}
          >
            <option hidden>Seleccione una operación</option>
            <option>Crear</option>
            <option>Insertar</option>
            <option>Eliminar</option>
            <option>Buscar</option>
            <option>Recorridos</option>
            <option>Limpiar</option>
          </select>

          {/* Área de Código */}
          <div className="bg-white p-4 rounded-lg shadow-md flex-grow overflow-auto">
            <h2 className="text-lg font-bold mb-2">Código</h2>
            <pre className="whitespace-pre-wrap break-words">
              <code>
                {steps?.map((step, i) => (
                  <div key={i}>{step}</div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
