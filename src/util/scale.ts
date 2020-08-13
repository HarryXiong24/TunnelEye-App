import * as d3 from 'd3';

function scale (value: number, domainMax: number, rangeMax: number) {
  let res = d3.scaleLinear()
  .domain([0, domainMax])
  .range([0, rangeMax])

  return res(value)
}

export default scale