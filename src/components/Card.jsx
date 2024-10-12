import { Link } from 'react-router-dom'

const ButtonLink = ({ bgColor, to, text }) => {
  return (
    <Link
      style={{ backgroundColor: bgColor }}
      className={`rounded-full italic  w-24 py-1 text-center shadow-black shadow`}
      to={to}
    >
      {text}
    </Link>
  )
}

const Card = ({ bgCard, img, title, bgButton, toConceptos, toPracticar }) => {
  return (
    <div
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
    </div>
  )
}

export default Card
