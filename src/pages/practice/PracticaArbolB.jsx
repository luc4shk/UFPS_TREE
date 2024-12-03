import { LayoutTree } from '../../components/LayoutTree'
import TreeRender from '../../components/TreeRender'
import useArbolB from '../../hooks/useArbolB'
import { convertirDataB } from '../../components/draws/utils/ConvertirData'
import { deleteNodeB } from '../../components/actions/ActionsB'
import { drawLinksRN } from '../../components/draws/ArbolRN/insertar/AddLinkDrawsRN'
import { drawLinksB } from '../../components/draws/ArbolB/insertar/AddLinkDrawsB'
import { addNodeB, addFirstB } from '../../components/actions/ActionsB'
import { drawNodesB } from '../../components/draws/ArbolB/mostrar/AllNodesDrawsB'

export const PracticaArbolB = () => {
  const {
    arbolB,
    values,
    raiz,
    isInTree,
    resetValues,
    insertarNodo,
    insertRandomNodes,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    getPreOrden,
    getPostOrden,
    getInOrden,
    eliminarNodo,
    vaciarArbol,
  } = useArbolB()

  console.log(raiz)

  const actions = {
    addNode: addNodeB,
    addFirst: addFirstB,
    deleteNode: deleteNodeB,
    drawLinks: drawLinksB,
    drawNodes: drawNodesB,
  }

  return (
    <LayoutTree
      values={values}
      title={'Árbol B'}
      containerColor={'#22d3ee'}
      treeFunctions={{
        resetValues,
        isInTree,
        addNode: insertarNodo,
        deleteNode: eliminarNodo,
        createTreeByNodes: insertRandomNodes,
        searchNode: buscarNodoExacto,
        deleteTree: vaciarArbol,
        searchMaximiumNode: buscarNodoMayor,
        searchMinimiumNode: buscarNodoMenor,
        getPreOrden,
        getPostOrden,
        getInOrden,
      }}
      linkColor={'#22d3ee'}
    >
      <TreeRender
        tree={raiz ? raiz : {}}
        values={values}
        convertirData={convertirDataB}
        actions={actions}
        treeIsEmpty={arbolB.obtenerAltura()}
      ></TreeRender>
    </LayoutTree>
  )
}
