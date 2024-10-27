import { useContext } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FilterContext } from '../context/FilterContext'
const NavBar = () => {
  //Llamamos al filter y a su función de seteo
  const { filter, setFilter } = useContext(FilterContext)

  //Vaciamos la query
  const handleClick = () => {
    setFilter((prev) => ({
      ...prev,
      query: '',
    }))
  }

  //Acualizamos el sortBy cuando el valor del select cambie
  const sortByChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: e.target.value,
    }))
  }

  //Actualizamos la query cuando el valor del input cambie
  const filterByQuery = (e) => {
    setFilter((prev) => ({
      ...prev,
      query: e.target.value.toLowerCase(),
    }))
  }

  return (
    <header className="w-full bg-white">
      <div className=" m-auto flex flex-col sm:flex-row sm:flex items-center sm:justify-between px-6 w-full  max-w-[1200px] bg-white h-32 sm:h-24 gap-2 sm:gap-10 ">
        <h1 className="text-2xl md:w-64 lg:w-72 font-semibold">
          Simulador UFPS_TREE
        </h1>
        <div className="flex min-w-64 lg:w-64 items-center bg-white p-1 border border-black rounded-full overflow-hidden">
          <input
            type="text"
            onChange={filterByQuery}
            value={filter.query}
            className="w-52 sm:w-52 px-2 lg:w-64 outline-none"
            placeholder="Arbol AVL, Arbol BST..."
          />
          <TiDelete
            className="cursor-pointer rounded-full"
            size={25}
            onClick={handleClick}
          />
        </div>
        <select
          onChange={sortByChange}
          className="w-60 md:w-64 lg:w-72 p-1 border rounded"
        >
          <option value="none">Por defecto</option>
          <option value="abc">Alfabeticamente</option>
          <option value="complexity">Por Complejidad</option>
        </select>
      </div>
    </header>
  )
}

export default NavBar
