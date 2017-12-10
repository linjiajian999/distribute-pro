import * as path from 'path'
import getConfig from './read-config'
import selfEnv from './enviroment'
import bak from './backups-file'
console.log(selfEnv)
bak()
// console.log('读取到的配置：')
// console.log(getConfig)