import { LayoutTree } from '../../components/LayoutTree'
import TreeRender from '../../components/TreeRender'
import useArbolBST from '../../hooks/useArbolBST'

export const PracticaArbolBST = () => {
  const {
    values,
    raiz,
    insertarNodo,
    removerNodo,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    vaciarArbol,
    insertRandomNodes,
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
        getPreOrden,
        getPostOrden,
        getInOrden,
        resetValues,
      }}
      values={values}
    >
      <TreeRender tree={!raiz ? {} : raiz} values={values} />
    </LayoutTree>
  )
}
