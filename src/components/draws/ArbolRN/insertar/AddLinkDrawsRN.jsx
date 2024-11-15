import { drawBaseLinks } from '../../utils/BaseLinksDraws'

export const drawLinksRN = (svg, links, values, firstLoad) => {
  console.log('dibujando')
  const filterFunc = () => {
    console.log(links)
    return links.filter(
      (link) =>
        link.source.data.name !== 'Empty' &&
        link.target.data.name !== 'Empty' &&
        //link.source.data.name !== null &&
        //link.target.data.name !== null &&
        !(
          link.source.data.name == values.toAdd ||
          (link.target.data.name == values.toAdd && values.toAdd != null)
        )
    )
  }

  const durationFunc = (d) => {
    console.log(values.toAdd)
    if (values.toAdd || values.randomNodes) {
      return d.target.data.name === values.toAdd && values.toAdd != null
        ? 2000
        : 1000
    } else {
      return d.target.data.name === values.toAdd && values.toAdd != null
        ? 2000
        : 0
    }
  }

  drawBaseLinks(svg, links, filterFunc, durationFunc)
}

export const drawLinksAfterRN = (svg, links, values) => {
  const filterFunc = () => {
    return links.filter(
      (link) =>
        link.source.data.name !== 'Empty' && link.target.data.name !== 'Empty' //&&
      //link.source.data.name !== null &&
      //link.target.data.name !== null
    )
  }

  const durationFunc = (d) => {
    if (values.toDelete) return 2000
    return d.target.data.name === values.toAdd ? 2000 : 0
  }

  drawBaseLinks(svg, links, filterFunc, durationFunc)
}
