import { drawBaseLinks } from '../../utils/BaseLinksDraws'

export const drawLinks = (svg, links, values, firstLoad) => {
  const filterFunc = () => {
    return links.filter(
      (link) =>
        link.source.data.name !== 'Empty' &&
        link.target.data.name !== 'Empty' &&
        !(
          link.source.data.name == values.toAdd ||
          link.target.data.name == values.toAdd
        )
    )
  }

  const durationFunc = (d) => {
    if (firstLoad.current || values.toAdd || values.randomNodes) {
      return d.target.data.name === values.toAdd ? 2000 : 1000
    } else {
      return d.target.data.name === values.toAdd ? 2000 : 0
    }
  }

  drawBaseLinks(svg, links, filterFunc, durationFunc)
}

export const drawLinksAfter = (svg, links, values) => {
  const filterFunc = () => {
    return links.filter(
      (link) =>
        link.source.data.name !== 'Empty' && link.target.data.name !== 'Empty'
    )
  }

  const durationFunc = (d) => {
    if (values.toDelete) return 2000
    return d.target.data.name === values.toAdd ? 2000 : 0
  }

  drawBaseLinks(svg, links, filterFunc, durationFunc)
}
