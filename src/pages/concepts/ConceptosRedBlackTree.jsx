import { TreeSlides } from "../../components/TreeSlides";


export const ConceptosRedBlackTree = () => {
    const slides = [
        {
            title: 'Árbol Roji-Negro',
            content: (
                <div className="text-center">
                    Un Árbol Roji-Negro es una estructura de datos de árbol binario balanceado que asegura que las operaciones
                    como búsqueda, inserción y eliminación tengan una complejidad de tiempo promedio de <b>O(log n)</b>.<br /><br />
                    Es utilizado en aplicaciones donde se necesita mantener un balance automático del árbol, como en bases de
                    datos y sistemas de archivos.<br /><br />
                    <b>&quot;Los Árboles Roji-Negros garantizan que el árbol siempre esté balanceado.&quot;</b>
                </div>
            ),
        },
        {
            title: 'Propiedades de un Árbol Roji-Negro',
            content: (
                <ul className="list-disc list-inside">
                    <li><b>Nodos</b>: Cada nodo tiene un color asociado, ya sea rojo o negro.</li>
                    <li><b>Raíz negra</b>: La raíz del árbol siempre es negra.</li>
                    <li>
                        <b>Hojas negras</b>: Todas las hojas (nodos nulos) son negras.
                    </li>
                    <li>
                        <b>Propiedad de balance</b>: En cualquier camino desde la raíz a una hoja, la cantidad de nodos negros
                        es la misma (propiedad de negro-altura).
                    </li>
                    <li>
                        <b>Nodos rojos</b>: Si un nodo es rojo, ambos hijos deben ser negros (no pueden existir dos nodos rojos consecutivos).
                    </li>
                </ul>
            ),
        },
        {
            title: 'Operaciones en un Árbol Roji-Negro',
            content: (
                <ul className="list-disc list-inside">
                    <li>
                        <b>Inserción</b>: Se inserta un nodo como en un BST, pero se aplican rotaciones y recoloreos para
                        mantener las propiedades del árbol.
                    </li>
                    <li>
                        <b>Eliminación</b>: Similar a la inserción, puede requerir recoloreos y rotaciones para restaurar el
                        balance.
                    </li>
                    <li>
                        <b>Búsqueda</b>: Igual que en un BST, moviéndose a la izquierda o derecha según el valor.
                    </li>
                </ul>
            ),
        },
        {
            title: 'Rotaciones en un Árbol Roji-Negro',
            content: (
                <ul className="list-disc list-inside">
                    <li>
                        <b>Rotación izquierda</b>: Se utiliza para reestructurar subárboles cuando un nodo rojo viola la propiedad
                        del árbol.
                    </li>
                    <li>
                        <b>Rotación derecha</b>: Similar a la rotación izquierda, pero en la dirección opuesta.
                    </li>
                    <li>
                        Las rotaciones son operaciones clave para mantener el balance y garantizar la eficiencia.
                    </li>
                </ul>
            ),
        },
        {
            title: 'Eficiencia de los Árboles Roji-Negros',
            content: (
                <ul className="list-disc list-inside">
                    <li>
                        <b>Complejidad de tiempo</b>: Todas las operaciones principales (búsqueda, inserción, eliminación) tienen
                        una complejidad de O(log n).
                    </li>
                    <li>
                        <b>Balance automático</b>: Garantiza un árbol balanceado, evitando los peores casos de los BST normales.
                    </li>
                </ul>
            ),
        },
        {
            title: 'Aplicaciones de los Árboles Roji-Negros',
            content: (
                <ul className="list-disc list-inside">
                    <li><b>Bases de datos</b>: Utilizados para mantener índices balanceados.</li>
                    <li><b>Sistemas de archivos</b>: Organizan archivos de manera eficiente.</li>
                    <li>
                        <b>Compiladores</b>: En la construcción de tablas de símbolos y optimización de código.
                    </li>
                    <li>
                        <b>Redes</b>: Enrutamiento y procesamiento eficiente de datos.
                    </li>
                </ul>
            ),
        },
    ];

    return (
        <TreeSlides slides={slides}></TreeSlides>
    )
}
