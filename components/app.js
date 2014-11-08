var React = require('react'),
    component = require('omniscient');

var Greeting = component(function ({ name }) {
  return <h2>Welcome, {name.deref()}</h2>
}).jsx;

var Input = component(function ({ name }) {
  var onChange = (e) => name.update(() => e.currentTarget.value);
  return (
    <input onChange={onChange} value={name.deref()} />
  );
}).jsx;

var App = module.exports = component(function ({ appState }) {
  return (
    <main>
      <h1>Isomorphic Omniscient!</h1>
      <Greeting name={appState.cursor('name')} />
      <Input name={appState.cursor('name')} />
    </main>
  );
});