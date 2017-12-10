import config from './read-config'
import selfEnv from './enviroment'

import * as path from 'path'
import * as fs from 'fs'

function backup () {
  const targetPath: string = config.target[selfEnv]
  const bakPath: string = path.resolve(targetPath + '/bak')

  fs.readdir(bakPath, function(err, files) {
    if (err) {
      fs.mkdirSync(bakPath)
    }
  })
}

export default backup