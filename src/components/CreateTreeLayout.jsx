export const CreateTreeLayout = ({ title, containerColor }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-8">{title}</h1>

      {/* Contenedor principal */}
      <div
        className={`p-8 rounded-lg flex flex-col md:flex-row gap-8 w-[90vw] max-w-5xl`}
        style={{ backgroundColor: containerColor }}
      >
        {/* Sección de entrada y creación de nodos */}
        <div className="flex flex-col w-full md:w-1/4 gap-4">
          <label htmlFor="nodeCount" className="text-white font-semibold">
            Digite la cantidad de nodos a crear
          </label>
          <input
            id="nodeCount"
            type="number"
            className="p-2 rounded border border-gray-300"
          />
          <button className="p-2 bg-white text-purple-700 font-bold rounded shadow-md">
            Crear
          </button>
        </div>

        {/* Área para la visualización del árbol */}
        <div className="flex-grow bg-white rounded-lg shadow-md h-64 md:h-full"></div>

        {/* Sección de controles adicionales */}
        <div className="flex-shrink-0 w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
          <select className="p-2 border border-gray-300 rounded mb-4">
            <option hidden>Seleccione una operación</option>
            <option>Crear</option>
            <option>Insertar</option>
            <option>Eliminar</option>
            <option>Buscar</option>
            <option>Recorridos</option>
            <option>Limpiar</option>
          </select>
          <div className="bg-gray-100 p-4 rounded h-full">
            <p className="font-semibold">Código</p>
            <pre className="text-sm">
              insert v check balance factor of this and its children case1:
              this.rotateRight case2: this.left.rotateLeft, this.rotateRight
              case3: this.rotateLeft case4: this.right.rotateRight,
              this.rotateLeft this is balanced
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
