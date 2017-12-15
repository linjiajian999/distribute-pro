// types
import {
  Config
} from '../types/index'
// node
import * as process from 'process'
import { type } from 'os';

let configjson: Config = require('../config.json')

function getInitialConfig(): Config {
  return {
    source: '',
    target: {
      demo: '',
      real: '',
    },
    include: [],
    exclude: []
  }
}
function readConfig(): Config {
  return getConfigObject()
}
function getConfigObject(): Config {
  let config = getInitialConfig()
  if (typeof configjson === 'object') {
    config = configjson
  } else {
    config = getInitialConfig()
    console.log('解析配置文件错，请核对')
    process.exit()
  }
  return config
}

let config: Config = readConfig()

export default config