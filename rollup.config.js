import pkg from './package.json'
// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: [
    // {
    //   dir: 'output',
    //   format: 'cjs'
    // },
    // 1. cjs -> commonjs
    // 2. esm
    {
      format: "cjs",
      file: pkg.main,
    },
    {
      format: "es",
      file: pkg.module,
    },
  ],
  plugins: [typescript(/*{ plugin options }*/)]
};