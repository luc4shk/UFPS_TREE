import { validarElemento } from '../../utils/validarElemento'
export const pathNewNode = (
  svg,
  nodes,
  action,
  values,
  setSteps,
  atSelect = 'circle'
) => {
  return new Promise((resolve) => {
    setSteps([])
    const interval = 2000 // 2 segundos
    let index = 0 // Para llevar el seguimiento del nodo actual

    const pathNodes = nodes

    // Iniciamos el intervalo
    const intervalId = setInterval(() => {
      // Si ya llegamos al final de los nodos, detenemos el intervalo
      if (index >= pathNodes.length) {
        resolve() // Resolvemos la promesa
        clearInterval(intervalId)
        return
      }

      // Seleccionamos el nodo en la posición actual
      const currentNode = pathNodes[index]

      svg
        .selectAll('g.node')
        .filter((d) => d === currentNode) // Filtramos el nodo actual
        .select(atSelect)
        .transition()
        .duration(400)
        .style('fill', (d) => {
          if (values.toAdd == d.data.name) return 'dodgerblue'
          if (values.toDelete == d.data.name) return 'tomato'
          if (validarElemento(d.data.name, values.toSearch)) return 'violet'
          return '#999'
        })
        .style('stroke-width', (d) => {
          if (action === 'insertar') {
            doAddSteps(values.toAdd, d, 'Insertando', setSteps, values)
          }
          if (action === 'eliminar') {
            doDeleteSteps(values.toDelete, d, setSteps)
          }
          if (action === 'buscar') {
            doSearchSteps(values.toSearch, d, setSteps)
          }
          return values.toAdd === d.data.name ? 'black' : 'black'
        })

      // Avanzamos al siguiente nodo para la siguiente iteración
      index++
    }, interval)
  })
}

//Pasos para cuando se agrega un nodo
const doAddSteps = (value, d, text, setSteps, values) => {
  if (Number(value > d.data.name)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${d.data.name} \u279E \u2705 \n \t`}
        <span style={{ color: 'red', fontWeight: 'bold' }}>Ir Derecha</span>
      </>,
    ])
  } else if (Number(value < d.data.name)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${d.data.name} \u279E  \u274C \n \t`}
        <span style={{ color: 'blue', fontWeight: 'bold' }}>Ir Izquierda</span>
      </>,
    ])
  }
  if (
    d.data.children[0].name == value ||
    (d.data.children[1].name == value && values)
  ) {
    setSteps((prev) => [
      ...prev,
      <>
        <br />
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          {text} {value}...
        </span>
      </>,
    ])
  }
}

//Pasos para eliminar un nodo
const doDeleteSteps = (value, d, setSteps) => {
  // Primero, verifica si el nodo actual coincide con el valor a eliminar
  if (d.data.name === value) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} == ${d.data.name} \u279E \u2705 \n \t`}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          Eliminando {value}...
        </span>
      </>,
    ])
    return // Salir si se encontró el nodo
  } else {
    // Si no coincide, muestra que son diferentes
    setSteps((prev) => [...prev, <>{`${value} == ${d.data.name} \u274C \t`}</>])
  }

  // Luego verifica si el nodo actual es mayor o menor
  if (Number(value) > Number(d.data.name)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${d.data.name} \u279E \u2705 \n \t`}
        <span
          style={{ color: 'red', fontWeight: 'bold' }}
        >{`Ir Derecha \n \n`}</span>
      </>,
    ])
  } else {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${d.data.name} \u279E \u274C \n \t`}
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {`Ir Izquierda \n \n`}
        </span>
      </>,
    ])
  }
}

//Pasoso para buscar un nodo
/*const doSearchSteps = (value, d, setSteps) => {
  // Primero, verifica si el nodo actual coincide con el valor a eliminar
  console.log(d)
  if (validarElemento(d.data.name, value)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} == ${d.data.name} \u279E \u2705 \n \t`}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          Nodo encontrado
        </span>
      </>,
    ])
    return // Salir si se encontró el nodo
  } else {
    // Si no coincide, muestra que son diferentes
    setSteps((prev) => [...prev, <>{`${value} == ${d.data.name} \u274C \t`}</>])
  }

  // Luego verifica si el nodo actual es mayor o menor
  if (Number(value) > Number(d.data.name)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${d.data.name} \u279E \u2705 \n \t`}
        <span
          style={{ color: 'red', fontWeight: 'bold' }}
        >{`Ir Derecha \n \n`}</span>
      </>,
    ])
  } else {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${d.data.name} \u279E \u274C \n \t`}
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          {`Ir Izquierda \n \n`}
        </span>
      </>,
    ])
  }
}*/

const doSearchSteps = (value, d, setSteps) => {
  // Primero, verifica si el nodo actual coincide con el valor a buscar
  console.log(d)

  // Validamos si el valor a buscar está en la cadena de llaves del nodo
  if (validarElemento(d.data.name, value)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} == ${d.data.name} \u279E \u2705 \n \t`}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          Nodo encontrado
        </span>
      </>,
    ])
    return // Salir si se encontró el nodo
  } else {
    // Si no coincide, muestra que son diferentes
    setSteps((prev) => [...prev, <>{`${value} == ${d.data.name} \u274C \t`}</>])
  }

  // Convertimos las llaves del nodo en un array de números para evaluar correctamente
  const nodeKeys = String(d.data.name).includes('|')
    ? d.data.name.split('|').map((val) => Number(val.trim())) // Si hay '|', lo dividimos y convertimos en números
    : [Number(String(d.data.name).trim())] // Si no, solo lo convertimos en un solo valor

  // Evaluar si el valor debe ir a la izquierda o a la derecha
  if (value > Math.max(...nodeKeys)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} > ${nodeKeys}\u279E \u2705 \n \t`}
        <span style={{ color: 'red', fontWeight: 'bold' }}>Ir Derecha</span>
      </>,
    ])
    // Avanzar hacia la derecha
  } else if (value < Math.min(...nodeKeys)) {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} < ${nodeKeys} \u279E \u2705 \n \t`}
        <span style={{ color: 'blue', fontWeight: 'bold' }}>Ir Izquierda</span>
      </>,
    ])
  } else {
    setSteps((prev) => [
      ...prev,
      <>
        {`${value} está entre ${Math.min(...nodeKeys)} y ${Math.max(...nodeKeys)} \u279E \u274C \n \t`}
        <span style={{ color: 'orange', fontWeight: 'bold' }}>
          Zona central
        </span>
      </>,
    ])
  }

  // Continuar con el ciclo si es necesario
}
