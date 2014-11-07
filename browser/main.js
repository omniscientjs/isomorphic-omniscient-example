var React = require('react');
var App = require('../components/app').jsx;
var immstruct = require('immstruct');

// Retrieve initial state from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
var structure = immstruct(initialState);

// Render the components, picking up where react left off on the server
var app = document.getElementById('react-app');
function render() {
  React.render(<App appState={structure.cursor()} />, app);
}

render();
structure.on('swap', render);

setTimeout(function () {
  console.log("Hello");
  structure.cursor('name').update(function () {
    return 'The Doctor';
  });
}, 5000);