import copy from './copy'
import * as fs from 'fs'
import * as path from 'path'

import selfEnv from './enviroment'
import config from './read-config'

import backup from './backups-file'
import remove from './remove'

export default async function removeToTarget() {
  await backup()
  const basePath = path.resolve(__dirname, '../')

  const target = path.resolve(basePath, config.target[selfEnv])
  const src = path.resolve(basePath, config.source)
  console.log('开始删除')
  remove(target).then(() => {
    console.log('删除完成')
    console.log('开始复制')
    copy(src, target)
  })
  .then(() => {
    console.log('复制完成')
  })
  .catch(err => {
    console.log(err)
  })
}
