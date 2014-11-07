var React = require('react'),
    component = require('omniscient');

var Greeting = component(function (props) {
  return (
    <h2>Welcome, {props.name.deref()}</h2>
  );
}).jsx;

var Input = component(function (props) {
  var onChange = (e) => this.props.name.update(() => e.currentTarget.value);
  return (
    <input onChange={onChange} value={props.name.deref()} />
  );
}).jsx;

var App = component(function (props) {
  return (
    <div>
      <h1>Isomorphic Omniscient!</h1>
      <Greeting name={props.appState.cursor('name')} />
      <Input name={props.appState.cursor('name')} />
    </div>
  );
});

module.exports = App;