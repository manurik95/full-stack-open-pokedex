const express = require('express')
const app = express()

const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})

app.use(morgan('combined', { stream: logStream }))

const output = fs.createWriteStream(path.join(__dirname, 'server.log'))
const errorOutput = fs.createWriteStream(
  path.join(__dirname, 'server-error.log')
)

// Custom simple logger
console.log = function (message) {
  output.write(new Date().toISOString() + ' - ' + message + '\n')
}
console.error = function (message) {
  errorOutput.write(new Date().toISOString() + ' - ' + message + '\n')
}

// get the port from env variable
const PORT = 5000

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
