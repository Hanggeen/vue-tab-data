import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { eslint } from "rollup-plugin-eslint";
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: './dist/vue-tab-data.js',
    format: 'es'
  },
  plugins: [
    eslint(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    terser()
  ]
};