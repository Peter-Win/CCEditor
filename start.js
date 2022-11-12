const path = require('path')
const fs = require('fs')
const {exec, execSync} = require('child_process')

const main = async () => {
    const serverFolder = path.join(__dirname, 'server')
    const serverLibs = path.join(serverFolder, 'node_modules')
    if (!fs.existsSync(serverLibs)) {
        console.log('Installing...')
        execSync('npm i', {cwd: serverFolder})
    }
    const indexName = path.join(serverFolder, 'index.js')
    const {port} = require(indexName)
    exec(`start http://localhost:${port}`)
}

main()