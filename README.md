# rollup-window-env

rollup plugin to inject given environment variables into the window object..

## Getting started

### Installing

- ``npm install @thoughtsunificator/rollup-plugin-window-env --save-dev``

### How does it work?

rollup-plugin-window-env will create a new object from the config file, env file and ``process.env``.

Order of priority:

1. process.env
2. env file
3. config file

### Usage

```javascript
import configWindowEnv from '@thoughtsunificator/rollup-plugin-window-env'

export default {
  plugins: [
    configWindowEnv({ envPath: ".env.json", configPath: "data/config.json" })
  ]
}
```

``data/config.json``
```json
{
  "SITE_NAME": "FOO"
}
```

``.env.json``
```json
{
  "SITE_NAME": "BAR"
}
```

Within the context of your application:

```javascript

console.log(window.SITE_NAME)
/* outputs:
{
  SITE_NAME: "BAR"
}
*/

```
