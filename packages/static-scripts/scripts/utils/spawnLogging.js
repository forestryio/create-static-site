const spawn = require("react-dev-utils/crossSpawn")
const log = require("./log")

/**
 * Creates standardized, human-readble output
 * for the process runners
 */
module.exports = (cmd, label, browsersync) => {
    var spawnedCmd = spawn(cmd, {shell: true, env: process.env})
    
    spawnedCmd.on("error", err => {
        log(err, err.toString(), label)
    })
    
    spawnedCmd.on("close", code => {
        // TODO: add browsersync notifications
        // if (browserSync) {
        //     browserSync.reload()
        // }
    })
    
    spawnedCmd.stdout.on("data", data => {
        log(null, data.toString(), label)
    })
    
    spawnedCmd.stderr.on("data", data => {
        log(null, data.toString(), label)
    })

    process.on('SIGINT', () => {
        spawnedCmd.kill()
    })
    
    process.on('SIGTERM', () => {
        spawnedCmd.kill()
    })

    return spawnedCmd
}