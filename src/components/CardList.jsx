import useFilters from '../hooks/useFilters'
import Card from './Card'
import data from '../data'
import { AnimatePresence } from 'framer-motion'

const CardList = () => {
  //Obtenemos la función para filtrar los árboles
  const { filterTrees } = useFilters()

  //Filtramos los árboles
  const trees = filterTrees({ trees: data })

  return (
    <main className="max-w-[1200px] w-full grid grid-cols-auto-fit-400 m-auto justify-items-center gap-11 py-4">
      <AnimatePresence>
        {trees.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            img={item.img}
            bgCard={item.bgCard}
            bgButton={item.bgButton}
            toConceptos={item.toConceptos}
            toPracticar={item.toPracticar}
          />
        ))}
      </AnimatePresence>
    </main>
  )
}

export default CardList
