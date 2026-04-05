function applyCracoWebpackPatches(config, options = {}) {
  const memoryLimit = options.forkTsCheckerMemory ?? 8192;
  const plugin = config.plugins.find(
    (p) => p.constructor.name === 'ForkTsCheckerWebpackPlugin'
  );
  if (plugin?.options?.typescript) {
    plugin.options.typescript.memoryLimit = memoryLimit;
  }
  config.module.rules.push({
    test: /\.m?js$/,
    include: /smooth_ui[\\/]dist|[\\/]@smoothhiring[\\/]smooth-ui[\\/]dist/,
    resolve: {
      fullySpecified: false,
    },
  });
}

module.exports = { applyCracoWebpackPatches };
