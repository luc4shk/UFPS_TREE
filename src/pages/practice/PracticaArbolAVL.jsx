import { LayoutTree } from "../../components/LayoutTree";
import TreeRender from "../../components/TreeRender";
import useArbolAVL from "../../hooks/useArbolAVL";
import { convertirDataAVL } from "../../components/draws/utils/ConvertirData";
import {
  addNodeAVL,
  addFirstAVL,
  deleteNodeAVL,
} from "../../components/actions/ActionAVL";
import { drawLinksAVL } from "../../components/draws/ArbolAVL/insertar/AddLinkDrawsAVL";
import { drawNodesAVL } from "../../components/draws/ArbolAVL/mostrar/AllNodesDrawsAVL";

export const PracticaArbolAVL = () => {
  window.addEventListener("beforeunload", function (event) {
    // Personalizar el mensaje de confirmación (en la mayoría de navegadores, el mensaje no es personalizable)
    const mensaje = "alerta";
    alert(mensaje);

    // Establecer el mensaje en el evento (esto es necesario para que el navegador lo muestre)
    event.returnValue = mensaje; // Para navegadores antiguos
    return mensaje; // Para otros navegadores modernos
  });
  const actions = {
    addNode: addNodeAVL,
    addFirst: addFirstAVL,
    deleteNode: deleteNodeAVL,
    drawLinks: drawLinksAVL,
    drawNodes: drawNodesAVL,
  };

  const {
    arbolAVL,
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
  } = useArbolAVL();

  console.log(values);

  return (
    <LayoutTree
      values={values}
      title={"Árbol AVL"}
      containerColor={"rgb(255, 85, 1)"}
      linkColor={"rgb(255, 85, 1)"}
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
        convertirData={convertirDataAVL}
        actions={actions}
        treeIsEmpty={arbolAVL.getAltura()}
      />
    </LayoutTree>
  );
};
