import * as path from 'path'
import * as fs from 'fs'
import { resolve } from 'path';
import config from './read-config'
export default function remove (src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const files: string[] = fs.readdirSync(src)
      files.forEach(file => {
        if (file === 'bak' || file === '.DS_Store' || /base(.)+\.js/.test(file)) {
          return
        }
        if (config.include.length > 0) {
          const include: string[] = config.include
          for (let value of include) {
            if (file.indexOf(value) < 0) {
              return
            }
          }
        }
        if (config.exclude.length > 0) {
          const exclude: string[] = config.exclude
          for (let value of exclude) {
            if (file.indexOf(value) >= 0) {
              return
            }
          }
        }
        const filePath = path.resolve(src, file)
        const stats: fs.Stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
          console.log(`remove: ${filePath}`)
          remove(filePath)
          fs.rmdirSync(filePath)
          return
        } else {
          fs.unlinkSync(filePath)
        }
      })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
