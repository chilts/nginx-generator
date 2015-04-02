// --------------------------------------------------------------------------------------------------------------------
//
// Copyright 2014 Andrew Chilton <andychilton@gmail.com>.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// --------------------------------------------------------------------------------------------------------------------

// core
var fs = require('fs')
var path = require('path')

// npm
var xtend = require('xtend')
var handlebars = require('handlebars')

// --------------------------------------------------------------------------------------------------------------------

var defaults = {
  type    : 'proxy',
  confDir : '/etc/nginx/sites-enabled',
  logDir  : '/var/log/nginx',
}

var dir = path.join(__dirname, 'vhosts')
var types = {
  proxy : {
    template : fs.readFileSync(path.join(dir, 'proxy'), { encoding : 'utf8' }),
    defaults : {
      host : 'localhost',
      // port - should be specified
    },
  },
  redirect : {
    template : fs.readFileSync(path.join(dir, 'redirect'), { encoding : 'utf8' }),
    defaults : {
      // none - both 'from' and 'to' should be specified
    },
  },
  'static' : {
    template : fs.readFileSync(path.join(dir, 'static'), { encoding : 'utf8' }),
    defaults : {
      // dir - required
    },
  },
  test  : {
    template : fs.readFileSync(path.join(dir, 'test'), { encoding : 'utf8' }),
    defaults : {},
  },
}

function generator(domain, name, type, opts, callback) {
  opts = xtend({}, defaults, types[type].defaults, opts)

  // set the domain, name and type last
  opts.domain = domain
  opts.name = name
  opts.type = type

  // let's read the config template we want, then return the config
  var source = types[opts.type].template
  var template = handlebars.compile(source)

  return template(opts)
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = generator

// --------------------------------------------------------------------------------------------------------------------
