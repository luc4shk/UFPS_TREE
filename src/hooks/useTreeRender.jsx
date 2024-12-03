import * as d3 from 'd3'
import { useState, useRef, useEffect } from 'react'
import { drawRecorrido } from '../components/draws/ArbolBST/recorrido/Recorrido'
import { pathNewNode } from '../components/draws/ArbolBST/path/PathNewNode'
import { validarElemento } from '../components/draws/utils/validarElemento'

const useTreeRender = ({
  tree,
  values,
  positions,
  setPositions,
  setSteps,
  convertirData,
  actions,
  treeIsEmpty,
}) => {
  const [treeData, setTreeData] = useState(null)
  const [prevData, setPrevData] = useState(null)
  const svgRef = useRef(null)
  const firstLoad = useRef(true)

  // Cada vez que el árbol cambie, lo convertimos a la estructura jerárquica
  useEffect(() => {
    const dataTree = convertirData(tree)
    setTreeData((prev) => {
      setPrevData(prev)
      return dataTree
    })
  }, [tree])

  console.log('raiz', tree)

  //Reenderizamos otra vez el arbol cada vez que cambie la estructura o los valores
  useEffect(() => {
    //Validamos si no hay data
    if (!treeData) return

    //si el arbol esta vacio reseteamos las posiciones
    const updateTree = async () => {
      if (treeIsEmpty === 0) {
        setPositions({})
      }

      //Creamos la raiz del arbol para dibujar
      const root = d3.hierarchy(treeData)
      //Creamos la raiz del arbol anterior para dibujar
      const prevRoot = d3.hierarchy(prevData)

      //Definimos tamaños y margenes para el svg
      const width = 628
      const height = 416
      const margin = { top: 50, right: 50, bottom: 50, left: 50 }
      const svgWidth = width + margin.left + margin.right
      const svgHeight = height + margin.top + margin.bottom

      //Limpiamos el svg
      d3.select('#tree-svg').selectAll('*').remove()

      //Empezamos a dibujar
      const svg = d3
        .select('#tree-svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const treeLayout = d3
        .tree()
        .size([width, height])
        .separation(() => 1)

      treeLayout(root)
      treeLayout(prevRoot)
      svg.selectAll('*').remove() // Limpiar el SVG

      if (
        values.toAdd &&
        treeIsEmpty >= 1 &&
        root.find((d) => validarElemento(d.data.name, values.toAdd))
      ) {
        await actions.addNode(root, svg, firstLoad, positions, values, setSteps)
        return
      } else if (values.toAdd && treeIsEmpty === 0) {
        actions.addFirst(svg, root, positions, values, setSteps)
        return
      }

      if (
        values.toDelete &&
        prevRoot.find((d) => validarElemento(d.data.name, values.toDelete))
      ) {
        actions.deleteNode(
          svg,
          root,
          prevRoot,
          values,
          firstLoad,
          positions,
          setSteps,
          convertirData,
          setPrevData,
          tree
        )
        return
      }

      if (values.inorden || values.preorden || values.postorden) {
        if (values?.isB) {
          drawRecorrido(svg, values, 'rect')
        } else {
          drawRecorrido(svg, values)
        }
      }

      if (values.toSearch) {
        const nodoBuscar = root
          .descendants()
          .find((d) => validarElemento(d.data.name, values.toSearch))

        const ruta = root.path(nodoBuscar)
        if (values?.isB) {
          pathNewNode(svg, ruta, 'buscar', values, setSteps, 'rect')
        } else {
          pathNewNode(svg, ruta, 'buscar', values, setSteps)
        }
      }

      //Dibujamos normalmente el arbol si no hay ninguna operación
      actions.drawLinks(svg, root.links(), values, firstLoad)
      actions.drawNodes(svg, root.descendants(), root, positions, values)
    }

    updateTree()
    firstLoad.current = false
  }, [treeData, values])

  return { svgRef }
}

export default useTreeRender
