import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
const NavBar = () => {
  //Estado para el input
  const [query, setQuery] = useState('')

  //Método para actualizar el valor del estado cuando se actualice el valor input
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  //Método para resetear el valor de el input
  const handleClick = () => {
    setQuery('')
  }

  return (
    <header className="w-full bg-white">
      <div className=" m-auto flex flex-col sm:flex-row sm:flex items-center sm:justify-between px-6 w-full  max-w-[1200px] bg-white h-32 sm:h-24 gap-2 sm:gap-10 ">
        <h1 className="text-2xl lg:w-60 font-semibold">Simulador UFPS_TREE</h1>
        <div className="flex lg:w-64 items-center bg-white p-1 border border-black rounded-full ">
          <input
            type="text"
            onChange={handleChange}
            value={query}
            className="w-52 sm:w-52 px-2 lg:w-64 outline-none"
            placeholder="Arbol AVL, Arbol BST..."
          />
          <TiDelete
            className="cursor-pointer rounded-full"
            size={25}
            onClick={handleClick}
          />
        </div>
        <select className="w-60 md:w-64 p-1 border rounded">
          <option>Alfabeticamente</option>
        </select>
      </div>
    </header>
  )
}

export default NavBar
