# nginx-generator #

Easy simple way to create Nginx vhost files for fairly simple sites, such as a proxy to a Node.js server,
a redirect from one domain to another, or simply serving a static site.

## Synopsis ##

To install:

```bash
$ npm install -g nginx-generator
```

To generate a simple redirect from `www.chilts.org` to `chilts.org`, just do:

```bash
$ nginx-generator \
      --name org-chilts-www \
      --domain www.chilts.org \
      --type redirect \
      --var to=chilts.org \
      /etc/nginx/sites-enabled/org-chilts-www
```

Then reload Nginx

```bash
$ sudo service nginx reload
```

Your vars can also be read from a JSON file, such as this:

```bash
$ echo '{"to":"chilts.org"}' > vars.json
$ nginx-generator \
      --name org-chilts-www \
      --domain www.chilts.org \
      --type redirect \
      --data vars.json \
      /etc/nginx/sites-enabled/org-chilts-www
```

## Proxy ##

To generate a proxy that will forward requests elsewhere, just pass the usual three `--name`, `--domain` and `--type`
then pass both `host` and `port` as `--var` variables:

```
$ nginx-generator \
      --name org-chilts \
      --domain chilts.org \
      --type proxy \
      --var host=localhost \
      --var port=8000 \
      /etc/nginx/sites-enabled/org-chilts
```

## Static Site ##

To generate a vhost that will serve a static site, just pass the usual three `--name`, `--domain` and `--type` then
pass `dir` as a `--var`:

```
$ nginx-generator \
      --name org-chilts-static \
      --domain static-chilts.org \
      --type static \
      --var dir=/home/chilts/htdocs \
      /etc/nginx/sites-enabled/org-chilts-static
```

## Redirect ##

To generate a redirect, just pass the usual three `--name`, `--domain` and `--type` then pass `to` as a `--var`:

```bash
$ nginx-generator \
      --name org-chilts-www \
      --domain www.chilts.org \
      --type redirect \
      --var to=chilts.org \
      /etc/nginx/sites-enabled/org-chilts-www
```

## Roadmap ##

* add ability to set and define config for basic auth for any site
* add ability to make a site serve over https with config for certs

## Other Nginx Packages ##

There are some other Nginx packages out there such as:

* https://www.npmjs.org/package/nginx-vhosts
* https://www.npmjs.org/package/ngineer
* https://www.npmjs.org/package/nginx-conf
* https://www.npmjs.org/package/nodeginx

However, I didn't want to control Nginx itself like `nginx-vhosts` and `ngineer` does, especially on Debian or Ubuntu
machines since upstart already does this. All I wanted to do was template in some simple vhosts in a programmatic
(library or CLI program) way. Also, `nginx-conf` is too complicated since that's for the main Nginx config. `nodeginx`
is closest to this package in terms of functionality.

## AUTHOR ##

Written by [Andrew Chilton](http://chilts.org/):

* [Blog](http://chilts.org/)
* [GitHub](https://github.com/chilts)
* [Twitter](https://twitter.com/andychilton)
* [Instagram](http://instagram.com/thechilts)

## LICENSE ##

Copyright 2014 Andrew Chilton <andychilton@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

(Ends)
