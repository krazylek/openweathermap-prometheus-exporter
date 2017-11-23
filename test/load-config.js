var test = require('tape')
var loadConfig = require('../load-config')

test('parsing a yaml file is ok', function (t) {
  t.plan(1)
  var filepath = './test/testconf.yml'
  var expectedConfig = {
    APPID: 'keytest',
    q: 'Nouméa',
    units: 'metrics',
    lang: 'fr',
    mode: 'json',
    id: [1, 2]
  }
  var config = loadConfig.parseFile(filepath)
  t.deepEqual(config, expectedConfig)
})
