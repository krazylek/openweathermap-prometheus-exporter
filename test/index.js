// tests needs OpenWeatherMap key to be set with .env file or env variable: OWM_KEY=your_secret_key
 
var test = require('tape')
var getMetrics = require('../')
var config = require('../load-config')()

test('valid key request will return valid metrics result', function (t) {
  t.plan(2)
  getMetrics(config, (err, metrics) => {
    t.notok(err)
    t.ok(metrics)
  })
})
