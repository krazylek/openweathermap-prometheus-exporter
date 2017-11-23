[Prometheus](https://prometheus.io/) exporter for [OpenWeatherMap](http://openweathermap.org/) data.

This is basicaly a port in Javascript of Perl Richard Hartmann [exporter](https://github.com/RichiH/openweathermap_exporter/).


## Getting started

Signup at http://openweathermap.org/ to get an APPID.


## Install

Clone the repo, or install it on your system with npm:

```
npm install -g openweathermap-prometheus-exporter
```


## Usage 

### Standalone server

```
Usage: owm-exporter [config file] {OPTIONS}

Standard Options:

       --port, -p  Select port for the metric server
                   default 9262

       --help, -h  Show this message
```

Example (see below for openweathermap.yml config file):

```
owm-exporter openweathermap.yml --port 9091
```

### API

Exemple:

```
var getMetrics = require('./index.js')
getMetrics({ 
  APPID: 'Your Key',
  units: 'metric'
}, function(err, metrics) {
  console.log(metrics)
})
```


## Configuration

You can use a yaml file or environment variables, eventually in a .env file.
The only mandatory option is APPID, all the others have default values.
For now group request (multiple cities) are not supported.

For a full description of those variables, check [API doc](https://openweathermap.org/current).

Priority is yaml` > `env vars`.

### YAML

Example of openweathermap.yml file:

```
units: <units: metric, imperial. default standard>
lang: <language code>
mode: <format: only json>
q: <city name, country code>
id: <city id>
lat: <latitude>
lon: <longitude>
zip: <zip code, country code>
APPID: <your key>

```

### ENV

You can define them in a .env file

```
OWM_UNITS=<units: metric, imperial. default standard>
OWM_LANG=<language code>
OWM_Q=<city name, country code>
OWM_ID=<city id>
OWM_APPID=<your key>
```


## Docker

Build (or wait for docker hub entry...)

```
docker build -t "krazylek/openweathermap-prometheus-exporter" https://github.com/krazylek/openweathermap-prometheus-exporter.git
```

Run

```
docker run -d -v $(pwd)/openweathermap.yml:/openweathermap.yml -p 9091:9091 --name openweathermap krazylek/openweathermap-prometheus-exporter
```

## Note

I am not affiliated with OpenWeatherMap in any way.

## License

[MIT](https://tldrlegal.com/license/mit-license])
