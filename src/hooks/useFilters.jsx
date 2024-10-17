import { useContext } from 'react'
import { FilterContext } from '../context/FilterContext'

const useFilters = () => {
  //Obtenemos el filtro del contexto
  const { filter } = useContext(FilterContext)

  //Ordena los arboles dependiendo del filtro
  const filterTrees = ({ trees }) => {
    //Copiamos el arreglo
    let array = [...trees]

    //Si existe la query buscamos por ella
    if (filter.query != '') {
      array = array.filter((tree) =>
        tree.title.toLowerCase().includes(filter.query)
      )
    }

    //Si es "abc" ordenamos por titulo (String)
    if (filter.sortBy === 'abc') {
      array.sort((a, b) => a.title.localeCompare(b.title))
    }
    //Si es "complexity" ordenamos por complejididad (Number).
    if (filter.sortBy === 'complexity') {
      array.sort((a, b) => a.complexity - b.complexity)
    }

    //Devolvemos el arreglo
    return array
  }

  return {
    filter,
    filterTrees,
  }
}

export default useFilters
