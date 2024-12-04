import {
  addFirstNodeAVL,
  addNodeDrawAVL,
  showAddTreeAVL,
} from "../draws/ArbolAVL/insertar/AddNodeDrawsAVL";
import {
  drawLinksAVL,
  drawLinksAfterAVL,
} from "../draws/ArbolAVL/insertar/AddLinkDrawsAVL";
import { drawNodesAVL } from "../draws/ArbolAVL/mostrar/AllNodesDrawsAVL";
import { pathNewNodeAVL } from "../draws/ArbolAVL/path/PathNewNodeAVL";
import { drawDeleteNodeAVL } from "../draws/ArbolAVL/eliminar/DeleteNodeDrawsAVL";

//Método que ejecuta la lógica para pintar un nodo si ya hay almenos uno
export const addNodeAVL = async (
  root,
  svg,
  firstLoad,
  positions,
  values,
  setSteps
) => {
  const nuevoNodo = root
    .descendants()
    .find((d) => d.data.name === values.toAdd);

  drawLinksAVL(svg, root.links(), values, firstLoad);
  addNodeDrawAVL(svg, root.descendants(), root, positions, values);

  const ruta = root.path(nuevoNodo);
  const rutaSinNodoNuevo = ruta.slice(0, ruta.length - 1);
  await pathNewNodeAVL(svg, rutaSinNodoNuevo, "insertar", values, setSteps);

  svg.selectAll("*").remove(); // Limpiar el SVG

  drawLinksAfterAVL(svg, root.links(), values, firstLoad);
  showAddTreeAVL(svg, root.descendants(), root, positions, values);
};

//Método que ejecuta la lógica para pintar el primer nodo
export const addFirstAVL = (svg, root, positions, values, setSteps) => {
  svg.selectAll("*").remove(); // Limpiar el SVG
  addFirstNodeAVL(svg, root.descendants(), root, positions, values, setSteps);
};

//Método que ejecuta la lógica para eliminar un nodo
export const deleteNodeAVL = async (
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
) => {
  svg.selectAll("*").remove(); // Limpiar el SVG
  const nodoEliminar = prevRoot
    .descendants()
    .find((d) => d.data.name == values.toDelete);

  const ruta = prevRoot.path(nodoEliminar);
  const rutaSinNodoNuevo = ruta;
  drawLinksAVL(svg, prevRoot.links(), values, firstLoad);
  //drawNodes2(svg, prevRoot.descendants(), prevRoot)
  drawDeleteNodeAVL(svg, prevRoot.descendants(), prevRoot, positions);

  await pathNewNodeAVL(svg, rutaSinNodoNuevo, "eliminar", values, setSteps);

  svg.selectAll("*").remove(); // Limpiar el SVG

  drawLinksAfterAVL(svg, root.links(), values);
  drawNodesAVL(svg, root.descendants(), root, positions, values);
  const dataTree = convertirData(tree);
  setPrevData(dataTree);
};
