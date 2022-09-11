const express = require('express')
const bodyParser = require('body-parser')

const { allHandlers } = require('./handlers/allHandlers')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.text())

allHandlers(app)

app.use(function(err, req, res, next) {
    console.log("err:", err)
    if (err instanceof Error) {
        console.error(err.stack)
        res.status(500).send(err.message)
    }
})

const port = 3335
app.listen(port, () => {
    console.log(`Use this URL in your browser: http://localhost:${port}/`)
    console.log("Press Ctrl+C to step the server.")
})

module.exports = {port}