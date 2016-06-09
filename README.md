shipit-secrets
==============

A simple secret inclusion task for shipit, inspired by capistrano.

Usage
=====

shipit-secrets works out of the box with shipit-deploy. Simply include files/paths to link as `secrets.files` in your shipit config.

```
module.exports = function(shipit) {
  require("shipit-deploy")(shipit);
  require("shipit-secrets")(shipit);
  shipit.initConfig({
    "default": {
      secrets: {
        files: {

        }
      }
    }
  });
});
```js
