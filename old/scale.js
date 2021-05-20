import d3 from "d3";

function scale (domainMax, rangeMax, value) {
  let res = d3.scale
    .linear()
    .domain([0, domainMax])
    .range([0, rangeMax])
  
  return res(value)
}

scale(2000, 1000, 1000)
