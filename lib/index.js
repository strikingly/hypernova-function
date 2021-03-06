Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hypernova = require('hypernova');

var _hypernova2 = _interopRequireDefault(_hypernova);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _windowOrGlobal = require('window-or-global');

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_windowOrGlobal2['default'].ReactDOMServer = _server2['default'];

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (x) {
    return (x ^ Math.random() * 16 >> x / 4).toString(16);
  });
}

function serialize(name, html) {
  var id = uuid();
  var markup = '<!-- hypernova-id: ' + String(id) + ', hypernova-key: ' + String(name) + ' -->' + String(html);
  return '' + markup;
}

var renderFunction = function renderFunction(name, configureStore) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$needSerialize = _ref.needSerialize,
      needSerialize = _ref$needSerialize === undefined ? true : _ref$needSerialize;

  return (0, _hypernova2['default'])({
    server: function () {
      function server() {
        return function (props) {
          var result = configureStore.server(props);
          if (needSerialize) {
            return serialize(name, result);
          }
          return result;
        };
      }

      return server;
    }(),
    client: function () {
      function client() {}

      return client;
    }()
  });
};

exports['default'] = renderFunction.renderFunction = renderFunction['default'] = renderFunction;