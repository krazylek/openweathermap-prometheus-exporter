var owm = require('openweathermap')
var exporter = require('./exporter')

module.exports = function(options, cb) {
  owm.now(getOwmOptions(options), (err, data) => {
    if(err)
      return cb(err)
    if(data.cod != 200)
      return cb(data.message)

    var metrics = exporter(data)
    cb(null, metrics)
  })
}

function getOwmOptions(options) {
  var props = ['units', 'lang', 'mode', 'q', 'cnt', 'id', 'lat', 'lon', 'type', 'start', 'end', 'APPID']
  return Object.entries(options).reduce((owm, [key, value]) => {
    if(value != null && props.indexOf(key) != -1)
      owm[key] = value
    return owm
  }, {})
}

