import * as fs from 'fs'
import * as path from 'path'
// 同步版本
function copyDir(target: string, bak: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      let files = fs.readdirSync(target)
      files.forEach((file) => {
        if (file === '.DS_Store' || file === 'bak') {
          return
        }
        let bakFile = bak + '/' + file
        let src = path.resolve(target, file)
        fs.copyFileSync(src, bakFile)
        console.log('复制成功：' + src)
        const stats = fs.statSync(src)
        if (stats.isDirectory()) {
          copyDir(src, bakFile)
        }
      })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}
// 异步版本
export default async function copy (target: string, bak: string) {
  try {
    const files = await readdir(target)
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      if (file === '.DS_Store' || file === 'bak') {
        continue
      }
      // console.log(`${i}:${file}`)
      let bakFile = bak + '/' + file
      let src = path.resolve(target, file)
      await copyFile(src, bakFile)
      const stats = await stat(src, bakFile)
      if (stats.isDirectory()) {
        await copy(src, bakFile)
      }
    }
    console.log(`done: ${target}`)
  } catch (err) {
    console.log('error:')
    console.log(err)
  }
}

function readdir(target: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(target, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}
function copyFile(src: string, bakFile: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.copyFile(src, bakFile, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
function stat(src: string, bakFile: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(src, (err, stats) => {
      if (err) {
        reject(err)
        return
      }
      resolve(stats)
    })
  })
}
