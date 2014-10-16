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

  // console.log('-------------------------------------------------------------------------------')
  // console.log('--- ' + name + '/' + type + ' ---')
  // console.log('opts:', opts)

  // let's read the config template we want, then return the config
  var source = types[opts.type].template
  var template = handlebars.compile(source)

  var result = template(opts)
  // console.log()
  // console.log(result)
  // console.log('-------------------------------------------------------------------------------')

  return result
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = generator

// --------------------------------------------------------------------------------------------------------------------
