const { createContext } = require('react');

const GlobalContext = createContext({
  onSearch: undefined
});

module.exports = GlobalContext;