import { LayoutTree } from '../../components/LayoutTree'
import TreeRender from '../../components/TreeRender'
import { drawNodes } from '../../components/draws/ArbolBST/mostrar/AllNodesDraws'
import { drawLinks } from '../../components/draws/ArbolBST/insertar/AddLinkDraws'
import useArbolBST from '../../hooks/useArbolBST'
import { convertirDataBST } from '../../components/draws/utils/ConvertirData'
import {
  addNode,
  addFirst,
  deleteNode,
} from '../../components/actions/ActionsBST'

export const PracticaArbolBST = () => {
  const actions = {
    addNode,
    addFirst,
    deleteNode,
    drawNodes,
    drawLinks,
  }
  const {
    arbolBST,
    values,
    raiz,
    insertarNodo,
    removerNodo,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    vaciarArbol,
    insertRandomNodes,
    nodoInsertado,
    getPreOrden,
    getPostOrden,
    getInOrden,
    resetValues,
  } = useArbolBST()

  return (
    <LayoutTree
      title={'Árbol BST'}
      containerColor={'#7e22ce'}
      linkColor={'#7e22ce'}
      treeFunctions={{
        addNode: insertarNodo,
        deleteNode: removerNodo,
        searchNode: buscarNodoExacto,
        searchMaximiumNode: buscarNodoMayor,
        searchMinimiumNode: buscarNodoMenor,
        deleteTree: vaciarArbol,
        createTreeByNodes: insertRandomNodes,
        isInTree: nodoInsertado,
        getPreOrden,
        getPostOrden,
        getInOrden,
        resetValues,
      }}
      values={values}
    >
      <TreeRender
        tree={!raiz ? {} : raiz}
        values={values}
        convertirData={convertirDataBST}
        actions={actions}
        treeIsEmpty={arbolBST.getAltura()}
      />
    </LayoutTree>
  )
}
