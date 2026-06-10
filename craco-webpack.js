const path = require('path');
const fs = require('fs');

/*
  Packages that must resolve to a SINGLE instance shared by the app and smooth-ui.
  smooth-ui is consumed via a file: symlink, so without these aliases webpack resolves its
  externalized imports to smooth_ui/node_modules — a second copy. Duplicate copies break
  React-context based wiring (e.g. MUI's ToggleButtonGroup/ToggleButton, ThemeProvider).
*/
const SINGLETON_PACKAGES = ['react', 'react-dom', '@emotion/react', '@emotion/styled', 'react-router', 'react-router-dom', '@mui/material', '@mui/icons-material', '@mui/x-data-grid', '@mui/x-date-pickers'];

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
  const singletonAliases = {};
  for (const pkg of SINGLETON_PACKAGES) {
    const pkgPath = path.join(appRoot, 'node_modules', pkg);
    // Only alias packages the app actually has, so consumers without e.g. x-date-pickers still resolve.
    if (fs.existsSync(pkgPath)) {
      singletonAliases[pkg] = pkgPath;
    }
  }
  config.resolve.alias = {
    ...config.resolve.alias,
    ...singletonAliases,
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
