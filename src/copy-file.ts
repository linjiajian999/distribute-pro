// 复制文件到目录
import * as fs from 'fs'
import * as path from 'path'
import * as zlib from 'zlib'

import selfEnv from './enviroment'
import config from './read-config'

import copy from './copy'
import backup from './backups-file'
import remove from './remove'

export default async function removeToTarget() {
  // 先备份
  await backup()
  // 然后复制文件到目标目录
  console.log('备份完成 => 准备删除')
  const configPath = path.resolve(__dirname, '../config.json')
  let target = path.resolve(configPath, config.target[selfEnv])
  let src = path.resolve(configPath, config.source)
  let lastSrc: string = ''
  let lastTime: number = Number.MIN_SAFE_INTEGER

  // 获取最新的 资源文件夹（在src中可能存在旧的资源文件夹，获取到最新那个
  let srcFiles: string[] = []
  try {
    srcFiles = fs.readdirSync(src)
  } catch(err) {
    console.log('config.source 设置错误')
    throw err
  }
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
  // 删除目标文件夹中的资源文件
  remove(target).then(() => {
    console.log('删除完成')
    console.log('开始复制')
    // 然后复制资源文件 到 目标目录中
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
