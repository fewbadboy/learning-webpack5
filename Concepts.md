## Tree Shaking
commonly used in the JavaScript context for dead-code elimination
it relies on the static structure of ES2015 module syntax, i.e. `import` and `export`

### sideEffects
The new webpack 4 release expands on this capability with a way to provide hints to the compiler via the `"sideEffects"` `package.json` property to denote which files in your project are "pure" and therefore safe to prune if unused.

### Conclusion
in order to take advantage of tree shaking, you must
- Use ES2015 module syntax (i.e. import and export)
- Ensure no compiler transfer ES2015 module syntax into CommonJS modules(this is the default behavior of the popular Babel preset @babel/preset-env)
- Add `sideEffects` property to `package.json` file
- Use `production` module configuration option to enable various optimizations

