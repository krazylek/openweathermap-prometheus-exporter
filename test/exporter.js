var exporter = require('../exporter')
var resp = require('./owm.json')
var test = require('tape')

test('converts request result to metrics', function (t) {
  t.plan(1)
  var metrics = exporter(resp)
  t.equal(typeof metrics, 'string')
})
