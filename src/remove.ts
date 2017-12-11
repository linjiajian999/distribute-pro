import * as path from 'path'
import * as fs from 'fs'
import { resolve } from 'path';
export default function remove (src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const files: string[] = fs.readdirSync(src)
      files.forEach(file => {
        if (file === 'bak' || file === '.DS_Store' || file.indexOf('base') >= 0) {
          return
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
