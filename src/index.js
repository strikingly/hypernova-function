import hypernova from 'hypernova';
import ReactDOMServer from 'react-dom/server';
import root from 'window-or-global';

root.ReactDOMServer = ReactDOMServer;

function uuid() {
  return (
    [1e7] +
    -1e3 +
    -4e3 +
    -8e3 +
    -1e11
  ).replace(
    /[018]/g,
    x => (x ^ Math.random() * 16 >> x / 4).toString(16),
  );
}

function serialize(name, html) {
  const id = uuid();
  const markup = `<!-- hypernova-id: ${id}, hypernova-key: ${name} -->${html}`;
  return `${markup}`;
}

const renderFunction = (name, configureStore, { needSerialize = true } = {}) => hypernova({
  server: () => (props) => {
    const result = configureStore.server(props);
    if (needSerialize) {
      return serialize(name, result);
    }
    return result;
  },
  client: () => {},
});

export default renderFunction.renderFunction = renderFunction.default = renderFunction;
