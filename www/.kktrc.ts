import path from 'path';
import webpack, { Configuration } from 'webpack';
import lessModules from '@kkt/less-modules';
import { LoaderConfOptions } from 'kkt';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import scopePluginOptions from '@kkt/scope-plugin-options';
import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';
import pkg from './package.json';

export default (conf: Configuration, env: 'development' | 'production', options: LoaderConfOptions) => {
  conf.module!.exprContextCritical = false;
  conf = lessModules(conf, env, options);
  conf = mdCodeModulesLoader(conf);
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [path.resolve(process.cwd(), '..', 'README.md'), path.resolve(process.cwd(), 'src')],
  });
  // Get the project version.
  conf.plugins!.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
  );
  if (env === 'development') {
    // conf.plugins!.push(new BundleAnalyzerPlugin({ analyzerPort: 'auto' }));
  }
  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
    conf.optimization = {
      ...conf.optimization,
      splitChunks: {
        cacheGroups: {
          reactvendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
          },
        },
      },
    };
  }
  return conf;
};
