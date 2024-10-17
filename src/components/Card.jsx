import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ButtonLink = ({ bgColor, to, text }) => {
  return (
    <Link to={to}>
      <motion.button
        style={{ backgroundColor: bgColor }}
        className={`rounded-full italic  w-24 py-1 text-center shadow-black shadow`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {text}
      </motion.button>
    </Link>
  )
}

const Card = ({ bgCard, img, title, bgButton, toConceptos, toPracticar }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      style={{ backgroundColor: bgCard }}
      className={`rounded-2xl text-white w-[21rem] p-6 flex flex-col gap-4 items-center justify-center`}
    >
      <h3 className="font-bold text-xl">{title}</h3>
      <img
        className="rounded-2xl object-fill h-44 w-full"
        src={img}
        alt="Imagen de un tipo de Arbol Binario"
      />
      <div className="flex justify-between items-center w-full">
        <ButtonLink bgColor={bgButton} text={'Conceptos'} to={toConceptos} />
        <ButtonLink bgColor={bgButton} text={'Practicar'} to={toPracticar} />
      </div>
    </motion.div>
  )
}

export default Card
