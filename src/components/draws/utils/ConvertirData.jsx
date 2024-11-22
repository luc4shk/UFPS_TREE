// Función para convertir el árbol de datos en formato jerárquico
export const convertirDataBST = (node) => {
  if (!node) return null

  const children = []

  if (node.izq) {
    children.push(convertirDataBST(node.izq))
  } else {
    // Si el hijo izquierdo es null, añadimos un nodo invisible
    children.push({
      name: 'Empty', // Nodo invisible
      children: [],
    })
  }

  if (node.der) {
    children.push(convertirDataBST(node.der))
  } else {
    // Si el hijo derecho es null, añadimos un nodo invisible
    children.push({
      name: 'Empty', // Nodo invisible
      children: [],
    })
  }

  return {
    name: node.info,
    children: children.filter((child) => child !== null), // Filtra nodos null
  }
}

// Función para convertir el árbol de datos en formato jerárquico
export const convertirDataRN = (node) => {
  if (!node) return null

  const children = []

  if (node.izquierda) {
    children.push(convertirDataRN(node.izquierda))
  } else {
    // Si el hijo derecho es null, añadimos un nodo invisible
    children.push({
      name: 'Empty', // Nodo invisible
      color: 1,
      children: [],
    })
  }

  if (node.derecha) {
    children.push(convertirDataRN(node.derecha))
  } else {
    // Si el hijo derecho es null, añadimos un nodo invisible
    children.push({
      name: 'Empty', // Nodo invisible
      color: 1,
      children: [],
    })
  }

  return {
    name: node.valor,
    color: node.color,
    padre: node.padre,
    children: children.filter((child) => child !== null), // Filtra nodos null
  }
}

// Función para convertir el árbol de datos en formato jerárquico
export const convertirDataAVL = (node) => {
  console.log("NODOOOO",node)
  if (!node) return null

  const children = []

  if (node.izq) {
    children.push(convertirDataAVL(node.izq))
  } else {
    // Si el hijo izquierdo es null, añadimos un nodo invisible
    children.push({
      name: 'Empty', // Nodo invisible
      children: [],
    })
  }

  if (node.der) {
    children.push(convertirDataAVL(node.der))
  } else {
    // Si el hijo derecho es null, añadimos un nodo invisible
    children.push({
      name: 'Empty', // Nodo invisible
      children: [],
    })
  }

  return {
    name: node.info,
    padre: node.padre,
    children: children.filter((child) => child !== null), // Filtra nodos null
  }
}
