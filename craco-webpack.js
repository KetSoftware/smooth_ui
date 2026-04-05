const path = require('path');

function applyCracoWebpackPatches(config, options = {}) {
  const appRoot = options.appRoot || process.cwd();
  const ModuleScopePlugin = require(path.join(
    appRoot,
    'node_modules/react-dev-utils/ModuleScopePlugin'
  ));
  const memoryLimit = options.forkTsCheckerMemory ?? 8192;
  const plugin = config.plugins.find(
    (p) => p.constructor.name === 'ForkTsCheckerWebpackPlugin'
  );
  if (plugin?.options?.typescript) {
    plugin.options.typescript.memoryLimit = memoryLimit;
  }
  config.resolve.plugins = (config.resolve.plugins || []).filter(
    (p) => !(p instanceof ModuleScopePlugin)
  );
  config.resolve.alias = {
    ...config.resolve.alias,
    react: path.join(appRoot, 'node_modules/react'),
    'react-dom': path.join(appRoot, 'node_modules/react-dom'),
    '@emotion/react': path.join(appRoot, 'node_modules/@emotion/react'),
    '@emotion/styled': path.join(appRoot, 'node_modules/@emotion/styled'),
    'react-router': path.join(appRoot, 'node_modules/react-router'),
    'react-router-dom': path.join(appRoot, 'node_modules/react-router-dom'),
  };
  config.resolve.symlinks = false;
  config.module.rules.push({
    test: /\.m?js$/,
    include: /smooth_ui[\\/]dist|[\\/]@smoothhiring[\\/]smooth-ui[\\/]dist/,
    resolve: {
      fullySpecified: false,
    },
  });
}

module.exports = { applyCracoWebpackPatches };
