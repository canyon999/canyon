import * as libCoverage from 'istanbul-lib-coverage'
import * as libSourceMaps from 'istanbul-lib-source-maps'

export function mergeFileCoverage(first, second) {
  const ret = JSON.parse(JSON.stringify(first))
  let i
  delete ret.l
  second.s.forEach(function (item, index) {
    ret.s[index] += second.s[index]
  })
  second.f.forEach(function (item, index) {
    ret.f[index] += second.f[index]
  })
  second.b.forEach(function (item, index) {
    for (i = 0; i < ret.b[index].length; i += 1) {
      ret.b[index][i] += second.b[index][i]
    }
  })
  return ret
}

export async function mergeCoverage(coverages) {
  return coverages.reduce((previousValue: any, currentValue: any) => {
    for (let i = 0; i < currentValue.length; i++) {
      const index = previousValue.findIndex(
        (item) => currentValue[i].path === item.path,
      )
      if (index !== -1) {
        previousValue[index] = mergeFileCoverage(
          previousValue[index],
          currentValue[i],
        )
      } else {
        previousValue.push(currentValue[i])
      }
    }
    return previousValue
  }, [])
}

function remapCoverage(obj, codePath) {
  // sourcMap这边要把codePath加上！！！！！
  return libSourceMaps
    .createSourceMapStore()
    .transformCoverage(libCoverage.createCoverageMap(obj))
    .then((res) => {
      const { data } = res
      const o = {}
      // 有sourcMap的覆盖率对象会把前缀codePath删掉，所以要匹配加回来
      for (const dataKey in data) {
        let r = dataKey
        if (dataKey.match(codePath)) {
        } else {
          r = codePath + dataKey
        }
        o[r] = data[dataKey]['data']
      }
      return o
    })
}
