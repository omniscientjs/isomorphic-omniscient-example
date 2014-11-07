var http = require('http');
var fs = require('fs');
var React = require('react');
var st = require('st');

// Use JSX
require('node-jsx').install({
  extension: '.js',
  harmony: true
});

var App = require('./components/app');

var immstruct = require('immstruct');

var mount = st({
  path: __dirname + '/public',
  url: '/',
  cache: false,
  index: 'index.html'
});

var structure = immstruct({
  name: 'Doc'
});

var tpl = fs.readFileSync('./view/layout.tpl.html').toString('utf-8');

var server = http.createServer(function (req, res) {
  if (req.url === '/') {
    // Render React to a string, passing in our fetched tweets
    var markup = React.renderToString(
      App({ appState: structure.cursor() })
    );
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    res.write(
      tpl.replace('{{initialApp}}', markup)
         .replace('{{initialState}}', JSON.stringify(structure.current.toJSON()))
    );
    return res.end();
  }

  return mount(req, res);
});

server.listen(8000, function () {
  console.log('started server at port 8000');
})
