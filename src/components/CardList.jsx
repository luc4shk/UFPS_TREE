import Card from './Card'

const CardList = () => {
  const cards = [
    {
      title: 'Árbol BST',
      img: 'https://aprende.olimpiada-informatica.org/sites/default/files/inline-images/BST.png',
      bgCard: '#7309b6',
      bgButton: '#b064d4',
      toConceptos: '',
      toPracticar: '',
    },
    {
      title: 'Árbol B y B+',
      img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6uxV6yeyM6vLUspnMmz78vte7XykZ18ZIC99gbdU3Fe2cN9f0vkrDg98eAw6jMstRSR9IUS3wTykqnXmT2Z69NoThtbn2Jl-IIi4NOR0KFeJzZUuXw_-9rEqwg8BOin4ePTkfHPuPYE0/s1600/B13.jpg.jpg',
      bgCard: '#50ccf4',
      bgButton: '#90def6',
      toConceptos: '',
      toPracticar: '',
    },
    {
      title: 'Árbol AVL',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbRIU2RQuxXLx8pL0LZmXtYrV_Lq-lSmsP6Q&s',
      bgCard: '#ff5501',
      bgButton: '#ff9460',
      toConceptos: '',
      toPracticar: '',
    },
    {
      title: 'Árbol Rojo-Negro',
      img: 'https://cdn.javarush.com/images/article/9a5b5d15-c32b-4b6f-9f8e-b1d12908379c/1024.jpeg',
      bgCard: '#0efe46',
      bgButton: '#6bfe8c',
      toConceptos: '',
      toPracticar: '',
    },
  ]

  return (
    <main className="max-w-[1200px] w-full grid grid-cols-auto-fit-400 m-auto justify-items-center gap-11 py-4">
      {cards.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          img={item.img}
          bgCard={item.bgCard}
          bgButton={item.bgButton}
          toConceptos={'#'}
          toPracticar={'#'}
        />
      ))}
    </main>
  )
}

export default CardList
