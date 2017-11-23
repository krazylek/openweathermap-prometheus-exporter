#!/usr/bin/env node

var http = require('http')
var fs = require('fs')
var path = require('path')
var loadConf = require('../load-config')
var getMetrics = require('../')
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  alias: {
    h: 'help',
    p: 'port'
  },
  default: {
    port: 9091
  }
})

var owmConfig = loadConf(argv._[0])

if (argv.help) {
  fs.createReadStream(path.join(__dirname, '/usage.txt'))
    .pipe(process.stdout)
    .on('end', () => process.exit())
} else {
  var server = http.createServer(function (req, res) {
    if (req.url === '/metrics') {
      getMetrics(owmConfig, (err, metrics) => {
        if (err) {
          console.error('error while requesting OpenWeatherMap API', err)
          res.statusCode = 500
          return res.end(err.toString())
        }
        res.end(metrics)
      })
    }

    if (req.url === '/') {
      res.end('<html><head></head><body>Metrics available under <a href="/metrics">/metrics</a></body></html>')
    }
  })

  var port = Number(argv.port)
  console.log(`listening on ${port}, metrics served on http://localhost:${port}/metrics`)
  server.listen(port)
}
