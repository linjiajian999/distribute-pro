import * as process from 'process'
let selfEnv: string = ''
const runEnv = process.argv[2]
if (runEnv) {
  if (runEnv === 'demo' || runEnv === 'real') {
    selfEnv = runEnv
  } else {
    console.log('请输入正确的打包环境（ demo or real）')
    process.exit()
  }
} else {
  console.log('请输入正确的打包环境（ demo or real）')
  process.exit()
}
export default selfEnv