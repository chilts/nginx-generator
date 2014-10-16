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
$ sudo nginx-generator --type redirect --var from=www.chilts.org --var to=chilts.org www-chilts-org
```

Your vars can also be read from a JSON file, such as this:

```bash
$ echo '{"from":"www.chilts.org","to":"chilts.org"}' > vars.json
$ sudo nginx-generator --type redirect --data vars.json www-chilts-org
```

To generate a proxy config for `chilts.org` to a server running on `localhost:8000`, do:

```
$ 
$ sudo nginx-generator --type proxy --var 
```

```
var app = express()
var toSlash = require('express-to-slash')

app.all('/admin', toSlash())
app.all('/blog', toSlash(301)) // Moved Permanently
```

This will redirect all `.get()`, `.head()`, `.post()` etc requests to `/admin`. It will also include any querystring
which was included in the request.

e.g. `/admin?hello=world` will redirect to `/admin/?hello=world`

## 'strict routing' and 'strict'

In Express the default routing means that `/path` and `/path/` map to the same route. I feel that this breaks how the
web works, espectially if you use relative URLs in your templates. To fix this I think you need to deal with each route
separately ... and of course in some cases you want to redirect one to the other. In my case, I sometimes redirect the
non-slash version to the slash version, hence this project.

However, you still have to tell Express to be explicit about this. To do this on your app, you should do the following:

```
var app = express()
app.enable('strict routing')
```

In Express v4, you can now also create routers, but these too need to be told to be explicit about their
routing. Therefore you should do the following when creating a new router:

```
var router = express.Router({
  'strict' : true,
})
```

Note: unfortunately the name of the option is different on the app and the router.

When using a router, you also need to put the redirect route first so that it is done prior to the other one. The
reason for this is that usually a route is mounted using `app.use()` and therefore it is classed as middleware. Yet
Express also tells us that middleware just checks the prefix of the path and is therefore not subject to the final
slash. Yes, I think this is weird, but it is what it is! Therefore, try this:

```
var express = require('express')
var toSlash = require('express-to-slash')
// an express.Router({ 'strict' : true })
var myAdmin = require('./admin.js')

var app = express()
app.enable('strict routing')

app.use(toSlash('/admin/'))
app.use('/admin/', myAdmin)
```

Phew!

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
