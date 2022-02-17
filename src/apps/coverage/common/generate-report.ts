import * as libCoverage from 'istanbul-lib-coverage'
import * as libReport from 'istanbul-lib-report'
import * as reports from 'istanbul-reports'

export function generateReport({ codePath, globalCoverageVar }) {
  // 替换成本地运行目录 !!!!!!
  function replaceProcessCwd(coverageKey) {
    return process.cwd() + '/code/' + coverageKey
  }
  const obj = {}
  for (const coverageKey in globalCoverageVar) {
    obj[replaceProcessCwd(coverageKey)] = {
      ...globalCoverageVar[coverageKey],
      path: replaceProcessCwd(coverageKey),
    }
  }
  const map = libCoverage.createCoverageMap(obj)
  const configWatermarks: any = {
    statements: [50, 80],
    functions: [50, 80],
    branches: [50, 80],
    lines: [50, 80],
  }
  const context = libReport.createContext({
    dir: `report/${codePath}/`,
    defaultSummarizer: 'nested',
    watermarks: configWatermarks,
    coverageMap: map,
  })
  const report = reports.create('html', {})
  report.execute(context)
}
