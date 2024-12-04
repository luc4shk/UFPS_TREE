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

// Función para convertir el árbol B a un formato jerárquico para D3.js
export const convertirDataB = (nodo) => {
  if (!nodo) return null

  const children = []

  // Si el nodo no es hoja, se recorren sus hijos
  if (!nodo.esHoja) {
    for (let i = 0; i < nodo.hijos.length; i++) {
      const hijo = convertirDataB(nodo.hijos[i])

      // Si el hijo es null (es decir, es un nodo vacío), añadimos un nodo vacío
      /*      if (!hijo) {
        children.push({
          name: 'Empty', // Nodo invisible
          children: [], // No tiene hijos
        })
      } else {*/
      children.push(hijo)
      //}
    }
  }

  // Devolvemos el nodo con sus claves y los hijos
  return {
    name: nodo.llaves.join(' | '), // Las claves del nodo las mostramos como una cadena separada por comas
    children: children.length > 0 ? children : undefined, // Si no tiene hijos, no agregamos el campo "children"
  }
}

// Función para convertir el árbol de datos en formato jerárquico
export const convertirDataAVL = (node) => {
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
