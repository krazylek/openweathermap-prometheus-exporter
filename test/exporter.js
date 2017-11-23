var exporter = require('../exporter')
var toMetrics = exporter()
var resp = require('./owm.json')
var test = require('tape')

test('converts request result to metrics', function (t) {
  t.plan(1)
  var metrics = toMetrics(resp)
  t.equal(typeof metrics, 'string')
})

test('units change temperature units', function (t) {
  t.plan(3)
  var toMetrics = exporter({units: 'metric'})
  var tempExpr = /celsius/g
  var metrics = toMetrics(resp)
  var occurences = metrics.match(tempExpr)

  t.equal(typeof metrics, 'string')
  t.ok(occurences)
  t.equals(occurences.length, 5, 'need 5 oocurences: 2 in definitions, 3 for current, min, max')
})
