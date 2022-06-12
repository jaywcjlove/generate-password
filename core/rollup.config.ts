import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import banner from 'bannerjs';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        name: 'GeneratePassword',
        exports: 'auto',
        banner: banner.multibanner(),
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'GeneratePassword',
        banner: banner.multibanner(),
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({ browser: true }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '../../node_modules'],
      }),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        name: 'GeneratePassword',
        banner: banner.multibanner(),
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '../../node_modules'],
        compilerOptions: {
          sourceMap: false,
        },
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/generate-password.min.js',
        // file: `dist/generate-password.v${pkg.version}.min.js`,
        format: 'umd',
        name: 'GeneratePassword',
        banner: banner.onebanner(),
        sourcemap: false,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['node_modules', '../../node_modules'],
        compilerOptions: {
          sourceMap: false,
        },
      }),
      terser({}),
    ],
  },
];
