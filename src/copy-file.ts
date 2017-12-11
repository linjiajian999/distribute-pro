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

  let lastSrc: string = ''
  let lastTime: number = Number.MIN_SAFE_INTEGER

  const srcFiles: string[] = fs.readdirSync(src)
  srcFiles.forEach(srcfile => {
    const srcfiledir = src + '/' + srcfile
    const stats: fs.Stats = fs.statSync(srcfiledir)
    stats.birthtime
    if (stats.birthtime.getTime() > lastTime) {
      lastSrc = srcfiledir
      lastTime = stats.birthtime.getTime()
    }
    lastSrc = src + '/' + srcfile
  })
  console.log('开始删除')
  remove(target).then(() => {
    console.log('删除完成')
    console.log('开始复制')
    copy(lastSrc, target)
  })
  .then(() => {
    console.log('复制完成')
  })
  .catch(err => {
    console.log('error')
    console.log(err)
  })
}
