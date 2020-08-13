import * as d3 from 'd3';

// 过滤函数
export function filter (arr: Array<number>[], rangeMax: number) {
  let domainMax = findMax(arr)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = scale(arr[i][j], domainMax, rangeMax)
    }
  }

  return arr
}

// 比例缩放
export function scale (value: number, domainMax: number, rangeMax: number) {
  const res = d3.scaleLinear()
  .domain([0, domainMax])
  .range([0, rangeMax])

  return res(value)
}

// 找二维数组里的最大值
export function findMax (arr: Array<number>[]) {
  let max = arr[0][0]
  arr.forEach( (val) => {
    val.forEach( (val) => {
      if (max < val) {
        max = val
      }
    })
  })

  return max
}
