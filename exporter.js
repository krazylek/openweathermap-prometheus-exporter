var dedent = require('dedent')

module.exports = function (options = {}) {
  var tempUnitsName = getTemperatureUnits(options.units)
  var tempUnits = tempUnitsName.toLowerCase()

  return function (...results) {
    return dedent`
      # TYPE weather_info gauge
      # HELP weather_info Information about the location; the value equals the id of the location
      # TYPE weather_return_code gauge
      # HELP weather_return_code Internal API return code, presumably HTTP codes
      # TYPE weather_temperature_${tempUnits} gauge
      # HELP weather_temperature_${tempUnits} Temperature in ${tempUnitsName}; for large areas, min/max might differ
      # TYPE weather_measurement_epoch gauge
      # HELP weather_measurement_epoch Unix timestamp of last measurement
      # TYPE weather_wind_meters_per_second gauge
      # HELP weather_wind_meters_per_second Speed in m/s
      # TYPE weather_wind_direction gauge
      # HELP weather_wind_direction Direction in meteorological degress
      # TYPE weather_id gauge
      # HELP weather_id Weather condition id
      # TYPE weather_location_coordinates gauge
      # HELP weather_location_coordinates Geolocation; latitude and longitude
      # TYPE weather_humidity_percent gauge
      # HELP weather_humidity_percent Relative humidity in percent
      # TYPE weather_clouds_percent gauge
      # HELP weather_clouds_percent Cloud cover in percent
      # TYPE weather_sun_epoch gauge
      # HELP weather_sun_epoch
      # TYPE weather_pressure_hectopascal gauge
      # HELP weather_pressure_hectopascal

    `.concat(results.map(getMetrics))
  }

  function getMetrics (json) {
    return dedent`
      weather_info{location="${json.name}",country="${json.sys.country}"} ${json.id}

      weather_return_code{name="${json.name}"} ${json.cod}

      weather_temperature_${tempUnits}{name="${json.name}",type="current"} ${json.main.temp}
      weather_temperature_${tempUnits}{name="${json.name}",type="max"} ${json.main.temp_max}
      weather_temperature_${tempUnits}{name="${json.name}",type="min"} ${json.main.temp_min}

      weather_measurement_epoch{name="${json.name}"} ${json.dt}

      weather_wind_meters_per_second{name="${json.name}"} ${json.wind.speed}

      # This is not always returned
      ${json.wind.deg ? `weather_wind_direction{name="${json.name}"} ${json.wind.deg}` : ''}

      # TODO I fear there might be multiple arrays in there, sometimes
      weather_id{name="${json.name}"} ${json.weather[0].id}

      weather_location_coordinates{name="${json.name}",dimension="latitude"} ${json.coord.lat}
      weather_location_coordinates{name="${json.name}",dimension="longitude"} ${json.coord.lon}

      weather_humidity_percent{name="${json.name}"} ${json.main.humidity}

      weather_clouds_percent{name="${json.name}"} ${json.clouds.all}

      weather_sun_epoch{name="${json.name}",change="sunrise"} ${json.sys.sunrise}
      weather_sun_epoch{name="${json.name}",change="sunset"} ${json.sys.sunset}

      weather_pressure_hectopascal{name="${json.name}",level="current"} ${json.main.pressure}
      ${json.main.grnd_level != null ? `weather_pressure_hectopascal{name="${json.name}",level="ground"} ${json.main.grnd_level}` : ''}
      ${json.main.sea_level != null ? `weather_pressure_hectopascal{name="${json.name}",level="sea"} ${json.main.sea_level}` : ''}
    `
  }
}

function getTemperatureUnits (system) {
  switch (system) {
    case 'metric':
      return 'Celsius'
    case 'imperial':
      return 'Fahrenheit'
    default:
      return 'Kelvin'
  }
}
