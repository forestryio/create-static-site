const util = require("util")

/**
 * Logs errors and messages to the
 * console
 *
 * @param {Error} err
 * @param {String} log
 * @param {String} name
 */
module.exports = function log(err, log, name) {
    const messages = log.replace(/^,|,$/g, "").split("\n") // Get rid leading/trailing commas
    const spacer = " ".repeat(name.length + 2) // Indent additional lines

    messages.forEach((message, i) => {
        if (i === 0) {
            util.log("[" + name + "]", message)
        } else {
            util.log(spacer, message)
        }
    })

    if (err) {
        //browserSync.notify(err.message)
        console.log(err)
    }
}
