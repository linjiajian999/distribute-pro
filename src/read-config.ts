// types
import {
  Config
} from '../types/index'
// node
import path from 'path'
import fs from 'fs'

function readConfig(): Config {
  let config: Config = {
    sourcePath: '',
    targetPath: '',
    include: [],
    exclude: []
  }
  console.log(path)
  // let configStr = getConfigStr()
  return config
}
function getConfigStr(): string {
  let configPath = path.resolve(__dirname, '../config.json')
  let buffer: Buffer = fs.readFileSync(configPath)
  let str = buffer.toJSON()
  console.log(str)
  return ''
}
export default readConfig