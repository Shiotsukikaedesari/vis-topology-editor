const context = require.context("./", true, /\.vue$/);

export const components = {};

context.keys().forEach((url) => {
  components[url.replace(/.\/|\.vue$/g, "")] = () => import(`${url}`);
});
