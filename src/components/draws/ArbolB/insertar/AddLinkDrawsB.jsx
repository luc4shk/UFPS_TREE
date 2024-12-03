import { drawBaseLinks } from '../../utils/BaseLinksDraws'
import { validarElemento } from '../../utils/validarElemento'

export const drawLinksB = (svg, links, values, firstLoad) => {
  const filterFunc = () => {
    return links.filter(
      (link) =>
        link.source.data.name !== 'Empty' &&
        link.target.data.name !== 'Empty' &&
        link.source.data.name !== '' &&
        link.target.data.name !== '' &&
        !(
          validarElemento(link.source.data.name, values.toAdd) ||
          validarElemento(link.target.data.name, values.toAdd)
        )
    )
  }

  const durationFunc = (d) => {
    if (firstLoad.current || values.toAdd || values.randomNodes) {
      return validarElemento(d.target.data.name, values.toAdd) ? 2000 : 1000
    } else {
      return validarElemento(d.target.data.name, values.toAdd) ? 2000 : 0
    }
  }

  drawBaseLinks(svg, links, filterFunc, durationFunc)
}

export const drawLinksAfterB = (svg, links, values) => {
  const filterFunc = () => {
    return links.filter(
      (link) =>
        link.source.data.name !== 'Empty' &&
        link.target.data.name !== 'Empty' &&
        link.source.data.name !== '' &&
        link.target.data.name !== ''
    )
  }

  const durationFunc = (d) => {
    if (values.toDelete) return 2000
    return validarElemento(d.target.data.name, values.toAdd) ? 2000 : 0
  }

  drawBaseLinks(svg, links, filterFunc, durationFunc)
}
