import { configLog } from './index'
import * as fs from 'fs'
import * as YAML from 'yaml'

export const prepareInit = () => {
  configLog({ type: 'main.ts', info: `当前环境为${process.env.CUSTOM_ENV}` })
  configLog({ type: 'main.ts', info: `当前版本为${'vlatest'}` })
  const conf = fs.readFileSync(
    `./conf/application${
      process.env.CUSTOM_ENV ? process.env.CUSTOM_ENV : ''
    }.yml`,
    'utf8',
  )
  global.conf = YAML.parse(conf)
}
