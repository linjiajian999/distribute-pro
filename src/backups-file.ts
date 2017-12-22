// 备份文件
import config from './read-config'
import selfEnv from './enviroment'

import * as path from 'path'
import * as fs from 'fs'

import copy from './copy'

export default function backup (): Promise<any> {
  const configPath = path.resolve(__dirname, '../config.json')

  const targetPath: string = path.resolve(configPath, config.target[selfEnv])
  const bakPath: string = path.resolve(targetPath + '/bak')

  return new Promise((resolve, reject) => {
    fs.readdir(bakPath, function(err, files) {
      console.log('备份中...')
      if (err) {
        fs.mkdirSync(bakPath)
      }
      // date
      let date = new Date()
      const bakDatePath = `${bakPath}/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

      // 新建 备份文件夹
      fs.mkdirSync(bakDatePath)
      // 开始备份
      const include: string[] = []
      const exclude: string[] = []
      copy(targetPath, bakDatePath, include, exclude).then(() => {
        console.log('备份完成')
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  })
}