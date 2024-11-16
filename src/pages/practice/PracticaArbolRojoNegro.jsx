import { LayoutTree } from '../../components/LayoutTree'
import TreeRender from '../../components/TreeRender'
import useArbolRojiNegro from '../../hooks/useArbolRojiNegro'
import { convertirDataRN } from '../../components/draws/utils/ConvertirData'
import { addNodeRN, addFirstRN } from '../../components/actions/ActionsRN'
import { deleteNodeRN } from '../../components/actions/ActionsRN'
import { drawLinksRN } from '../../components/draws/ArbolRN/insertar/AddLinkDrawsRN'
import { drawNodesRN } from '../../components/draws/ArbolRN/mostrar/AllNodesDrawsRN'

export const PracticaArbolRojoNegro = () => {
  window.addEventListener('beforeunload', function (event) {
    // Personalizar el mensaje de confirmación (en la mayoría de navegadores, el mensaje no es personalizable)
    const mensaje = 'xddd'
    alert(mensaje)

    // Establecer el mensaje en el evento (esto es necesario para que el navegador lo muestre)
    event.returnValue = mensaje // Para navegadores antiguos
    return mensaje // Para otros navegadores modernos
  })
  const actions = {
    addNode: addNodeRN,
    addFirst: addFirstRN,
    deleteNode: deleteNodeRN,
    drawLinks: drawLinksRN,
    drawNodes: drawNodesRN,
  }

  const {
    arbolRN,
    raiz,
    values,
    insertarNodo,
    eliminarNodo,
    resetValues,
    isInTree,
    buscarNodoExacto,
    buscarNodoMayor,
    buscarNodoMenor,
    getPreOrden,
    getPostOrden,
    getInOrden,
    insertRandomNodes,
    vaciarArbol,
  } = useArbolRojiNegro()

  console.log(values)

  return (
    <LayoutTree
      values={values}
      title={'Árbol Rojo y Leonardo'}
      containerColor={'#74f50b'}
      linkColor={'#74f50b'}
      treeFunctions={{
        addNode: insertarNodo,
        deleteNode: eliminarNodo,
        searchNode: buscarNodoExacto,
        searchMaximiumNode: buscarNodoMayor,
        searchMinimiumNode: buscarNodoMenor,
        deleteTree: vaciarArbol,
        createTreeByNodes: insertRandomNodes,
        isInTree,
        getPreOrden,
        getPostOrden,
        getInOrden,
        resetValues,
      }}
    >
      <TreeRender
        tree={raiz ? raiz : {}}
        values={values}
        convertirData={convertirDataRN}
        actions={actions}
        treeIsEmpty={arbolRN.altura()}
      />
    </LayoutTree>
  )
}
