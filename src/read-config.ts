// types
import {
  Config
} from '../types/index'
// node
import * as path from 'path'
import * as fs from 'fs'
import * as process from 'process'

function getInitialConfig(): Config {
  return {
    sourcePath: '',
    target: {
      demo: '',
      real: '',
    },
    include: [],
    exclude: []
  }
}
function readConfig(): Config {
  let configObject = getConfigObject()
  return configObject
}
function getConfigObject(): Config {
  let configPath = path.resolve(__dirname, '../config.json')
  let buffer: Buffer = fs.readFileSync(configPath)
  let str = buffer.toString()
  let config = getInitialConfig()
  try {
    config = JSON.parse(str)
  } catch(err) {
    config = getInitialConfig()
    console.log('解析配置文件错，请核对')
    console.log(`err: \n ${err}`)
    process.exit()
  }
  return config
}

let config: Config = readConfig()

export default config