require('dotenv').config()
var fs = require('fs')
var yaml = require('js-yaml');

module.exports = load
module.exports.parseFile = parseFile

function load(configFilepath) {
  var yml = configFilepath ? parseFile(configFilepath) : {}

  return {
    unit: yml.units || process.env.OWM_UNITS,
    lang: yml.lang || process.env.OWM_LANG,
    id: yml.id || process.env.OWM_ID,
    q: yml.q || process.env.OWM_Q,
    APPID: yml.APPID || process.env.OWM_APPID,
  }
}

function parseFile(filepath) {
  if(!fs.existsSync(filepath))
    return console.error('Continuing without config file')

  return yaml.safeLoad(fs.readFileSync(filepath, 'utf8'))
}
