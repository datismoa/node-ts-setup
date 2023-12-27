import { build as tsupBuild } from 'tsup'

await tsupBuild({
  entry: ['src/**/*.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'es2021',
  splitting: true,
  clean: true,
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
})